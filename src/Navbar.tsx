import * as React from "react";

// // // //

export function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6">
      <div className="flex items-center flex-no-shrink text-gray-700 mr-6">
        <span className="font-semibold text-xl tracking-tight">
          OpenJSCAD React Next.js Starter
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-md lg:flex-grow">
          <a
            href="https://github.com/aeksco/openjscad-react-next-starter"
            target="_blank"
            className="block mt-4 lg:inline-block lg:mt-0 text-grey-700 hover:text-gray-500 mr-4"
          >
            GitHub Repo
          </a>
          <a
            href="https://aeksco.github.io/openjscad-react/"
            target="_blank"
            className="block mt-4 lg:inline-block lg:mt-0 text-grey-700 hover:text-gray-500 mr-4"
          >
            Documentation
          </a>
        </div>
      </div>
    </nav>
  );
}
