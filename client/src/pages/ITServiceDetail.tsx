import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const itServiceData = {
  en: {
    title: 'IT & Automation Service',
    tagline: 'Empower Your Digital Transformation',
    taglineCN: '企业IT及信息自动化服务助力您的数字化转型',
    
    intro: 'In today\'s rapidly evolving digital landscape, embracing change is the key to securing a competitive future. We are committed to being your most reliable partner in this journey, providing cutting-edge technological solutions to help you build an intelligent, future-ready enterprise.',
    
    introCN: '在当今飞速发展的数字时代，企业唯有顺势而为，方能致胜未来。我们致力于成为您最可靠的转型伙伴，通过前沿的技术解决方案，助您构建智慧型企业。',
    
    highlights: [
      {
        titleEn: 'Drive Digital Transformation',
        titleCN: '深化信息化升级',
        descEn: 'We break down information silos and integrate your core resources to build a unified, efficient, and secure digital operations platform. This lays a solid foundation for sophisticated management and business innovation.',
        descCN: '打破信息孤岛，整合企业核心资源，构建统一、高效、安全的数字化运营平台，为精细化管理和业务创新奠定坚实基础。',
      },
      {
        titleEn: 'Advance Process Automation',
        titleCN: '推动流程自动化',
        descEn: 'By automating repetitive and tedious tasks, we significantly reduce human error and free your team\'s creativity. This allows your valuable human resources to focus on higher-value strategic initiatives.',
        descCN: '将重复、繁琐的事务交由智能系统处理，显著减少人为错误，释放团队创造力，让人力资源聚焦于更高价值的战略决策。',
      },
      {
        titleEn: 'Enable Data-Driven Management',
        titleCN: '实现数据驱动管理',
        descEn: 'We help you unlock the full potential of your data, transforming vast amounts of information into clear business insights. This empowers decision-makers to optimize resource allocation, identify new opportunities, and drive sustained business growth.',
        descCN: '深度挖掘数据价值，将海量信息转化为清晰的业务洞察。赋能管理者精准决策，优化资源配置，捕捉潜在商机，驱动业绩持续增长。',
      },
    ],
    
    services: [
      {
        number: '1',
        titleEn: 'Data Visualization & Intelligent Analytics Platforms',
        titleCN: '数据可视化与智能分析平台建设',
        descEn: 'We develop tailor-made data visualization dashboards and BI reporting systems based on a profound understanding of your business operations. By clearly presenting key metrics and business dynamics across core management areas like finance, HR, and operations, we enable full management transparency and significantly enhance the speed and efficacy of strategic decision-making.',
        descCN: '我们基于对企业经营逻辑的深入理解，量身打造数据可视化看板与BI报表系统，涵盖财务、人力、运营等核心管理场景。通过直观呈现关键指标与业务动态，帮助企业实现管理透明化，显著提升决策响应速度与战略执行力。',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      },
      {
        number: '2',
        titleEn: 'Data Governance & Integration Architecture Design',
        titleCN: '数据治理与集成架构设计',
        descEn: 'We assist enterprises in systematically managing their data assets by breaking down system silos. Our experts design unified, secure, and scalable data integration architectures. This foundation ensures data integrity and consistency, laying the essential groundwork for advanced analytics and artificial intelligence initiatives.',
        descCN: '我们协助企业系统化梳理数据资产，打破系统壁垒与数据孤岛，构建统一、安全、可扩展的数据集成架构。在保障数据完整性与一致性的基础上，为企业推进数据分析、人工智能等深度应用筑牢数据基石。',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      },
      {
        number: '3',
        titleEn: 'Financial Automation Solutions for SMBs',
        titleCN: '中小企业财务自动化解决方案',
        descEn: 'For small and medium-sized businesses yet to implement an ERP, we deliver lightweight financial automation systems. Our solutions cover critical functions such as bookkeeping, budget management, cash flow monitoring, and investment reconciliation. Featuring a modular design and AI-enhanced capabilities, we help establish a standardized, scalable financial management framework, creating a robust data foundation for future growth.',
        descCN: '针对尚未部署ERP的中小企业，我们提供轻量级财务自动化系统实施服务，涵盖账务处理、预算管理、现金流监控及投融资对账等关键环节。通过模块化设计与AI增强功能，帮助企业快速建立规范、可扩展的财务管理体系，为未来规模化发展奠定扎实的数据基础。',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      },
      {
        number: '4',
        titleEn: 'AI-Powered Data Management Tools Introduction & Customization',
        titleCN: '企业级AI数据管理工具引入与定制',
        descEn: 'We introduce and customize AI-driven data management tools tailored to your specific business contexts. These tools empower key functions including data cleansing, knowledge discovery, and predictive analysis, enabling your organization to extract actionable insights and achieve intelligent management and operational optimization.',
        descCN: '我们结合行业实践与企业具体场景，为企业引入或定制开发AI驱动的数据管理工具，覆盖数据清洗、知识发现、预测分析等核心职能，赋能企业从数据中挖掘业务洞见，实现管理智能化与运营优化。',
        imageUrl: 'https://images.unsplash.com/photo-1677442d019cecf8971d1316e47e4ab1cf3a36541?w=600&h=400&fit=crop',
      },
    ],
  },
};

export default function ITServiceDetail() {
  const { i18n } = useTranslation();
  const data = itServiceData.en;
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
      {/* Hero Section with Split Layout */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Green Box */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-accent to-accent/80 text-white p-8 md:p-12 rounded-lg"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {isZH ? data.taglineCN : data.tagline}
              </h2>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {data.title}
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                {isZH ? data.introCN : data.intro}
              </p>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop"
                alt="Digital Transformation"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {data.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg md:text-xl font-bold mb-4 text-accent">
                  {isZH ? highlight.titleCN : highlight.titleEn}
                </h3>
                <p className="text-base leading-relaxed text-foreground/80">
                  {isZH ? highlight.descCN : highlight.descEn}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20 md:space-y-32"
          >
            {data.services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`h-64 md:h-80 rounded-lg overflow-hidden ${
                    index % 2 === 1 ? 'md:order-2' : ''
                  }`}
                >
                  <img
                    src={service.imageUrl}
                    alt={isZH ? service.titleCN : service.titleEn}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-accent/30 flex-shrink-0">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        {isZH ? service.titleCN : service.titleEn}
                      </h3>
                    </div>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                    {isZH ? service.descCN : service.descEn}
                  </p>
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
              {isZH ? '准备开始您的数字化转型之旅？' : 'Ready to Start Your Digital Transformation Journey?'}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {isZH ? '让我们的专家为您提供全面的IT和自动化解决方案。' : 'Let our experts provide comprehensive IT and automation solutions for your organization.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              {isZH ? '立即咨询' : 'Get Started'}
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
