function Reward({ selectedTask }: { selectedTask: string }) {
  return (
    <div>
      {" "}
      {selectedTask === "rewards" && (
        <p className="">
          Stay committed and earn rewards for completing tasks.
        </p>
        /* Add rewards component here */
      )}
    </div>
  );
}

export default Reward;
