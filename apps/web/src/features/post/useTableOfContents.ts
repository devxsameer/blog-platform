import { useCallback, useRef, useState } from 'react';
import type { TocItem } from './types';

export function useTableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const seen = useRef(new Set<string>());

  const register = useCallback((item: TocItem) => {
    if (seen.current.has(item.id)) return;

    seen.current.add(item.id);
    setToc((prev) => [...prev, item]);
  }, []);

  const reset = useCallback(() => {
    seen.current.clear();
    setToc([]);
  }, []);

  return { toc, register, reset };
}
