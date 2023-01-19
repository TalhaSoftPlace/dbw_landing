import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const home = { text: 'Home', link: '/admin' };

export const useBreadcrumbItems = () => {
  const location = useLocation();
  const items = useMemo(() => {
    const path = location.pathname.replace('/admin', '');
    const pathArray = path.length
      ? path.split('/').filter((path) => !!path)
      : [];

    return [
      home,
      ...pathArray.map((part, i) => {
        const text = part.toUpperCase().replace('-', ' ');
        const link = pathArray.slice(0, i + 1).join('/');
        return { text, link };
      }),
    ];
  }, [location.pathname]);

  return items;
};
