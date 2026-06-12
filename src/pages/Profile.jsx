import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Profile() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const res = await api.get("/user/12345");

      if (res.data.success) {
        setUser(res.data.user[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-5 pb-24">

      <h1 className="text-3xl font-bold text-[#F5C542]">
        Profile
      </h1>

      <p className="text-gray-400 mt-1">
        Your account information
      </p>

      {/* User Card */}
      <div className="mt-6 bg-[#131C2E] rounded-3xl p-5">

        <div className="w-20 h-20 rounded-full bg-[#F5C542] flex items-center justify-center text-black text-3xl font-bold">
          {user?.first_name?.charAt(0) || "U"}
        </div>

        <h2 className="text-2xl font-bold text-white mt-4">
          {user?.first_name || "User"}
        </h2>

        <p className="text-gray-400">
          @{user?.username || "username"}
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-5">

        <div className="bg-[#131C2E] rounded-3xl p-4">
          <p className="text-gray-400 text-sm">
            Coin Balance
          </p>

          <h3 className="text-[#F5C542] text-3xl font-bold mt-2">
            {user?.coin || 0}
          </h3>
        </div>

        <div className="bg-[#131C2E] rounded-3xl p-4">
          <p className="text-gray-400 text-sm">
            Total Earned
          </p>

          <h3 className="text-[#F5C542] text-3xl font-bold mt-2">
            {user?.total_earned || 0}
          </h3>
        </div>

        <div className="bg-[#131C2E] rounded-3xl p-4">
          <p className="text-gray-400 text-sm">
            Total Spent
          </p>

          <h3 className="text-[#F5C542] text-3xl font-bold mt-2">
            {user?.total_spent || 0}
          </h3>
        </div>

        <div className="bg-[#131C2E] rounded-3xl p-4">
          <p className="text-gray-400 text-sm">
            Referrals
          </p>

          <h3 className="text-[#F5C542] text-3xl font-bold mt-2">
            {user?.referrals || 0}
          </h3>
        </div>

      </div>

      {/* Activity */}
      <div className="mt-5 bg-[#131C2E] rounded-3xl p-5">

        <div className="flex justify-between py-2">
          <span className="text-gray-400">
            Joined Tasks
          </span>

          <span className="text-white font-bold">
            {user?.joined_tasks || 0}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-400">
            Promoted Tasks
          </span>

          <span className="text-white font-bold">
            {user?.promoted_tasks || 0}
          </span>
        </div>

      </div>

      {/* Withdraw Button */}
      <button
        onClick={() => navigate("/withdraw")}
        className="w-full mt-5 bg-[#F5C542] text-black py-4 rounded-2xl font-bold text-lg"
      >
        Withdraw Coins
      </button>

    </div>
  );
}

export default Profile;