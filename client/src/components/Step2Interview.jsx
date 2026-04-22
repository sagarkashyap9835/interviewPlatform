import React, { useState } from 'react'
import { motion } from 'motion/react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Step2Interview = ({ interviewData, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isAnswering, setIsAnswering] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const { userData } = useSelector((state) => state.user)
  const Serverurl = "http://localhost:4000"

  const questions = interviewData?.questions || []

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return

    setIsAnswering(true)
    try {
      const result = await axios.post(
        Serverurl + "/api/interview/submit-answer",
        {
          question: questions[currentQuestion],
          answer: userAnswer,
          questionIndex: currentQuestion
        },
        { withCredentials: true }
      )

      setAnswers([...answers, userAnswer])
      setUserAnswer("")

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // All questions answered - finish interview
        const report = await axios.post(
          Serverurl + "/api/interview/finish",
          { interviewData: { ...interviewData, answers } },
          { withCredentials: true }
        )
        onFinish(report.data)
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    } finally {
      setIsAnswering(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-8 flex items-center justify-center"
    >
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Question {currentQuestion + 1} of {questions.length}</h2>
            <div className="text-sm text-gray-600">
              Progress: {Math.round((currentQuestion + 1) / questions.length * 100)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {questions[currentQuestion]}
          </h3>
        </div>

        <div className="mb-6">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-green-600 outline-none resize-none"
            rows="5"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmitAnswer}
            disabled={!userAnswer.trim() || isAnswering}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            {currentQuestion + 1 === questions.length ? "Finish Interview" : "Next Question"}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Step2Interview