import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Step1Setup from '../components/Step1Setup'
import Step2Interview from '../components/Step2Interview'
import Step3Report from '../components/Step3Report'

const InterviewPage = () => {
    const [step,setState]=useState(1)
    const [interviewData,setInterviewData]=useState(null)
    const { userData } = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!userData) {
            navigate('/auth')
        }
    }, [userData, navigate])

    if (!userData) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p>Please login to continue...</p>
            </div>
        </div>
    }

  return (
    <div className='min-h-screen bg-gray-50'>
        {step==1 && (
            <Step1Setup onStart={(data) =>
                {setInterviewData(data);
                setState(2);
                }} />
        )}
        {step==2 && (
            <Step2Interview interviewData={interviewData} onFinish={(report) => {
                setInterviewData(report);
                setState(3);
            }} />
        )}
        {step==3 && (
            <Step3Report report={interviewData} />
        )}

    </div>
  )
}

export default InterviewPage