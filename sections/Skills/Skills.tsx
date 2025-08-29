import React from "react";
import SkillTop from "./SkillTop";
import AnimatedHeaderSection from "./AnimatedHeader";

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen bg-black">
      {/* SkillTop positioned exactly as before */}
      <div className="relative">
        <SkillTop />
      </div>

      {/* AnimatedHeaderSection positioned below SkillTop */}
      <div className="relative z-10 -mt-16">
        <AnimatedHeaderSection
          subTitle="Behind the Scenes, Beyond the Code"
          title="Services"
          text="I build secure, high-performance web applications and AI solutions that drive innovation and efficiency. With Smooth Scalability and User-Centric Design, I deliver tailored solutions that meet your unique needs."
          textColor="text-[#f0f0f0]"
          withScrollTrigger={true}
        />
      </div>
    </section>
  );
};

export default Skills;
