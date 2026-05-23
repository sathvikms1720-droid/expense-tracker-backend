import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

import {
  Lock,
  Shield,
  Monitor,
  Bell,
  FileText,
  Trash2,
  Download,
  LogOut,
  ChevronRight,
  Globe,
  DollarSign,
  Sun,
  Moon,
  Camera,
  Save,
} from "lucide-react"

/* ─── TOGGLE SWITCH ─────────────────────────────────────────── */
function Toggle({ enabled, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      animate={{ backgroundColor: enabled ? "#7C3AED" : "#E2E8F0" }}
      transition={{ duration: 0.2 }}
      className="relative w-[52px] h-[28px] rounded-full flex-shrink-0"
    >
      <motion.div
        animate={{ x: enabled ? 26 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md"
      />
    </motion.button>
  )
}

/* ─── SECTION CARD ──────────────────────────────────────────── */
function Card({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className={`
        bg-white/80
        backdrop-blur-xl
        border
        border-white/40
        rounded-[30px]
        p-6
        shadow-sm
        hover:shadow-2xl
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */
function SettingsPage() {
  const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "light"
);
useEffect(() => {

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }

}, []);
  const navigate = useNavigate()
const handleImageUpload = (e) => {

  const file = e.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.onloadend = () => {

    setProfileImage(reader.result)

  }

  reader.readAsDataURL(file)
}

const handleSaveChanges = () => {

  localStorage.setItem("username", fullName)

  localStorage.setItem("email", email)

  localStorage.setItem("profileImage", profileImage)
  
  localStorage.setItem("phone", phone)
  alert("Profile updated successfully!")

  window.location.reload()
}

const handleLogout = () => {

  localStorage.removeItem("token")

  navigate("/login")
}
const handleDeleteAccount = async () => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete your account permanently?"
  )

  if (!confirmDelete) return

  try {

    const token = localStorage.getItem("token")

    await API.delete(
      "/delete-account",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    localStorage.clear()

    alert("Account deleted successfully")

    navigate("/login")

  } catch (error) {

    console.log(error)

    alert("Failed to delete account")

  }

}
  const [twoFA, setTwoFA] = useState(true)
  const [expenseAlerts, setExpenseAlerts] = useState(true)
  const [monthlyReports, setMonthlyReports] = useState(true)
  const [budgetWarnings, setBudgetWarnings] = useState(true)
  
  const [currency, setCurrency] = useState("INR (₹)")
  const [language, setLanguage] = useState("English")

  const [fullName, setFullName] = useState(
  localStorage.getItem("username") || "")
const [email, setEmail] = useState(
  localStorage.getItem("email") || ""
)
const [profileImage, setProfileImage] = useState(
  localStorage.getItem("profileImage") || ""
)
  const [phone, setPhone] = useState(
  localStorage.getItem("phone") || ""
)
  return (
    <div className="
      min-h-screen
      flex
      bg-gradient-to-br
      from-[#f8f5ff]
      via-[#f4f1ff]
      to-[#eef2ff]
      overflow-hidden
      relative
    ">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] right-[-120px] w-[500px] h-[500px] bg-purple-300/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] bg-violet-200/20 blur-[140px] rounded-full" />

      <Sidebar />

      <main className="flex-1 ml-[260px] px-8 py-4 relative z-10">
        <Navbar />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-6 mb-8"
        >
          <h1 className="text-[64px] leading-[1] font-black tracking-[-3px] text-[#111827]">
            Settings
          </h1>
          <p className="text-[20px] text-slate-500 mt-3">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* ROW 1 — Profile + Preferences */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

          {/* PROFILE SETTINGS */}
          <Card delay={0.1}>
            <h2 className="text-[28px] font-bold mb-6">Profile Settings</h2>

            <div className="flex gap-6 items-start">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-[100px] h-[100px] rounded-full bg-purple-100 flex items-center justify-center text-[36px] font-black text-purple-600 relative cursor-pointer group"
                >
                  {profileImage ? (
  <img
    src={profileImage}
    alt="Profile"
    className="w-full h-full rounded-full object-cover"
  />
) : (
  fullName?.charAt(0).toUpperCase()
)}
                  <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <Camera size={22} className="text-white" />
                  </div>
                </motion.div>
               <label
  htmlFor="profileUpload"
  className="flex items-center gap-1.5 text-[15px] text-slate-500 hover:text-purple-600 transition-colors font-medium cursor-pointer"
>
  <Camera size={14} />
  Change Photo
</label>
                <input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  className="hidden"
  id="profileUpload"
/>
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-[15px] font-semibold text-slate-500 mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none text-[18px] bg-white/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[15px] font-semibold text-slate-500 mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none text-[18px] bg-white/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[15px] font-semibold text-slate-500 mb-1.5 block">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none text-[18px] bg-white/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <motion.button
  onClick={handleSaveChanges}
  whileHover={{ y: -2 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#7C3AED] text-white text-[18px] font-semibold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
                  >
                    <Save size={16} />
                    Save Changes
                  </motion.button>

                  <motion.button
  onClick={handleLogout}
  whileHover={{ y: -2 }}
  className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-red-200 text-red-500 text-[18px] font-semibold hover:bg-red-50 transition-all"
>
                    <LogOut size={16} />
                    Log Out
                  </motion.button>
                </div>
              </div>
            </div>
          </Card>

          {/* PREFERENCES */}
          <Card delay={0.15}>
            <h2 className="text-[28px] font-bold mb-6">Preferences</h2>

            <div className="space-y-5">

              {/* Currency */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <DollarSign size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Currency</p>
                    <p className="text-[15px] text-slate-400">Choose your preferred currency</p>
                  </div>
                </div>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-[17px] font-medium bg-white/80 min-w-[120px]"
                >
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              {/* Theme */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Sun size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Theme</p>
                    <p className="text-[15px] text-slate-400">Select your preferred theme</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                  <motion.button
                  onClick={() => {

  setTheme("light");

  localStorage.setItem("theme", "light");

  document.documentElement.classList.remove("dark");

}}
                    animate={{
                      backgroundColor: theme === "light" ? "#ffffff" : "transparent",
                      color: theme === "light" ? "#7C3AED" : "#94A3B8",
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[16px] font-semibold shadow-sm transition-all"
                  >
                    <Sun size={14} /> Light
                  </motion.button>
                  <motion.button
                    onClick={() => {

  setTheme("dark");

  localStorage.setItem("theme", "dark");

  document.documentElement.classList.add("dark");

}}
                    animate={{
                      backgroundColor: theme === "dark" ? "#ffffff" : "transparent",
                      color: theme === "dark" ? "#7C3AED" : "#94A3B8",
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[16px] font-semibold transition-all"
                  >
                    <Moon size={14} /> Dark
                  </motion.button>
                </div>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Globe size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Language</p>
                    <p className="text-[15px] text-slate-400">Choose your app language</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-[17px] font-medium bg-white/80 min-w-[120px]"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                </select>
              </div>

            </div>
          </Card>
        </div>

        {/* ROW 2 — Security + Notifications */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

          {/* SECURITY */}
          <Card delay={0.2}>
            <h2 className="text-[28px] font-bold mb-6">Security</h2>

            <div className="space-y-2">

              {/* Change Password */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-between py-4 border-b border-slate-100 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Lock size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Change Password</p>
                    <p className="text-[15px] text-slate-400">Update your password regularly</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:text-purple-600 transition-colors" />
              </motion.div>

              {/* Two-Factor */}
              <div className="flex items-center justify-between py-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Shield size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Two-Factor Authentication</p>
                    <p className="text-[15px] text-slate-400">Add an extra layer of security</p>
                  </div>
                </div>
                <Toggle enabled={twoFA} onToggle={() => setTwoFA(!twoFA)} />
              </div>

              {/* Logout All Devices */}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Monitor size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Logout All Devices</p>
                    <p className="text-[15px] text-slate-400">Sign out from all devices</p>
                  </div>
                </div>
                <motion.button
                onClick={() => {

localStorage.removeItem("token");

  navigate("/login");

}}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-200 text-purple-600 font-semibold text-[16px] hover:bg-purple-50 transition-all"
                >
                  <LogOut size={15} />
                  Logout All
                </motion.button>
              </div>
            </div>
          </Card>

          {/* NOTIFICATIONS */}
          <Card delay={0.25}>
            <h2 className="text-[28px] font-bold mb-6">Notifications</h2>

            <div className="space-y-2">

              {/* Expense Alerts */}
              <div className="flex items-center justify-between py-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Bell size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Expense Alerts</p>
                    <p className="text-[15px] text-slate-400">Get notified for new expenses</p>
                  </div>
                </div>
                <Toggle enabled={expenseAlerts} onToggle={() => setExpenseAlerts(!expenseAlerts)} />
              </div>

              {/* Monthly Reports */}
              <div className="flex items-center justify-between py-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <FileText size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Monthly Reports</p>
                    <p className="text-[15px] text-slate-400">Receive monthly summary reports</p>
                  </div>
                </div>
                <Toggle enabled={monthlyReports} onToggle={() => setMonthlyReports(!monthlyReports)} />
              </div>

              {/* Budget Warnings */}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Bell size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#111827]">Budget Warnings</p>
                    <p className="text-[15px] text-slate-400">Get alerts when budget is exceeded</p>
                  </div>
                </div>
                <Toggle enabled={budgetWarnings} onToggle={() => setBudgetWarnings(!budgetWarnings)} />
              </div>

            </div>
          </Card>
        </div>

        {/* ROW 3 — Data & Privacy */}
        <Card delay={0.3} className="mb-8">
          <h2 className="text-[28px] font-bold mb-6">Data & Privacy</h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

            {/* Export Data */}
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-5 rounded-[20px] bg-slate-50/60 border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-2xl">
                  <Download size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-[#111827]">Export Data</p>
                  <p className="text-[15px] text-slate-400">Download your data in CSV format</p>
                </div>
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-200 text-purple-600 font-semibold text-[16px] hover:bg-purple-50 transition-all"
              >
                <Download size={15} />
                Export
              </motion.button>
            </motion.div>

            {/* Delete Account */}
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-5 rounded-[20px] bg-red-50/40 border border-red-100/60"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-2xl">
                  <Trash2 size={20} className="text-red-500" />
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-[#111827]">Delete Account</p>
                  <p className="text-[15px] text-slate-400">Permanently delete your account and all data</p>
                </div>
              </div>
              <motion.button
  onClick={handleDeleteAccount}
  whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 text-red-500 font-semibold text-[16px] hover:bg-red-50 transition-all"
              >
                <Trash2 size={15} />
                Delete Account
              </motion.button>
            </motion.div>

          </div>
        </Card>

      </main>
    </div>
  )
}

export default SettingsPage