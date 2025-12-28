"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTheme } from "@/lib/theme-context"
import { useCart } from "@/lib/cart-context"
import { t } from "@/lib/i18n"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { language } = useTheme()
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl font-light text-foreground mb-2">
              {language === "en" ? "Shopping Cart" : "سلة التسوق"}
            </h1>
            <p className="text-foreground/60">
              {language === "en"
                ? `${itemCount} ${itemCount === 1 ? "item" : "items"} in your cart`
                : `${itemCount} ${itemCount === 1 ? "عنصر" : "عناصر"} في سلتك`}
            </p>
          </div>

          {itemCount > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-6 bg-card p-6 rounded-lg border border-border">
                      {/* Product Image */}
                      <Link href={`/product/${item.productId}`} className="flex-shrink-0">
                        <div className="relative w-24 h-24 bg-secondary/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name[language]}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          href={`/product/${item.productId}`}
                          className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2 block"
                        >
                          {item.product.name[language]}
                        </Link>
                        <p className="text-sm text-foreground/60 mb-4">{item.product.description[language]}</p>

                        {/* Quantity Controls and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                              className="px-3 py-2 hover:bg-secondary/20 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 min-w-12 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-3 py-2 hover:bg-secondary/20 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-foreground">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-foreground/60">
                              ${item.product.price.toFixed(2)} {language === "en" ? "each" : "لكل"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="flex-shrink-0 p-2 hover:bg-destructive/10 rounded-lg transition-colors group"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5 text-foreground/60 group-hover:text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/products"
                  className="mt-8 inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  {language === "en" ? "Continue Shopping" : "متابعة التسوق"}
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 bg-secondary/5 p-6 rounded-lg border border-border">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    {language === "en" ? "Order Summary" : "ملخص الطلب"}
                  </h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between text-foreground/70">
                      <span>{language === "en" ? "Subtotal" : "المجموع الفرعي"}</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground/70">
                      <span>{language === "en" ? "Shipping" : "الشحن"}</span>
                      <span className="text-green-600 font-semibold">{language === "en" ? "FREE" : "مجاني"}</span>
                    </div>
                    <div className="flex justify-between text-foreground/70">
                      <span>{language === "en" ? "Tax" : "الضريبة"}</span>
                      <span>${(total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-semibold text-foreground mb-6">
                    <span>{language === "en" ? "Total" : "الإجمالي"}</span>
                    <span>${(total * 1.1).toFixed(2)}</span>
                  </div>

                  <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow mb-4">
                    {language === "en" ? "Proceed to Checkout" : "متابعة الدفع"}
                  </button>

                  <button
                    onClick={() => clearCart()}
                    className="w-full border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/30 transition-colors"
                  >
                    {language === "en" ? "Clear Cart" : "مسح السلة"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <p className="text-xl text-foreground/60 mb-6">
                {language === "en" ? "Your cart is empty" : "سلتك فارغة"}
              </p>
              <Link
                href="/products"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                {t("home.cta", language)}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
