import { useEffect, useState } from "react";
import api from "../api";

function Admin() {
  const [withdrawals, setWithdrawals] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [reward, setReward] = useState(100);

  useEffect(() => {
    loadWithdrawals();
    loadTasks();
  }, []);

  async function loadWithdrawals() {
    try {
      const res = await api.get("/admin/withdrawals");

      if (res.data.success) {
        setWithdrawals(res.data.withdrawals);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loadTasks() {
    try {
      const res = await api.get("/featured-tasks");

      if (res.data.success) {
        setTasks(res.data.tasks);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function createTask() {
    try {
      const res = await api.post("/featured-tasks", {
        title,
        telegram_link: telegramLink,
        reward,
        photo_url: null,
      });

      if (res.data.success) {
        alert("✅ Task Created");

        setTitle("");
        setTelegramLink("");
        setReward(100);

        loadTasks();
      }
    } catch (err) {
      console.error(err);
      alert("Create Task Failed");
    }
  }

  async function deleteTask(id) {
    try {
      const res = await api.delete(`/featured-tasks/${id}`);

      if (res.data.success) {
        alert("🗑 Task Deleted");
        loadTasks();
      }
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  }

  async function approveWithdraw(id) {
    try {
      const res = await api.post(
        `/admin/withdrawals/approve/${id}`
      );

      if (res.data.success) {
        alert("✅ Withdrawal Approved");
        loadWithdrawals();
      }
    } catch (err) {
      console.error(err);
      alert("Approve Failed");
    }
  }

  async function rejectWithdraw(id) {
    try {
      const res = await api.post(
        `/admin/withdrawals/reject/${id}`
      );

      if (res.data.success) {
        alert("❌ Withdrawal Rejected");
        loadWithdrawals();
      }
    } catch (err) {
      console.error(err);
      alert("Reject Failed");
    }
  }

  return (
    <div className="p-5 pb-24">
      <h1 className="text-3xl font-bold text-[#F5C542]">
        Admin Panel
      </h1>

      <p className="text-gray-400 mt-1">
        Manage PromoHub
      </p>

      {/* Create Task */}

      <div className="bg-[#131C2E] rounded-3xl p-5 mt-6">
        <h2 className="text-xl font-bold text-[#F5C542]">
          Create Featured Task
        </h2>

        <input
          type="text"
          placeholder="Task Name"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full mt-4 bg-[#0B1220] rounded-xl p-3 text-white"
        />

        <input
          type="text"
          placeholder="Telegram Link"
          value={telegramLink}
          onChange={(e) =>
            setTelegramLink(e.target.value)
          }
          className="w-full mt-3 bg-[#0B1220] rounded-xl p-3 text-white"
        />

        <input
          type="number"
          placeholder="Reward"
          value={reward}
          onChange={(e) =>
            setReward(Number(e.target.value))
          }
          className="w-full mt-3 bg-[#0B1220] rounded-xl p-3 text-white"
        />

        <button
          onClick={createTask}
          className="w-full mt-4 bg-[#F5C542] text-black py-3 rounded-xl font-bold"
        >
          Create Task
        </button>
      </div>

      {/* Featured Tasks */}

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Featured Tasks
        </h2>

        {tasks.length === 0 ? (
          <div className="bg-[#131C2E] rounded-3xl p-5 text-gray-400">
            No Tasks Found
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#131C2E] rounded-3xl p-5 mb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-bold">
                    {task.title}
                  </p>

                  <p className="text-gray-400 text-sm break-all">
                    {task.telegram_link}
                  </p>

                  <p className="text-[#F5C542] mt-2">
                    Reward: {task.reward}
                  </p>
                </div>

                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  className="bg-red-500 px-4 py-2 rounded-xl text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Withdraw Requests */}

      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Withdraw Requests
        </h2>

        {withdrawals.length === 0 ? (
          <div className="bg-[#131C2E] rounded-3xl p-5 text-gray-400">
            No Withdrawals Found
          </div>
        ) : (
          withdrawals.map((item) => (
            <div
              key={item.id}
              className="bg-[#131C2E] rounded-3xl p-5 mb-4"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-white font-bold">
                    User #{item.user_id}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {item.method}
                  </p>

                  <p className="text-gray-400 text-sm break-all">
                    {item.wallet_address}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[#F5C542] text-2xl font-bold">
                    {item.amount}
                  </p>

                  <p
                    className={`capitalize ${
                      item.status === "approved"
                        ? "text-green-400"
                        : item.status === "rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              </div>

              {item.status === "pending" && (
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button
                    onClick={() =>
                      approveWithdraw(item.id)
                    }
                    className="bg-green-500 text-white py-3 rounded-xl font-bold"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      rejectWithdraw(item.id)
                    }
                    className="bg-red-500 text-white py-3 rounded-xl font-bold"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;