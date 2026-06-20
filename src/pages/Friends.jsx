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
      alert("Failed to copy link");
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
    <div className="min-h-screen bg-[#0f1da1] pb-24">

      {/* Header */}

      <div className="px-5 pt-5">

        <div className="flex justify-between items-center">

          <h1 className="text-[#F5C542] text-4xl font-bold">
            PromoHub
          </h1>

          <div className="bg-[#F5C542] rounded-full px-6 py-3">
            <span className="text-[#08145A] font-bold text-xl">
              12,458
            </span>

            <span className="text-[#08145A] ml-1 font-semibold">
              COINS
            </span>
          </div>

        </div>

      </div>

      <div className="h-1 bg-[#F5C542] mt-5" />

      {/* Friends Title */}

      <div className="px-5 mt-8 flex justify-between gap-4">

        <div>

          <h2 className="text-[#F5C542] text-6xl font-bold leading-none">
            Friends
          </h2>

          <p className="text-white/80 text-lg mt-2">
            Invite friends and earn rewards
          </p>

        </div>

        <div className="bg-[#08145A] rounded-3xl px-5 py-4 min-w-[180px] text-center">

          <p className="text-white font-semibold">
            Reward Per Referral
          </p>

          <h3 className="text-[#F5C542] text-5xl font-bold mt-2">
            100
          </h3>

          <p className="text-[#F5C542] font-semibold">
            Coins
          </p>

        </div>

      </div>

      {/* Invite Link Card */}

      <div className="mx-5 mt-10 bg-[#08145A] rounded-[32px] p-5">

        <h3 className="text-white text-2xl font-bold">
          Your Invite Link
        </h3>

        <div className="mt-5 bg-black rounded-[28px] p-5 break-all text-white underline text-lg">
          {inviteLink}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <button
            onClick={copyLink}
            className="bg-[#F5C542] text-[#08145A] py-4 rounded-[24px] font-bold text-xl"
          >
            Copy Invite Link
          </button>

          <button
            onClick={shareLink}
            className="bg-[#F5C542] text-[#08145A] py-4 rounded-[24px] font-bold text-xl"
          >
            Share Invite Link
          </button>

        </div>

      </div>

      {/* Total Referrals */}

      <div className="mx-5 mt-8 bg-[#08145A] rounded-[28px] p-6 flex justify-between items-center">

        <span className="text-white text-2xl font-bold">
          Total Referrals
        </span>

        <span className="text-[#F5C542] text-5xl font-bold">
          {totalReferrals}
        </span>

      </div>

      {/* Total Earning */}

      <div className="mx-5 mt-6 bg-[#08145A] rounded-[28px] p-6 flex justify-between items-center">

        <span className="text-white text-2xl font-bold">
          Total Earning
        </span>

        <span className="text-[#F5C542] text-5xl font-bold">
          {totalEarning}
        </span>

      </div>

    </div>
  );
}

export default Friends;