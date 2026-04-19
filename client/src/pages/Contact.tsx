import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const SUBJECTS = [
  'General Inquiry',
  'M&A Services',
  'Financial Services',
  'Overseas Landing Services',
  'People & HR Services',
  'IT & Automation Services',
  'Partnership Opportunity',
  'Media & Press',
  'Other',
];

interface FeedbackForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const emptyForm: FeedbackForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FeedbackForm>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FeedbackForm>>({});

  const submitTicket = trpc.tickets.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm(emptyForm);
      toast.success('Message sent! We will get back to you within 1-2 business days.');
    },
    onError: (err) => {
      toast.error(`Failed to send message: ${err.message}`);
    },
  });

  const validate = (): boolean => {
    const newErrors: Partial<FeedbackForm> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email address';
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitTicket.mutate(form);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
            <p className="text-background/70 text-lg leading-relaxed">
              Have a question or want to work together? Fill out the form below and our team will
              get back to you within 1–2 business days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start"
          >
            {/* Contact Info — left column */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our advisors are available to discuss your specific needs and how Solyn Advisory
                  can help your business grow.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:${t('contact.phone')}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/10 transition-colors">
                    <Phone className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Phone</p>
                    <p className="font-medium group-hover:text-foreground/70 transition-colors">
                      {t('contact.phone')}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${t('contact.email')}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/10 transition-colors">
                    <Mail className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Email</p>
                    <p className="font-medium group-hover:text-foreground/70 transition-colors">
                      {t('contact.email')}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Address</p>
                    <p className="font-medium leading-relaxed">{t('contact.address')}</p>
                  </div>
                </div>
              </div>

              {/* Business hours */}
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                  Business Hours
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday – Friday</span>
                    <span className="font-medium">9:00 AM – 6:00 PM CST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday – Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feedback Form — right column */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    All fields are required. We read every message and respond personally.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center gap-4"
                    >
                      <CheckCircle2 className="w-14 h-14 text-green-500" />
                      <h3 className="text-xl font-semibold">Message Sent!</h3>
                      <p className="text-muted-foreground max-w-sm">
                        Thank you for reaching out. We will review your message and get back to you
                        within 1–2 business days.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                        className="mt-2"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">
                            Full Name <span className="text-destructive">*</span>
                          </label>
                          <Input
                            value={form.name}
                            onChange={(e) => {
                              setForm({ ...form, name: e.target.value });
                              if (errors.name) setErrors({ ...errors, name: undefined });
                            }}
                            placeholder="Your full name"
                            className={errors.name ? 'border-destructive' : ''}
                          />
                          {errors.name && (
                            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">
                            Email Address <span className="text-destructive">*</span>
                          </label>
                          <Input
                            type="email"
                            value={form.email}
                            onChange={(e) => {
                              setForm({ ...form, email: e.target.value });
                              if (errors.email) setErrors({ ...errors, email: undefined });
                            }}
                            placeholder="you@company.com"
                            className={errors.email ? 'border-destructive' : ''}
                          />
                          {errors.email && (
                            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Subject <span className="text-destructive">*</span>
                        </label>
                        <select
                          value={form.subject}
                          onChange={(e) => {
                            setForm({ ...form, subject: e.target.value });
                            if (errors.subject) setErrors({ ...errors, subject: undefined });
                          }}
                          className={`w-full h-9 rounded-md border bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring ${
                            errors.subject ? 'border-destructive' : 'border-input'
                          }`}
                        >
                          <option value="">Select a subject…</option>
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">
                          Message <span className="text-destructive">*</span>
                        </label>
                        <Textarea
                          value={form.message}
                          onChange={(e) => {
                            setForm({ ...form, message: e.target.value });
                            if (errors.message) setErrors({ ...errors, message: undefined });
                          }}
                          placeholder="Tell us how we can help you…"
                          rows={6}
                          className={`resize-none ${errors.message ? 'border-destructive' : ''}`}
                        />
                        <div className="flex items-center justify-between mt-1">
                          {errors.message ? (
                            <p className="text-xs text-destructive flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.message}
                            </p>
                          ) : (
                            <span />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {form.message.length} / 2000
                          </span>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full gap-2"
                        disabled={submitTicket.isPending}
                      >
                        {submitTicket.isPending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
