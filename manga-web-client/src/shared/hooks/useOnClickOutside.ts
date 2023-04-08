import { MutableRefObject, useEffect } from 'react';

interface UseClickOutsideProps<E extends HTMLElement> {
  ref: MutableRefObject<E>;
  onClickOutside?: () => void;
}

export function useOnClickOutside<E extends HTMLElement>({
  ref,
  onClickOutside,
}: UseClickOutsideProps<E>) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside, ref]);
}
