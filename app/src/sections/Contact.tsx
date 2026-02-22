import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig } from '../config';
import { Send, MapPin, Phone, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!contactConfig.title) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      const trigger1 = ScrollTrigger.create({
        trigger: labelRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            labelRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger1);

      // Title animation
      const trigger2 = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.1 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger2);

      // Form animation
      const trigger3 = ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            formRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger3);

      // Info animation
      const trigger4 = ScrollTrigger.create({
        trigger: infoRef.current,
        start: 'top 80%',
        onEnter: () => {
          const items = infoRef.current?.querySelectorAll('.info-item');
          if (items) {
            gsap.fromTo(
              items,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(trigger4);
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', inquiryType: '', message: '' });

    // Reset submitted state after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full py-32 px-8 bg-black"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-8">
          <span
            ref={labelRef}
            className="text-caption text-white/40 tracking-widest opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            Contact
          </span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-h1 font-medium text-white mb-4 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {contactConfig.title}
        </h2>

        <p className="text-body text-white/50 max-w-xl mb-16">{contactConfig.subtitle}</p>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Name field */}
            <div>
              <label className="block text-caption text-white/50 mb-2">
                {contactConfig.nameLabel}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email field */}
            <div>
              <label className="block text-caption text-white/50 mb-2">
                {contactConfig.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Inquiry type */}
            <div>
              <label className="block text-caption text-white/50 mb-2">
                {contactConfig.projectTypeLabel}
              </label>
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white focus:border-white/50 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-black">
                  {contactConfig.projectTypePlaceholder}
                </option>
                {contactConfig.projectTypeOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-black">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message field */}
            <div>
              <label className="block text-caption text-white/50 mb-2">
                {contactConfig.messageLabel}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : submitted ? (
                <span>Message Sent!</span>
              ) : (
                <>
                  {contactConfig.submitButtonText}
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Contact info */}
          <div ref={infoRef} className="space-y-8 lg:pl-8">
            {/* Company info */}
            <div className="info-item opacity-0">
              <div className="flex items-start gap-4">
                <Building2 className="w-5 h-5 text-white/40 mt-1" />
                <div>
                  <h4 className="text-body font-medium text-white mb-1">
                    {contactConfig.companyName}
                  </h4>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="info-item opacity-0">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-white/40 mt-1" />
                <div>
                  <p className="text-body text-white/60 whitespace-pre-line">
                    {contactConfig.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="info-item opacity-0">
              <a
                href={`tel:${contactConfig.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-white/40" />
                <span className="text-body">{contactConfig.phone}</span>
              </a>
            </div>

            {/* Divider */}
            <div className="info-item w-full h-px bg-white/10 opacity-0" />

            {/* Contact info text */}
            <div className="info-item opacity-0">
              <p className="text-body-sm text-white/40">{contactConfig.contactInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
