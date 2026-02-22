import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesConfig } from '../config';
import { Youtube, Film, Share2, Bot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  '01': Youtube,
  '02': Film,
  '03': Share2,
  '04': Bot,
};

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!servicesConfig.title) return null;

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

      // Cards animation
      const trigger3 = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => {
          const cards = cardsRef.current?.querySelectorAll('.service-card');
          if (cards) {
            gsap.fromTo(
              cards,
              { y: 60, opacity: 0, rotateX: 15 },
              {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.15,
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
      id="services"
      className="relative min-h-screen w-full py-32 px-8 bg-black"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <div className="mb-8">
          <span className="text-caption text-white/40 tracking-widest">Services</span>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-h1 font-medium text-white mb-4 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {servicesConfig.title}
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-body text-white/50 max-w-xl mb-16 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {servicesConfig.subtitle}
        </p>

        {/* Service cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-container"
          style={{ perspective: '1000px' }}
        >
          {servicesConfig.services.map((service) => {
            const Icon = iconMap[service.id] || Youtube;
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                className="service-card relative p-8 border bg-white/[0.02] preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateZ(20px) scale(1.02)' : 'translateZ(0)',
                  borderColor: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                  background: isHovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card number */}
                <div className="absolute top-6 right-6">
                  <span className="text-caption text-white/20">{service.id}</span>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <Icon
                    className="w-10 h-10 transition-colors duration-300"
                    style={{ color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-h3 font-medium text-white mb-4">{service.title}</h3>

                {/* Description */}
                <p className="text-body-sm text-white/50 leading-relaxed">{service.description}</p>

                {/* Hover indicator line */}
                <div
                  className="absolute bottom-0 left-0 h-px bg-white/30 transition-all duration-500"
                  style={{
                    width: isHovered ? '100%' : '0%',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
