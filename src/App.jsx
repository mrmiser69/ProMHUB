import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Earn from "./pages/Earn";
import Promote from "./pages/Promote";
import Withdraw from "./pages/Withdraw";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Friends from "./pages/Friends";

import BottomNav from "./components/BottomNav";

function App() {

  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex justify-center">
      <div className="w-full max-w-md min-h-screen relative">

        <div
          key={location.pathname}
          className="animate-page"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/earn" element={<Earn />} />
            <Route path="/promote" element={<Promote />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </div>

        <BottomNav />

      </div>
    </div>
  );
}

export default App;