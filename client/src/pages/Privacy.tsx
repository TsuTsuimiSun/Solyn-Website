import { motion } from 'framer-motion';

export default function Privacy() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-foreground/80 leading-relaxed">
                Solyn Advisory ("Company", "we", "our", or "us") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Information Collection and Use</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data").</li>
                <li>Usage Data: We may also collect information on how the Service is accessed and used ("Usage Data").</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Security of Data</h2>
              <p className="text-foreground/80 leading-relaxed">
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at sales@solynadvisory.com.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
