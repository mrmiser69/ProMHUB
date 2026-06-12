import { useEffect, useState } from "react";
import api from "../api";

function Withdraw() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  const [method, setMethod] = useState("USDT");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
    loadHistory();
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

  async function loadHistory() {
    try {
      const res = await api.get(
        "/withdraw-history/12345"
      );

      if (res.data.success) {
        setHistory(res.data.withdrawals);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function submitWithdraw() {
    try {
      if (!account || !amount) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      const res = await api.post("/withdraw", {
        user_id: 12345,
        method,
        wallet_address: account,
        amount: Number(amount)
      });

      if (res.data.success) {
        alert("✅ Withdrawal Request Submitted");

        setAccount("");
        setAmount("");

        loadUser();
        loadHistory();
      }
    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        alert(err.response.data.error);
      } else {
        alert("Withdraw failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 pb-24">
      <h1 className="text-3xl font-bold text-[#F5C542]">
        Withdraw
      </h1>

      <p className="text-gray-400 mt-1">
        Request a withdrawal
      </p>

      {/* Balance Card */}
      <div className="mt-6 bg-[#131C2E] rounded-3xl p-5">
        <p className="text-gray-400">
          Available Balance
        </p>

        <h2 className="text-5xl font-bold text-[#F5C542] mt-2">
          {user?.coin || 0}
        </h2>

        <p className="text-gray-400">
          Coins
        </p>
      </div>

      {/* Withdraw Form */}
      <div className="mt-5 bg-[#131C2E] rounded-3xl p-5">
        <label className="block text-sm text-gray-400 mb-2">
          Withdraw Method
        </label>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full bg-[#0B1220] border border-[#1E293B] rounded-xl px-4 py-3 text-white"
        >
          <option value="USDT">USDT</option>
          <option value="TON">TON</option>
          <option value="Telegram Stars">
            Telegram Stars
          </option>
        </select>

        <label className="block text-sm text-gray-400 mb-2 mt-4">
          Wallet Address
        </label>

        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Enter wallet address"
          className="w-full bg-[#0B1220] border border-[#1E293B] rounded-xl px-4 py-3 text-white outline-none"
        />

        <label className="block text-sm text-gray-400 mb-2 mt-4">
          Amount
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100"
          className="w-full bg-[#0B1220] border border-[#1E293B] rounded-xl px-4 py-3 text-white outline-none"
        />
      </div>

      <button
        onClick={submitWithdraw}
        disabled={loading}
        className="w-full mt-5 bg-[#F5C542] text-black py-4 rounded-2xl font-bold text-lg disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : "Submit Withdrawal"}
      </button>

      {/* Withdraw History */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-[#F5C542] mb-4">
          Withdraw History
        </h2>

        {history.length === 0 ? (
          <div className="bg-[#131C2E] rounded-3xl p-5 text-gray-400">
            No withdrawals yet
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="bg-[#131C2E] rounded-3xl p-5 mb-3"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-white font-bold">
                    {item.method || "USDT"}
                  </p>

                  <p className="text-gray-400 text-sm break-all">
                    {item.wallet_address}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[#F5C542] font-bold text-xl">
                    {item.amount}
                  </p>

                  <p
                    className={`text-sm capitalize ${
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Withdraw;