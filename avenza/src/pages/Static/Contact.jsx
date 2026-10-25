import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, MapPin, Clock, Headphones } from 'lucide-react';
import FormField from '../../components/ui/FormField';
import Button from '../../components/ui/Button';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Contact() {
  useDocumentTitle('Contact Us | Avenza');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!EMAIL_RE.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please provide a subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // Simulate async network submission
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch {
      setErrors({ form: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="static-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '7rem 1.5rem 4rem' }}>
      <motion.div
        className="static-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="static-badge">
          <Headphones size={14} />
          <span>Support & Inquiries</span>
        </div>
        <h1 className="static-hero-title">Get in Touch with Avenza</h1>
        <p className="static-hero-sub">
          Have questions about your career assessment, platform features, or academic guidance?
          We are here to support your career discovery journey.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
        {/* Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.15)', color: 'var(--accent)' }}>
              <Mail size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.25rem' }}>Email Us</h3>
              <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '0.875rem' }}>support@avenza.edu</p>
              <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '0.875rem' }}>advisors@avenza.edu</p>
            </div>
          </div>

          <div
            style={{
              background: 'var(--card)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)' }}>
              <Clock size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.25rem' }}>Student Advisory Hours</h3>
              <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '0.875rem' }}>Monday – Friday: 9:00 AM – 6:00 PM IST</p>
              <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '0.875rem' }}>Weekend: Mentorship webinars available</p>
            </div>
          </div>

          <div
            style={{
              background: 'var(--card)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
              <MapPin size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text)', marginBottom: '0.25rem' }}>Academic Project</h3>
              <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '0.875rem' }}>Front End Engineering-II Project</p>
              <p style={{ color: 'var(--text)', opacity: 0.7, fontSize: '0.875rem' }}>Avenza Career Discovery System</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '2rem'
          }}
        >
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text)' }}>
            Send us a Message
          </h2>

          {isSuccess && (
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#34d399'
              }}
              role="status"
            >
              <CheckCircle2 size={20} />
              <span>Thank you! Your inquiry has been submitted. Our career counseling team will reach out soon.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="contact-name"
              label="Your Name"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Aarav Sharma"
              error={errors.name}
            />

            <FormField
              id="contact-email"
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
              error={errors.email}
            />

            <FormField
              id="contact-subject"
              label="Subject"
              required
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="e.g. Question regarding PCM Career Roadmap"
              error={errors.subject}
            />

            <FormField
              id="contact-message"
              label="Message"
              type="textarea"
              required
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Write your question or feedback here..."
              error={errors.message}
            />

            <Button
              type="submit"
              icon={Send}
              disabled={isSubmitting}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
