import { useEffect, useRef, useState } from "react";

const PostContent = ({ postDescription }: { postDescription: string }) => {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const { clientHeight, scrollHeight } = textRef.current;
      if (scrollHeight > clientHeight) {
        setIsClamped(true);
      }
    }
  }, []);

  return (
    <div className="mb-4">
      <div
        ref={textRef}
        className={`prose overflow-hidden transition-all duration-700 ease-in-out small-regular leading-7 tracking-wider text-base ${
          expanded ? "max-h-full" : "max-h-40"
        }`}
        dangerouslySetInnerHTML={{ __html: postDescription }}
        style={{
          maxHeight: expanded ? `${textRef.current?.scrollHeight}px` : "160px",
        }}
      />
      {isClamped && (
        <button
          className="text-blue-500 mt-5"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default PostContent;
