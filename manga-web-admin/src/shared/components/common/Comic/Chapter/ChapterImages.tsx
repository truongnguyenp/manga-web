import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { DeleteFilled, UploadOutlined } from '@ant-design/icons';
import {
  useSensor,
  PointerSensor,
  DragEndEvent,
  DndContext,
} from '@dnd-kit/core';
import { Upload, UploadFile, UploadProps, Button, Form } from 'antd';
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
import { cloneDeep, forEach } from 'lodash';
import { uploadImageApi } from '@/api/upload';
import { postChapterApi } from '@/api/chapter';
import { v4 as uuid } from 'uuid';
import { DeleteOutlined } from '@ant-design/icons';
type Transform = {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
};
interface ChapterImagesProps {
  className?: string;
  created: boolean;
  chapterId: string;
  form: any;
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

export default function ChapterImages({
  className,
  created = false,
  chapterId,
  comicId,
  chapterImages,
  form,
}: ChapterImagesProps) {
  const [fileList, setFileList] = useState<UploadFile[]>(
    chapterImages ? [...chapterImages] : []
  );

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

  const { t } = useTypeSafeTranslation();

  const handleFileInputChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    const uploadedFiles = await Promise.all(
      newFiles.map(async (file) => {
        const response = await uploadImageApi(file, comicId, chapterId);
        return {
          id: uuid(),
          imagePath: response.data.imagePath,
          chapterId: chapterId,
        };
      })
    );
    form.setFieldValue('images', [...fileList, ...uploadedFiles]);
    setFileList([...fileList, ...uploadedFiles]);
  };
  function deleteFile(index: number) {
    setFileList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  }
  return (
    <div className={twMerge(className)}>
      <div>{t('comic.chapterImages')}</div>
      <input
        type="file"
        onChange={handleFileInputChange}
        multiple
        accept="image/*"
      />
      <Form form={form}>
        <Form.Item name="images"></Form.Item>
      </Form>
      {/* <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={fileList}
              strategy={verticalListSortingStrategy}
            ></SortableContext>
          </DndContext> */}
      {fileList?.map((file, index) => (
        <div>
          <Button
            icon={<DeleteOutlined onClick={() => deleteFile(index)} />}
          ></Button>
          <img src={file?.imagePath} className="px-24"></img>
        </div>
      ))}
    </div>
  );
}
