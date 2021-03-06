import * as React from 'react';

let hidden: string;
let visibilityChange: string;

if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
  // @ts-ignore
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
  // @ts-ignore
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

const useTabVisibility = () => {
  const getVisibility = React.useCallback(() => {
    // @ts-ignore
    return !document[hidden];
  }, []);

  const [visible, setVisible] = React.useState(getVisibility());
  const handleVisibility = React.useCallback(() => setVisible(getVisibility()), [setVisible]);

  React.useEffect(() => {
    document.addEventListener(visibilityChange, handleVisibility, false);

    return () => document.removeEventListener(visibilityChange, handleVisibility);
  }, [handleVisibility]);

  return { visible };
};

export default useTabVisibility;
