function SortNote({
  selectedTask,
  sort_note,
}: {
  selectedTask: string;
  sort_note: {
    sortNoteContent: string | undefined;
  };
}) {
  return (
    <div>
      {" "}
      {selectedTask === "sortNote" && (
        <p className="">{sort_note?.sortNoteContent}</p>
        /* Add note sorting component here */
      )}
    </div>
  );
}

export default SortNote;
