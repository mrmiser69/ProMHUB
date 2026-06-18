import { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/Header";
import { getTelegramUserId } from "../utils/telegram";

function Home() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
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
        console.log("Telegram user not found");
        return;
      }

      await api.post("/auth", {
        id: tgUser.id,
        username: tgUser.username || "",
        first_name: tgUser.first_name || "",
      });

      await loadUser();
    } catch (err) {
      console.error("Register Error:", err);
    }
  }

  async function loadUser() {
    try {
      const res = await api.get(`/user/${userId}`);

      if (res.data.success) {
        setUser(res.data.user[0]);
      }
    } catch (err) {
      console.error("Load User Error:", err);
    }
  }

  async function loadFeaturedTasks() {
    try {
      const res = await api.get("/featured-tasks");

      if (res.data.success) {
        setTasks(res.data.tasks);
      }
    } catch (err) {
      console.error("Featured Task Error:", err);
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
          `🎉 You received ${res.data.reward} coins`
        );

        await loadUser();
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Failed to claim daily bonus");
      }
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
                Claim 50 Coin
              </p>
            </div>

            <button
              onClick={handleDailyBonus}
              disabled={loadingBonus}
              className="bg-[#0B1220] text-[#F5C542] px-6 py-4 rounded-2xl font-bold disabled:opacity-50"
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

                    <div className="w-16 h-16 rounded-full bg-gray-500"></div>

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

                    <button
                      onClick={() =>
                        window.open(
                          task.telegram_link,
                          "_blank"
                        )
                      }
                      className="mt-2 bg-[#F5C542] text-black px-4 py-2 rounded-xl font-bold"
                    >
                      Join
                    </button>

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