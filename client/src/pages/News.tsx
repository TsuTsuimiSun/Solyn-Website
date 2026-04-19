import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { trpc } from '@/lib/trpc';

export default function News() {
  const { t } = useTranslation();

  // Fetch all published articles from database
  const { data: articlesData, isLoading } = trpc.articles.list.useQuery({ limit: 50, offset: 0 });
  const newsArticles = articlesData ?? [];

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
      {/* Header */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('news.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Stay updated with our latest insights and industry news
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted rounded w-1/4" />
                      <div className="h-3 bg-muted rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : newsArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-muted-foreground text-lg">
                {t('news.empty') || 'No articles published yet. Check back soon.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {newsArticles.map((article) => (
                <motion.a
                  key={article.id}
                  href={`/news/${article.slug}`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                    {/* Cover image or gradient fallback */}
                    {(article as any).coverImage ? (
                      <div className="h-48 overflow-hidden shrink-0">
                        <img
                          src={(article as any).coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center shrink-0">
                        <span className="text-5xl text-accent/30 font-bold select-none">
                          {article.category?.charAt(0).toUpperCase() || 'N'}
                        </span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      {article.category && (
                        <span className="inline-block text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded mb-2 self-start">
                          {article.category}
                        </span>
                      )}
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <span>{article.author}</span>
                        <span>
                          {article.publishedAt
                            ? new Date(article.publishedAt).toLocaleDateString()
                            : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
