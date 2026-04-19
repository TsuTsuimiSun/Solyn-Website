import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const maServiceData = {
  en: {
    title: 'M&A Service',
    subtitle: '并购服务',
    tagline: 'Strategic M&A Excellence',
    description: 'We guide businesses through the full M&A lifecycle—from strategy development and transaction execution to post-merger integration—with specialized expertise in mid-market growth, majority acquisitions, and strategic investments.',
    descriptionCN: '我们为企业提供从并购战略制定、交易执行到并购后整合的全流程服务，特别聚焦在中型企业成长、控股收购和战略投资方向。',
    services: [
      {
        number: '01',
        titleEn: 'M&A Strategy Design',
        titleCN: '并购战略制定',
        descriptionEn: 'We work with clients to define clear acquisition objectives, develop actionable roadmaps, and identify value creation opportunities—building a solid M&A blueprint aligned with their growth ambitions.',
        descriptionCN: '帮助客户明确并购目标、路径与投资逻辑，识别价值机会，构建可执行的并购蓝图。',
      },
      {
        number: '02',
        titleEn: 'Financial Due Diligence (FDD)',
        titleCN: '财务尽职调查',
        descriptionEn: 'Our in-depth FDD assesses target companies across profitability, working capital, net debt, capex, and cash flow. The findings empower informed investment decisions, support valuation negotiations, and strengthen risk management.',
        descriptionCN: '针对拟收购或投资的目标公司，从盈利质量、营运资本、净债务、资本支出与现金流等维度，进行深入剖析。报告支持投资决策、估值谈判与风险控制。',
      },
      {
        number: '03',
        titleEn: 'Target Screening & Transaction Process Management',
        titleCN: '目标筛选与交易流程管理',
        descriptionEn: 'We help identify and evaluate potential targets, initiate outreach, and manage end-to-end transaction workflows—including NDAs, LOIs, negotiation support, and timeline coordination.',
        descriptionCN: '协助客户识别潜在标的、进行初步评估、发起接触并搭建交易流程，包括NDA、LOI、谈判安排与进度控制。',
      },
      {
        number: '04',
        titleEn: 'Valuation Analysis & Deal Structuring',
        titleCN: '估值分析与交易结构设计',
        descriptionEn: 'Our in-depth FDD assesses target companies across profitability, working capital, net debt, capex, and cash flow. The findings empower informed investment decisions, support valuation negotiations, and strengthen risk management.',
        descriptionCN: '针对拟收购或投资的目标公司，从盈利质量、营运资本、净债务、资本支出与现金流等维度，进行深入剖析。报告支持投资决策、估值谈判与风险控制。',
      },
      {
        number: '05',
        titleEn: 'Equity Incentives & Management Retention',
        titleCN: '股权激励与管理层绑定机制',
        descriptionEn: 'We design tailored equity-based incentive plans (e.g., ESOP, phantom shares, performance options) to align key management with long-term success and secure stability throughout integration.',
        descriptionCN: '为并购中的核心管理层设计中长期激励计划（如 ESOP、虚拟股权、绩效期权），保障收购后的稳定性与协同推进。',
      },
      {
        number: '06',
        titleEn: 'Post-Merger Integration (PMI)',
        titleCN: '并购后整合',
        descriptionEn: 'We support the seamless integration of organizations, people, processes, culture, and systems—ensuring synergy realization and sustainable value capture after the deal closes.',
        descriptionCN: '协助客户完成并购后的组织、人力、流程、文化与系统整合，确保战略协同的真正落地与整合价值兑现。',
      },
    ],
  },
};

export default function MAServiceDetail() {
  const { i18n } = useTranslation();
  const data = maServiceData.en;
  const isZH = i18n.language === 'zh';

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
      {/* Hero Section with Dark Green Background */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-[#2d5a4a] to-[#1f3f34] text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop)',
        }} />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {data.title}
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-6 text-white/90">
              {data.subtitle}
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-white/85 mb-4">
              {isZH ? data.descriptionCN : data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Services - Side by Side Layout */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {data.services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`mb-20 md:mb-24 grid md:grid-cols-2 gap-8 md:gap-12 items-start ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Service Number and Title */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="text-5xl md:text-6xl font-bold text-accent/30 flex-shrink-0">
                      {service.number}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                        {isZH ? service.titleCN : service.titleEn}
                      </h3>
                      <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                        {isZH ? service.descriptionCN : service.descriptionEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-64 md:h-80 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg overflow-hidden"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${
                        index === 0 ? '1552664730-d307ca884978' :
                        index === 1 ? '1454165804606-c3d57bc86b40' :
                        index === 2 ? '1552664730-d307ca884978' :
                        index === 3 ? '1454165804606-c3d57bc86b40' :
                        index === 4 ? '1552664730-d307ca884978' :
                        '1454165804606-c3d57bc86b40'
                      }?w=600&h=400&fit=crop`}
                      alt={isZH ? service.titleCN : service.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-border relative overflow-hidden">
        {/* Animated tech background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your M&A Strategy?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Let our experts guide you through every step of your M&A journey.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
