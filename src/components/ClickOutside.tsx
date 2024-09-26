import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  exceptionRef?: React.RefObject<HTMLElement>;
}

const ClickOutside: React.FC<Props> = ({
  children,
  exceptionRef,
  onClick,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Handler for mouse clicks outside the component or Escape key
    const clickHandler = (e: MouseEvent) => {
        const targetNode = e.target as Node;
  
        const isClickInsideRef = ref.current && ref.current.contains(targetNode);
        const isClickInsideException = exceptionRef?.current?.contains(targetNode) || exceptionRef?.current === targetNode;
  
        if (!isClickInsideRef && !isClickInsideException) {
          onClick();
        }
      };
  
      // Handler for Escape key press
      const keyHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClick();
        }
      };
  
      // Add event listeners for click and Escape key press
      document.addEventListener("mousedown", clickHandler);
      document.addEventListener("keydown", keyHandler);
  
      // Cleanup the event listeners on unmount
      return () => {
        document.removeEventListener("mousedown", clickHandler);
        document.removeEventListener("keydown", keyHandler);
      };
  }, [exceptionRef, onClick]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ClickOutside
