import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

const heroImages = [
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663439280118/V3m5HTHbwSb5EwauFfmffj/IvCkZlYQYEhz_c8cf57f4.jpg',
];

const services = [
  { id: 'ma', key: 'services.ma' },
  { id: 'financial', key: 'services.financial' },
  { id: 'overseas', key: 'services.overseas' },
  { id: 'hr', key: 'services.hr' },
  { id: 'it', key: 'services.it' },
];




export default function Home() {
  const { t } = useTranslation();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentClientIndex, setCurrentClientIndex] = useState(0);

  // Fetch client logos from database
  const { data: clientLogosData } = trpc.clientLogos.list.useQuery();
  const clientLogos = clientLogosData?.filter(l => l.status === 'active') ?? [];

  // Fetch published articles from database (latest 3 for homepage)
  const { data: articlesData } = trpc.articles.list.useQuery({ limit: 3, offset: 0 });
  const newsArticles = articlesData ?? [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (clientLogos.length === 0) return;
    const timer = setInterval(() => {
      setCurrentClientIndex((prev) => {
        const next = prev + 1;
        // When we've scrolled through all originals, reset to 0 instantly (no animation)
        if (next >= clientLogos.length) return 0;
        return next;
      });
    }, 10000);
    return () => clearInterval(timer);
  }, [clientLogos.length]);

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <motion.div
          key={currentHeroIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentHeroIndex]}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="container text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('hero.title')}</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 text-white/90">{t('hero.subtitle')}</p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {t('hero.cta')}
            </Button>
          </motion.div>
        </div>

        {/* Hero Controls */}
        <button
          onClick={prevHero}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextHero}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentHeroIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {t('services.title')}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {services.map((service) => (
                <motion.a
                  key={service.id}
                  href={`/services/${service.id}`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-all cursor-pointer"
                >
                  <h3 className="font-semibold text-lg mb-3">{t(`${service.key}.name`)}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {t(`${service.key}.description`)}
                  </p>
                  <div className="mt-4 text-accent font-medium text-sm">Learn More →</div>
                </motion.a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="/services" className="inline-block">
                <Button variant="outline">{t('nav.services')}</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {t('news.title')}
            </motion.h2>

            {newsArticles.length === 0 ? (
              <motion.p variants={itemVariants} className="text-center text-muted-foreground py-12">
                {t('news.empty') || 'No articles published yet.'}
              </motion.p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {newsArticles.map((article) => (
                  <motion.a
                    key={article.id}
                    href={`/news/${article.slug}`}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                      {/* Cover image or gradient fallback */}
                      {(article as any).coverImage ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={(article as any).coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                          <span className="text-4xl text-accent/30 font-bold select-none">
                            {article.category?.charAt(0).toUpperCase() || 'N'}
                          </span>
                        </div>
                      )}
                      <div className="p-6">
                        {article.category && (
                          <span className="inline-block text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded mb-2">
                            {article.category}
                          </span>
                        )}
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{article.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <a href="/news" className="inline-block">
                <Button variant="outline">{t('news.readMore')}</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-card">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-center">
              {t('about.title')}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-foreground/80 leading-relaxed">
              {t('about.content')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
              {t('partners.title')}
            </motion.h2>

            {/* Square Logo Sliding Carousel — max 5 visible, slides left every 10s */}
            {clientLogos.length === 0 ? null : (
              <div className="relative">
                {/* Viewport: shows exactly 5 items */}
                <div className="overflow-hidden">
                  <motion.div
                    className="flex gap-6"
                    animate={{ x: `-${currentClientIndex * (160 + 24)}px` }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                  >
                    {/* Duplicate logos for seamless loop */}
                    {[...clientLogos, ...clientLogos].map((logo, index) => (
                      <div
                        key={`${logo.id}-${index}`}
                        className="flex-shrink-0 w-40 h-40 bg-white border border-border rounded-lg flex items-center justify-center p-4 shadow-sm hover:shadow-md hover:border-accent/40 transition-all"
                      >
                        <img
                          src={logo.logoUrl}
                          alt={logo.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Dot indicators */}
                {clientLogos.length > 5 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: clientLogos.length }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentClientIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentClientIndex ? 'bg-accent w-8' : 'bg-accent/30 w-2'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
