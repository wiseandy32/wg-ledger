"use client";
/* eslint-disable react/prop-types, no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const initialState = {
  theme: "system",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/admin") || pathname?.startsWith("/user");
  const theme = isDashboard ? "dark" : "light";

  // Animation state
  const [transitioning, setTransitioning] = useState(false);
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });
  const [nextTheme, setNextTheme] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }
  }, [theme]);

  const updateTheme = (newTheme) => {
    /*
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newTheme);
    }
    setTheme(newTheme);
    */
  };

  const toggleTheme = async (x, y) => {
    /*
    let effectiveTheme = theme;
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    const nextTheme = effectiveTheme === "light" ? "dark" : "light";

    if (!document.startViewTransition) {
      updateTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        updateTheme(nextTheme);
      });
    });

    try {
      await transition.ready;

      const right = window.innerWidth - x;
      const bottom = window.innerHeight - y;
      const maxRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom));

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch (e) {
      console.error(e);
    }
    */
  };

  const value = {
    theme,
    setTheme: updateTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
