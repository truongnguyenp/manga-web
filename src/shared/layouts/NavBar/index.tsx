import { sections } from '@/shared/utils/constants';
import NavBarItem from './Item';

export default function NavBar() {
  return (
    <div className="z-10 border-t border-primary bg-white shadow-sm">
      <div className="mx-auto flex max-w-container items-center justify-between lg:w-full">
        <div className="z-10 flex items-center md:shadow-nav lg:w-full">
          {sections.map((section) => (
            <NavBarItem key={section.title} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
