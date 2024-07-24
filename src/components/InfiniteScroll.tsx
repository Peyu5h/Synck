import React from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollProps extends React.PropsWithChildren<{}> {
  onBottomReached: () => void;
  className?: string;
}

export default function InfiniteScroll({
  children,
  onBottomReached,
  className,
}: InfiniteScrollProps) {
  const { ref } = useInView({
    rootMargin: "100px",
    onChange: (inView) => {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref}></div>
    </div>
  );
}
