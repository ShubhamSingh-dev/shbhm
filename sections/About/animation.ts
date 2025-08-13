// utils/animations.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface HighlightConfig {
  selector: string;
  delay?: number;
}

export interface CircleConfig {
  selector: string;
  delay?: number;
}

export class AnimationManager {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    gsap.registerPlugin(ScrollTrigger);
  }

  createHighlightAnimations(configs: HighlightConfig[]) {
    configs.forEach(({ selector, delay = 0 }) => {
      const element = this.container.querySelector(selector);
      if (!element) return;

      gsap.fromTo(
        element,
        { backgroundSize: "0% 100%" },
        {
          backgroundSize: "100% 100%",
          duration: 1,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  createCircleAnimations(configs: CircleConfig[]) {
    configs.forEach(({ selector, delay = 0 }) => {
      const circleElement = this.container.querySelector(selector);
      if (!circleElement) return;

      const circlePath = circleElement.querySelector(".circle-path");
      if (!circlePath) return;

      gsap.fromTo(
        circlePath,
        {
          strokeDashoffset: 300,
          strokeDasharray: 300,
        },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          delay,
          scrollTrigger: {
            trigger: circleElement,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          onStart: () => {
            this.addShakeEffect(circleElement);
          },
        }
      );
    });
  }

  private addShakeEffect(circleElement: Element) {
    const textElement = circleElement.querySelector(".circle-text");
    if (textElement) {
      gsap.fromTo(
        textElement,
        { x: 0 },
        {
          x: 2,
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          ease: "power2.inOut",
        }
      );
    }
  }

  createMarqueeAnimation(element: HTMLElement) {
    gsap.set(element, { xPercent: 0 });
    gsap.to(element, {
      xPercent: -50,
      duration: 15,
      ease: "none",
      repeat: -1,
    });
  }
}