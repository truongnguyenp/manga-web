import { Spin } from 'antd';

export default function LoadingScreen() {
  return (
    <div className="mx-auto flex h-full max-w-container items-center justify-center gap-x-6 overflow-hidden rounded-2xl bg-white p-6 md:flex-col md:rounded-none">
      <Spin size="large" />
    </div>
  );
}
