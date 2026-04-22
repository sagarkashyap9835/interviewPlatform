// import React from 'react'
// import { BsRobot } from "react-icons/bs";
// import { IoSparkles } from "react-icons/io5";
// import { FcGoogle } from "react-icons/fc";
// import { motion } from "framer-motion";
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../utils/firebase';
// import { Serverurl } from '../App';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { setUserData } from '../redux/userSlice';
// function Auth(isModel=false) {
//   const dispatch=useDispatch();
//     const handleGoogleAuth =async () => {
//         try {
//            const response=await signInWithPopup(auth,provider);
//         //    console.log(response); 
//         let User=response.user;
//         let name=User.displayName;
//         let email=User.email;
//         const result=await axios.post(Serverurl+"api/auth/google",{
//             name,email
//         },{withCredentials:true})
//         // console.log(result.data);
//         dispatch(setUserData(result.data))

//         } catch (error) {
//             console.error("Error signing in with Google:", error);
//              dispatch(setUserData(null))
//         }
//     }
//   return (
//     <div className='w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20'>
      
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className='w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200'
//       >
        
//         {/* Logo + Title */}
//         <div className='flex items-center justify-center gap-2 mb-6'>
//           <div className='bg-black text-white p-2 rounded-lg flex items-center justify-center'>
//             <BsRobot size={20} />
//           </div>
//           <h2 className='text-2xl font-bold'>InterViewIQ.AI</h2>
//         </div>

//         {/* Heading */}
//         <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
//           Continue with{" "}
//           <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
//             <IoSparkles size={16}/>
//             AI Smart Interview
//           </span>
//         </h1>

//         {/* Description */}
//         <p className='text-gray-600 text-center text-sm leading-relaxed'>
//           Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
//         </p>

//         {/* Google Button */}
//         <motion.button
//         onClick={handleGoogleAuth}
//           whileHover={{ opacity: 0.85, scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           className="w-full mt-6 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition"
//         >
//           <FcGoogle size={20} />
//           Continue with Google
//         </motion.button>

//       </motion.div>
//     </div>
//   )
// }

// export default Auth;

import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { Serverurl } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth() {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      console.log("🔵 Starting Google sign-in...");
      
      const response = await signInWithPopup(auth, provider);
      console.log("✅ Google sign-in successful:", response.user.email);

      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        Serverurl + "api/auth/google",
        { name, email },
        { withCredentials: true }
      );

      console.log("✅ Server response:", result.data);
      dispatch(setUserData(result.data.user || result.data));

    } catch (error) {
      console.error("❌ Google sign-in error:", {
        code: error.code,
        message: error.message,
        customData: error.customData,
        fullError: error
      });
      
      // Show only genuine errors, not user cancellation
      if (error.code !== 'auth/popup-closed-by-user') {
        alert("Sign-in failed: " + error.message);
      }
      dispatch(setUserData(null));
    }
  };

  return (
    <div className='w-full flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200'
      >
        
        <div className='flex items-center justify-center gap-2 mb-6'>
          <div className='bg-black text-white p-2 rounded-lg'>
            <BsRobot size={20} />
          </div>
          <h2 className='text-2xl font-bold'>InterViewIQ.AI</h2>
        </div>

        <h1 className='text-2xl font-semibold text-center mb-4'>
          Continue with{" "}
          <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
            <IoSparkles size={16}/>
            AI Smart Interview
          </span>
        </h1>

        <p className='text-gray-600 text-center text-sm'>
          Sign in to start AI-powered mock interviews.
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-6 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-3"
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>

      </motion.div>
    </div>
  )
}

export default Auth;