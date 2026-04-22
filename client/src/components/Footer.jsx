import React from "react";
import { BsRobot } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 py-6 mt-10">
      <div className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border py-8 px-6">
        
        {/* LEFT CONTENT */}
        <div className="flex items-start gap-3">
          <BsRobot className="text-green-600 text-3xl mt-1" />

          <div>
            <h2 className="text-xl font-fold text-gray-800">
              InterviewIQ.Ai
            </h2>

            <p className="text-gray-500 mt-2 max-w-md leading-relaxed">
              AI powered interview preparation platform designed to improve
              communication skills, technical depth and professional confidence.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;