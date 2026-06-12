import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const [tapCount, setTapCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");

  function handleLogoTap() {
    const next = tapCount + 1;

    if (next >= 3) {
      setTapCount(0);
      setShowLogin(true);
    } else {
      setTapCount(next);
    }
  }

  function adminLogin() {
    if (password === "123456") {
      setShowLogin(false);
      setPassword("");

      localStorage.setItem(
        "admin_logged_in",
        "true"
      );

      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  }

  return (
    <>
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#F5C542]">

        <h1
          onClick={handleLogoTap}
          className="text-[#F5C542] text-3xl font-bold cursor-pointer"
        >
          PromoHub
        </h1>

        <button className="bg-[#F5C542] text-[#0B1220] px-4 py-2 rounded-full font-semibold">
          🇺🇸 Eng
        </button>

      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#131C2E] p-6 rounded-3xl w-[90%] max-w-sm">

            <h2 className="text-[#F5C542] text-2xl font-bold mb-4">
              Admin Login
            </h2>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              className="w-full bg-[#0B1220] border border-[#1E293B] rounded-xl px-4 py-3 text-white"
            />

            <div className="grid grid-cols-2 gap-3 mt-4">

              <button
                onClick={() =>
                  setShowLogin(false)
                }
                className="bg-gray-600 py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={adminLogin}
                className="bg-[#F5C542] text-black py-3 rounded-xl font-bold"
              >
                Login
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Header;