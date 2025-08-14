import ScrollTransitionContainer from "@/components/pageTransitionContainer";
import About from "@/sections/About/About";
import Hero from "@/sections/Hero/Hero";
import React from "react";

const page = () => {
  return (
    <div>
      <ScrollTransitionContainer 
        heroComponent={<Hero />} 
        aboutComponent={<About />} 
      />
    </div>
  );
};

export default page;
