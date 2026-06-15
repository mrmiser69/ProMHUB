import { useEffect, useState } from "react";
import api from "../api";
import Header from "../components/Header";
import { getTelegramUserId } from "../utils/telegram";

function Home() {
  const [user, setUser] = useState(null);
  const [loadingBonus, setLoadingBonus] = useState(false);
  const userId = getTelegramUserId();

  useEffect(() => {
    loadUser();
  }, []);

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

  async function handleDailyBonus() {
    try {
      setLoadingBonus(true);

      const res = await api.post(`/daily-bonus/${userId}`);

      if (res.data.success) {
        alert(`🎉 You received ${res.data.reward} coins`);

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
        <h2 className="text-[#F5C542] text-6xl font-bold mt-6">
          {Number(user?.coin ?? 0).toLocaleString()}
        </h2>

        <p className="text-[#F5C542] text-2xl font-semibold">
          COINS
        </p>

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
              {loadingBonus ? "Loading..." : "Claim"}
            </button>
          </div>
        </div>

        {/* Featured Task */}
        <div className="mt-8 bg-[#131C2E] rounded-3xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-400"></div>

            <div>
              <h3 className="text-[#F5C542] text-xl font-bold">
                MM Telegram Bots
              </h3>

              <p className="text-gray-300">
                Join channel to earn
              </p>
            </div>
          </div>

          <span className="text-[#F5C542] text-3xl font-bold">
            +100
          </span>
        </div>

        {/* Video Ads + Invite Friends */}
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