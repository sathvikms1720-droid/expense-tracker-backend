import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"
import { useRef } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import {
  ChevronRight,
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  Percent,
  Receipt,
  CheckSquare,
  BarChart2,
  CreditCard,
  Scale,
  FileBarChart,
  FilePlus,
  Sparkles,
  Calendar,
} from "lucide-react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

/* ─── DATA ─────────────────────────────────────────────────── */

const expenseTrendData = [
  { day: "Jan", amount: 1000 },
  { day: "Feb", amount: 2400 },
  { day: "Mar", amount: 1800 },
  { day: "Apr", amount: 3200 },
  { day: "May", amount: 2700 },
  { day: "Jun", amount: 4500 },
]



const monthlyComparisonData = [
  { month: "Jan", income: 45000, expenses: 30000 },
  { month: "Feb", income: 52000, expenses: 34000 },
  { month: "Mar", income: 58000, expenses: 39000 },
  { month: "Apr", income: 61000, expenses: 42000 },
  { month: "May", income: 70000, expenses: 52000 },
]

const reportOptions = [
  { label: "Expense Summary",    sub: "Overview of total expenses",       icon: <CheckSquare size={18} /> },
  { label: "Income vs Expense",  sub: "Compare income and expenses",      icon: <Scale size={18} /> },
  { label: "Category Breakdown", sub: "Detailed category analysis",       icon: <BarChart2 size={18} /> },
  { label: "Payment Methods",    sub: "Spending by payment method",       icon: <CreditCard size={18} /> },
  { label: "Budget vs Actual",   sub: "Compare budget and actuals",       icon: <FileBarChart size={18} /> },
  { label: "Tax Report",         sub: "Tax summary and deductible exps",  icon: <Receipt size={18} /> },
  { label: "Custom Report",      sub: "Create a custom report",           icon: <FilePlus size={18} /> },
]

const recentReports = [
  { name: "Monthly Expense Report",    type: "Expense Summary",     format: "PDF",   formatColor: "#EC4899" },
  { name: "Income vs Expense Report",  type: "Comparison",          format: "Excel", formatColor: "#22C55E" },
  { name: "Category Breakdown Report", type: "Category Analysis",   format: "CSV",   formatColor: "#3B82F6" },
]


/* ─── HELPERS ───────────────────────────────────────────────── */

function StatCard({ title, value, sub, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="
        bg-white/80 backdrop-blur-xl border border-white/40
        rounded-[28px] px-7 py-6 shadow-sm hover:shadow-xl
        transition-all duration-300 flex flex-col justify-between h-full
      "
    >
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-[18px] font-medium">{title}</p>
        <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">{icon}</div>
      </div>
      <div className="mt-4">
        <h2 className="text-[34px] font-black text-[#111827]">{value}</h2>
        <p className="text-green-500 font-bold text-[18px] mt-2">{sub}</p>
      </div>
    </motion.div>
  )
}

/* ─── PAGE ───────────────────────────────────────────────────── */

function ReportsPage() {
  const mainContainerRef = useRef(null);
  const topCategoriesRef = useRef(null);
const [highlightTopCategories, setHighlightTopCategories] = useState(false);
 const [expenses, setExpenses] = useState([]);
const [incomes, setIncomes] = useState([]);
  const [activeReport, setActiveReport] = useState("Expense Summary")
  const [showExpenseSummary, setShowExpenseSummary] = useState(false);

const totalIncome = incomes.reduce(
  (acc, item) => acc + Number(item.amount),
  0
);
const totalExpenses = expenses.reduce(
  (acc, item) => acc + Number(item.amount),
  0
);

const highestExpense =
  expenses.length > 0
    ? Math.max(
        ...expenses.map(exp => Number(exp.amount))
      )
    : 0;

const validExpenses = expenses.filter(
  (exp) => Number(exp.amount) > 100
);

const lowestExpense =
  validExpenses.length > 0
    ? Math.min(
        ...validExpenses.map(exp =>
          Number(exp.amount)
        )
      )
    : 0;
const categoryTotals = {};

expenses.forEach((expense) => {

  let category = expense.category;

  if (category === "Food") {
    category = "Others";
  }

  if (!categoryTotals[category]) {
    categoryTotals[category] = 0;
  }

  categoryTotals[category] += Number(expense.amount);

});


const colors = [
  "#7C3AED",
  "#6366F1",
  "#EC4899",
  "#F59E0B",
  "#22D3EE",
  "#94A3B8",
];

const categoryData = Object.entries(categoryTotals).map(
  ([name, value], index) => ({
    name,
    value,
    pct: `${((value / totalExpenses) * 100).toFixed(0)}%`,
    color: colors[index % colors.length],
  })
);
const averageDailyExpense =
  totalExpenses > 0
    ? Math.round(totalExpenses / 30)
    : 0;
    const topTransactions = [...expenses]
  .sort((a, b) => Number(b.amount) - Number(a.amount))
  .slice(0, 7);

const insightItems = [
  {
    title: "Highest Expense",
    value: `₹${highestExpense.toLocaleString("en-IN")}`,
    sub: "Largest single expense",
    icon: <TrendingUp size={18} />,
    bg: "from-purple-500 to-violet-500",
  },

  {
    title: "Biggest Amount (All Time)",
    value: `₹${totalExpenses.toLocaleString("en-IN")}`,
    sub: "Total expenses tracked",
    icon: <TrendingUp size={18} />,
    bg: "from-pink-500 to-rose-500",
  },

  {
    title: "Lowest Expense",
    value: `₹${lowestExpense.toLocaleString("en-IN")}`,
    sub: "Smallest single expense",
    icon: <TrendingDown size={18} />,
    bg: "from-blue-500 to-cyan-500",
  },

  {
    title: "Average Daily Expense",
    value: `₹${averageDailyExpense.toLocaleString("en-IN")}`,
    sub: "Estimated daily average",
    icon: <Calendar size={18} />,
    bg: "from-emerald-500 to-green-500",
  },
];

categoryData.sort((a, b) => {

  if (a.name === "Others") return 1;

  if (b.name === "Others") return -1;

  return b.value - a.value;

});
useEffect(() => {
  fetchExpenses();
  fetchIncomes();
}, []);
const fetchExpenses = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://expense-tracker-backend-z7i5.onrender.com/expenses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setExpenses(response.data);

    console.log(response.data);

  } catch (error) {

    console.log(error);

  }
};

const fetchIncomes = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://expense-tracker-backend-z7i5.onrender.com/income",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIncomes(response.data);

  } catch (error) {

    console.log(error);

  }
};
const maxCategoryValue = Math.max(
  ...categoryData.map(item => item.value)
);
  return (
    <div className="
      min-h-screen flex
      bg-gradient-to-br from-[#f8f5ff] via-[#f4f1ff] to-[#eef2ff]
      overflow-x-hidden relative
    ">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] right-[-120px] w-[500px] h-[500px] bg-purple-300/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] bg-violet-200/20 blur-[140px] rounded-full" />

      <Sidebar />

      <main
  ref={mainContainerRef}
   className="flex-1 ml-[260px] px-10 py-6 relative z-10">
        <Navbar />

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex justify-between items-end mt-6 mb-10"
        >
          <div>
            <h1 className="text-[56px] leading-[1] font-black tracking-[-2px] text-[#111827]">
              Reports
            </h1>
            <p className="text-[18px] text-slate-500 mt-3">
              Analyze your finances with detailed insights and reports.
            </p>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl text-slate-700 text-[18px] font-medium shadow-sm hover:shadow-lg transition-all"
            >
              <Calendar size={18} />
              May 1 – May 31, 2024
            </motion.button>

            <motion.button
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 px-6 py-3 bg-[#7C3AED] text-white rounded-2xl text-[18px] font-semibold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
            >
              <Download size={18} />
              Export Report
            </motion.button>
          </div>
        </motion.div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <StatCard
  title="Total Expenses"
  value={`₹${totalExpenses.toLocaleString()}`} sub="↑ 12.5% vs Apr" icon={<Wallet size={20} />} />
          <StatCard
  title="Total Income"
  value={`₹${totalIncome.toLocaleString("en-IN")}`}
  sub="All income added"
  icon={<TrendingUp size={20} />}
/>
          <StatCard title="Net Savings"     value="₹35,000" sub="↑ 15.2% vs Apr" icon={<PiggyBank size={20} />} />
          <StatCard title="Savings Rate"    value="58.3%"   sub="↑ 6.8% vs Apr"  icon={<Percent size={20} />} />
        </div>

        {/* ── TOP GRID: 5-4-3 split ── */}
        <div className="grid grid-cols-12 gap-6 mb-6 items-stretch">
          {/* Expense Trend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="col-span-5 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] p-7 shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[24px] font-bold">Expense Trend</h3>
              <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[15px] font-medium">
                <option>This Month</option>
              </select>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={expenseTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#8B5CF6" strokeWidth={4} fill="url(#expGrad)" dot={{ r: 4, fill: "#8B5CF6", strokeWidth: 2, stroke: "#fff" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Expenses by Category */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="col-span-4 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] p-7 shadow-sm hover:shadow-2xl transition-all"
          >
            <h3 className="text-[24px] font-bold mb-6">Expenses by Category</h3>
            <div className="flex flex-col items-center">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>

  <text
    x="50%"
    y="38%"
    textAnchor="middle"
    dominantBaseline="middle"
    className="fill-slate-400 text-[20px] font-medium"
  >
    Total
  </text>

  <text
    x="50%"
    y="56%"
    textAnchor="middle"
    dominantBaseline="middle"
    className="fill-[#111827] text-[25px] font-black"
  >
    ₹{totalExpenses.toLocaleString()}
  </text>
                    
                    <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} cornerRadius={4} stroke="none">
                      {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full mt-6 space-y-3">
                {categoryData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[15px] text-slate-600">{item.name}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="font-bold text-[15px]">₹{item.value.toLocaleString()}</span>
                      <span className="text-slate-400 text-[14px] w-8">{item.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Report Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="col-span-3 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] p-7 shadow-sm hover:shadow-2xl transition-all"
          >
            <h3 className="text-[24px] font-bold mb-6">Report Options</h3>
            <div className="space-y-2">
              {reportOptions.slice(0, 5).map((opt, i) => (
                <button
                  key={i}
                 onClick={() => {
                 if (opt.label === "Category Breakdown") {

topCategoriesRef.current?.scrollIntoView({
  behavior: "smooth",
  block: "center",
});

  setHighlightTopCategories(true);

  setTimeout(() => {
    setHighlightTopCategories(false);
  }, 2000);
}

  setActiveReport(opt.label);

  if (opt.label === "Expense Summary") {
    setShowExpenseSummary(true);
  }

}}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${activeReport === opt.label ? "bg-purple-50 border border-purple-100" : "hover:bg-slate-50"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">{opt.icon}</div>
                    <div className="text-left">
                      <p className="font-bold text-[#111827] text-[15px]">{opt.label}</p>
                      <p className="text-[12px] text-gray-500">{opt.sub}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM GRID: 3-3-6 split ── */}
        <div className="grid grid-cols-12 gap-6 mb-10 items-stretch">
          {/* Monthly Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            className="col-span-3 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] p-7 shadow-sm hover:shadow-2xl transition-all flex flex-col"
          >
            <h3 className="text-[22px] font-bold mb-6">Monthly Comparison</h3>
            <div className="h-[320px] w-[320px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparisonData} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                  <Bar dataKey="income" fill="#22C55E" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Spending Categories */}
          <motion.div
  ref={topCategoriesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
            className={`
  col-span-3 bg-white/80 backdrop-blur-xl
  border border-white/40 rounded-[32px] p-7
  shadow-sm hover:shadow-2xl transition-all
  ${
    highlightTopCategories
      ? "ring-4 ring-purple-400 shadow-purple-300 scale-[1.02]"
      : ""
  }
`}
          >
            <h3 className="text-[22px] font-bold mb-8">Top Categories</h3>
            <div className="space-y-6">
              {categoryData.slice(0, 7).map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[15px] font-semibold text-slate-700">{item.name}</span>
                    <span className="font-bold text-[15px]">₹{item.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                     animate={{
  width: `${(item.value / maxCategoryValue) * 100}%`
}}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Expense Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            whileHover={{ y: -5 }}
            className="col-span-6 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] p-7 shadow-sm hover:shadow-2xl transition-all flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[22px] font-bold">Expense Insights</h3>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-100 text-purple-700 text-[13px] font-bold">
                <Sparkles size={14} /> AI Generated
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {insightItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${item.bg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-[#111827]">{item.title}</p>
                      <p className="text-[12px] text-gray-500">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-5 rounded-[24px] bg-gradient-to-r from-purple-600 to-violet-500 text-white flex items-center justify-between shadow-lg shadow-purple-100">
              <div className="max-w-[70%]">
                <h4 className="text-[17px] font-bold">Smart Recommendations</h4>
                <p className="text-white/80 text-[13px] mt-1">Based on your spending, you could save ₹4,200 more by optimizing utilities.</p>
                <button
  onClick={() => window.location.href = "/analytics"}
  className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-xl text-[14px] font-bold hover:bg-slate-50 transition-colors"
>
  View Analysis
</button>
              </div>
              <div className="text-[42px] opacity-40">📈</div>
            </div>
          </motion.div>
        </div>

        {/* ── RECENT REPORTS TABLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 shadow-sm mb-10"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[26px] font-black text-[#111827]">Recent Reports</h3>
            <button className="text-purple-600 font-bold text-[16px] hover:underline">View History →</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100">
                <th className="pb-4 text-slate-400 font-semibold text-[15px]">REPORT NAME</th>
                <th className="pb-4 text-slate-400 font-semibold text-[15px]">TYPE</th>
                <th className="pb-4 text-slate-400 font-semibold text-[15px]">PERIOD</th>
                <th className="pb-4 text-slate-400 font-semibold text-[15px]">FORMAT</th>
                <th className="pb-4 text-slate-400 font-semibold text-[15px]">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentReports.map((r, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><FileText size={18} /></div>
                      <span className="font-bold text-[#111827]">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-5 text-slate-600 font-medium">{r.type}</td>
                  <td className="py-5 text-slate-500">May 1 – May 31, 2024</td>
                  <td className="py-5">
                    <span className="px-3 py-1 rounded-lg text-[13px] font-black text-white" style={{ backgroundColor: r.formatColor }}>{r.format}</span>
                  </td>
                  <td className="py-5">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-purple-100 rounded-lg text-purple-600 transition-colors"><Download size={18} /></button>
                      <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors"><ChevronRight size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        {showExpenseSummary && (

  <div className="
  fixed inset-0
  bg-black/30
  backdrop-blur-md
  z-[99999]
  flex items-center justify-center
">

    <div className="w-[700px] max-h-[80vh] overflow-y-auto bg-white rounded-[32px] p-8 shadow-2xl">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-[28px] font-black text-[#111827]">
          Top  Transactions
        </h2>

        <button
          onClick={() => setShowExpenseSummary(false)}
          className="text-gray-500 hover:text-black text-[22px]"
        >
          ✕
        </button>

      </div>

      <div className="space-y-4">

        {topTransactions.map((expense, index) => (

          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100"
          >

            <div>

              <h3 className="font-bold text-[16px] text-[#111827]">
                {expense.title}
              </h3>

              <p className="text-[13px] text-gray-500 mt-1">
                {expense.category}
              </p>

            </div>

            <div className="text-right">

              <p className="font-black text-[18px] text-purple-600">
                ₹{Number(expense.amount).toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>

)}
      </main>
    </div>
  )
}

export default ReportsPage