import { motion } from 'framer-motion';

export default function Terms() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
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
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-foreground/80 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on Solyn Advisory's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
              <p className="text-foreground/80 leading-relaxed">
                The materials on Solyn Advisory's website are provided on an 'as is' basis. Solyn Advisory makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
              <p className="text-foreground/80 leading-relaxed">
                In no event shall Solyn Advisory or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Solyn Advisory's website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
              <p className="text-foreground/80 leading-relaxed">
                The materials appearing on Solyn Advisory's website could include technical, typographical, or photographic errors. Solyn Advisory does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Links</h2>
              <p className="text-foreground/80 leading-relaxed">
                Solyn Advisory has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Solyn Advisory of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
              <p className="text-foreground/80 leading-relaxed">
                Solyn Advisory may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p className="text-foreground/80 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of China, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
