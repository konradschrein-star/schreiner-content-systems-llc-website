import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { footerConfig } from '../config';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!footerConfig.copyright) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      const trigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 90%',
        onEnter: () => {
          const elements = contentRef.current?.querySelectorAll('.footer-item');
          if (elements) {
            gsap.fromTo(
              elements,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );
          }
        },
        once: true,
      });
      triggersRef.current.push(trigger);
    }, footerRef);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative w-full bg-black border-t border-white/10">
      {/* Marquee */}
      {footerConfig.marqueeText && (
        <div
          ref={marqueeRef}
          className="py-8 border-b border-white/5 overflow-hidden"
        >
          <div className="marquee-container">
            <div className="marquee-content">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="text-4xl md:text-6xl font-light text-white/10 mx-8"
                >
                  {footerConfig.marqueeText.split('').map((char, j) => (
                    <span
                      key={j}
                      className={
                        footerConfig.marqueeHighlightChars.includes(char)
                          ? 'text-white/30'
                          : ''
                      }
                    >
                      {char}
                    </span>
                  ))}
                  <span className="mx-16">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main footer content */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="footer-item md:col-span-2 opacity-0">
            <h3 className="text-h3 font-medium text-white mb-4">SCHREINER</h3>
            <p className="text-body text-white/50 max-w-sm">{footerConfig.tagline}</p>
          </div>

          {/* Navigation 1 */}
          <div className="footer-item opacity-0">
            <h4 className="text-caption text-white/40 mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerConfig.navLinks1.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-body text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation 2 */}
          <div className="footer-item opacity-0">
            <h4 className="text-caption text-white/40 mb-4">More</h4>
            <ul className="space-y-3">
              {footerConfig.navLinks2.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-body text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-item mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-0">
          <p className="text-body-sm text-white/40">{footerConfig.copyright}</p>

          <div className="flex items-center gap-6">
            <button className="text-body-sm text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </button>
            <button className="text-body-sm text-white/40 hover:text-white/60 transition-colors">
              Impressum
            </button>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
