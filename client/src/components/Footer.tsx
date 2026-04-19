import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer id="contact" className="bg-foreground text-background py-16 md:py-20">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-start"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="mb-6 inline-block" style={{
              filter: 'brightness(0) invert(1)'
            }}>
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663439280118/V3m5HTHbwSb5EwauFfmffj/SolynAdvisoryLogo_长方形_8e879086.png"
                alt="Solyn Advisory Logo"
                className="h-20 w-auto object-contain"
                loading="eager"
              />
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              {t('about.content')}
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">{t('contact.title')}</h4>
            <div className="space-y-3">
              <a
                href={`tel:${t('contact.phone')}`}
                className="flex items-center gap-3 text-background/80 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{t('contact.phone')}</span>
              </a>
              <a
                href={`mailto:${t('contact.email')}`}
                className="flex items-center gap-3 text-background/80 hover:text-background transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{t('contact.email')}</span>
              </a>

            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a
                href="/privacy"
                className="block text-background/80 hover:text-background transition-colors text-sm"
              >
                {t('footer.privacy')}
              </a>
              <a
                href="/accessibility"
                className="block text-background/80 hover:text-background transition-colors text-sm"
              >
                {t('footer.accessibility')}
              </a>
              <a
                href="/terms"
                className="block text-background/80 hover:text-background transition-colors text-sm"
              >
                {t('footer.terms')}
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <p className="text-center text-background/60 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="mt-4 text-center">
            <a
              href="/admin"
              className="text-background/30 hover:text-background/60 transition-colors text-xs"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
