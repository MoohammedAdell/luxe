"use client"

import { useTheme } from "@/lib/theme-context"
import { t } from "@/lib/i18n"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const { language } = useTheme()

  return (
    <footer className="bg-secondary/10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {language === "en" ? "Luxe Furniture" : "أثاث لوكس"}
            </h3>
            <p className="text-sm text-foreground/60">
              {language === "en"
                ? "Premium furniture that transforms your living spaces with elegance and comfort."
                : "أثاث فاخر يحول مساحاتك المعيشية بأناقة وراحة."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {language === "en" ? "Quick Links" : "روابط سريعة"}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  {t("nav.home", language)}
                </Link>
              </li>
              <li>
                <Link
                  href="/living-room"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  {t("nav.living-room", language)}
                </Link>
              </li>
              <li>
                <Link href="/bedroom" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  {t("nav.bedroom", language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{language === "en" ? "Legal" : "قانوني"}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  {t("footer.privacy", language)}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  {t("footer.terms", language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{language === "en" ? "Contact" : "اتصل بنا"}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-foreground/60">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/60">
                <Mail className="w-4 h-4" />
                <span>info@luxefurniture.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground/60">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>{language === "en" ? "123 Design Street, NYC" : "123 شارع التصميم، نيويورك"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/60">
          <p>
            {language === "en"
              ? "© 2025 Luxe Furniture. All rights reserved."
              : "© 2025 أثاث لوكس. جميع الحقوق محفوظة."}
          </p>
        </div>
      </div>
    </footer>
  )
}
