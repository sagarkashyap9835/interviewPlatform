import React, { useState } from "react";
import { motion } from "motion/react";
import { FaUserTie, FaMicrophoneAlt, FaChartLine, FaFileUpload } from "react-icons/fa";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Step1Setup = ({ onStart }) => {
  const {userData}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");

  const Serverurl = "http://localhost:4000";

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;

    // Check if user is authenticated
    if (!userData) {
      alert("Please login first to upload resume");
      navigate("/auth");
      return;
    }

    setAnalyzing(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const result = await axios.post(
        Serverurl + "/api/interview/resume",
        formData,
        { withCredentials: true }
      );

      setRole(result.data.role || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");

      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (error) {
      console.error("❌ Resume Upload Error:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        serverMessage: error.response?.data?.message,
        serverError: error.response?.data?.error,
        fullError: error
      });
      alert("Resume upload failed: " + (error.response?.data?.message || error.message));
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    if (!userData) {
      alert("Please login first to start interview");
      navigate("/auth");
      return;
    }

    // Check if user has enough credits
    if (userData.credits < 50) {
      alert("You need at least 50 credits to start an interview. Current credits: " + userData.credits);
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(Serverurl + "/api/interview/generate-questions", 
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true }
      );
      console.log("Response 👉", result.data);
      if (userData) {
        dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }));
      }
      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.error("Error starting interview:", error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

       <motion.div
  initial={{ x: -80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center"
>
  <h2 className="text-3xl font-bold mb-3">Start your AI interview</h2>
  <p className="text-gray-600 mb-8">
    Practice real interview scenarios powered by AI. <br />
    Improce communication technicl skills and confidence
  </p>

  <div className="space-y-4">

    <div className="flex items-center bg-white rounded-xl border px-4 py-3 shadow-sm">
      <FaUserTie className="text-green-500 mr-3" />
      <p className="text-gray-700 font-medium">
        Choose role & experience
      </p>
    </div>

    <div className="flex items-center bg-white rounded-xl border px-4 py-3 shadow-sm">
      <FaMicrophoneAlt className="text-green-500 mr-3" />
      <p className="text-gray-700 font-medium">
        Smart voice interaction
      </p>
    </div>

    <div className="flex items-center bg-white rounded-xl border px-4 py-3 shadow-sm">
      <FaChartLine className="text-green-500 mr-3" />
      <p className="text-gray-700 font-medium">
        Performance analysis
      </p>
    </div>

  </div>
</motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-12 bg-green-50 flex flex-col space-y-6"
        >
          <h2 className="text-2xl font-bold">Interview Setup</h2>

          {/* Role */}
          <div className="flex items-center bg-white rounded-xl border px-4 py-3">
            <FaUserTie className="text-green-500 mr-3" />
            <input
              type="text"
              placeholder="Enter your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Experience */}
          <div className="flex items-center bg-white rounded-xl border px-4 py-3">
            <FaMicrophoneAlt className="text-green-500 mr-3" />
            <input
              type="text"
              placeholder="Enter experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Mode */}
          <div className="flex items-center bg-white rounded-xl border px-4 py-3">
            <FaChartLine className="text-green-500 mr-3" />
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full outline-none bg-transparent"
            >
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
            </select>
          </div>

          {/* Resume Upload */}
          {!analysisDone && (
            <div
              className="flex items-center bg-white rounded-xl border px-4 py-4 cursor-pointer gap-3"
              onClick={() => document.getElementById("resumeUpload").click()}
            >
              <FaFileUpload className="text-green-500" />
              <span>
                {resumeFile ? resumeFile.name : "Upload resume (optional)"}
              </span>

              <input
                type="file"
                accept="application/pdf"
                id="resumeUpload"
                className="hidden"
                onChange={(e) => setResumeFile(e.target.files[0])}
              />

              {resumeFile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUploadResume();
                  }}
                  className="ml-auto bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                >
                  {analyzing ? "Analyzing..." : "Analyze"}
                </button>
              )}
            </div>
          )}

          {analysisDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Resume Analysis Result
              </h3>

              {projects.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Projects
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {projects.map((project, index) => (
                      <li
                        key={index}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {skills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Skills
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <li
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          <motion.button
          onClick={handleStart}
            disabled={!role || !experience || loading ||  analyzing}
            className="w-full disabled:bg-gray-400 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold"
          >
            { loading ? "Starting Interview..." : `Start Interview (50 credits)`}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1Setup;