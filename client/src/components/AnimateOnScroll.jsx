import { useEffect, useRef, useState } from 'react';

/**
 * Komponen untuk menganimasikan elemen saat masuk ke viewport.
 * @param {object} props
 * @param {React.ReactNode} props.children - Elemen yang akan dianimasikan.
 * @param {number} [props.delay=0] - Waktu tunda animasi dalam milidetik.
 * @param {string} [props.className] - Class tambahan untuk styling.
 */
export default function AnimateOnScroll({ children, delay = 0, className = '' }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing setelah terlihat (triggerOnce)
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}