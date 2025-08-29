import ScrollTransitionContainer from "@/components/pageTransitionContainer";
import About from "@/sections/About/About";
import Hero from "@/sections/Hero/Hero";
import Skills from "@/sections/Skills/Skills";
import ReactLenis from "lenis/react";
import React from "react";

const page = () => {
  return (
    <ReactLenis>
      <ScrollTransitionContainer
        heroComponent={<Hero />}
        aboutComponent={<About />}
      />

      {/* Additional sections can be added here and they will appear normally after the scroll transition */}
      <Skills />

      <section className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Work Section</h2>
          <p className="text-xl">Another section that flows normally</p>
        </div>
      </section>

      <section className="min-h-screen bg-green-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Contact Section</h2>
          <p className="text-xl">Final section</p>
        </div>
      </section>
    </ReactLenis>
  );
};

export default page;
