"use client"

import type React from "react"

import { ThemeProvider } from "@/lib/theme-context"
import { CartProvider } from "@/lib/cart-context"

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  )
}
