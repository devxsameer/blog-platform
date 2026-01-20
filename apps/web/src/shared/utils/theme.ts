const THEME_KEY = 'theme';

export type Theme = 'light' | 'black' | 'system';

export function getStoredTheme(): Theme {
  return (localStorage.getItem(THEME_KEY) as Theme) || 'system';
}

export function applyTheme(theme: Theme) {
  if (theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export function setTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
  window.dispatchEvent(new Event('theme-change'));
}
