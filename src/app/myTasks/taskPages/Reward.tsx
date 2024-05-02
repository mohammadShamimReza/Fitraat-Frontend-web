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
        <p className="text-center text-red-500">{reward?.rewardContant}</p>
        /* Add rewards component here */
      )}
    </div>
  );
}

export default Reward;
