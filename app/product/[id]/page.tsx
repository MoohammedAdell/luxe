"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTheme } from "@/lib/theme-context"
import { t } from "@/lib/i18n"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"
import { useState, useMemo } from "react"
import { Star, ShoppingCart, Heart, Share2, Check } from "lucide-react"
import { useParams } from "next/navigation"
import { useCart } from "@/lib/cart-context"

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string

  const { language } = useTheme()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const product = useMemo(() => products.find((p) => p.id === id), [id])

  const relatedProducts = useMemo(
    () => products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 3),
    [product],
  )

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl text-foreground/60">{language === "en" ? "Product not found" : "المنتج غير موجود"}</p>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-foreground/60">
          <nav className="flex items-center gap-2">
            <a href="/products" className="hover:text-primary transition-colors">
              {language === "en" ? "Products" : "المنتجات"}
            </a>
            <span>/</span>
            <span>{product.name[language]}</span>
          </nav>
        </div>

        {/* Product Detail Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-full min-h-[500px] bg-secondary/20 rounded-lg overflow-hidden group">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name[language]}
                  fill
                  className="object-cover"
                  priority
                />
                {product.originalPrice && (
                  <div className="absolute top-6 right-6 bg-accent text-accent-foreground px-4 py-2 rounded-full font-semibold text-sm">
                    {discountPercentage}% {language === "en" ? "OFF" : "تخفيض"}
                  </div>
                )}
              </div>

              {/* Image Navigation (Multiple images preview) */}
              <div className="mt-6 flex gap-4 overflow-x-auto">
                {[product.image, product.image, product.image].map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${idx === 0 ? "border-primary" : "border-border hover:border-primary"}`}
                  >
                    <Image src={img || "/placeholder.svg"} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-start">
              {/* Title and Rating */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-light text-foreground mb-4">{product.name[language]}</h1>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-foreground/60">
                          {product.rating} ({product.reviews} {language === "en" ? "reviews" : "تقييم"})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Wishlist and Share */}
                  <div className="flex gap-3">
                    <button className="p-3 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
                      <Heart className="w-5 h-5 text-foreground" />
                    </button>
                    <button className="p-3 border border-border rounded-lg hover:bg-secondary/30 transition-colors">
                      <Share2 className="w-5 h-5 text-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-foreground/70 text-lg leading-relaxed mb-8">{product.description[language]}</p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-sm text-foreground/60 mb-2">{t("product.material", language)}</p>
                  <p className="text-foreground font-semibold capitalize">{product.material}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-2">{language === "en" ? "Color" : "اللون"}</p>
                  <p className="text-foreground font-semibold">{product.color}</p>
                </div>
                {product.dimensions && (
                  <div className="col-span-2">
                    <p className="text-sm text-foreground/60 mb-2">{t("product.dimensions", language)}</p>
                    <p className="text-foreground font-semibold">{product.dimensions[language]}</p>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-semibold text-foreground">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-foreground/50 line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <p className="text-sm text-accent font-semibold">
                  {product.inStock
                    ? language === "en"
                      ? "In Stock - Ships within 3-5 business days"
                      : "متوفر - يتم الشحن خلال 3-5 أيام عمل"
                    : language === "en"
                      ? "Out of Stock"
                      : "غير متوفر"}
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-secondary/20 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 min-w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-secondary/20 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    isAdded
                      ? "bg-green-500 text-white"
                      : "bg-primary text-primary-foreground hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      {language === "en" ? "Added to Cart" : "تمت الإضافة"}
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      {t("product.add-to-cart", language)}
                    </>
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">
                    {language === "en" ? "Free shipping on orders over $500" : "شحن مجاني للطلبات فوق 500 دولار"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">
                    {language === "en" ? "30-day money-back guarantee" : "ضمان استرجاع الأموال لمدة 30 يومًا"}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">
                    {language === "en" ? "Lifetime customer support" : "دعم العملاء مدى الحياة"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="border-t border-border pt-16">
              <h2 className="text-3xl font-light text-foreground mb-8">
                {language === "en" ? "Related Products" : "منتجات ذات صلة"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
