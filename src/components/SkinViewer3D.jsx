/**
 * skinview3d — installation (Vite + React)
 *
 *   npm install skinview3d
 *
 * The package ships as ESM (`"type": "module"`). Vite resolves it without extra config.
 * Peer dependency: `three` (skinview3d bundles its own three version range; your app already has three).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SkinViewer,
  IdleAnimation,
  WalkingAnimation,
  PlayerAnimation,
} from "skinview3d";

/** Continuous right-arm wave: arm raised and oscillating on X (radians). */
class RightArmWaveAnimation extends PlayerAnimation {
  animate(player) {
    const t = this.progress * 6;
    const basicArmRotationZ = Math.PI * 0.02;
    player.skin.rightArm.rotation.x = -1.05 + Math.sin(t) * 0.55;
    player.skin.rightArm.rotation.z = -basicArmRotationZ;
  }
}

export function SkinViewer3D({
  width = 400,
  height = 400,
  skinUrl = "/skin.png",
  showButtons = true,
  enableControls = true,
  zoom,
  className = "",
}) {
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);
  const [mode, setMode] = useState("idle");

  const applyAnimation = useCallback((viewer, nextMode) => {
    switch (nextMode) {
      case "walk":
        viewer.animation = new WalkingAnimation();
        break;
      case "wave":
        viewer.animation = new RightArmWaveAnimation();
        break;
      case "idle":
      default:
        viewer.animation = new IdleAnimation();
        break;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const viewer = new SkinViewer({
      canvas,
      width,
      height,
      skin: skinUrl,
      enableControls,
      animation: new IdleAnimation(),
      ...(typeof zoom === "number" ? { zoom } : {}),
    });

    viewerRef.current = viewer;

    return () => {
      viewerRef.current = null;
      viewer.dispose();
    };
  }, [skinUrl, width, height, enableControls, zoom]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    applyAnimation(viewer, mode);
  }, [mode, applyAnimation, width, height]);

  return (
    <div
      className={`flex flex-col items-center ${showButtons ? "gap-3" : "gap-0"} ${className}`}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`rounded-lg bg-black/20 ${enableControls ? "" : "pointer-events-none"}`}
        style={{ width, height, maxWidth: "100%" }}
        aria-label="Minecraft skin 3D preview"
      />
      {showButtons && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            onClick={() => setMode("idle")}
          >
            Idle
          </button>
          <button
            type="button"
            className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            onClick={() => setMode("walk")}
          >
            Walk
          </button>
          <button
            type="button"
            className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
            onClick={() => setMode("wave")}
          >
            Wave
          </button>
        </div>
      )}
    </div>
  );
}
