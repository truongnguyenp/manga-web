import LoadingScreen from '@/components/common/LoadingScreen';

interface SectionLayoutProps {
  loading?: boolean;
}

export default function SectionLayout({ loading = true }: SectionLayoutProps) {
  if (loading) return <LoadingScreen />;

  return <></>;
}
