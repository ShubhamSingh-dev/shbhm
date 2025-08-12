import Hero from "@/sections/Hero/Hero";
import React from "react";

const App = () => {
  return (
    <>
      {/* Page 1 */}
      <section className="bg-white text-black flex flex-col items-center justify-center h-screen">
        <Hero />
      </section>

      {/* Page 2 */}
      <section className="relative bg-black text-white flex flex-col items-center justify-center h-screen">
        {/* Thick but gentle wave at the top of Page 2 */}
        <div className="absolute -top-65 left-0 w-full overflow-hidden leading-[0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
            className="w-full h-[300px]"
          >
            <path
              d="M0,100 C360,180 1080,180 1440,100 L1440,300 L0,300 Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Page 2 content */}
        <h1 className="text-4xl font-bold">Hello</h1>
      </section>
    </>
  );
};

export default App;
