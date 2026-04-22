import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { BsDownload } from 'react-icons/bs'

const Step3Report = ({ report }) => {
  const navigate = useNavigate()

  const metrics = report?.metrics || {}
  const feedback = report?.feedback || {}
  const summary = report?.summary || ""

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Interview Report</h1>
          <p className="text-gray-600">Your performance analysis</p>
        </div>

        {/* Score Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {metrics.overallScore || "N/A"}%
              </div>
              <p className="text-gray-600">Overall Score</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {metrics.communicationScore || "N/A"}%
              </div>
              <p className="text-gray-600">Communication</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {metrics.technicalScore || "N/A"}%
              </div>
              <p className="text-gray-600">Technical</p>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            {summary || "No summary available"}
          </p>
        </motion.div>

        {/* Feedback */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Strengths</h3>
              <p className="text-gray-700">
                {feedback.strengths || "No strengths highlighted"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-600 mb-2">Areas for Improvement</h3>
              <p className="text-gray-700">
                {feedback.improvements || "No improvements suggested"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Start New Interview
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 flex items-center gap-2"
          >
            <BsDownload /> Download Report
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default Step3Report