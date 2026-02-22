import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 3D Floating Cube Component
function FloatingCube({ size, delay, x, y, z }: { size: number; delay: number; x: string; y: string; z: number }) {
  return (
    <div
      className="absolute preserve-3d"
      style={{
        left: x,
        top: y,
        transform: `translateZ(${z}px)`,
        animation: `float 8s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="relative preserve-3d"
        style={{
          width: size,
          height: size,
          animation: `rotate-cube 20s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 border border-white/20 bg-white/[0.02]"
          style={{ transform: `translateZ(${size / 2}px)` }}
        />
        {/* Back face */}
        <div
          className="absolute inset-0 border border-white/20 bg-white/[0.02]"
          style={{ transform: `translateZ(-${size / 2}px) rotateY(180deg)` }}
        />
        {/* Right face */}
        <div
          className="absolute inset-0 border border-white/20 bg-white/[0.02]"
          style={{ transform: `translateX(${size / 2}px) rotateY(90deg)` }}
        />
        {/* Left face */}
        <div
          className="absolute inset-0 border border-white/20 bg-white/[0.02]"
          style={{ transform: `translateX(-${size / 2}px) rotateY(-90deg)` }}
        />
        {/* Top face */}
        <div
          className="absolute inset-0 border border-white/20 bg-white/[0.02]"
          style={{ transform: `translateY(-${size / 2}px) rotateX(90deg)` }}
        />
        {/* Bottom face */}
        <div
          className="absolute inset-0 border border-white/20 bg-white/[0.02]"
          style={{ transform: `translateY(${size / 2}px) rotateX(-90deg)` }}
        />
      </div>
    </div>
  );
}

// 3D Wireframe Sphere Component
function WireframeSphere({ size, delay, x, y }: { size: number; delay: number; x: string; y: string }) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        animation: `float 10s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        className="relative rounded-full border border-white/10"
        style={{
          width: size,
          height: size,
        }}
      >
        {/* Inner rings */}
        <div
          className="absolute inset-4 rounded-full border border-white/5"
          style={{ animation: `rotate-cube 15s linear infinite` }}
        />
        <div
          className="absolute inset-8 rounded-full border border-white/5"
          style={{ animation: `rotate-cube 20s linear infinite reverse` }}
        />
      </div>
    </div>
  );
}

// Grid Plane Component
function GridPlane() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        transform: 'perspective(500px) rotateX(60deg) translateY(100px)',
        transformOrigin: 'center bottom',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)',
      }}
    />
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const [, setLoaded] = useState(false);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!heroConfig.title) return null;

  useEffect(() => {
    // Entry animation on load
    const tl = gsap.timeline({ delay: 0.3 });

    // Title characters animation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { rotateY: -90, y: 60, opacity: 0 },
        {
          rotateY: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        }
      );
    }

    // Subtitle blur reveal
    tl.fromTo(
      subtitleRef.current,
      { filter: 'blur(20px)', opacity: 0, y: 30 },
      { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
      '-=0.3'
    );

    // Decorative line
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'expo.inOut' },
      '-=0.5'
    );

    // 3D decorations fade in
    tl.fromTo(
      decorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' },
      '-=1'
    );

    setLoaded(true);

    // Scroll effects
    const trigger1 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '50% top',
      scrub: 1,
      onUpdate: (self) => {
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            y: `${self.progress * 30}%`,
            opacity: 1 - self.progress * 0.8,
          });
        }
      },
    });
    triggersRef.current.push(trigger1);

    const trigger2 = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '40% top',
      scrub: 1,
      onUpdate: (self) => {
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, {
            y: `${self.progress * 20}%`,
            opacity: 1 - self.progress,
          });
        }
      },
    });
    triggersRef.current.push(trigger2);

    return () => {
      tl.kill();
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const titleChars = heroConfig.title.split('');

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden perspective-container bg-black"
      style={{ perspective: '1200px' }}
    >
      {/* Grid background plane */}
      <GridPlane />

      {/* 3D Decorative Elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
        {/* Floating cubes */}
        <FloatingCube size={80} delay={0} x="10%" y="20%" z={100} />
        <FloatingCube size={60} delay={2} x="85%" y="30%" z={-100} />
        <FloatingCube size={40} delay={4} x="75%" y="70%" z={50} />
        <FloatingCube size={100} delay={1} x="5%" y="60%" z={-50} />
        
        {/* Wireframe spheres */}
        <WireframeSphere size={120} delay={0.5} x="90%" y="15%" />
        <WireframeSphere size={80} delay={3} x="15%" y="75%" />
        
        {/* Geometric lines */}
        <div
          className="absolute"
          style={{
            left: '20%',
            top: '40%',
            width: '1px',
            height: '200px',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)',
            animation: 'float 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute"
          style={{
            left: '80%',
            top: '50%',
            width: '1px',
            height: '150px',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Content container */}
      <div
        className="relative z-20 min-h-screen w-full flex flex-col justify-center items-center px-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Founder image */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/founder.jpg"
            alt="Founder"
            className="rounded-full shadow-lg w-40 h-40 object-cover border-4 border-white/20"
            style={{ marginTop: '32px' }}
          />
        </div>
        {/* Services label - top */}
        <div className="absolute top-8 left-8 z-30">
          <span className="text-caption text-white/40 tracking-widest">
            {heroConfig.servicesLabel}
          </span>
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-display font-medium text-white tracking-tight mb-6 preserve-3d text-center"
          style={{
            textShadow: '0 0 60px rgba(255, 255, 255, 0.15)',
            willChange: 'transform, opacity',
          }}
        >
          {titleChars.map((char, i) => (
            <span
              key={i}
              className="char inline-block"
              style={{
                transform: `translateY(${(i % 2 === 0 ? -1 : 1) * 4}px)`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Decorative line */}
        <div
          ref={lineRef}
          className="w-24 h-px bg-white/30 mb-8"
          style={{ transformOrigin: 'center', willChange: 'transform' }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-h3 font-light text-white/70 tracking-wide text-center max-w-3xl mb-12"
          style={{ willChange: 'filter, opacity, transform' }}
        >
          {heroConfig.subtitle}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            onClick={() => scrollToSection('#growth')}
            className="btn-primary flex items-center justify-center gap-2 group"
          >
            {heroConfig.ctaPrimary}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="btn-secondary flex items-center justify-center gap-2 group"
          >
            <Mail className="w-4 h-4" />
            {heroConfig.ctaSecondary}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-caption text-white/30">Scroll</span>
          <div
            className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
            style={{
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Copyright - bottom right */}
      <div className="absolute right-8 bottom-8 z-30">
        <span className="text-body-sm text-white/30">{heroConfig.copyright}</span>
      </div>
    </section>
  );
}
