import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSuccess } from "../redux/authSlice";
import { authService } from "../Services/authService";


export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", pwd: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.pwd) {
      newErrors.pwd = "Password is required";
    } else if (formData.pwd.length < 6) {
      newErrors.pwd = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await authService.login(formData);
      console.log("Login Response:", response);

      if (response.status === "Success") {
        // Store complete user data in Redux
        dispatch(
          loginSuccess({
            email: response.email,
            userId: response.userId,
            roleId: response.roleId,
            token: response.token,
          })
        );

        toast.success("Welcome to IES App!");

        // Role-based navigation
        if (response.roleId === 1) {
          navigate("/admin/dashboard");
        } else {
          navigate(`/dashboard/${response.email}`);
        }
      } else if (response.status === "Account Locked" || response.status === "in-active" || response.status === "locked" ) {
        toast.warn("Please unlock your account to continue.");
        // Store email for unlock process
        sessionStorage.setItem("unlockEmail", formData.email);
        navigate("/unlock", { state: { email: formData.email } });
        
      } else if (response.status === "Invalid Credentials") {
        toast.error("Invalid email or password");
      } else {
        toast.error(response.status || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center border border-gray-100">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">IES APP</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="pwd"
            placeholder="Enter Password"
            value={formData.pwd}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 ${
              errors.pwd ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pwd && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.pwd}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 text-white font-semibold rounded-lg py-2 hover:bg-indigo-600 transition-all disabled:bg-gray-400"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="mt-4">
          <a
            href="/recover-password"
            className="text-indigo-500 hover:text-indigo-600 text-sm font-medium block"
          >
            Forgot Password?
          </a>
           <a
            href="/unlock"
            className="text-indigo-500 hover:text-indigo-600 text-sm font-medium block"
          >
            Unlock Account?
          </a>
        </div>
      </form>
    </div>
  );
}
