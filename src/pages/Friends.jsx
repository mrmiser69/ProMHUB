import { useEffect, useState } from "react";
import api from "../api";
import { getTelegramUserId } from "../utils/telegram";

function Friends() {
  const [referral, setReferral] = useState(null);

  const userId = getTelegramUserId();

  const inviteLink =
    `https://t.me/PromoHubV10_bot?start=${userId}`;

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

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert("✅ Invite Link Copied");
    } catch (err) {
      console.error(err);
    }
  }

  function shareLink() {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        inviteLink
      )}`,
      "_blank"
    );
  }

  const totalReferrals =
    referral?.referrals || 0;

  const totalEarning =
    totalReferrals * 100;

  return (
    <div className="p-5 pb-24">

      {/* Title */}

      <h1 className="text-[#F5C542] text-4xl font-bold">
        Friends
      </h1>

      <p className="text-gray-400 mt-1">
        Invite friends and earn rewards
      </p>

      {/* Reward Card */}

      <div className="mt-6 bg-[#131C2E] rounded-3xl p-5">

        <p className="text-gray-400 text-sm">
          Reward Per Referral
        </p>

        <h2 className="text-[#F5C542] text-4xl font-bold mt-2">
          100
        </h2>

        <p className="text-gray-400 text-sm">
          Coins
        </p>

      </div>

      {/* Invite Link */}

      <div className="mt-5 bg-[#131C2E] rounded-3xl p-5">

        <h3 className="text-white text-xl font-bold">
          Your Invite Link
        </h3>

        <div className="mt-4 p-3 bg-[#0B1220] rounded-xl break-all text-white text-sm">
          {inviteLink}
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">

          <button
            onClick={copyLink}
            className="bg-[#F5C542] text-black py-3 rounded-2xl font-bold"
          >
            Copy Link
          </button>

          <button
            onClick={shareLink}
            className="bg-[#F5C542] text-black py-3 rounded-2xl font-bold"
          >
            Share Link
          </button>

        </div>

      </div>

      {/* Total Referrals */}

      <div className="mt-5 bg-[#131C2E] rounded-3xl p-5 flex justify-between items-center">

        <span className="text-gray-400">
          Total Referrals
        </span>

        <span className="text-[#F5C542] text-2xl font-bold">
          {totalReferrals}
        </span>

      </div>

      {/* Total Earning */}

      <div className="mt-5 bg-[#131C2E] rounded-3xl p-5 flex justify-between items-center">

        <span className="text-gray-400">
          Total Earnings
        </span>

        <span className="text-[#F5C542] text-2xl font-bold">
          {totalEarning}
        </span>

      </div>

    </div>
  );
}

export default Friends;