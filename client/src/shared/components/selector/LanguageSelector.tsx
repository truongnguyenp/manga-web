import { Select, Typography } from 'antd';
import type { SelectProps } from 'antd';
import styled from '@emotion/styled';
import useTypeSafeTranslation from '@/shared/hooks/useTypeSafeTranslation';
import { Languages } from '@/shared/utils/locale';
const StyledSelect = styled(Select<string>)`
  .ant-select {
    &-selector {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      text-transform: uppercase;
      padding: 0 !important;
    }

    &-selection-item {
      color: white;
      font-size: 0.75rem;
      padding: 0 !important;
    }
  }
`;

export default function LanguageSelector({ ...rest }: SelectProps) {
  const { t } = useTypeSafeTranslation();

  const languageType: SelectProps['options'] = [
    {
      label: (
        <div className="flex w-fit gap-x-3 py-1.5">
          <Typography.Text>{t('appInfo.footer')}</Typography.Text>
        </div>
      ),
      value: Languages.VI,
    },
  ];

  return (
    <StyledSelect
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ padding: 0 }}
      getPopupContainer={(triggerNode) => triggerNode}
      optionLabelProp="value"
      options={languageType}
      popupClassName="text-sm"
      size="large"
      suffixIcon={null}
      {...rest}
      bordered={false}
    />
  );
}
