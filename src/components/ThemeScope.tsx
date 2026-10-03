"use client";

import { CSSProperties, ReactNode } from "react";
import { THEMES } from "@/theme/templateThemes";

interface ThemeScopeProps {
  themeId: number;
  children: ReactNode;
  className?: string;
}

export function ThemeScope({ themeId, children, className = "" }: ThemeScopeProps) {
  const theme = THEMES[themeId] || THEMES[1];
  
  const style = {
    "--theme-bg": theme.bg,
    "--theme-bg-solid": theme.bgSolid,
    "--theme-card": theme.card,
    "--theme-text": theme.text,
    "--theme-text-muted": theme.textMuted,
    "--theme-accent": theme.accent,
    "--theme-accent-text": theme.accentText,
    "--theme-border": theme.border,
    "--theme-radius": theme.radius,
    "--theme-shadow": theme.shadow,
    "--theme-font-display": theme.fontDisplay,
    "--theme-font-body": theme.fontBody,
    "--theme-font-mono": theme.fontMono || theme.fontBody,
  } as CSSProperties;

  return (
    <div 
      className={`min-h-[100svh] w-full flex flex-col bg-[var(--theme-bg)] text-[var(--theme-text)] font-body ${className}`}
      style={style}
      data-theme-mode={theme.mode}
      data-theme-texture={theme.texture}
    >
      {children}
    </div>
  );
}
