import { useEffect, useState } from "react";
import api from "../api";

function Admin() {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    loadWithdrawals();
  }, []);

  async function loadWithdrawals() {
    try {
      const res = await api.get(
        "/admin/withdrawals"
      );

      if (res.data.success) {
        setWithdrawals(
          res.data.withdrawals
        );
      }
    } catch (err) {
      console.error(err);
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
      alert("Approve failed");
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
      alert("Reject failed");
    }
  }

  return (
    <div className="p-5 pb-24">
      <h1 className="text-3xl font-bold text-[#F5C542]">
        Admin Panel
      </h1>

      <p className="text-gray-400 mt-1">
        Manage Withdraw Requests
      </p>

      <div className="mt-6">
        {withdrawals.length === 0 ? (
          <div className="bg-[#131C2E] rounded-3xl p-5 text-gray-400">
            No withdrawals found
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