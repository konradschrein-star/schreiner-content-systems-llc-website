import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { philosophyConfig } from '../config';
import { Settings, Target, Zap, Repeat } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { icon: Settings, title: 'Systems', description: 'Built through systems, not randomness' },
  { icon: Target, title: 'Optimization', description: 'Continuous workflow refinement' },
  { icon: Zap, title: 'Output', description: 'Maximized creative and technical quality' },
  { icon: Repeat, title: 'Scale', description: 'High-quality entertainment at scale' },
];

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!philosophyConfig.title) return null;

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

      // Principles animation
      const trigger4 = ScrollTrigger.create({
        trigger: principlesRef.current,
        start: 'top 85%',
        onEnter: () => {
          const items = principlesRef.current?.querySelectorAll('.principle-item');
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
      id="philosophy"
      className="relative min-h-screen w-full py-32 px-8 bg-black"
    >
      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ opacity: 0.02 }}
      >
        <span
          className="text-[20vw] font-bold text-white whitespace-nowrap"
          style={{ transform: 'rotate(-5deg)' }}
        >
          SYSTEMS
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-8">
          <span
            ref={labelRef}
            className="text-caption text-white/40 tracking-widest opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            {philosophyConfig.subtitle}
          </span>
        </div>

        {/* Main title */}
        <h2
          ref={titleRef}
          className="text-h1 font-medium text-white mb-12 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {philosophyConfig.title}
        </h2>

        {/* Quote text */}
        <div className="max-w-4xl mb-20">
          <p
            ref={textRef}
            className="text-xl md:text-2xl text-white/70 leading-relaxed opacity-0"
            style={{ willChange: 'transform, opacity' }}
          >
            {philosophyConfig.text}
          </p>
        </div>

        {/* Principles grid */}
        <div ref={principlesRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={index}
                className="principle-item group p-6 border border-white/10 bg-white/[0.02] opacity-0 card-hover"
              >
                <Icon className="w-8 h-8 text-white/40 mb-4 transition-colors group-hover:text-white" />
                <h4 className="text-body font-medium text-white mb-2">{principle.title}</h4>
                <p className="text-body-sm text-white/50">{principle.description}</p>
              </div>
            );
          })}
        </div>

        {/* Decorative line */}
        <div className="mt-20 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-caption text-white/30">Systems Over Talent</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
