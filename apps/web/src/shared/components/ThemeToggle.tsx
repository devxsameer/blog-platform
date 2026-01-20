import { getStoredTheme, setTheme, type Theme } from '@/shared/utils/theme';
import { useSyncExternalStore } from 'react';
import { MdDarkMode, MdLightbulb, MdMonitor } from 'react-icons/md';

function subscribe(callback: () => void) {
  window.addEventListener('theme-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('theme-change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot() {
  return getStoredTheme();
}

export function ThemeToggle({ onSelect }: { onSelect?: () => void }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot);

  const Item = (t: Theme, label: string, Icon: any) => (
    <li>
      <button
        type="button"
        onClick={() => {
          setTheme(t);
          onSelect?.();
        }}
        className={`flex items-center gap-2 ${
          theme === t ? 'active font-medium' : ''
        }`}
      >
        <Icon className="text-base" />
        {label}
      </button>
    </li>
  );

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        className="btn btn-ghost btn-sm gap-1 text-base"
        aria-label={`Theme: ${theme}`}
      >
        {theme === 'light' && <MdLightbulb />}
        {theme === 'black' && <MdDarkMode />}
        {theme === 'system' && <MdMonitor />}
      </button>

      <ul className="menu dropdown-content border-base-content/20 rounded-box bg-base-100 mt-2 w-44 border p-2 shadow">
        {Item('light', 'Light', MdLightbulb)}
        {Item('black', 'Dark', MdDarkMode)}
        {Item('system', 'System', MdMonitor)}
      </ul>
    </div>
  );
}
