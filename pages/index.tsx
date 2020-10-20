import React from "react";
import dynamic from "next/dynamic";
import { OpenJSCADProps } from "openjscad-react/dist/types";

const STLB_FORMAT = {
  name: "stlb",
  displayName: "STL (Binary)",
  description: "STereoLithography, Binary",
  extension: "stl",
  mimetype: "application/sla",
  convertCSG: true,
  convertCAG: false
};

// Dynamic import
const OpenJSCAD: React.ComponentType<OpenJSCADProps> = dynamic(
  () => import("openjscad-react/dist").then(mod => mod.OpenJSCAD),
  { ssr: false }
);

// // // //

export const DEFAULT_SCRIPT = `
function main () {
  return union(
    difference(
      cube({size: 3, center: true}),
      sphere({r: 2, center: true})
    ),
    intersection(
      sphere({r: 1.3, center: true}),
      cube({size: 2.1, center: true})
    )
  ).translate([0, 0, 1.5]).scale(10);
}
`;

const Index = () => {
  if (typeof window == "undefined" || typeof document == "undefined") {
    return null;
  }

  return (
    <OpenJSCAD
      className="grid grid-cols-1 mt-5"
      jscadScript={DEFAULT_SCRIPT}
      viewerOptions={{}}
      // defaultOutputFileFormat="stl"
    >
      {({ viewerElement, outputFile }) => {
        // NOTE - processor is null, must be fixed
        // if (processor !== null) {
        //   // setTimeout(() => {
        //   //   processor.generateOutputFile(STLB_FORMAT);
        //   // }, 3000);
        // }

        return (
          <div>
            {viewerElement}
            {/* <button
              className="btn btn-blue"
              onClick={() => {
                processor.generateOutputFile(STLB_FORMAT);
              }}
            >
              Download STL
            </button> */}
            {outputFile !== null && (
              <a
                href={outputFile.data}
                download="stl-export.stl"
                className="btn btn-blue"
              >
                Download STL
              </a>
            )}
            <pre>{JSON.stringify({ outputFile }, null, 4)}</pre>
          </div>
        );
      }}
    </OpenJSCAD>
  );
};

export default Index;
