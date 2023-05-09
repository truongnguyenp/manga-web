import { useEffect, useState } from "react";

export default function useScrollDirection() {
  const isBrowser = typeof window !== "undefined";

  // storing this to get the scroll direction
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // the offset of the document.body
  const [bodyOffset, setBodyOffset] = useState(
    isBrowser ? document.body.getBoundingClientRect() : { top: 0, left: 0 }
  );
  // the vertical direction
  const [scrollY, setScrollY] = useState<number>(bodyOffset.top);
  // the horizontal direction
  const [scrollX, setScrollX] = useState<number>(bodyOffset.left);
  // scroll direction would be either up or down
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>();

  const listener = (_e: Event) => {
    isBrowser && setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollX(bodyOffset.left);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
    setLastScrollTop(-bodyOffset.top);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection
  };
}