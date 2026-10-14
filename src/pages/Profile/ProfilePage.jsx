// import { useState } from "react";

// export default function ProfilePage() {
//   const [user, setUser] = useState({
//     name: "John Doe",
//     email: "john.doe@example.com",
//     role: "Administrator",
//     joined: "January 2022",
//     avatar: "/user-avatar.png",
//   });

//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState(user);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = () => {
//     setUser(formData);
//     setEditMode(false);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6">Profile</h1>

//       <div className="max-w-lg bg-white rounded-2xl shadow p-6 space-y-4">
//         <div className="flex items-center space-x-4">
//           <img
//             src={user.avatar}
//             alt="Profile"
//             className="w-20 h-20 rounded-full border"
//           />
//           <div>
//             <h2 className="text-xl font-semibold">{user.name}</h2>
//             <p className="text-gray-500">{user.role}</p>
//           </div>
//         </div>

//         <div className="space-y-4 mt-6">
//           <div>
//             <label className="block text-sm text-gray-500">Full Name</label>
//             {editMode ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-3 py-2"
//               />
//             ) : (
//               <p className="text-lg font-medium">{user.name}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm text-gray-500">Email</label>
//             {editMode ? (
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-3 py-2"
//               />
//             ) : (
//               <p className="text-lg font-medium">{user.email}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm text-gray-500">Joined</label>
//             <p className="text-lg font-medium">{user.joined}</p>
//           </div>
//         </div>

//         <div className="pt-4 flex space-x-3">
//           {editMode ? (
//             <>
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditMode(false)}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    gender: "",
    dob: "",
    ssn: "",
    role: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/${user.userId}`);
      const userData = response.data;
      
      setProfile({
        fullName: userData.fullName || "",
        email: userData.email || user.email,
        mobileNo: userData.mobileNo || "",
        gender: userData.gender || "",
        dob: userData.dob || "",
        ssn: userData.ssn || "",
        role: user.roleId === 1 ? "Administrator" : "Case Worker",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Set default values from Redux
      setProfile({
        fullName: "",
        email: user.email,
        mobileNo: "",
        gender: "",
        dob: "",
        ssn: "",
        role: user.roleId === 1 ? "Administrator" : "Case Worker",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      // Convert mobileNo to number if it's a string
      const mobileNoValue = profile.mobileNo ? parseInt(profile.mobileNo, 10) : null;
      
      await axiosInstance.put(`/user/${user.userId}`, {
        fullName: profile.fullName,
        mobileNo: mobileNoValue,
        gender: profile.gender,
        dob: profile.dob,
      });
      
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      
      // Refresh profile to get updated data
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-8">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 shadow">
            <img
              src="/final-image.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{profile.fullName}</h2>
            <p className="text-gray-500">{profile.role}</p>
          </div>
        </div>

        {/* Form Section */}
        <form className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                disabled={!isEditing}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="mt-1 w-full bg-gray-100 border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium text-gray-600">Mobile Number</label>
              <input
                type="text"
                name="mobileNo"
                value={profile.mobileNo}
                disabled={!isEditing}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium text-gray-600">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                disabled={!isEditing}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className="text-sm font-medium text-gray-600">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                disabled={!isEditing}
                onChange={handleChange}
                className="mt-1 w-full border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <input
                type="text"
                name="role"
                value={profile.role}
                disabled
                className="mt-1 w-full bg-gray-100 border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={saveProfile}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
