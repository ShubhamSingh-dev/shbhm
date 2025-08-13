import About from "@/sections/About/About";
import Hero from "@/sections/Hero/Hero";
import React from "react";

const App = () => {
  return (
    <>
      <section className="bg-white text-black flex flex-col items-center justify-center h-screen">
        <Hero />
      </section>
      <About />
      
    </>
  );
};

export default App;
