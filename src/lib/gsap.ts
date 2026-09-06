// Single import point for GSAP. Components import from "@/lib/gsap", never from "gsap" directly,
// so plugin registration is guaranteed everywhere (docs/05 §3).
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const NO_PREF = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
