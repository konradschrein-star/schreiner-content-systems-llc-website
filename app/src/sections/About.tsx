import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';
import { Cpu, Workflow, Sparkles, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Cpu, label: 'Automation' },
  { icon: Workflow, label: 'Workflow Optimization' },
  { icon: Sparkles, label: 'AI-Assisted Production' },
  { icon: Layers, label: 'Systematic Experimentation' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!aboutConfig.titleLine1) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const trigger1 = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger1);

      // Line animation
      const trigger2 = ScrollTrigger.create({
        trigger: lineRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            lineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: 'expo.out' }
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
          gsap.fromTo(
            textRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger3);

      // Features animation
      const trigger4 = ScrollTrigger.create({
        trigger: featuresRef.current,
        start: 'top 85%',
        onEnter: () => {
          const items = featuresRef.current?.querySelectorAll('.feature-item');
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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full py-32 px-8 bg-black"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-8">
          <span className="text-caption text-white/40 tracking-widest">About</span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-h1 font-medium text-white mb-8 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {aboutConfig.titleLine1}
        </h2>

        {/* Decorative line */}
        <div
          ref={lineRef}
          className="w-full h-px bg-white/10 mb-12"
          style={{ transformOrigin: 'left', willChange: 'transform' }}
        />

        {/* Description */}
        <p
          ref={textRef}
          className="text-body text-white/70 max-w-3xl leading-relaxed mb-16 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {aboutConfig.description}
        </p>

        {/* Features grid */}
        <div ref={featuresRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-item group p-6 border border-white/10 bg-white/[0.02] card-hover opacity-0"
              >
                <Icon className="w-8 h-8 text-white/50 mb-4 transition-colors group-hover:text-white" />
                <span className="text-body-sm text-white/60 group-hover:text-white/80 transition-colors">
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
