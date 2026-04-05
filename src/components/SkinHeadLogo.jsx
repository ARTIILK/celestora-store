import { useState } from "react";

/**
 * Front face only from a standard 64×64 Minecraft skin (`public/skin.png` → `/skin.png`).
 * Crops the 8×8 face region at (8,8); no WebGL.
 */
export function SkinHeadLogo({ className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shrink-0 ring-1 ring-white/10 ${className}`}
      >
        MC
      </div>
    );
  }

  return (
    <div
      className={`relative w-10 h-10 overflow-hidden rounded-xl ring-1 ring-white/10 bg-neutral-900 shrink-0 ${className}`}
      aria-hidden
    >
      <img
        src="/skin.png"
        alt=""
        width={320}
        height={320}
        draggable={false}
        className="absolute max-w-none select-none pointer-events-none [image-rendering:pixelated]"
        style={{ left: -40, top: -40, width: 320, height: 320 }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
