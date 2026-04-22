import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../pages/Auth";

const AuthModel = ({ onClose }) => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      onClose && onClose();   // modal close
      navigate("/");          // home page navigate
    }
  }, [userData, onClose, navigate]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <Auth />
      </div>
    </div>
  );
};

export default AuthModel;