import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const overseasServiceData = {
  en: {
    title: 'Overseas Landing Deployment Services',
    intro: 'The overseas deployment and implementation service offered by Solyn Advisory extends far beyond delivering a strategic blueprint. It functions as an integrated partner, acting as both an experienced navigator and a hands-on implementation crew, guiding enterprises from strategic vision to tangible operations in foreign markets.',
    introCN: '索林咨询提供的海外部署和实施服务远不止于提供战略蓝图。它充当一个综合合作伙伴，既是经验丰富的导航者，也是动手实施团队，引导企业从战略愿景到在外国市场的有形运营。',
    
    subtitle: 'Overseas Landing Deployment is NOT just opening a new entity overseas...',
    subtitleCN: '海外落地部署不仅仅是在海外开设新实体...',
    
    description: 'When a company sets its sights on international expansion, Solyn Advisory will first serve as the master planner. It conducts in-depth market analysis, regulatory reviews, and risk assessments to pinpoint the optimal target market and entry strategy. The core of the service then shifts to robust execution. This encompasses end-to-end support: establishing a legal entity compliant with local laws and tax codes, designing cross-cultural HR and compensation structures, recruiting key local talent, and setting up supply chain and sales channels. This also involves the systematic transfer and re-engineering of core business processes.\n\nThroughout this critical phase, our teams embed themselves within the clients\' organizations, providing continuous on-the-ground guidance, facilitating cross-cultural communication, and monitoring dynamic risks. This ensures every operational component is seamlessly integrated into both the local business environment and the companies\' global strategy.\n\nThis journey culminates not merely in the establishment of a "foreign office," but in the successful creation of a self-sustaining overseas stronghold. This entity is deeply embedded within the local ecosystem and is fully equipped to generate sustained value for the global enterprise, marking the critical transition from simply "expanding out" to truly "integrating in."',
    
    descriptionCN: '当一家公司将目光投向国际扩张时，索林咨询首先将充当总规划师。它进行深入的市场分析、监管审查和风险评估，以确定最优的目标市场和进入战略。然后，服务的核心转向强大的执行。这包括端到端的支持：建立符合当地法律和税法的法律实体，设计跨文化人力资源和薪酬结构，招募关键的本地人才，以及建立供应链和销售渠道。这还涉及核心业务流程的系统转移和重新设计。\n\n在整个关键阶段，我们的团队将自己融入客户的组织中，提供持续的现场指导，促进跨文化沟通，并监控动态风险。这确保每个运营组件都无缝集成到本地商业环境和公司的全球战略中。\n\n这一旅程的最终结果不仅仅是建立一个"外国办事处"，而是成功创建一个自我维持的海外堡垒。这个实体深深植根于当地生态系统中，完全有能力为全球企业创造持续价值，标志着从简单"扩展出去"到真正"融入"的关键转变。',
    
    services: [
      {
        titleEn: 'Market Entry Strategy & Due Diligence Service',
        titleCN: '市场进入战略与尽职调查服务',
        descEn: 'Conducting country/regional market selection, feasibility studies, competitor analysis, assessing political, economic, and market risks, and planning overseas investment models.',
        descCN: '进行国别市场选择、可行性研究、竞争对手分析，评估政治、经济、市场风险，规划境外投资模式。',
      },
      {
        titleEn: 'Investment Structure & Compliance Planning Service',
        titleCN: '投资架构与合规筹划服务',
        descEn: 'Designing optimal overseas investment structures (e.g., investing via a Hong Kong entity), cross-border tax planning, and providing support for ODI (Overseas Direct Investment) filings.',
        descCN: '设计最优的境外投资架构（如通过香港公司投资）、跨境税务规划、ODI（境外直接投资）备案支持。',
      },
      {
        titleEn: 'Legal & Compliant Entity Establishment Service',
        titleCN: '法律与合规实体设立服务',
        descEn: 'Covers company registration, license applications, intellectual property protection, and cross-border data compliance. Provides legal document drafting/review and contract negotiation services.',
        descCN: '覆盖公司注册、执照申请、知识产权保护、跨境数据合规等。提供法律文件起草审查、合同谈判服务。',
      },
      {
        titleEn: 'HR & Organizational Structuring Service',
        titleCN: '人力资源与组织搭建服务',
        descEn: 'Offering Employer of Record (EOR) services, cross-cultural talent recruitment, localized compensation & benefits planning, Global Payroll Outsourcing (GPO), and expatriate visa & work permit processing.',
        descCN: '提供全球名义雇主（EOR）服务、跨文化人才招募、本地化薪酬福利方案、全球薪酬外包（GPO）、外籍员工签证与工作证办理。',
      },
      {
        titleEn: 'Finance, Tax & Banking Integration Service',
        titleCN: '财务、税务与金融对接服务',
        descEn: 'Assisting with financial/tax due diligence, valuation services, corporate bank account setup, cross-border cash pool management, and facilitating onshore/offshore financing connections.',
        descCN: '协助进行财税尽职调查、估值服务、银行账户开设、跨境资金池管理、境内外融资对接。',
      },
      {
        titleEn: 'Brand Localization & Supply Chain Setup Service',
        titleCN: '品牌本地化与供应链准备',
        descEn: 'Supporting brand localization communications, market entry promotion strategy development, and designing overseas warehouse & logistics solutions and supply chain compliance management.',
        descCN: '支持品牌本地化传播、市场推广策略制定、海外仓储物流解决方案设计、供应链合规管理。',
      },
      {
        titleEn: 'Localized Operations & Ongoing Compliance Service',
        titleCN: '本地化运营与持续合规服务',
        descEn: 'Providing ongoing management of the overseas entity, local accounting & tax filing, HR compliance management, and policy change alerts.',
        descCN: '提供海外实体运营管理、本地会计与税务申报、人力资源合规管理、政策变动预警等服务。',
      },
      {
        titleEn: 'Technology Upgrade & Digital Enablement Service',
        titleCN: '技术升级与数字化赋能服务',
        descEn: 'Implementing integrated ERP systems, data compliance transformation, and e-commerce platform setup to enhance overseas management efficiency through digital tools.',
        descCN: '实施ERP（企业资源计划）系统整合、数据合规改造、电商平台搭建等，以数字化工具提升海外管理效率。',
      },
      {
        titleEn: 'Risk Management & Dispute Resolution Service',
        titleCN: '风险管理与争议解决服务',
        descEn: 'Establishing & supporting ongoing ESG risk control systems, responding to host country policy changes, and providing international dispute resolution support.',
        descCN: '协助建立持续的ESG（环境、社会和公司治理）风控体系、应对东道国的政策变动、并提供国际争议解决的相关支持。',
      },
      {
        titleEn: 'Growth & Expansion Support Service',
        titleCN: '增长与扩张支持服务',
        descEn: 'Assisting with cross-border M&A, overseas IPOs & bond issuance, and entry into new markets or securing new investment for further expansion.',
        descCN: '协助企业进行跨境并购重组、海外上市发债、进入新市场或引入新投资方以实现进一步扩张。',
      },
    ],
  },
};

export default function OverseasServiceDetail() {
  const { i18n } = useTranslation();
  const data = overseasServiceData.en;
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
              {isZH ? data.introCN : data.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subtitle Section */}
      <section className="py-12 md:py-16 bg-accent/5 border-y border-border">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {isZH ? data.subtitleCN : data.subtitle}
            </h2>
            <div className="prose prose-lg max-w-none text-foreground/80">
              {(isZH ? data.descriptionCN : data.description).split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
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
            className="grid md:grid-cols-2 gap-12 md:gap-16"
          >
            {data.services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="h-64 md:h-72 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg overflow-hidden mb-6 relative"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${
                      index % 3 === 0 ? '1552664730-d307ca884978' :
                      index % 3 === 1 ? '1454165804606-c3d57bc86b40' :
                      '1552664730-d307ca884978'
                    }?w=600&h=500&fit=crop`}
                    alt={isZH ? service.titleCN : service.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>

                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                    {isZH ? service.titleCN : service.titleEn}
                  </h3>
                  <p className="text-base text-foreground/80 leading-relaxed">
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
              {isZH ? '准备开启您的全球扩张之旅？' : 'Ready to Begin Your Global Expansion Journey?'}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {isZH ? '让我们的专家为您提供全面的海外部署解决方案。' : 'Let our experts provide comprehensive overseas deployment solutions for your business.'}
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
