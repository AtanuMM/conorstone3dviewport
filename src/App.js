import React from "react";
import CVport from "react-cornerstone-viewport";

let tools = [
  {
    name: "MyCustom",
    mode: "active",
    modeOptions: { mouseButtonMask: 1 }
  },
  { name: "StackScrollMouseWheel", mode: "active" }
];
let imageIds = [
  "dicomweb://raw.githubusercontent.com/Anush-DP/gdcmdata/master/MR-SIEMENS-DICOM-WithOverlays.dcm",
  "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
  "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm"
];
export default function App() {
  return (
    <>
      <CVport
        imageIds={imageIds}
        tools={tools}
        style={{ minWidth: "100%", height: "512px", flex: "1" }}
      />
    </>
  );
}
