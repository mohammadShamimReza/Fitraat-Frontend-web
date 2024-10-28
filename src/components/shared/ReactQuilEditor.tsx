"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function ReactQuillEditor({
  valueEditor,
  setValueEditor,
}: {
  valueEditor: any;
  setValueEditor: any;
}) {
  return (
    <ReactQuill
      style={{
        height: "400px",
        marginBottom: "50px",
        marginTop: "5px",
      }}
      theme="snow"
      value={valueEditor}
      onChange={setValueEditor}
    />
  );
}

export default ReactQuillEditor;
