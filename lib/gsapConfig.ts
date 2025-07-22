import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function registerGsapPlugins() {
  gsap.registerPlugin(ScrollTrigger);
  console.log("GSAP plugins registered!");
}

