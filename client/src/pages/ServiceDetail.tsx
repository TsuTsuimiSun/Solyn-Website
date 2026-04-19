import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRoute } from 'wouter';

const serviceDetails: Record<string, any> = {
  ma: {
    key: 'services.ma',
    tagline: 'Strategic M&A Excellence',
    items: [
      'M&A Strategy Design',
      'Financial Due Diligence',
      'Target Screening & Transaction Process Management',
      'Valuation Analysis & Deal Structuring',
      'Equity Incentives & Management Retention',
      'Post-Merger Integration',
    ],
  },
  financial: {
    key: 'services.financial',
    tagline: 'Financial Excellence & Control',
    items: [
      'Financial Planning & Analysis',
      'Financial Modeling & Valuation',
      'Portfolio Company Reporting',
      'Tax Compliance & Planning',
      'Financial Organization & Internal Controls',
      'Financial Process & System Automation',
    ],
  },
  overseas: {
    key: 'services.overseas',
    tagline: 'Global Expansion Made Simple',
    items: [
      'Market Entry Strategy',
      'Investment Structure & Compliance Planning',
      'Legal & Compliant Entity Establishment',
      'HR & Organizational Structuring',
      'Finance & Tax Integration',
      'Brand Localization & Supply Chain Setup',
    ],
  },
  hr: {
    key: 'services.hr',
    tagline: 'People & Organizational Excellence',
    items: [
      'Strategic Organizational Design',
      'Performance Management',
      'Targeted Recruitment',
      'Talent Development & Succession Planning',
    ],
  },
  it: {
    key: 'services.it',
    tagline: 'Digital Transformation & Automation',
    items: [
      'Data Visualization & Intelligent Analytics',
      'Data Governance & Integration Architecture',
      'Financial Automation Solutions',
      'AI-Powered Data Management Tools',
    ],
  },
};

export default function ServiceDetail() {
  const { t } = useTranslation();
  const [match, params] = useRoute('/services/:serviceId');

  if (!match || !params?.serviceId) {
    return <div>Service not found</div>;
  }

  const serviceId = params.serviceId as string;
  const service = serviceDetails[serviceId];

  if (!service) {
    return <div>Service not found</div>;
  }

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
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t(`${service.key}.name`)}
            </h1>
            <p className="text-xl text-accent font-semibold">{service.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Service Overview</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {t(`${service.key}.description`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12">
              Core Services
            </motion.h2>

            <div className="space-y-4">
              {service.items.map((item: string, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                >
                  <p className="text-lg font-medium text-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12">
              Case Studies
            </motion.h2>

            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-6 bg-background border border-border rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-3">Case Study {i}</h3>
                  <p className="text-foreground/80 mb-4">
                    Detailed case study showcasing our expertise and results in this service area.
                  </p>
                  <div className="text-accent font-medium">Read More →</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
