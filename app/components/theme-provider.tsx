'use client';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NextThemeProvider enableSystem={true}>{children}</NextThemeProvider>;
}
export default ThemeProvider;
