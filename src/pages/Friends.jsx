import { useEffect, useState } from "react";
import api from "../api";
import { getTelegramUserId } from "../utils/telegram";

function Friends() {
  const [referral, setReferral] = useState(null);
  const userId = getTelegramUserId();

  useEffect(() => {
    loadReferral();
  }, []);

  async function loadReferral() {
    try {
      const res = await api.get(`/referral/${userId}`);

      if (res.data.success) {
        setReferral(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function copyCode() {
    await navigator.clipboard.writeText(
      referral?.referral_code || ""
    );

    alert("✅ Referral Code Copied");
  }

  return (
    <div className="p-5 pb-24">

      <h1 className="text-3xl font-bold text-[#F5C542]">
        Friends
      </h1>

      <p className="text-gray-400 mt-1">
        Invite friends and earn rewards
      </p>

      <div className="mt-6 bg-[#131C2E] rounded-3xl p-5">

        <p className="text-gray-400">
          Reward Per Referral
        </p>

        <h2 className="text-5xl font-bold text-[#F5C542] mt-2">
          100
        </h2>

        <p className="text-gray-400">
          Coins
        </p>

      </div>

      <div className="mt-5 bg-[#131C2E] rounded-3xl p-5">

        <p className="text-gray-400">
          Your Referral Code
        </p>

        <h2 className="text-4xl font-bold text-white mt-2">
          {referral?.referral_code || "-"}
        </h2>

        <button
          onClick={copyCode}
          className="w-full mt-4 bg-[#F5C542] text-black py-3 rounded-2xl font-bold"
        >
          Copy Code
        </button>

      </div>

      <div className="mt-5 bg-[#131C2E] rounded-3xl p-5">

        <div className="flex justify-between">
          <span className="text-gray-400">
            Total Referrals
          </span>

          <span className="text-[#F5C542] font-bold text-xl">
            {referral?.referrals || 0}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Friends;