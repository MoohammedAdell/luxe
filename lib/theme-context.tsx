"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type Language, languages } from "./i18n"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  language: Language
  setLanguage: (lang: Language) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [language, setLanguage] = useState<Language>("en")
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Load saved preferences
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system"
    const savedLang = (localStorage.getItem("language") as Language) || "en"

    setTheme(savedTheme)
    setLanguage(savedLang)

    // Apply theme
    applyTheme(savedTheme)

    // Apply language
    document.documentElement.lang = savedLang
    document.documentElement.dir = languages[savedLang].dir
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === "system") {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(isDarkMode)
      isDarkMode ? root.classList.add("dark") : root.classList.remove("dark")
    } else {
      setIsDark(newTheme === "dark")
      newTheme === "dark" ? root.classList.add("dark") : root.classList.remove("dark")
    }
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = languages[newLang].dir
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        language,
        setLanguage: handleSetLanguage,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
