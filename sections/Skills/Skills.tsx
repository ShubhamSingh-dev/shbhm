import React from "react";
import SkillTop from "./SkillTop";
import AnimatedHeaderSection from "./AnimatedHeader";

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen flex">
      <SkillTop />
      <AnimatedHeaderSection 
        subTitle="Behind the Scenes, Beyond the Code"
        title="Services"
        text={`I specialize in crafting dynamic, responsive websites that not only look stunning but also deliver seamless user experiences. From intuitive navigation to engaging interfaces, I ensure every element is optimized for performance and accessibility.\n\nBeyond web development, I offer AI integration services that bring cutting-edge technology to your projects. Whether it's implementing machine learning algorithms or developing intelligent chatbots, I help you harness the power of AI to enhance functionality and drive innovation.`}
        textColor="text-[#f0f0f0]"
        withScrollTrigger={true}
      />
    </section>
  );
};

export default Skills;
