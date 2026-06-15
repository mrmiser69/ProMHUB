import { useState } from "react";
import api from "../api";
import { getTelegramUserId } from "../utils/telegram";

function Promote() {
  const [link, setLink] = useState("");
  const [reward, setReward] = useState("");
  const [joins, setJoins] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = getTelegramUserId();

  const totalCost =
    Number(reward || 0) * Number(joins || 0);

  async function createPromotion() {
    try {
      if (!link || !reward || !joins) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const res = await api.post("/promotions", {
        owner_id: userId,
        title: "Telegram Promotion",
        target_link: link,
        reward: Number(reward),
        total_slots: Number(joins),
        description: "Created from PromoHub"
      });

      if (res.data.success) {
        alert("✅ Promotion created successfully");

        setLink("");
        setReward("");
        setJoins("");
      }
    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Failed to create promotion");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 pb-24">

      <h1 className="text-3xl font-bold text-[#F5C542]">
        Promote
      </h1>

      <p className="text-gray-400 mt-1">
        Create a promotion task
      </p>

      <div className="mt-6 bg-[#131C2E] rounded-3xl p-5">

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Channel / Group Link
          </label>

          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://t.me/yourchannel"
            className="w-full bg-[#0B1220] border border-[#1E293B] rounded-xl px-4 py-3 text-white outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-400 mb-2">
            Reward Per Join
          </label>

          <input
            type="number"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            placeholder="100"
            className="w-full bg-[#0B1220] border border-[#1E293B] rounded-xl px-4 py-3 text-white outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-400 mb-2">
            Number Of Joins
          </label>

          <input
            type="number"
            value={joins}
            onChange={(e) => setJoins(e.target.value)}
            placeholder="50"
            className="w-full bg-[#0B1220] border border-[#1E293B] rounded-xl px-4 py-3 text-white outline-none"
          />
        </div>

      </div>

      <div className="mt-5 bg-[#131C2E] rounded-3xl p-5">

        <p className="text-gray-400">
          Total Cost
        </p>

        <h2 className="text-4xl font-bold text-[#F5C542] mt-2">
          {totalCost}
        </h2>

        <p className="text-gray-400 mt-1">
          Coins
        </p>

      </div>

      <button
        onClick={createPromotion}
        disabled={loading}
        className="w-full mt-5 bg-[#F5C542] text-black py-4 rounded-2xl font-bold text-lg disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Promotion"}
      </button>

    </div>
  );
}

export default Promote;