"use client"

import { useTheme } from "@/lib/theme-context"
import { t, type Language, languages } from "@/lib/i18n"
import Link from "next/link"
import { useState } from "react"
import { Moon, Sun, ShoppingCart, Menu, X, Search } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const { theme, setTheme, language, setLanguage, isDark } = useTheme()
  const { itemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isRTL = languages[language].dir === "rtl"

  const toggleTheme = () => {
    setTheme(theme === "dark" || (theme === "system" && isDark) ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-semibold tracking-tight text-foreground">
            {language === "en" ? "Luxe" : "لوكس"}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              {t("nav.home", language)}
            </Link>
            <Link href="/living-room" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              {t("nav.living-room", language)}
            </Link>
            <Link href="/bedroom" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              {t("nav.bedroom", language)}
            </Link>
            <Link href="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              {t("nav.about", language)}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search - Desktop only */}
            <div className="hidden lg:flex items-center bg-secondary/30 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("header.search", language)}
                className="bg-transparent border-0 outline-none text-sm w-48 px-2 placeholder:text-muted-foreground"
              />
            </div>

            {/* Language Switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="text-xs bg-secondary/30 border border-border rounded px-2 py-2 cursor-pointer hover:bg-secondary/50 transition-colors"
            >
              {Object.entries(languages).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.name}
                </option>
              ))}
            </select>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-secondary/50 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-4 pt-4">
              <Link
                href="/"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home", language)}
              </Link>
              <Link
                href="/living-room"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.living-room", language)}
              </Link>
              <Link
                href="/bedroom"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.bedroom", language)}
              </Link>
              <Link
                href="/about"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about", language)}
              </Link>
              {/* Mobile Search */}
              <div className="flex items-center bg-secondary/30 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("header.search", language)}
                  className="bg-transparent border-0 outline-none text-sm w-full px-2 placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
