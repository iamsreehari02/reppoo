/**
 * GSAP is loaded only in client components that use it (e.g. HeroSection).
 * Use the useGSAP hook from @gsap/react for automatic cleanup on unmount.
 * Do not import gsap in server components.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
export { useGSAP } from "@gsap/react";
