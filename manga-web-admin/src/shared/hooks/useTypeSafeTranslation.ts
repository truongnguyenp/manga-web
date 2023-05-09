import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '@/generated/translationKeys';
import { Dictionary } from '@/configs/configTools/types';
import { TOptionsBase } from 'i18next';

const useTypeSafeTranslation = () => {
  const { t } = useTranslation();

  return {
    t: (s: TranslationKeys, f?: Dictionary<string>) => t(s, f as TOptionsBase)
  };
};

export default useTypeSafeTranslation;
