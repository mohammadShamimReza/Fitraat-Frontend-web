function Reward({
  selectedTask,
  reward,
}: {
  selectedTask: string;
  reward: {
    rewardContant: string | undefined;
  };
}) {
  return (
    <div>
      {" "}
      {selectedTask === "rewards" && (
        <p className="">{reward?.rewardContant}</p>
        /* Add rewards component here */
      )}
    </div>
  );
}

export default Reward;
