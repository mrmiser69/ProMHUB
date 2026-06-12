import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCoins,
  FaUser,
  FaPlus,
  FaUserFriends
} from "react-icons/fa";

function BottomNav() {
  const location = useLocation();

  const active = "text-[#F5C542]";
  const inactive = "text-gray-400";

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[430px] z-50">

      <div className="h-16 rounded-2xl bg-[#131C2E] border border-[#1E293B] grid grid-cols-5 items-center shadow-lg">

        <Link
          to="/"
          className={`flex flex-col items-center justify-center ${
            location.pathname === "/" ? active : inactive
          }`}
        >
          <FaHome size={18} />
          <span className="text-[11px] mt-1">Home</span>
        </Link>

        <Link
          to="/earn"
          className={`flex flex-col items-center justify-center ${
            location.pathname === "/earn" ? active : inactive
          }`}
        >
          <FaCoins size={18} />
          <span className="text-[11px] mt-1">Earn</span>
        </Link>

        <Link
          to="/promote"
          className="flex items-center justify-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#F5C542] flex items-center justify-center text-[#0B1220] shadow-xl -mt-8">
            <FaPlus size={22} />
          </div>
        </Link>

        <Link
          to="/friends"
          className={`flex flex-col items-center justify-center ${
            location.pathname === "/friends"
              ? active
              : inactive
          }`}
        >
          <FaUserFriends size={18} />
          <span className="text-[11px] mt-1">Friends</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center ${
            location.pathname === "/profile"
              ? active
              : inactive
          }`}
        >
          <FaUser size={18} />
          <span className="text-[11px] mt-1">Profile</span>
        </Link>

      </div>

    </div>
  );
}

export default BottomNav;