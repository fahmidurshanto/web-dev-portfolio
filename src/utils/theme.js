export const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || 'light-mode';
  const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode';
  localStorage.setItem('theme', newTheme);
  document.body.className = newTheme;
};
