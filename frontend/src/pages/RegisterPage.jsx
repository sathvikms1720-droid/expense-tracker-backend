
import API from "../services/api";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// --- SVG Icons ---
const IconUser = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLock = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEyeOff = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconEyeOn = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 23 23">
    <path fill="#f35325" d="M0 0h11v11H0z" />
    <path fill="#81bc06" d="M12 0h11v11H12z" />
    <path fill="#05a6f0" d="M0 12h11v11H0z" />
    <path fill="#ffba08" d="M12 12h11v11H12z" />
  </svg>
);

// --- Component ---
export default function RegisterPage() {
  useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {

    navigate("/dashboard", {
      replace: true,
    });

  }

}, []);
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
const handleGoogleLogin = (response) => {

  console.log(response);

  alert("Google Login Success");

  navigate("/dashboard");

};
  useEffect(() => {

  window.google.accounts.id.initialize({

    client_id: "768792569540-figjod3g9ibuki0frhh8irvm0q5mlmg1.apps.googleusercontent.com",

    callback: handleGoogleLogin,

  });

}, []);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!agreed) {
    alert("Please agree to the Terms of Service and Privacy Policy.");
    return;
  }

  if (form.password !== form.confirm) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await API.post("register", {
      username: form.name,
      email: form.email,
      password: form.password,
    });
    

    console.log(response.data);
    localStorage.setItem(
  "userName",
  form.name
);


localStorage.setItem(
  "userEmail",
  form.email
);

    alert("Account Created Successfully!");
    alert("Account Created Successfully!");

navigate("/login");

  } catch (error) {
    alert(error.response.data.detail)
    console.log(error);
    alert("Registration Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f5ff] via-[#f5f3ff] to-[#eef2ff] px-6 py-10">
      <div className="w-full max-w-[1500px] min-h-[900px] bg-white/70 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(139,92,246,0.08)] grid grid-cols-1 xl:grid-cols-2">
        
        {/* LEFT SECTION (Branding & Illustration) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#efe7ff] to-[#f8f5ff] p-16 flex flex-col justify-between">
          {/* BACKGROUND CIRCLES */}
          <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-purple-300/20" />
          <div className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-purple-200/20" />

          {/* TITLE SECTION */}
          <div className="relative z-10">
            <h1 className="text-[72px] leading-[0.95] font-black tracking-[-3px] text-[#111827]">
              Expense <br />
              <span className="bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">
                Tracker
              </span>
            </h1>
            <p className="mt-6 text-[24px] text-slate-500">Smart Finance. Better Future.</p>
          </div>

          {/* IMAGE */}
          <div className="relative z-10 flex justify-center mt-10">
            <img 
              src="/register-illustration.png" 
              alt="Register Illustration" 
              className="w-full max-w-[720px] scale-110 object-contain drop-shadow-2xl" 
            />
          </div>

          {/* TESTIMONIAL/QUOTE */}
          <div className="relative z-10 mt-10 flex items-start gap-3">
             <span className="text-purple-600 text-6xl font-black leading-none mt-[-10px]">“</span>
             <p className="text-[22px] text-slate-600 font-medium leading-relaxed">
              Take control of your finances and achieve your goals.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION (Form) */}
        <div className="flex items-center justify-center p-10 xl:p-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[650px] bg-white rounded-[36px] border border-slate-100 shadow-xl p-12"
          >
            <h2 className="text-[58px] font-black tracking-[-2px] text-center text-[#111827]">
              Create account
            </h2>
            <p className="text-center text-slate-500 text-[22px] mt-4">
              Join us and start tracking your expenses
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 mt-10">
              {/* FULL NAME */}
              <div>
                <label className="block text-[16px] font-semibold text-slate-700 mb-2">Full Name</label>
                <div className="relative flex items-center">
                  <span className="absolute left-5 text-slate-400"><IconUser /></span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full h-[70px] pl-14 pr-6 rounded-2xl border border-slate-200 outline-none text-[18px] focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[16px] font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative flex items-center">
                  <span className="absolute left-5 text-slate-400"><IconMail /></span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full h-[70px] pl-14 pr-6 rounded-2xl border border-slate-200 outline-none text-[18px] focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-[16px] font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-5 text-slate-400"><IconLock /></span>
                  <input
                    name="password"
                    type={showPw ? "text" : "password"}
                    required
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full h-[70px] pl-14 pr-14 rounded-2xl border border-slate-200 outline-none text-[18px] focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-5 text-slate-400 hover:text-purple-600 transition-colors">
                    {showPw ? <IconEyeOn /> : <IconEyeOff />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-[16px] font-semibold text-slate-700 mb-2">Confirm Password</label>
                <div className="relative flex items-center">
                  <span className="absolute left-5 text-slate-400"><IconLock /></span>
                  <input
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    required
                    placeholder="Confirm your password"
                    value={form.confirm}
                    onChange={handleChange}
                    className="w-full h-[70px] pl-14 pr-14 rounded-2xl border border-slate-200 outline-none text-[18px] focus:border-purple-400 focus:ring-4 focus:ring-purple-50 transition-all"
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-5 text-slate-400 hover:text-purple-600 transition-colors">
                    {showConfirm ? <IconEyeOn /> : <IconEyeOff />}
                  </button>
                </div>
              </div>

              {/* TERMS */}
              <div className="flex items-center gap-3">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                />
                <label htmlFor="agree" className="text-[18px] text-slate-600">
                  I agree to the <span className="text-purple-600 font-semibold cursor-pointer">Terms of Service</span> and <span className="text-purple-600 font-semibold cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              {/* CREATE ACCOUNT BUTTON */}
              <button
                type="submit"
                className="w-full h-[72px] rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white text-[24px] font-semibold shadow-lg hover:scale-[1.01] transition-all"
              >
                Create Account
              </button>

              {/* DIVIDER */}
              <div className="flex items-center gap-4 py-4">
                <div className="flex-1 h-[1px] bg-slate-200" />
                <p className="text-slate-400 text-[18px] uppercase tracking-widest font-bold">or register with</p>
                <div className="flex-1 h-[1px] bg-slate-200" />
              </div>

              {/* SOCIAL BUTTONS */}
<div className="grid grid-cols-2 gap-4">

  <button
    type="button"
    onClick={() => {

  window.google.accounts.oauth2.initTokenClient({

    client_id: "768792569540-figjod3g9ibuki0frhh8irvm0q5mlmg1.apps.googleusercontent.com",

    scope: "email profile openid",

callback: async (response) => {

  try {

    const userInfo = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      }
    );

    const user = await userInfo.json();

    const res = await API.post(
      "/google-login",{
        name: user.name,
        email: user.email,
      }
    );

    localStorage.setItem(
      "token",
      res.data.access_token
    );

    localStorage.setItem(
      "userName",
      res.data.user.name
    );

    localStorage.setItem(
      "userEmail",
      res.data.user.email
    );

    navigate("/dashboard", {
      replace: true,
    });

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.detail ||
      "Google Login Failed"
    );

  }

},

 

  }).requestAccessToken();

}}
    className="
      h-[68px]
      rounded-2xl
      border
      border-slate-200
      text-[20px]
      font-medium
      hover:bg-slate-50
      transition-all
      flex
      items-center
      justify-center
      gap-3
    "
  >
    <GoogleIcon /> Google
  </button>

  <button
    type="button"
    className="
      h-[68px]
      rounded-2xl
      border
      border-slate-200
      text-[20px]
      font-medium
      hover:bg-slate-50
      transition-all
      flex
      items-center
      justify-center
      gap-3
    "
  >
    <MicrosoftIcon /> Microsoft
  </button>

</div>

              {/* SIGN IN LINK */}
              <p className="text-center text-slate-500 text-[18px] pt-5">
                Already have an account?{" "}
                <span className="text-purple-600 font-semibold cursor-pointer hover:underline"><Link to="/login">
  Sign in
</Link></span>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    {showAccountPopup && (

  <motion.div
    initial={{
      opacity: 0,
      y: 40,
      scale: 0.8,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    className="
      fixed
      bottom-8
      right-8
      z-[99999]
      bg-white
      border
      border-orange-100
      shadow-2xl
      rounded-3xl
      px-6
      py-5
      flex
      items-center
      gap-4
    "
  >

    <div
      className="
        w-14
        h-14
        rounded-full
        bg-orange-100
        flex
        items-center
        justify-center
      "
    >
      <span className="text-orange-500 text-[28px] font-black">
        !
      </span>
    </div>

    <div>

      <h3 className="text-[20px] font-bold text-[#111827]">
        Account Already Exists
      </h3>

      <p className="text-slate-500 text-[15px]">
        You already have an account. Please login.
      </p>

    </div>

  </motion.div>

)}
    </div>
    
  );
}