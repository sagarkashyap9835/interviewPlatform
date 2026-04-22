
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AuthModel from "../components/AuthModel";
import { motion } from "motion/react";
import { HiSparkles } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkPdf,
  BsFileEarmarkText,
} from "react-icons/bs";

import evalImg from "../assets/ai-ans.png";
import techImg from "../assets/tech.png";
import resumeImg from "../assets/resume.png";
import hrImg from "../assets/HR.png";
import img1Img from "../assets/img1.png";
import mmImg from "../assets/MM.png";
import pdfImg from "../assets/pdf.png";
import historyImg from "../assets/history.png";
import confiImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />

      <div className="flex-1 px-6 py-20">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
            <HiSparkles
              size={16}
              className="bg-green-50 text-green-600 p-1 rounded-full"
            />
            AI Powered Smart Interview Platform
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
          >
            Practice Interviews with
            <br />
            <span className="relative inline-block mt-3">
              <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
                AI Intelligence
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg"
          >
            Role-based mock interviews with smart follow-ups, adaptive
            difficulty and real-time performance evaluation.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 mb-12">
            <motion.button
              whileHover={{ opacity: 0.85, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition"
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                navigate("/interview");
              }}
            >
              Start Interview
            </motion.button>

            <motion.button
              whileHover={{ opacity: 0.85, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white border px-6 py-3 rounded-lg shadow hover:shadow-md transition"
              onClick={() => navigate("/history")}
            >
              View History
            </motion.button>
          </div>
        </div>
      </div>

      {/* Step Cards */}
      <div className="flex justify-center mb-20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl w-full">
          {[
            {
              icon: <BsRobot size={32} />,
              step: "STEP 1",
              title: "Role & Experience Selection",
              description:
                "AI adjusts difficulty based on selected job role",
              color: "text-green-600 bg-green-50",
              rotate: "-3",
            },
            {
              icon: <BsMic size={32} />,
              step: "STEP 2",
              title: "Smart Voice Interview",
              description:
                "Dynamic follow-up questions based on your answers",
              color: "text-green-600 bg-green-50",
              rotate: "3",
            },
            {
              icon: <BsClock size={32} />,
              step: "STEP 3",
              title: "Timer Based Simulation",
              description:
                "Real interview pressure with time tracking",
              color: "text-green-600 bg-green-50",
              rotate: "-2",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition w-[300px] flex flex-col items-center text-center"
            >
              <div className={`p-4 rounded-full mb-4 ${item.color}`}>
                {item.icon}
              </div>
              <p
                className={`text-xs font-semibold uppercase tracking-wide mb-2 ${
                  item.color.split(" ")[0]
                }`}
              >
                {item.step}
              </p>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------- FIRST SECTION ---------- */}
      <div className="text-center">
        <motion.h2 className="font-semibold text-4xl mb-16 transition">
          Advanced AI{" "}
          <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full">
            Capabilities
          </span>
        </motion.h2>
      </div>

      <div className="flex justify-center mb-20">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
          {[
            {
              image: evalImg,
              icon: <BsBarChart size={28} className="text-green-600" />,
              title: "AI Answer Evaluation",
              desc: "Scores communication, technical accuracy and confidence",
            },
            {
              image: resumeImg,
              icon: (
                <BsFileEarmarkText
                  size={28}
                  className="text-green-600"
                />
              ),
              title: "Resume based interview",
              desc: "PROJECT specific questions based on uploaded resumes",
            },
            {
              image: pdfImg,
              icon: (
                <BsFileEarmarkPdf
                  size={28}
                  className="text-green-600"
                />
              ),
              title: "Download PDF Report",
              desc: "Detailed strengths, weaknesses and improvement insights",
            },
            {
              image: historyImg,
              icon: <BsBarChart size={28} className="text-green-600" />,
              title: "History & Analytics",
              desc: "Track progress with performance graphs and topic analysis",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-10 flex items-center gap-8 w-full max-w-xl mx-auto"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-44 h-44 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col items-start gap-3">
                <div className="p-3 bg-green-50 rounded-full">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-20">
  <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">
    {[
      {
        image: hrImg,
        title: "Technical mode",
        desc: "Behaviour and communication based evaluation",
      },
      {
        image: techImg,
        title: "Deep technical questioning based on selected roles",
        desc: "Basic tones and voice analysis insights",
      },
      {
        image: confiImg,
        title: "Confidence detection",
        desc: "Detailed strengths, weaknesses and improvement insights",
      },
      {
        image: creditImg,
        title: "Credits system",
        desc: "Unlock premium interview system",
      },
    ].map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition 
                   flex items-center justify-between 
                   h-[160px] px-6 py-4"
      >
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center max-w-[65%]">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <img
          src={item.image}
          alt={item.title}
          className="w-32 h-32 object-contain"
        />
      </motion.div>
    ))}
  </div>
</div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        <Footer/>
    </div>
  );
};

export default Home;