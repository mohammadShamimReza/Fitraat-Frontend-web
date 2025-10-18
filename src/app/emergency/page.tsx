// "use client";

// import { useGetEnergencyContantQuery } from "@/redux/api/emergencyApi";
// import { Button, message, Steps, theme } from "antd";
// import React, { useEffect, useState } from "react";

// const EmergencyService: React.FC = () => {
//   const { token } = theme.useToken();
//   const [current, setCurrent] = useState(0);

//   const { data } = useGetEnergencyContantQuery(undefined);
//   const total = data?.meta.pagination.total;

//   console.log(data, "this is data");

//   const [emergencyNumber, setEmergencyNumber] = useState<number | null>(null);

//   useEffect(() => {
//     if (total && typeof total === "number") {
//       const randomNumber = Math.floor(Math.random() * total);
//       setEmergencyNumber(randomNumber);
//     } else {
//       console.log("Total is not a valid number");
//     }
//   }, [total]);

//   const steps = [
//     {
//       title: "Emergency Video",
//       content: emergencyNumber !== null && (
//         <div className="flex justify-center items-center h-full w-full">
//           <iframe
//             width="1000"
//             height="380"
//             src={data?.data[emergencyNumber].video.previewUrl}
//             title="Emergency Service Video"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </div>
//       ),
//     },
//     {
//       title: "Important Information",
//       content: emergencyNumber !== null && (
//         <div className="flex flex-col items-center text-lg text-gray-800 font-semibold p-4">
//           {data?.data[emergencyNumber].attributes.message}
//         </div>
//       ),
//     },
//     {
//       title: "Completion & Congratulations",
//       content: (
//         <div className="text-center text-green-500 font-bold text-xl">
//           🎉 Congratulations! You have successfully completed the emergency
//           service steps.
//         </div>
//       ),
//     },
//   ];

//   const next = () => setCurrent(current + 1);
//   const prev = () => setCurrent(current - 1);

//   const items = steps.map((item) => ({ key: item.title, title: item.title }));

//   const contentStyle: React.CSSProperties = {
//     lineHeight: "260px",
//     textAlign: "center",
//     color: token.colorTextTertiary,
//     borderRadius: token.borderRadiusLG,
//     border: `1px dashed ${token.colorBorder}`,
//     padding: 10,
//     marginTop: 16,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "400px",
//     width: "100%",
//     maxWidth: "1000px", // Restrict maximum size
//     backgroundColor: "white",
//     boxSizing: "border-box", // Ensure padding is included in the width calculation
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen px-4 sm:px-8">
//       <h1 className="mb-12 text-xl md:text-3xl">Emergency Help</h1>
//       <Steps
//         current={current}
//         className="flex justify-center mb-6 mt-12"
//         items={items}
//       />

//       <div style={contentStyle}>{steps[current].content}</div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//         }}
//         className="m-10"
//       >
//         {current < steps.length - 1 && (
//           <Button type="primary" onClick={next}>
//             Next
//           </Button>
//         )}
//         {current === steps.length - 1 && (
//           <Button
//             type="primary"
//             onClick={() => {
//               message.success("Emergency Service Completed!"), setCurrent(0);
//             }}
//           >
//             Finish
//           </Button>
//         )}
//         {current > 0 && (
//           <Button style={{ marginLeft: 8 }} onClick={prev}>
//             Previous
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmergencyService;
"use client";

import { useGetEnergencyContantQuery } from "@/redux/api/emergencyApi";
import { Button, message, Steps, theme } from "antd";
import React, { useEffect, useState } from "react";
import FancyLoading from "../loading";

const EmergencyService: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const { data, isLoading } = useGetEnergencyContantQuery(undefined);
  const total = data?.meta.pagination.total ?? 0;
  const [emergencyNumber, setEmergencyNumber] = useState<number | null>(null);

  useEffect(() => {
    if (total > 0) {
      const randomNumber = Math.floor(Math.random() * total);
      setEmergencyNumber(randomNumber);
    }
  }, [total]);

  if (isLoading || !data) {
    return <FancyLoading />;
  }

  // Helper to render quote text cleanly
  const renderQute = () => {
    const qutes = data?.data[emergencyNumber ?? 0]?.qute ?? [];
    if (!qutes.length) return <p>No content available</p>;

    return (
      <div
        className="flex flex-col items-start gap-4 w-full max-w-2xl mx-auto overflow-y-auto p-4"
        style={{
          maxHeight: "350px",
          textAlign: "left",
          lineHeight: 1.7,
        }}
      >
        {qutes.map((para, index) => (
          <p
            key={index}
            className="text-base sm:text-lg text-gray-800 leading-relaxed"
          >
            {para.children.map((child, i) => (
              <span
                key={i}
                style={{
                  fontWeight: child.bold ? "bold" : "normal",
                  whiteSpace: "pre-line",
                }}
              >
                {child.text}
              </span>
            ))}
          </p>
        ))}
      </div>
    );
  };

  const videoUrl =
    emergencyNumber !== null
      ? data?.data[emergencyNumber]?.video?.url || ""
      : "";

  const steps = [
    {
      title: "Video",
      content: videoUrl ? (
        <div className="flex justify-center items-center w-full">
          <video
            className="w-full sm:w-[90%] md:w-[80%] max-w-[900px] rounded-xl shadow-lg"
            controls
            style={{ backgroundColor: "#000" }}
          >
            <source src={`http://localhost:1337${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="text-center text-gray-600">No video available</div>
      ),
    },
    {
      title: " Information",
      content: renderQute(),
    },
    {
      title: "Congratulations",
      content: (
        <div className="text-center text-green-500 font-bold text-xl">
          🎉 You’ve successfully completed this emergency recovery step.
        </div>
      ),
    },
  ];

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    padding: 16,
    marginTop: 24,
    backgroundColor: "white",
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    boxSizing: "border-box",
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 sm:px-6 md:px-8 py-8 ">
      <h1 className="mb-10 text-2xl md:text-3xl font-semibold text-gray-800">
        Emergency Help
      </h1>

      <Steps
        current={current}
        className="flex justify-center mb-6 mt-4 max-w-[600px]"
        items={items}
      />

      <div style={contentStyle}>{steps[current].content}</div>

      <div className="m-10 flex justify-center flex-wrap gap-4">
        {current > 0 && (
          <Button onClick={prev} size="large">
            Previous
          </Button>
        )}
        {current < steps.length - 1 ? (
          <Button type="primary" size="large" onClick={next}>
            Next
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              message.success("Emergency Service Completed!");
              setCurrent(0);
            }}
          >
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmergencyService;
