import { AboutSection } from "@/components/home/about-section";
import SectionDivider from "@/components/common/section-divider";
import { GithubContributions } from "@/features/portfolio/components/github-contributions";
import { HomeScrollContainer } from "@/components/home/home-scroll-container";
import { TechStack } from "@/features/portfolio/components/tech-stack";
import { MyWork } from "@/features/portfolio/components/my-work";

export default function Home() {
  return (
    <HomeScrollContainer>
      <SectionDivider index="01" label="About" />
      <AboutSection />
      
      <SectionDivider index="02" label="My Work" />
      <MyWork />
      
      <SectionDivider index="03" label="Contributions" />
      <GithubContributions />

      <SectionDivider index="04" label="Stack" />
      <TechStack />
    </HomeScrollContainer>
  );
}
