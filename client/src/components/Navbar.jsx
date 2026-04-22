import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import { BsRobot, BsCoin } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { Serverurl } from "../App";
import AuthModel from "./AuthModel";

function Navbar() {
  const { userData } = useSelector((state) => state.user);

  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        Serverurl + "api/auth/logout",
        {},
        { withCredentials: true }
      );

      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      setShowAuth(false);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BsRobot className="text-2xl text-blue-600" />
            <h1 className="text-lg font-semibold">AI Interview</h1>
          </div>

          <div className="flex items-center gap-3">

            {/* Credits */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  setShowCreditPopup(!showCreditPopup);
                  setShowUserPopup(false);
                }}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
              >
                <BsCoin size={20} />
                {userData?.credits || 0}
              </button>

              {showCreditPopup && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4">
                  <p className="text-sm mb-3">
                    Need more credits to continue interview?
                  </p>
                  <button
                    onClick={() => navigate("/pricing")}
                    className="w-full bg-black text-white py-2 rounded-lg"
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true); // open login modal
                    return;
                  }
                  setShowUserPopup(!showUserPopup);
                  setShowCreditPopup(false);
                }}
                className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center"
              >
                {userData?.name
                  ? userData.name.slice(0, 1).toUpperCase()
                  : <FaUserAstronaut size={16} />}
              </button>

              {showUserPopup && userData && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4">
                  <p className="font-semibold mb-3">{userData?.name}</p>

                  <button
                    onClick={() => navigate("/history")}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                  >
                    Interview History
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-red-500 rounded"
                  >
                    <HiOutlineLogout />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModel onClose={() => setShowAuth(false)} />
      )}
    </>
  );
}

export default Navbar;