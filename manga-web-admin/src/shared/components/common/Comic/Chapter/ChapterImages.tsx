import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { DeleteFilled, UploadOutlined } from '@ant-design/icons';
import {
  useSensor,
  PointerSensor,
  DragEndEvent,
  DndContext,
} from '@dnd-kit/core';
import { Upload, UploadFile, UploadProps, Button } from 'antd';
import { useState } from 'react';
import css from 'styled-jsx/css';
import { twMerge } from 'tailwind-merge';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';
import styled from '@emotion/styled';
import { cloneDeep } from 'lodash';
type Transform = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};
interface ChapterImagesProps {
  className: string;
  created: boolean;
}
interface DraggableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile<any>;
}

interface StyledDivProps extends React.HTMLAttributes<HTMLDivElement> {
  transform?: Transform | null;
  transition?: string | undefined;
  isDragging?: boolean;
}

const StyledDiv = styled.div<StyledDivProps>`
  .ant-upload-list-item-container {
  }
  .ant-upload-list-item-actions {
    position: relative; /* or position: static */
    width: 200px !important;
  }
  ${(props) => {
    const { transform, transition, isDragging } = props;
    const cssTransform = CSS.Transform.toString(transform as Transform);
    return `
      transform: ${cssTransform};
      transition: ${transition};
      cursor: move;
      ${
        isDragging &&
        `
        a {
          pointer-events: none;
        }
      `
      }
    `;
  }}
`;

const DraggableUploadListItem = ({
  originNode,
  file,
  onRemove,
}: DraggableUploadListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column-reverse',
    selfAlign: 'center',
  };

  return (
    <StyledDiv
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === 'error' && isDragging
        ? originNode.props.children
        : originNode}

      <DeleteFilled
        className="text-red-600"
        style={{ fontSize: '1.5rem' }}
        onClick={onRemove}
      />
      <Image
        width={200}
        height={200}
        src={file.url}
        alt={file.name}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        onError={() => {
          URL.revokeObjectURL(file.preview);
        }}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </StyledDiv>
  );
};
export default function ChapterImages({
  className,
  created = false,
}: ChapterImagesProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image2.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image3.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image4.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onRemove = (file) => {
    const newFileList = cloneDeep(fileList).filter(
      (item) => item.uid !== file.uid
    );
    onChange({ fileList: newFileList });
  };
  const { t } = useTypeSafeTranslation();
  return (
    <div className={twMerge(className)}>
      <div>{t('comic.chapterImages')}</div>
      {created ? (
        <div>
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={fileList.map((i) => i.uid)}
              strategy={verticalListSortingStrategy}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                fileList={fileList}
                onChange={onChange}
                className="upload-list-inline"
                itemRender={(originNode, file) => (
                  <DraggableUploadListItem
                    originNode={originNode}
                    file={file}
                    onRemove={onRemove}
                  ></DraggableUploadListItem>
                )}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </SortableContext>
          </DndContext>
        </div>
      ) : (
        <span>{t('comic.notCreatedChapter')}</span>
      )}
    </div>
  );
}
