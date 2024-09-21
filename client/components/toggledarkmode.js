import darkmode from './darkmode';

export default function ThemeToggle() {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <button
      onClick={() => setTheme(colorTheme)}
      className="p-2 rounded-full focus:outline-none"
    >
      {colorTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}
