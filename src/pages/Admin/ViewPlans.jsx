
// soft coded data
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { getPlans, updatePlanStatus } from "../../Services/Plan Services/plan-services"
// import { Pencil, Trash2, Check, X } from "lucide-react";

// export default function ViewPlans() {
//   const [plans, setPlans] = useState([]);

//   // ✅ Load all plans
//   const loadPlans = async () => {
//     try {
//       const data = await getPlans();
//       setPlans(data);
//     } catch (err) {
//       console.error("Error loading plans:", err);
//       toast.error("Failed to load plans!");
//     }
//   };

//   useEffect(() => {
//     loadPlans();
//   }, []);

//   // ✅ FIXED: Toggle plan status with correct field mapping
//   const toggleActive = async (planId, currentActiveSw) => {
//     // ✅ Send Y/N to backend (not "Active"/"InActive")
//     const newActiveSw = currentActiveSw === "Y" ? "N" : "Y";
    
//     try {
//       await updatePlanStatus(planId, newActiveSw);
      
//       setPlans((prev) =>
//         prev.map((plan) =>
//           plan.planId === planId 
//             ? { ...plan, activeSw: newActiveSw }  // ✅ FIXED: Use activeSw field
//             : plan
//         )
//       );
      
//       toast.success(`Plan ${newActiveSw === "Y" ? "Activated" : "Deactivated"} successfully!`);
//     } catch (err) {
//       console.error("Error updating plan status:", err);
//       toast.error("Failed to update plan status!");
//     }
//   };

//   // ✅ Delete plan (commented out - no backend endpoint yet)
//   const deletePlan = async (planId) => {
//     // TODO: Implement delete endpoint in backend first
//     toast.info("Delete functionality not implemented yet");
    
//     // if (window.confirm("Are you sure you want to delete this plan?")) {
//     //   try {
//     //     await deletePlanById(planId);
//     //     setPlans((prev) => prev.filter((p) => p.planId !== planId));
//     //     toast.success("Plan deleted successfully!");
//     //   } catch (err) {
//     //     console.error("Error deleting plan:", err);
//     //     toast.error("Failed to delete plan!");
//     //   }
//     // }
//   };

//   // ✅ Edit handler
//   const handleEdit = (id) => {
//     toast.info(`Edit Plan ID: ${id}`);
//   };

//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Plans</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
//           <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
//             <tr>
//               <th className="py-3 px-4 text-left">S.No</th>
//               <th className="py-3 px-4 text-left">Plan Name</th>
//               <th className="py-3 px-4 text-left">Start Date</th>
//               <th className="py-3 px-4 text-left">End Date</th>
//               <th className="py-3 px-4 text-left">Category</th>
//               <th className="py-3 px-4 text-left">Status</th>
//               <th className="py-3 px-4 text-center">Edit</th>
//               <th className="py-3 px-4 text-center">Delete</th>
//               <th className="py-3 px-4 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody className="text-gray-600">
//             {plans.length > 0 ? (
//               plans.map((plan, index) => (
//                 <tr
//                   key={plan.planId}
//                   className="border-t hover:bg-gray-50 transition-all"
//                 >
//                   <td className="py-3 px-4">{index + 1}</td>
//                   <td className="py-3 px-4">{plan.planName}</td>
//                   <td className="py-3 px-4">{plan.planStartDate}</td>
//                   <td className="py-3 px-4">{plan.planEndDate}</td>
//                   <td className="py-3 px-4">{plan.planCategory || "-"}</td>
//                   <td className="py-3 px-4">{plan.activeSw === "Y" ? "Active" : "Inactive"}</td>  {/* ✅ FIXED: Display friendly text */}

//                   <td className="py-3 px-4 text-center">
//                     <button
//                       onClick={() => handleEdit(plan.planId)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2"
//                     >
//                       <Pencil size={16} />
//                     </button>
//                   </td>

//                   <td className="py-3 px-4 text-center">
//                     <button
//                       onClick={() => deletePlan(plan.planId)}
//                       className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>

//                   <td className="py-3 px-4 text-center">
//                     <button
//                       onClick={() => toggleActive(plan.planId, plan.activeSw)}  {/*  FIXED: Pass activeSw */}
//                       className={`${
//                         plan.activeSw === "Y"
//                           ? "bg-green-600 hover:bg-green-700"
//                           : "bg-gray-400 hover:bg-gray-500"
//                       } text-white rounded-lg p-2`}
//                       title={plan.activeSw === "Y" ? "Deactivate Plan" : "Activate Plan"}
//                     >
//                       {plan.activeSw === "Y" ? <Check size={16} /> : <X size={16} />}
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center text-gray-500 py-4 border">
//                   No plans available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPlans, updatePlanStatus } from "../../Services/Plan Services/plan-services";
import { Pencil, Trash2, Check, X } from "lucide-react";

export default function ViewPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);          // page loading
  const [actionLoading, setActionLoading] = useState({}); // per-plan action loading map

  // safe date formatter
  const formatDate = (d) => {
    if (!d) return "-";
    // assumes backend returns ISO string or yyyy-mm-dd; adapt if needed
    const dt = new Date(d);
    if (isNaN(dt)) return d; // fallback to raw value
    return dt.toLocaleDateString(); // uses user's locale
  };

  const loadPlans = async () => {
    setLoading(true);
    try {
      const data = await getPlans();
      // defensive: ensure array
      setPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading plans:", err);
      toast.error("Failed to load plans!");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  // toggle active with optimistic UI + rollback
  const toggleActive = async (planId, currentActiveSw) => {
    const newActiveSw = currentActiveSw === "Y" ? "N" : "Y";
    // mark action loading for this plan
    setActionLoading((s) => ({ ...s, [planId]: true }));

    // optimistic update snapshot
    const prevPlans = [...plans];
    setPlans((prev) =>
      prev.map((plan) =>
        plan.planId === planId ? { ...plan, activeSw: newActiveSw } : plan
      )
    );

    try {
      // expecting updatePlanStatus to throw on failure or return success indicator
      const res = await updatePlanStatus(planId, newActiveSw);

      // if backend returns object / updated plan, you may want to merge it:
      if (res && typeof res === "object") {
        setPlans((prev) =>
          prev.map((p) => (p.planId === planId ? { ...p, ...res } : p))
        );
      } else if (res && res.success === false) {
        throw new Error(res.message || "Failed to update status");
      }

      toast.success(
        `Plan ${newActiveSw === "Y" ? "Activated" : "Deactivated"} successfully!`
      );
    } catch (err) {
      console.error("Error updating plan status:", err);
      toast.error("Failed to update plan status! Reverting...");
      // rollback optimistic change
      setPlans(prevPlans);
    } finally {
      setActionLoading((s) => ({ ...s, [planId]: false }));
    }
  };

  // Delete plan (still placeholder) — confirm if implemented
  const deletePlan = async (planId) => {
    toast.info("Delete functionality not implemented yet");
    // if you implement backend:
    // if (!window.confirm("Are you sure to delete this plan?")) return;
    // setActionLoading((s) => ({ ...s, [planId]: true }));
    // try { await deletePlanById(planId); setPlans(p => p.filter(x=>x.planId!==planId)); toast.success("Deleted"); }
    // catch(e){ toast.error("Delete failed"); }
    // finally { setActionLoading((s) => ({ ...s, [planId]: false })); }
  };

  const handleEdit = (id) => {
    toast.info(`Edit Plan ID: ${id}`);
    // navigate to edit page if you have router: navigate(`/plans/edit/${id}`)
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Plans</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4 text-left">S.No</th>
              <th className="py-3 px-4 text-left">Plan Name</th>
              <th className="py-3 px-4 text-left">Start Date</th>
              <th className="py-3 px-4 text-left">End Date</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-600">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                </td>
              </tr>
            ) : plans.length > 0 ? (
              plans.map((plan, index) => (
                <tr
                  key={plan.planId ?? index}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{plan.planName ?? "-"}</td>
                  <td className="py-3 px-4">{formatDate(plan.planStartDate)}</td>
                  <td className="py-3 px-4">{formatDate(plan.planEndDate)}</td>
                  <td className="py-3 px-4">{plan.planCategory ?? "-"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        plan.activeSw === "Y"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {plan.activeSw === "Y" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleActive(plan.planId, plan.activeSw)}
                      className={`${
                        plan.activeSw === "Y"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 hover:bg-gray-500"
                      } text-white rounded-lg px-4 py-2 text-sm font-medium transition-all disabled:opacity-50`}
                      disabled={!!actionLoading[plan.planId]}
                    >
                      {actionLoading[plan.planId] ? (
                        <span>Processing...</span>
                      ) : plan.activeSw === "Y" ? (
                        "Deactivate"
                      ) : (
                        "Activate"
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4 border">
                  No plans available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

 