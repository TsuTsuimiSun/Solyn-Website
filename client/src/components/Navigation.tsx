import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  { id: 'ma', key: 'services.ma.name', path: '/services/ma' },
  { id: 'financial', key: 'services.financial.name', path: '/services/financial' },
  { id: 'overseas', key: 'services.overseas.name', path: '/services/overseas' },
  { id: 'hr', key: 'services.hr.name', path: '/services/hr' },
  { id: 'it', key: 'services.it.name', path: '/services/it' },
];

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showServiceMenu, setShowServiceMenu] = useState(false);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container flex items-center justify-between h-20 md:h-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-shrink-0"
        >
          <a href="/" className="flex items-center">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663439280118/V3m5HTHbwSb5EwauFfmffj/SolynAdvisoryLogo_长方形_8e879086.png"
              alt="Solyn Advisory Logo"
              className="h-16 w-auto object-contain"
              loading="eager"
            />
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-foreground hover:text-accent transition-colors">
            {t('nav.home')}
          </a>

          {/* Services with Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setShowServiceMenu(true)}
            onMouseLeave={() => setShowServiceMenu(false)}
          >
            <button className="text-foreground hover:text-accent transition-colors flex items-center gap-1">
              {t('nav.services')}
              <span className="text-xs">▼</span>
            </button>

            {showServiceMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg py-2"
              >
                {services.map((service) => (
                  <a
                    key={service.id}
                    href={service.path}
                    className="block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {t(service.key)}
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          <a
            href="/news"
            className="text-foreground hover:text-accent transition-colors"
          >
            {t('nav.news')}
          </a>

          <button
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-accent transition-colors"
          >
            {t('nav.about')}
          </button>

          <a
            href="/contact"
            className="text-foreground hover:text-accent transition-colors"
          >
            {t('nav.contact')}
          </a>
        </div>

        {/* Language Selector & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2 border-l border-border pl-4">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select
              value={i18n.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-transparent text-foreground text-sm cursor-pointer outline-none"
            >
              <option value="zh">中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-card"
        >
          <div className="container py-4 flex flex-col gap-3">
            <a href="/" className="text-foreground hover:text-accent">
              {t('nav.home')}
            </a>

            <div className="pl-4 border-l border-border">
              <p className="text-sm text-muted-foreground mb-2">{t('nav.services')}</p>
              {services.map((service) => (
                <a
                  key={service.id}
                  href={service.path}
                  className="block py-1 text-sm text-foreground hover:text-accent"
                >
                  {t(service.key)}
                </a>
              ))}
            </div>

            <a href="/news" className="text-foreground hover:text-accent">
              {t('nav.news')}
            </a>

            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-foreground hover:text-accent"
            >
              {t('nav.about')}
            </button>

            <a
              href="/contact"
              className="text-left text-foreground hover:text-accent"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact')}
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
