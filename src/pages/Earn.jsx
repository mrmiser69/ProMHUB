import { useEffect, useState } from "react";
import api from "../api";

function Earn() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const res = await api.get(
        "/promotions?user_id=12345"
      );

      if (res.data.success) {
        setTasks(res.data.promotions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function joinTask(link) {
    window.open(link, "_blank");
  }

  async function claimReward(promotionId) {
    try {
      setClaiming(promotionId);

      const res = await api.post(
        "/claim-reward",
        {
          user_id: 12345,
          promotion_id: promotionId
        }
      );

      if (res.data.success) {
        alert(
          `🎉 +${res.data.reward} Coins Earned`
        );

        loadTasks();
      } else {
        alert(res.data.error);
      }

    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Failed to claim reward");
      }

    } finally {
      setClaiming(null);
    }
  }

  return (
    <div className="p-5 pb-24">

      <h1 className="text-3xl font-bold text-[#F5C542]">
        Earn Coins
      </h1>

      <p className="text-gray-400 mt-1">
        Complete tasks and earn rewards
      </p>

      <div className="mt-6 bg-[#131C2E] rounded-3xl p-5">
        <h2 className="text-lg text-gray-300">
          Available Tasks
        </h2>

        <p className="text-4xl font-bold text-[#F5C542] mt-2">
          {tasks.length}
        </p>
      </div>

      {loading && (
        <div className="mt-6 text-center text-gray-400">
          Loading...
        </div>
      )}

      {!loading && tasks.length === 0 && (
        <div className="mt-6 bg-[#131C2E] rounded-3xl p-5">
          <p className="text-gray-400">
            No tasks available yet.
          </p>
        </div>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="mt-4 bg-[#131C2E] rounded-3xl p-5"
        >
          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-xl font-bold text-white">
                {task.title}
              </h3>

              <p className="text-gray-400 mt-1">
                {task.description}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                {task.completed_slots || 0}
                /
                {task.total_slots || 0}
                {" "}
                Completed
              </p>
            </div>

            <div className="text-right">
              <p className="text-[#F5C542] text-2xl font-bold">
                +{task.reward}
              </p>

              <p className="text-gray-400 text-sm">
                Coins
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">

            <button
              onClick={() =>
                joinTask(task.target_link)
              }
              className="bg-[#1E293B] text-white py-3 rounded-2xl font-bold"
            >
              Join
            </button>

            <button
              onClick={() =>
                claimReward(task.id)
              }
              disabled={
                claiming === task.id
              }
              className="bg-[#F5C542] text-black py-3 rounded-2xl font-bold disabled:opacity-50"
            >
              {claiming === task.id
                ? "Claiming..."
                : "Claim Reward"}
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default Earn;