import { motion } from 'framer-motion';

export default function Accessibility() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Accessibility Statement</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
              <p className="text-foreground/80 leading-relaxed">
                Solyn Advisory is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Our website includes the following accessibility features:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>High contrast mode support</li>
                <li>Resizable text options</li>
                <li>Alternative text for images</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Standards Compliance</h2>
              <p className="text-foreground/80 leading-relaxed">
                We strive to conform to WCAG 2.1 Level AA standards and continue to work on improvements to ensure our website is accessible to all users.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Feedback</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you encounter any accessibility issues or have suggestions for improvement, please contact us at sales@solynadvisory.com. We welcome your feedback and will work to address any concerns.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
