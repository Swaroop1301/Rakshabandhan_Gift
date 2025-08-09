import { useEffect, useMemo } from "react";

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const SparkleBackground = () => {
  const particles = useMemo(() =>
    Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${randomInRange(0, 100)}%`,
      top: `${randomInRange(0, 100)}%`,
      size: `${randomInRange(6, 14)}px`,
      duration: `${randomInRange(6, 12)}s`,
      delay: `${randomInRange(0, 4)}s`,
    })), []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full blur-md"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, hsl(var(--lavender) / 0.8), transparent 60%)',
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default SparkleBackground;
