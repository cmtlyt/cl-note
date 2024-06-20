import { debounce } from '@cmtlyt/base';
import { useEffect, useRef } from 'react';

interface BottomingOutProps {
  onTrigger: () => void;
  distance?: number;
}

function isElementInViewport(el: HTMLElement, distance = 0) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  return (
    top >= 0 &&
    left >= 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight) + distance &&
    right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export default function BottomingOut(props: BottomingOutProps) {
  const { distance = 0, onTrigger } = props;

  const $flagDomRef = useRef<HTMLDivElement>(null);
  // 处理降级方案在临界值反复触发的问题
  const triggerFlag = useRef<boolean>(false);

  useEffect(() => {
    const $flagDom = $flagDomRef.current!;

    if (window.IntersectionObserver) {
      const handleIntersection: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onTrigger();
        });
      };

      const observer = new window.IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: `0px 0px ${distance}px 0px`,
        threshold: 0,
      });

      observer.observe($flagDom);

      return () => {
        observer.disconnect();
      };
    }

    const checkVisibility = debounce(() => {
      const inViewport = isElementInViewport($flagDom, distance);
      if (!triggerFlag.current && inViewport) {
        triggerFlag.current = true;
        onTrigger();
        return;
      }
      triggerFlag.current = inViewport;
    }, 40);

    window.addEventListener('scroll', checkVisibility);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [onTrigger, distance]);

  return <div ref={$flagDomRef} />;
}
