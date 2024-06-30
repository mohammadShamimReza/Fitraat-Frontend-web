import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

const QuillEditor = ({
  valueEditor,
  setValueEditor,
}: {
  valueEditor: any;
  setValueEditor: any;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    let Quill: any;

    const initializeQuill = async () => {
      if (typeof window !== "undefined") {
        const QuillImport = await import("quill");
        Quill = QuillImport.default;

        if (editorRef.current && !quillRef.current) {
          const options = {
            debug: "info",
            modules: {
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                ["image", "code-block"],
              ],
            },
            placeholder: "Write what you want to say",
            theme: "snow",
          };
          quillRef.current = new Quill(editorRef.current, options);

          quillRef.current.on("text-change", () => {
            setValueEditor(quillRef.current.root.innerHTML);
          });

          // Apply Tailwind classes to the toolbar
          const toolbar = document.querySelector(".ql-toolbar");
          if (toolbar) {
            toolbar.classList.add("rounded-lg");
            toolbar.classList.add("mb-3");
          }
        }
      }
    };

    initializeQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={editorRef}
      style={{
        height: "400px",
        borderRadius: "10px",
        border: "1px solid black",
      }}
    />
  );
};

export default dynamic(() => Promise.resolve(QuillEditor), { ssr: false });
