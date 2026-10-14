// // import React, { useState } from "react";
// // // import { recoverPassword } from "../services/authService";
// // import { recoverPassword } from "../Services/Login+Unlock+Dashboard/auth-service";
// // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // export default function RecoverPassword({ navigateToUnlock }) {
// //   const [email, setEmail] = useState("");

// //   const handleRecover = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await recoverPassword(email);
// //       toast.success("Recovery email sent successfully!");
// //       navigateToUnlock(email); // redirect user to unlock page next
// //     } catch (error) {
// //       if (error.response?.status === 404) {
// //         toast.error("Email not found!");
// //       } else {
// //         toast.error("Failed to send recovery email.");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //       <ToastContainer />
// //       <div className="bg-white shadow-lg p-8 rounded-2xl w-96">
// //         <h2 className="text-2xl font-bold text-center mb-6">Recover Password</h2>
// //         <form onSubmit={handleRecover}>
// //           <label className="block mb-2 font-medium">Enter your registered email</label>
// //           <input
// //             type="email"
// //             placeholder="you@example.com"
// //             className="w-full border p-2 rounded-md mb-4"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />
// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
// //           >
// //             Send Recovery Email
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// //import { recoverPassword } from "../Services/Login+Unlock+Dashboard/auth-service";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // export default function RecoverPassword({ navigateToUnlock }) {
// //   const [email, setEmail] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleRecover = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       await recoverPassword(email);
// //       console.log("Recovery email sent successfully!");
// //       toast.success("Recovery email sent successfully!");
// //       navigateToUnlock(email);
// //     } catch (error) {
// //       if (error.response?.status === 404) {
// //         toast.error("Email not found!");
// //         console.log("Email not found!");
// //       } else {
// //         toast.error("Failed to send recovery email.");
// //         console.log("Failed to send recovery email.");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// import { sendOtp } from "../Services/Forget Password/forget-password"; // Your API call to send OTP

// export default function RecoverPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle change in email input
//   const handleChange = (e) => {
//     setEmail(e.target.value);
//   };

//   // Handle form submission to send OTP
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if the email is provided
//     if (!email) {
//       setMessage("Email is required.");
//       return;
//     }

//     setLoading(true);
//     setMessage(""); // Clear previous messages

//     try {
//       // Call the API to send OTP
//       const response = await sendOtp(email);
      
//       // If the API response indicates success
//       if (response.status === "OTP_SENT") {
//         setMessage("OTP sent successfully to your email!");
//       } else {
//         setMessage("Failed to send OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setMessage("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <ToastContainer position="top-center" autoClose={3000} theme="colored" />
//       <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-gray-100">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           Recover Password
//         </h2>

//         <form onSubmit={handleRecover} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Enter your registered email
//             </label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/** Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-indigo-500 text-white font-semibold rounded-lg py-2 transition-all ${
//               loading ? "opacity-60 cursor-not-allowed" : "hover:bg-indigo-600"
//             }`}
//           >
//             {loading ? "Sending..." : "Send Recovery Email"}
//           </button>

//           {/** Back to Login Link */}
//           <div className="text-center mt-4">
//             <a
//               href="/"
//               className="text-sm text-gray-700 hover:text-indigo-600 font-medium"
//             >
//               ← Back to Login
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
