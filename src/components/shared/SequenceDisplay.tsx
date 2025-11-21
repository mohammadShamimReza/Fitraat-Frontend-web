export const SequenceDisplay = ({
  sequence,
  currentStepIndex,
}: {
  sequence: { seconds: number; label: string }[];
  currentStepIndex: number;
}) => {
  const maxVisible = 5; // Number of steps to show at once
  const half = Math.floor(maxVisible / 2);

  let start = Math.max(0, currentStepIndex - half);
  let end = Math.min(sequence.length, start + maxVisible);

  // Adjust start if we are near the end
  if (end - start < maxVisible) {
    start = Math.max(0, end - maxVisible);
  }

  const visibleSequence = sequence.slice(start, end);

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", justifyContent: "center" }}>
      {start > 0 && <span>...</span>}
      {visibleSequence.map((s, i) => {
        const actualIndex = start + i;
        const isActive = actualIndex === currentStepIndex;
        return (
          <span
            key={actualIndex}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              backgroundColor: isActive ? "#fee2e2" : "#f3f4f6",
              color: isActive ? "#b91c1c" : "#374151",
              fontWeight: isActive ? 600 : 400,
              fontSize: isActive ? "12px" : "10px",
              boxShadow: isActive ? "0 0 5px rgba(239, 68, 68, 0.4)" : "none",
                transition: "all 0.2s ease-in-out",
              
            }}
          >
            {s.seconds}s <span style={{ opacity: 0.7 }}>({s.label})</span>
          </span>
        );
      })}
      {end < sequence.length && <span>...</span>}
    </div>
  );
};
