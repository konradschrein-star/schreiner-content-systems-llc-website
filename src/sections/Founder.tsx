import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { founderConfig } from '../config';
import { Mail, Linkedin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!founderConfig.title) return null;

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

      // Image animation
      const trigger2 = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            imageRef.current,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.1 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger2);

      // Text animation
      const trigger3 = ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 80%',
        onEnter: () => {
          const elements = textRef.current?.querySelectorAll('.animate-item');
          if (elements) {
            gsap.fromTo(
              elements,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(trigger3);
    }, sectionRef);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative min-h-screen w-full py-32 px-8 bg-black"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.02) 0%, transparent 40%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-12">
          <span
            ref={labelRef}
            className="text-caption text-white/40 tracking-widest opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            {founderConfig.title}
          </span>
        </div>

        {/* Content grid */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <div
            ref={imageRef}
            className="relative opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="aspect-square max-w-md mx-auto lg:mx-0 border border-white/10 bg-white/[0.02] flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-caption text-white/30">Photo</span>
                </div>
                <span className="text-body-sm text-white/40">{founderConfig.imageAlt}</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-white/5" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-white/5" />
          </div>

          {/* Text content */}
          <div ref={textRef} className="space-y-6">
            <h3 className="animate-item text-h2 font-medium text-white opacity-0">
              {founderConfig.name}
            </h3>

            <p className="animate-item text-body text-white/50 opacity-0">
              {founderConfig.role}
            </p>

            <div className="animate-item w-16 h-px bg-white/20 opacity-0" />

            <p className="animate-item text-body text-white/70 leading-relaxed opacity-0">
              {founderConfig.bio}
            </p>

            {/* Contact */}
            <div className="animate-item pt-6 opacity-0">
              <a
                href={`mailto:${founderConfig.email}`}
                className="inline-flex items-center gap-3 text-body text-white/60 hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span>{founderConfig.email}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Social links */}
            <div className="animate-item flex gap-4 pt-4 opacity-0">
              <a
                href="#"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
