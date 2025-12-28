"use client"

import type React from "react"

import { useTheme } from "@/lib/theme-context"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Check } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useTheme()
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addItem(product, 1)
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group cursor-pointer">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg bg-secondary/20 mb-4 h-64">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name[language]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.originalPrice && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {language === "en" ? "Sale" : "تخفيض"}
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">{language === "en" ? "Out of Stock" : "غير متوفر"}</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name[language]}
        </h3>

        <p className="text-sm text-foreground/60 mb-3 line-clamp-2">{product.description[language]}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-xs text-foreground/60">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-semibold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-foreground/50 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
            isAdding
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          }`}
          disabled={!product.inStock}
        >
          {isAdding ? (
            <>
              <Check className="w-4 h-4" />
              {language === "en" ? "Added" : "تمت الإضافة"}
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              {language === "en" ? "Add to Cart" : "أضف إلى السلة"}
            </>
          )}
        </button>
      </div>
    </Link>
  )
}
