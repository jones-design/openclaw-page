import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Star = { id: number; x: number; y: number; size: number; duration: number };

export function StarField() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    const s = Array.from({ length: 120 }, (_, id) => ({
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(s);
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.1,
          }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
