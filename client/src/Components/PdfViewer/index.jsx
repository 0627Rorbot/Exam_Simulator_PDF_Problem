import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = fileUrl => {
  // const [fileUrl, setFileUrl] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // const onFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setFileUrl(url);
  //   }
  // };

  return (
    <div className="pdf-viewer">
      {/* <input type="file" onChange={onFileChange} /> */}
      {fileUrl && (
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      )}
    </div>
  );
};

export default PdfViewer;
