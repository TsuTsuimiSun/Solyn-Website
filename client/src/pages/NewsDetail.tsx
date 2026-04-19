import { motion } from 'framer-motion';
import { useRoute, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlockRenderer from '@/components/BlockRenderer';

export default function NewsDetail() {
  const [match, params] = useRoute('/news/:slug');
  const [, navigate] = useLocation();

  const slug = params?.slug ?? '';

  const { data: article, isLoading, isError } = trpc.articles.bySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Fetch a few other articles for the "Related Articles" section
  const { data: relatedData } = trpc.articles.list.useQuery({ limit: 4, offset: 0 });
  const relatedArticles = (relatedData ?? []).filter((a) => a.slug !== slug).slice(0, 3);

  if (!match) {
    return <div className="min-h-screen flex items-center justify-center">Article not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-16 md:py-24 bg-card border-b border-border">
          <div className="container max-w-3xl animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/3" />
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-muted rounded w-full" />
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Article not found.</p>
        <Button variant="outline" onClick={() => navigate('/news')}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to News
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => navigate('/news')}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to News
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{article.author}</span>
              <span>•</span>
              <span>
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : ''}
              </span>
              {article.category && (
                <>
                  <span>•</span>
                  <span className="text-accent">{article.category}</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {(article as any).coverImage && (
        <div className="w-full max-h-[480px] overflow-hidden">
          <img
            src={(article as any).coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BlockRenderer content={article.content} />
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-card border-t border-border">
          <div className="container max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="space-y-4">
                {relatedArticles.map((related) => (
                  <a
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="block p-4 bg-background border border-border rounded-lg hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-foreground hover:text-accent transition-colors">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {related.excerpt}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
