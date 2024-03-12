function SortNote({ selectedTask }: { selectedTask: string }) {
  return (
    <div>
      {" "}
      {selectedTask === "sortNote" && (
        <p className="">
          Reflect on your progress and thoughts with short note-taking
          exercises.
        </p>
        /* Add note sorting component here */
      )}
    </div>
  );
}

export default SortNote;
