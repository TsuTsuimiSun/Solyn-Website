import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const financialServiceData = {
  en: {
    title: 'Financial Advisory Service',
    description: 'Guided by the dual pillars of Growth and Compliance, we provide end-to-end financial solutions, from strategic planning to execution. We are not just problem-solvers, but value creators, dedicated to building robust financial infrastructures that drive sustainable business growth.',
    descriptionCN: '围绕企业增长与合规目标，提供全面财务管理、分析、税务与系统优化服务。',
    services: [
      {
        number: '1',
        titleEn: 'Financial Planning & Analysis (FP&A)',
        titleCN: '财务规划与分析',
        taglineEn: 'Navigate the Future with Decision-Led Insights.',
        taglineCN: '驾驭未来，决策先行',
        subtitleEn: 'We transform financial data into forward-looking business intelligence.',
        subtitleCN: '我们致力于将财务数据转化为前瞻性的商业洞察。',
        valueEn: 'Shift from reactive accounting to proactive management, ensuring every resource is aligned with your strategic goals.',
        valueCN: '化被动核算为主动管理，让每一分资源都为实现战略目标服务。',
        coreServices: [
          {
            nameEn: 'Comprehensive Budgeting',
            nameCN: '全面预算管理',
            descEn: 'Implement dynamic budgeting systems that are fully integrated with business operations for precise resource allocation and cost control.',
            descCN: '搭建与业务紧密联动的动态预算体系，实现资源精准配置与成本有效控制。',
          },
          {
            nameEn: 'Rolling Forecasts & Modeling',
            nameCN: '滚动预测与模型',
            descEn: 'Develop multi-scenario financial forecast models to adapt to market changes and capitalize on growth opportunities.',
            descCN: '建立多场景财务预测模型，灵活应对市场变化，把握增长机遇。',
          },
          {
            nameEn: 'Management Reporting',
            nameCN: '经营分析体系',
            descEn: 'Design key performance indicator (KPI) dashboards and conduct in-depth analysis of business drivers to deliver clear, actionable insights for leadership.',
            descCN: '设计关键绩效指标看板，深度剖析业务动因，为管理层提供清晰的决策支持。',
          },
        ],
      },
      {
        number: '2',
        titleEn: 'Financial Modeling & Valuation Service',
        titleCN: '财务建模与估值分析',
        taglineEn: 'Precision in Quantifying Value',
        taglineCN: '精准量化，决胜关键',
        subtitleEn: 'We provide the rigorous data foundation critical for major capital events and strategic decisions.',
        subtitleCN: '在融资、并购等重大资本运作中，我们提供坚实的数据基石',
        valueEn: 'Let professional models speak for your business, delivering indisputable evidence to support your most critical decisions.',
        valueCN: '用专业的模型说话，为您的重大决策提供无可争议的价值依据。',
        coreServices: [
          {
            nameEn: 'DCF Valuation Models',
            nameCN: 'DCF 估值模型',
            descEn: 'Develop comprehensive discounted cash flow models for precise business valuation and investment analysis.',
            descCN: '建立完整的现金流折现模型，实现精准的企业估值与投资分析。',
          },
          {
            nameEn: 'Comparable Company Analysis',
            nameCN: '可比公司分析',
            descEn: 'Conduct market-based valuation using comparable company multiples and transaction benchmarks.',
            descCN: '通过可比公司倍数和交易基准进行市场化估值分析。',
          },
          {
            nameEn: 'Deal Structuring Support',
            nameCN: '交易结构设计',
            descEn: 'Design optimal deal structures that maximize value and minimize tax implications.',
            descCN: '设计最优交易结构，实现价值最大化与税务最小化。',
          },
        ],
      },
      {
        number: '3',
        titleEn: 'Portfolio Company Reporting Service',
        titleCN: '投资企业报告',
        taglineEn: 'Transparent Insight for Proactive Ownership',
        taglineCN: '透明洞察，赋能投后',
        subtitleEn: 'We provide investment firms with a standardized, high-quality view into portfolio performance for effective post-investment management.',
        subtitleCN: '为投资机构提供标准化、高质量的投后管理视角。',
        valueEn: 'Achieve crystal-clear visibility into your investments, significantly enhancing the efficiency and depth of your oversight.',
        valueCN: '让投资组合的表现一目了然，显著提升投后管理的效率与深度。',
        coreServices: [
          {
            nameEn: 'Standardized Reporting Framework',
            nameCN: '标准化报告体系',
            descEn: 'Design unified templates for financial and operational data reporting to ensure accuracy, timeliness, and comparability.',
            descCN: '设计统一的财务与业务数据报送模板，确保信息的准确性、及时性与可比性。',
          },
          {
            nameEn: 'Performance Tracking & Alerting',
            nameCN: '绩效跟踪与预警',
            descEn: 'Generate regular performance analysis, conduct deep dives into variances, and flag potential risks early.',
            descCN: '定期生成投资组合公司绩效分析报告，深度解读偏差，及时预警潜在风险。',
          },
          {
            nameEn: 'Value Creation Assessment',
            nameCN: '价值创造评估',
            descEn: 'Quantify the impact of post-investment initiatives, helping investors clearly track value creation pathways.',
            descCN: '量化投后管理举措的效果，帮助投资人清晰掌握价值提升路径。',
          },
        ],
      },
      {
        number: '4',
        titleEn: 'Tax Compliance & Planning Service',
        titleCN: '税务合规与筹划',
        taglineEn: 'Safeguard and Strategize',
        taglineCN: '严守底线，创造价值',
        subtitleEn: 'We ensure full compliance while optimizing your tax structure to maximize value.',
        subtitleCN: '在确保合规的前提下，优化税务结构，实现价值最大化。',
        valueEn: 'Transform tax management from a cost center into a strategic function that creates tangible value.',
        valueCN: '让税务管理从成本中心变为价值创造环节',
        coreServices: [
          {
            nameEn: 'End-to-End Compliance',
            nameCN: '全面合规申报',
            descEn: 'Manage corporate tax filings and employee individual income tax obligations with efficiency and precision, mitigating compliance risks.',
            descCN: '高效处理公司各项税种及员工个人所得税的申报事宜，规避合规风险。',
          },
          {
            nameEn: 'Strategic Tax Planning',
            nameCN: '战略性税务筹划',
            descEn: 'Develop proactive tax strategies aligned with your corporate structure and business model to legally optimize the effective tax rate.',
            descCN: '结合公司架构与业务模式，进行前瞻性的税务规划，合法降低整体税负。',
          },
          {
            nameEn: 'Cross-Border Tax Advisory',
            nameCN: '跨境税务咨询',
            descEn: 'Provide expert guidance on indirect taxes, transfer pricing, and other complexities to support global expansion.',
            descCN: '为企业的跨境业务提供专业的间接税、转让定价等税务方案，支持全球化布局。',
          },
        ],
      },
      {
        number: '5',
        titleEn: 'Financial Organization & Internal Controls',
        titleCN: '财务组织与内控建设',
        taglineEn: 'Fortify Your Foundation',
        taglineCN: '筑牢根基，防范未然',
        subtitleEn: 'We build a resilient financial governance framework to protect assets and ensure operational integrity.',
        subtitleCN: '为企业构建稳健的财务治理框架，保障资产安全与运营效率。',
        valueEn: 'Establish a financial fortress that gives management and investors complete peace of mind.',
        valueCN: '建立让管理者和投资者都放心的财务堡垒。',
        coreServices: [
          {
            nameEn: 'Finance Function Design',
            nameCN: '财务架构设计',
            descEn: 'Structure efficient finance teams with clear roles and responsibilities, tailored to your company\'s growth stage.',
            descCN: '根据企业发展阶段，设计高效、权责清晰的财务组织架构与岗位职责。',
          },
          {
            nameEn: 'Internal Control Systems',
            nameCN: '内控体系搭建',
            descEn: 'Identify key business risks and establish robust internal controls for authorization, approval, and asset protection.',
            descCN: '识别关键业务风险点，制定授权、审批、资产保护等核心内控制度。',
          },
          {
            nameEn: 'Policy & Process Optimization',
            nameCN: '制度流程优化',
            descEn: 'Streamline and document critical financial processes to ensure effective implementation and enhance overall operational control.',
            descCN: '梳理并规范财务关键流程，确保制度有效执行，提升整体运营风控水平。',
          },
        ],
      },
      {
        number: '6',
        titleEn: 'Financial Process & System Automation',
        titleCN: '财务流程与系统优化',
        taglineEn: 'Intelligent Efficiency',
        taglineCN: '智能提效，释放人力',
        subtitleEn: 'We leverage technology and automation to free your finance team from repetitive tasks, allowing them to focus on strategic analysis.',
        subtitleCN: '利用技术和自动化，将财务团队从繁琐事务中解放出来。',
        valueEn: 'Make your financial operations smarter and more efficient, redirecting talent towards high-value analytical work.',
        valueCN: '让财务运营更智能、更高效，聚焦于高价值分析工作',
        coreServices: [
          {
            nameEn: 'Process Automation Audit',
            nameCN: '流程自动化诊断',
            descEn: 'Assess high-frequency processes (reconciliation, expense claims, invoicing, budget control) for automation potential.',
            descCN: '针对对账、报销、开票、预算控制等高频流程，评估自动化潜力。',
          },
          {
            nameEn: 'System Implementation & Optimization',
            nameCN: '系统实施与优化',
            descEn: 'Assist in selecting and implementing financial systems, or optimizing and integrating existing platforms.',
            descCN: '协助选型并落地财务系统，或对现有系统进行功能优化与集成。',
          },
          {
            nameEn: 'Digital Solutions',
            nameCN: '数字化解决方案',
            descEn: 'Deploy technologies like Robotic Process Automation (RPA) to automate repetitive tasks, improving data accuracy and operational throughput.',
            descCN: '通过RPA等技术，实现重复性工作的自动化处理，提升数据准确性与运营效率。',
          },
        ],
      },
    ],
  },
};

export default function FinancialServiceDetail() {
  const { i18n } = useTranslation();
  const data = financialServiceData.en;
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
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              {data.title}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 mb-6">
              {isZH ? data.descriptionCN : data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-24"
          >
            {data.services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`grid md:grid-cols-2 gap-12 md:gap-16 items-start ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Left Side - Content */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="flex gap-4 mb-6">
                    <div className="text-5xl md:text-6xl font-bold text-accent/20 flex-shrink-0">
                      {service.number}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                        {isZH ? service.titleCN : service.titleEn}
                      </h2>
                      <p className="text-lg font-semibold text-accent mb-4">
                        {isZH ? service.taglineCN : service.taglineEn}
                      </p>
                      <p className="text-base text-foreground/80 mb-6">
                        {isZH ? service.subtitleCN : service.subtitleEn}
                      </p>
                    </div>
                  </div>

                  {/* Value Proposition */}
                  <div className="bg-accent/5 border-l-4 border-accent p-6 mb-8 rounded">
                    <h3 className="font-semibold text-foreground mb-2">
                      {isZH ? '我们的价值：' : 'The Value We Bring:'}
                    </h3>
                    <p className="text-foreground/80">
                      {isZH ? service.valueCN : service.valueEn}
                    </p>
                  </div>

                  {/* Core Services */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">
                      {isZH ? '核心服务：' : 'Core Services:'}
                    </h3>
                    <div className="space-y-4">
                      {service.coreServices.map((coreService, coreIndex) => (
                        <motion.div
                          key={coreIndex}
                          whileHover={{ x: 4 }}
                          className="border-l-2 border-accent/30 pl-4"
                        >
                          <h4 className="font-semibold text-foreground mb-1">
                            {isZH ? coreService.nameCN : coreService.nameEn}
                          </h4>
                          <p className="text-sm text-foreground/70">
                            {isZH ? coreService.descCN : coreService.descEn}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-64 md:h-96 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg overflow-hidden"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${
                        index === 0 ? '1454165804606-c3d57bc86b40' :
                        index === 1 ? '1552664730-d307ca884978' :
                        index === 2 ? '1454165804606-c3d57bc86b40' :
                        index === 3 ? '1552664730-d307ca884978' :
                        index === 4 ? '1454165804606-c3d57bc86b40' :
                        '1552664730-d307ca884978'
                      }?w=600&h=500&fit=crop`}
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
              {isZH ? '准备优化您的财务管理？' : 'Ready to Optimize Your Financial Management?'}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {isZH ? '让我们的专家为您提供全面的财务解决方案。' : 'Let our experts provide comprehensive financial solutions for your business.'}
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
