import { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/Header";
import { getTelegramUserId } from "../utils/telegram";

function Home() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState({});
  const [loadingBonus, setLoadingBonus] = useState(false);

  const userId = getTelegramUserId();

  useEffect(() => {
    registerUser();
    loadFeaturedTasks();
  }, []);

  async function registerUser() {
    try {
      const tgUser =
        window.Telegram?.WebApp?.initDataUnsafe?.user;

      if (!tgUser) {
        return;
      }

      await api.post("/auth", {
        id: tgUser.id,
        username: tgUser.username || "",
        first_name: tgUser.first_name || "",
      });

      await loadUser();
    } catch (err) {
      console.error(err);
    }
  }

  async function loadUser() {
    try {
      const res = await api.get(`/user/${userId}`);

      if (res.data.success) {
        setUser(res.data.user[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loadFeaturedTasks() {
    try {
      const res = await api.get("/featured-tasks");

      if (res.data.success) {
        setTasks(res.data.tasks);

        await loadTaskStatus(
          res.data.tasks
        );
      }

    } catch (err) {
      console.error(err);
    }
  }

  async function handleJoin(task) {
    try {
      await api.post("/task-status/join", {
        user_id: userId,
        task_id: task.id,
      });

      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openTelegramLink(
          task.telegram_link
        );
      } else {
        window.open(
          task.telegram_link,
          "_blank"
        );
      }

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    
    } catch (err) {
      console.error(err);
    }
  }

  async function loadTaskStatus(tasksData) {
    try {
      const statusMap = {};

      for (const task of tasksData) {
        const statusRes = await api.get(
          `/task-status/${userId}/${task.id}`
        );

        if (statusRes.data.claimed) {
          statusMap[task.id] = "claimed";
          continue;
        }

        const verifyRes = await api.post(
          "/verify-task",
          {
            user_id: userId,
            telegram_link: task.telegram_link,
          }
        );

        if (
          verifyRes.data.success &&
          verifyRes.data.joined
        ) {
          statusMap[task.id] = "claim";
        } else {
          statusMap[task.id] = "join";
        }
      }

      setTaskStatus(statusMap);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleClaim(task) {
    try {
      const res = await api.post(
        "/claim-task",
        {
          user_id: userId,
          task_id: task.id,
        }
      );

      if (res.data.success) {
        alert(
          `🎉 +${res.data.reward} Coins`
        );

        await loadUser();

        setTaskStatus((prev) => ({
          ...prev,
          [task.id]: "claimed",
        }));
      }
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        "Claim failed"
      );
    }
  }

  async function handleDailyBonus() {
    try {
      setLoadingBonus(true);

      const res = await api.post(
        `/daily-bonus/${userId}`
      );

      if (res.data.success) {
        alert(
          `🎉 You received ${res.data.reward} Coins`
        );

        await loadUser();
      }
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.error ||
        "Failed to claim daily bonus"
      );
    } finally {
      setLoadingBonus(false);
    }
  }

  return (
    <div className="pb-28">
      <Header />

      <div className="p-5">

        {/* Coin Balance */}

        <div className="mt-6 flex items-end gap-3">
          <h2 className="text-[#F5C542] text-6xl font-bold">
            {Number(
              user?.coin ?? 0
            ).toLocaleString()}
          </h2>

          <span className="text-[#F5C542] text-2xl font-semibold mb-2">
            Coins
          </span>
        </div>

        {/* Daily Bonus */}

        <div className="mt-8 bg-[#F5C542] rounded-3xl p-6">
          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-[#0B1220] text-3xl font-bold">
                Daily Bonus
              </h3>

              <p className="text-[#0B1220] mt-2">
                Claim 50 Coins
              </p>
            </div>

            <button
              onClick={handleDailyBonus}
              disabled={loadingBonus}
              className="bg-[#0B1220] text-[#F5C542] px-6 py-4 rounded-2xl font-bold"
            >
              {loadingBonus
                ? "Loading..."
                : "Claim"}
            </button>

          </div>
        </div>

        {/* Featured Tasks */}

        <div className="mt-8">

          <h2 className="text-white text-xl font-bold mb-4">
            Featured Tasks
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-[#131C2E] rounded-3xl p-5 text-gray-400">
              No Featured Tasks
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-[#131C2E] rounded-3xl p-5 mb-4"
              >
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        task.photo_url ||
                        "https://placehold.co/100"
                      }
                      alt={task.title}
                      className="w-16 h-16 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="text-[#F5C542] text-xl font-bold">
                        {task.title}
                      </h3>

                      <p className="text-gray-300 text-sm">
                        Join channel to earn
                      </p>
                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-[#F5C542] text-2xl font-bold">
                      +{task.reward}
                    </p>

                    {taskStatus[task.id] ===
                    "claimed" ? (
                      <button
                        disabled
                        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-xl font-bold cursor-not-allowed"
                      >
                        Claimed
                      </button>
                    ) : taskStatus[
                        task.id
                      ] === "claim" ? (
                      <button
                        onClick={() =>
                          handleClaim(task)
                        }
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
                      >
                        Claim
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleJoin(task)
                        }
                        className="mt-2 bg-[#F5C542] text-black px-4 py-2 rounded-xl font-bold"
                      >
                        Join
                      </button>
                    )}

                  </div>

                </div>
              </div>
            ))
          )}

        </div>

        {/* Bottom Cards */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="bg-[#131C2E] rounded-3xl p-5">
            <h3 className="text-[#F5C542] text-xl font-bold">
              Video Ads
            </h3>

            <p className="text-gray-300 mt-2">
              Watch & Earn
            </p>
          </div>

          <div className="bg-[#131C2E] rounded-3xl p-5">
            <h3 className="text-[#F5C542] text-xl font-bold">
              Invite Friends
            </h3>

            <p className="text-gray-300 mt-2">
              Invite & Earn
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;