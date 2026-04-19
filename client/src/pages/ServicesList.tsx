import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  { id: 'ma', key: 'services.ma' },
  { id: 'financial', key: 'services.financial' },
  { id: 'overseas', key: 'services.overseas' },
  { id: 'hr', key: 'services.hr' },
  { id: 'it', key: 'services.it' },
];

export default function ServicesList() {
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('services.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Comprehensive consulting services designed to drive your business forward
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service) => (
              <motion.a
                key={service.id}
                href={`/services/${service.id}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group p-8 bg-card border border-border rounded-lg hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                    {t(`${service.key}.name`)}
                  </h3>
                  <ArrowRight className="w-6 h-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {t(`${service.key}.description`)}
                </p>
                <div className="text-accent font-semibold">Learn More →</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
