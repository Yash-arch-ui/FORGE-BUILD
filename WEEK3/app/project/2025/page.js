import React from "react";

const page = () => {
  return (
    <>
      {/* TOP SECTION (like Men's / Women's Collection) */}
      <div className=" text-center text-white ">
        <a
          href="https://github.com/Yash-arch-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-400"
        >
          GITHUB: Yash-arch-ui
        </a>
      </div>

      {/* HERO SECTION */}
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-5xl text-white underline">
          Project Page
        </h1>
      </div>
    </>
  );
};

export default page;
