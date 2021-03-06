import React from "react";
import dynamic from "next/dynamic";
import { OpenJSCADProps } from "openjscad-react";
import { FormGroup } from "../src/FormGroup";

// Dynamic import
const OpenJSCAD: React.ComponentType<
  OpenJSCADProps
> = dynamic(() => import("openjscad-react").then((mod) => mod.OpenJSCAD), {
  ssr: false,
});

// // // //

function getSign(props: { name?: string; height?: number; padding?: number }) {
  let { name = "Hello, OpenJSCAD!" } = props;
  const { height = 4, padding = 2 } = props;

  // Removes all double quotes and back-slashes (prevents issues when interpolating below)
  name = name.replace(/[\"/s]/gi, "").replace(/[/\/s]/gi, "");

  // Renders sign JSCAD script
  const signJscad = `
function main (param) {
  var o = []; // our stack of objects
  var l = []; // our stack of line segments (when rendering vector text)
  var p = []; // our stack of extruded line segments

  var name = "${name}";
  var thickness = ${String(height)};
  
  // -- render name & extrude
  l = vector_text(0, 0, name);
  l.forEach(function (s) {
      p.push(rectangular_extrude(s, {w: 4, h: 4}));
  });
  o.push(union(p).setColor([0.3, 0.3, 0.3]).scale([1 / 3, 1 / 3, 1 / 3]).center([true, true, false]).translate([0, 0, thickness]));
  
  var b = o[0].getBounds();
  var m = ${padding};
  var w = b[1].x - b[0].x + m * 2;
  var h = b[1].y - b[0].y + m * 2;
  o.push(cube({size: [w, h, thickness], round: true, radius: 0.5}).translate([b[0].x - m, b[0].y - m, 0]).setColor([0.8, 0.8, 0.8]));
  
  return union(o);
  }
`;

  return signJscad;
}

// // // //

const Index = () => {
  if (typeof window == "undefined" || typeof document == "undefined") {
    return null;
  }

  const DEFAULT_NAME = "Hello, OpenJSCAD!";
  const [name, setName] = React.useState<string>(DEFAULT_NAME);
  const [height, setHeight] = React.useState<number>(4);
  const [padding, setPadding] = React.useState<number>(6);

  return (
    <OpenJSCAD
      outputFileExport="stla"
      viewerOptions={{
        camera: {
          angle: { x: -30, y: 0, z: 0 },
        },
      }}
      jscadScript={getSign({
        name,
        height,
        padding,
      })}
      loadingPlaceholder={() => {
        return (
          <div
            className="card flex justify-center items-center"
            style={{ minHeight: "32rem" }}
          >
            <p>Resizing...</p>
          </div>
        );
      }}
    >
      {(childProps) => {
        return (
          <div className="card">
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full">
              <div className="lg:pr-2 pl-0 flex flex-col justify-between col-span-2 lg:col-span-1">
                <div>
                  <h2 className="text-center text-xl mb-3">
                    Customize 3D Model
                  </h2>
                  <hr />

                  <FormGroup label="Text">
                    <input
                      className="bg-white shadow rounded p-3 w-full border border-gray-200"
                      placeholder="Enter a name"
                      value={name}
                      onChange={(e) => {
                        const updatedName = e.currentTarget.value;
                        setName(updatedName);
                      }}
                    />
                  </FormGroup>

                  <FormGroup label="Height">
                    <input
                      type="range"
                      className="focus:outline-none rounded-xl overflow-hidden appearance-none bg-gray-400 h-5 w-full"
                      step={1}
                      min={2}
                      max={15}
                      value={height}
                      onChange={(e) => {
                        const updatedHeight = Number(e.currentTarget.value);
                        setHeight(updatedHeight);
                      }}
                    />
                  </FormGroup>

                  <FormGroup label="Padding">
                    <input
                      type="range"
                      className="focus:outline-none rounded-xl overflow-hidden appearance-none bg-gray-400 h-5 w-full"
                      step={1}
                      min={0}
                      max={15}
                      value={padding}
                      onChange={(e) => {
                        const updatedPadding = Number(e.currentTarget.value);
                        setPadding(updatedPadding);
                      }}
                    />
                  </FormGroup>
                </div>

                {childProps.outputFile === null ||
                  (childProps.status === "rendering" && (
                    <button
                      className="btn w-full flex justify-center text-center mt-3"
                      disabled
                    >
                      Download and 3D Print
                    </button>
                  ))}

                {childProps.outputFile !== null && (
                  <a
                    className="btn w-full flex justify-center text-center mt-3"
                    download="openjscad-react-export.stl"
                    href={childProps.outputFile.data}
                  >
                    Download and 3D Print
                  </a>
                )}
              </div>

              <div className="col-span-2 lg:pl-2 sm:pl-0 mt-3 lg:mt-0 rounded-xl">
                {/* Example using refs directly */}
                <div
                  ref={childProps.refs.viewerContext}
                  className="rounded-xl bg-white overflow-hidden"
                >
                  <div ref={childProps.refs.viewerDiv} />
                </div>

                {/* Don't forget parametersTable! */}
                <table ref={childProps.refs.parametersTable} />

                <canvas
                  style={{
                    width: "100%",
                    height: "480px",
                  }}
                  ref={childProps.refs.viewerCanvas}
                />
              </div>
            </div>
          </div>
        );
      }}
    </OpenJSCAD>
  );
};

export default Index;
