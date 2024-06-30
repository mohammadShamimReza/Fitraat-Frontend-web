"use client";
import dynamic from "next/dynamic";
import DeltaStatic from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";

const QuillEditor = ({
  valueEditor,
  setValueEditor,
}: {
  valueEditor: any;
  setValueEditor: any;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const [characterCount, setCharacterCount] = useState(0);
  const characterLimit = 7000;

  useEffect(() => {
    let Quill: any;

    const initializeQuill = async () => {
      if (typeof window !== "undefined") {
        const QuillImport = await import("quill");
        Quill = QuillImport.default;

        if (editorRef.current && !quillRef.current) {
          const options = {
            modules: {
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
              ],
              // Correctly configure the 'limit' module
              limit: {
                maxLength: characterLimit,
                maxDeltaLength: characterLimit,
              },
            },
            placeholder: "Write what you want to say",
            theme: "snow",
          };

          quillRef.current = new Quill(editorRef.current, options);

          quillRef.current.on("text-change", () => {
            setValueEditor(quillRef.current.root.innerHTML);
          });
          quillRef.current.on("text-change", handleTextChange);

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
  }, [characterLimit]);

  const handleTextChange = (
    delta: DeltaStatic,
    oldDelta: DeltaStatic,
    source: string
  ) => {
    const text = quillRef.current?.getText() || "";
    setCharacterCount(text.length);

    if (text.length > characterLimit) {
      // Calculate excess characters
      const excess = text.length - characterLimit;
      // Delete excess characters starting from characterLimit index
      quillRef.current?.deleteText(characterLimit, excess);
    }
  };

  return (
    <div>
      <div
        ref={editorRef}
        style={{
          height: "400px",
          borderRadius: "10px",
          border: "1px solid black",
        }}
      />
      <p>
        Characters written: {characterCount} / {characterLimit}
      </p>
    </div>
  );
};

export default dynamic(() => Promise.resolve(QuillEditor), { ssr: false });
