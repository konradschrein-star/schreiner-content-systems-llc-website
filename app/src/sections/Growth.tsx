import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { growthConfig } from '../config';
import { Rocket, TrendingUp, Award, Globe, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<number, React.ElementType> = {
  1: Rocket,
  2: TrendingUp,
  3: Award,
  4: Globe,
  5: Cpu,
};

export function Growth() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!growthConfig.title) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const trigger1 = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger1);

      // Subtitle animation
      const trigger2 = ScrollTrigger.create({
        trigger: subtitleRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 }
          );
        },
        once: true,
      });
      triggersRef.current.push(trigger2);

      // Grid items animation
      const trigger3 = ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 80%',
        onEnter: () => {
          const items = gridRef.current?.querySelectorAll('.milestone-item');
          if (items) {
            gsap.fromTo(
              items,
              { y: 40, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'expo.out',
                delay: 0.2,
              }
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
      id="growth"
      className="relative min-h-screen w-full py-32 px-8 bg-black"
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.02) 0%, transparent 40%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-8">
          <span className="text-caption text-white/40 tracking-widest">Performance</span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-h1 font-medium text-white mb-4 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {growthConfig.title}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-body text-white/50 max-w-xl mb-16 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {growthConfig.subtitle}
        </p>

        {/* Milestones grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {growthConfig.milestones.map((milestone) => {
            const Icon = iconMap[milestone.id];

            return (
              <div
                key={milestone.id}
                className="milestone-item group relative p-8 border border-white/10 bg-white/[0.02] opacity-0 card-hover"
              >
                {/* Index number */}
                <div className="absolute top-6 right-6">
                  <span className="text-4xl font-light text-white/10 group-hover:text-white/20 transition-colors">
                    0{milestone.id}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                    <Icon className="w-6 h-6 text-white/50 group-hover:text-white/80 transition-colors" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-h3 font-medium text-white mb-3">{milestone.title}</h3>

                {/* Description */}
                <p className="text-body-sm text-white/50 leading-relaxed">{milestone.description}</p>

                {/* Corner accent */}
                <div
                  className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/0 group-hover:border-white/20 transition-colors"
                  style={{ transitionDelay: '0.1s' }}
                />
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-16 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 'Multiple', label: 'Channels' },
              { value: '2', label: 'Monetized' },
              { value: '100K+', label: 'Subscribers' },
              { value: '5+', label: 'Platforms' },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="text-h2 font-medium text-white mb-2">{stat.value}</div>
                <div className="text-caption text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
