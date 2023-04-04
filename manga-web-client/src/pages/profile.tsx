import withGuardRoute from '@/shared/hocs/withGuardRoute';

function Profile() {
  return (
    <>
      <div className="flex">
        <div className="w-1/3"></div>
        <div className="w-2/3"></div>
      </div>
    </>
  );
}

export default withGuardRoute(Profile);
