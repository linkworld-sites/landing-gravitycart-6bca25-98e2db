"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type MotionStyle } from "framer-motion";

const POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'>
      <rect width='100%' height='100%' fill='#101214'/>
      <g stroke='#3A3F44' stroke-width='1'>
        ${Array.from({ length: 17 })
          .map((_, i) => `<line x1='${i * 100}' y1='0' x2='${i * 100}' y2='900'/>`)
          .join("")}
        ${Array.from({ length: 10 })
          .map((_, i) => `<line x1='0' y1='${i * 100}' x2='1600' y2='${i * 100}'/>`)
          .join("")}
      </g>
    </svg>`,
  );

/**
 * Two stacked copies of the same clip crossfade before the source loop-cuts,
 * so the seam is never visible (generated hero footage is not loop-perfect).
 */
export function VideoLoop({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: MotionStyle;
}) {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const [activeIsA, setActiveIsA] = useState(true);
  const switching = useRef(false);

  useEffect(() => {
    const active = activeIsA ? refA.current : refB.current;
    const idle = activeIsA ? refB.current : refA.current;
    if (!active || !idle) return;

    const onTimeUpdate = () => {
      if (switching.current) return;
      const dur = active.duration;
      if (!dur || Number.isNaN(dur)) return;
      if (active.currentTime >= dur - 1) {
        switching.current = true;
        idle.currentTime = 0;
        void idle.play();
        setActiveIsA((prev) => !prev);
      }
    };

    active.addEventListener("timeupdate", onTimeUpdate);
    return () => active.removeEventListener("timeupdate", onTimeUpdate);
  }, [activeIsA]);

  useEffect(() => {
    const justFinished = activeIsA ? refB.current : refA.current;
    if (!justFinished) return;
    const t = setTimeout(() => {
      justFinished.pause();
      justFinished.currentTime = 0;
      switching.current = false;
    }, 950);
    return () => clearTimeout(t);
  }, [activeIsA]);

  return (
    <motion.div className={className} style={style}>
      <video
        ref={refA}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
        style={{ opacity: activeIsA ? 1 : 0 }}
        src={src}
        poster={POSTER}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={refB}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
        style={{ opacity: activeIsA ? 0 : 1 }}
        src={src}
        poster={POSTER}
        muted
        playsInline
        preload="auto"
      />
    </motion.div>
  );
}
