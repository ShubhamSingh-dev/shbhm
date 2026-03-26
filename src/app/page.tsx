import { AboutSection } from "@/components/home/about-section";
import SectionDivider from "@/components/common/section-divider";
import { GithubContributions } from "@/features/portfolio/components/github-contributions";
import { HomeScrollContainer } from "@/components/home/home-scroll-container";
import { TechStack } from "@/features/portfolio/components/tech-stack";
import { MyWork } from "@/features/portfolio/components/my-work";

export default function Home() {
  return (
    <HomeScrollContainer>
      {/* Single max-w-3xl wrapper — same width used by Panel and GridOverlay rails */}
      <div className="mx-auto w-full max-w-3xl">
        <SectionDivider index="01" label="About" />
        <AboutSection />
        <GithubContributions />

        <SectionDivider index="02" label="Stack" />
        <TechStack />

        <SectionDivider index="03" label="My Work" />
        <MyWork />
        

        
      </div>
    </HomeScrollContainer>
  );
}
