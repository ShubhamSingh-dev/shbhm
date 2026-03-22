import { AboutSection } from "@/components/home/about-section";
import SectionDivider from "@/components/common/section-divider";
import { GithubContributions } from "@/features/portfolio/components/github-contributions";
import { HomeScrollContainer } from "@/components/home/home-scroll-container";

export default function Home() {
  return (
    <HomeScrollContainer>
      <SectionDivider index="01" label="About" />
      <AboutSection />
      <SectionDivider index="02" label="Contact" />
      <GithubContributions />
    </HomeScrollContainer>
  );
}
