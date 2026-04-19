import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const hrServiceData = {
  en: {
    title: 'Human Resources & Organizational Effectiveness Services',
    titleCN: '人力资源与组织效能服务',
    
    intro: 'We are committed to transforming human resources into a core strategic asset for your business. By deeply integrating operational logic and forward-thinking organizational design, we help enterprises build an end-to-end management system that spans from "acquiring talent" to "nurturing excellence." Our approach comprehensively enhances organizational effectiveness, providing a solid foundation for strategic execution and sustainable growth.',
    
    introCN: '我们致力于将人力资源转化为企业的核心战略资产。通过深度融入业务逻辑与前瞻性的组织设计，我们帮助企业构建从"用人"到"育人"的全周期管理体系，全面提升组织效能，为战略落地与可持续增长提供坚实支撑。',
    
    services: [
      {
        number: '1',
        titleEn: 'Strategic Organizational Design & Workforce Planning Service',
        titleCN: '战略性组织设计与人力规划',
        descEn: 'Based on your corporate strategy and business model, we design and optimize organizational structures, governance mechanisms, and role systems that are fully aligned with your goals. Through precise workforce planning and staffing models, we support businesses during expansion, transformation, or restructuring with proactive talent deployment and organizational capability building—ensuring your structure enables your strategy and your talent drives performance.',
        descCN: '我们基于企业战略蓝图与业务模式，设计并优化与之高度协同的组织架构、管控模式与岗位体系。通过精准的人力规划与配置模型，我们为企业应对业务扩张、转型或重组提供前瞻性的人才布局与组织能力保障，确保架构支撑战略、人才驱动业务。',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      },
      {
        number: '2',
        titleEn: 'Performance Management & Compensation Incentive Systems',
        titleCN: '绩效管理与薪酬激励体系',
        descEn: 'We develop scientific, equitable, and highly motivating performance management and compensation frameworks. These systems integrate market best practices and strong business alignment, incorporating clear performance indicators, closed-loop performance processes, and a balanced mix of short- and long-term incentives. The result is a more engaged and dynamic organization, effectively driving the achievement of business objectives.',
        descCN: '我们为企业建立科学、公平且极具激励性的综合薪酬与绩效管理体系。该体系深度融合市场实践与业务导向，通过设定关键绩效指标、推行闭环绩效管理，并将短期激励与长期回报有机结合，有效激发员工潜能，提升组织活力，驱动业务目标高效达成。',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      },
      {
        number: '3',
        titleEn: 'Targeted Recruitment & Executive Search Service',
        titleCN: '精准招聘与高管猎聘服务',
        descEn: 'We provide end-to-end recruitment solutions for critical roles and core talent. Leveraging deep industry expertise and professional assessment tools, we accurately identify mid- to senior-level professionals who align with both the role requirements and corporate culture. Our confidential executive search service further supports organizations in securing visionary leaders who can guide transformation and fuel growth.',
        descCN: '我们提供关键岗位与核心人才的全链条招聘解决方案。凭借深入的行业洞察和专业化的人才评估工具，我们不仅精准甄别与企业文化和岗位需求高度匹配的中高级人才，更通过高保密性的高管猎头服务，为企业寻访引领变革、驱动增长的领军人物。',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      },
      {
        number: '4',
        titleEn: 'Talent Development & Succession Planning Service',
        titleCN: '人才发展与梯队建设服务',
        descEn: 'We focus on building and sustaining core organizational capabilities through systematic employee training, leadership development, and succession planning programs. By identifying competency gaps and customizing development roadmaps, we help enterprises enhance the capabilities of their current workforce, optimize team structures, and foster a self-renewing organizational core—equipping them with the momentum needed for long-term success.',
        descCN: '我们聚焦企业核心能力的构建与传承，提供体系化的员工培训、领导力发展与人才梯队建设项目。通过识别能力差距、定制培养路径图，我们助力企业提升现有人才密度，优化团队能力结构，打造自我迭代的组织内核，为企业的可持续发展储备核心动能。',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      },
    ],
  },
};

export default function HRServiceDetail() {
  const { i18n } = useTranslation();
  const data = hrServiceData.en;
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
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {isZH ? data.titleCN : data.title}
              </h1>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-white/90">
                {isZH ? data.introCN : data.intro}
              </p>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop"
                alt="Team Planning"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
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
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-accent/30">
                      {service.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      {isZH ? service.titleCN : service.titleEn}
                    </h3>
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
              {isZH ? '准备优化您的人力资源战略？' : 'Ready to Optimize Your HR Strategy?'}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {isZH ? '让我们的专家为您提供全面的人力资源解决方案。' : 'Let our experts provide comprehensive HR solutions for your organization.'}
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
