"use client"

import { useTheme } from "@/lib/theme-context"
import { t } from "@/lib/i18n"
import { categories, materials, type Product } from "@/lib/products"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FilterOptions {
  categories: string[]
  materials: string[]
  priceRange: [number, number]
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
  products: Product[]
}

export function ProductFilters({ onFilterChange, products }: ProductFiltersProps) {
  const { language } = useTheme()
  const [expanded, setExpanded] = useState({ category: true, material: true, price: true })
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    materials: [],
    priceRange: [0, 5000],
  })

  const handleCategoryChange = (categoryId: string) => {
    const updated = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId]

    setFilters({ ...filters, categories: updated })
    onFilterChange({ ...filters, categories: updated })
  }

  const handleMaterialChange = (materialId: string) => {
    const updated = filters.materials.includes(materialId)
      ? filters.materials.filter((id) => id !== materialId)
      : [...filters.materials, materialId]

    setFilters({ ...filters, materials: updated })
    onFilterChange({ ...filters, materials: updated })
  }

  const handlePriceChange = (max: number) => {
    const newRange: [number, number] = [0, max]
    setFilters({ ...filters, priceRange: newRange })
    onFilterChange({ ...filters, priceRange: newRange })
  }

  return (
    <div className="space-y-6">
      {/* Categories Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => setExpanded({ ...expanded, category: !expanded.category })}
          className="flex items-center justify-between w-full text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          {t("filter.category", language)}
          <ChevronDown className={`w-5 h-5 transition-transform ${expanded.category ? "rotate-180" : ""}`} />
        </button>

        {expanded.category && (
          <div className="mt-4 space-y-3">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.id)}
                  onChange={() => handleCategoryChange(cat.id)}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-sm text-foreground/70 hover:text-foreground">{cat.name[language]}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Materials Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => setExpanded({ ...expanded, material: !expanded.material })}
          className="flex items-center justify-between w-full text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          {t("filter.material", language)}
          <ChevronDown className={`w-5 h-5 transition-transform ${expanded.material ? "rotate-180" : ""}`} />
        </button>

        {expanded.material && (
          <div className="mt-4 space-y-3">
            {materials.map((mat) => (
              <label key={mat.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(mat.id)}
                  onChange={() => handleMaterialChange(mat.id)}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-sm text-foreground/70 hover:text-foreground">{mat.name[language]}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => setExpanded({ ...expanded, price: !expanded.price })}
          className="flex items-center justify-between w-full text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          {t("filter.price", language)}
          <ChevronDown className={`w-5 h-5 transition-transform ${expanded.price ? "rotate-180" : ""}`} />
        </button>

        {expanded.price && (
          <div className="mt-4 space-y-4">
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(Number.parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-sm text-foreground/60">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
