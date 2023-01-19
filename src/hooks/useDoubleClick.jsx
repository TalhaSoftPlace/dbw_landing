import { useEffect } from 'react';
let clickCount = 0;
export const useDoubleClick = ({
  ref,
  latency = 300,
  onSingleClick = () => null,
  onDoubleClick = () => null,
}) => {

  useEffect(() => {
    const clickRef = ref.current;
    const handleClick = e => {
      clickCount += 1;
      setTimeout(() => {
        if (clickCount === 1) onSingleClick(e);
        else if (clickCount > 1) {
          e.stopPropagation();
          e.preventDefault();
          onDoubleClick(e);
        }

        clickCount = 0;
      }, latency);
    };

    // Add event listener for click events
    clickRef?.addEventListener('click', handleClick);
    // Remove event listener
    return () => {
      clickRef?.removeEventListener('click', handleClick);
    };
  }, [latency, onDoubleClick, onSingleClick, ref]);
};
