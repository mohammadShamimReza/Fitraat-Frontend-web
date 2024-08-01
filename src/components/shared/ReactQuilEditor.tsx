"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReactQuilEditor({
  valueEditor,
  setValueEditor,
}: {
  valueEditor: any;
  setValueEditor: any;
}) {
  //   const [value, setValue] = useState("");
  console.log(valueEditor);
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

export default ReactQuilEditor;
