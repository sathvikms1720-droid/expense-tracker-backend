import React, { useState } from "react";7
import axios from "axios"
import { useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast";

import {
  Wallet,
  TrendingUp,
  PieChart,
  CreditCard,
  ShoppingBag,
  Zap,
  Film,
  Utensils,
  Car,
  MoreHorizontal,
Pencil,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts"

/* ─── INLINE DATA ──────────────────────────────────────────── */

const expensesData = [
  {
    id: 1,
    title: "Swiggy Order",
    subtitle: "Lunch for team",
    category: "Food & Dining",
    categoryColor: "#7C3AED",
    date: "May 31, 2025",
    time: "12:30 PM",
    paymentMethod: "UPI",
    paymentIcon: "upi",
    amount: "₹820",
    status: "Completed",
    avatarBg: "#FEF3C7",
    avatarText: "🍔",
  },
  {
    id: 2,
    title: "Amazon Shopping",
    subtitle: "Kitchen Items",
    category: "Shopping",
    categoryColor: "#EC4899",
    date: "May 30, 2025",
    time: "08:11 PM",
    paymentMethod: "Credit Card",
    paymentIcon: "card",
    amount: "₹1,299",
    status: "Completed",
    avatarBg: "#DBEAFE",
    avatarText: "a",
  },
  {
    id: 3,
    title: "Uber Ride",
    subtitle: "Office to Home",
    category: "Transportation",
    categoryColor: "#6366F1",
    date: "May 29, 2025",
    time: "07:45 PM",
    paymentMethod: "UPI",
    paymentIcon: "upi",
    amount: "₹250",
    status: "Completed",
    avatarBg: "#F3F4F6",
    avatarText: "U",
  },
  {
    id: 4,
    title: "Netflix Subscription",
    subtitle: "Monthly Plan",
    category: "Entertainment",
    categoryColor: "#22D3EE",
    date: "May 29, 2025",
    time: "11:20 AM",
    paymentMethod: "Credit Card",
    paymentIcon: "card",
    amount: "₹649",
    status: "Completed",
    avatarBg: "#000000",
    avatarText: "N",
  },
  {
    id: 5,
    title: "Electricity Bill",
    subtitle: "May Month",
    category: "Bills & Utilities",
    categoryColor: "#F59E0B",
    date: "May 28, 2025",
    time: "05:30 PM",
    paymentMethod: "Net Banking",
    paymentIcon: "bank",
    amount: "₹1,560",
    status: "Completed",
    avatarBg: "#FEF3C7",
    avatarText: "⚡",
  },
]




/* ─── STAT CARD (matches Analytics StatCard exactly) ───────── */

function StatCard({ title, value, trend, subValue, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="
        bg-white/80
        backdrop-blur-xl
        border
        border-white/40
        rounded-[28px]
        px-7
        py-7
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-[20px] font-medium">{title}</p>
        <div className="p-3 bg-purple-50 rounded-2xl">{icon}</div>
      </div>

      <h2 className="text-[38px] font-black mt-4 text-[#111827]">{value}</h2>

      {trend && (
        <p className="text-green-500 font-bold text-[20px] mt-4">
          ↑ {trend}
          <span className="text-gray-400 font-normal"> vs last 30 days</span>
        </p>
      )}

      {subValue && (
        <p className="text-purple-600 font-bold text-[20px] mt-4">{subValue}</p>
      )}
    </motion.div>
  )
}

/* ─── EXPENSE ROW (inlined) ─────────────────────────────────── */

function ExpenseRow({
  expense,
  index,
  onEdit,
}) {
  const paymentBadge = {
    upi: { label: "UPI", bg: "bg-green-50", text: "text-green-600" },
    card: { label: "Credit Card", bg: "bg-blue-50", text: "text-blue-600" },
    bank: { label: "Net Banking", bg: "bg-orange-50", text: "text-orange-600" },
  }[expense.paymentIcon] || { label: expense.paymentMethod, bg: "bg-slate-50", text: "text-slate-600" }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ x: 4, backgroundColor: "rgba(124,58,237,0.03)" }}
      className="
        grid
        grid-cols-[2fr_1fr_1fr_1fr_120px]
        px-6
        py-4
        border-b
        border-slate-50
        items-center
        transition-all
        duration-200
      "
    >
      {/* Item */}
      <div className="flex items-center gap-4 pl-4">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-[18px] font-bold flex-shrink-0"
          style={{
            backgroundColor: expense.avatarBg,
            color: expense.avatarTextColor || "#111827",
          }}
        >
          {expense.avatarText}
        </div>
        <div>
          <p className="font-semibold text-[18px] text-[#111827]">{expense.title}</p>
          <p className="text-[15px] text-slate-400">{expense.subtitle}</p>
        </div>
      </div>

      {/* Category */}
      <div>
        <span
          className="px-3 py-1 rounded-xl text-[15px] font-semibold"
          style={{
            backgroundColor: `${expense.categoryColor}18`,
            color: expense.categoryColor,
          }}
        >
          {expense.category}
        </span>
      </div>

      {/* Date */}
      <div>
        <p className="text-[17px] text-slate-700 font-medium">{expense.date}</p>
        <p className="text-[14px] text-slate-400">{expense.time}</p>
      </div>

      {/* Amount */}
      <div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[15px] font-semibold ${paymentBadge.bg} ${paymentBadge.text}`}
        >
          {paymentBadge.label}
        </span>
      <p
  className={`text-[18px] font-black mt-1 ${
    expense.type === "income"
      ? "text-green-600"
      : "text-red-500"
  }`}
>
  {expense.type === "income" ? "+" : "-"}
  {expense.amount}
</p>
      </div>

      {/* Action */}
     <div className="flex items-center gap-1">

  <span className="
    px-2 py-1 rounded-xl
    bg-green-50
    text-green-600
    text-[13px]
    font-semibold
  ">
    {expense.status}
  </span>

<button
onClick={() => onEdit(expense)}
  className="
    p-2 rounded-xl
    hover:bg-blue-50
    transition-all
    text-blue-500
    hover:text-blue-700
  "
>
  ✏️
</button>

  <button
    className="
      p-2 rounded-xl
      hover:bg-slate-100
      transition-all
      text-slate-400
      hover:text-slate-600
    "
  >
    <MoreHorizontal size={1} />
  </button>

</div>
    </motion.div>
  )
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */

function ExpensesPage() {
  const [showModal, setShowModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

const [incomeTitle, setIncomeTitle] = useState("");

const [incomeAmount, setIncomeAmount] = useState("");

const [incomeCategory, setIncomeCategory] = useState("Salary");
  const [expenseTitle, setExpenseTitle] = useState("");
const [expenseAmount, setExpenseAmount] = useState("");
const [expenseCategory, setExpenseCategory] = useState("Food & Dining");
const [showSuccess, setShowSuccess] = useState(false);
const [showIncomeSuccess, setShowIncomeSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedPayment, setSelectedPayment] = useState("All Payment Methods")
  const [transactionType, setTransactionType] = useState("All Transactions")
const [expenses, setExpenses] = useState([]);
const [income, setIncome] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [showEditModal, setShowEditModal] = useState(false);

const [editingExpense, setEditingExpense] = useState(null);
useEffect(() => {

  fetchExpenses();
  fetchIncome();

}, [])

const fetchExpenses = async () => {

  try {

    const token = localStorage.getItem("token")

    const response = await axios.get(
      "https://expense-tracker-backend-z7i5.onrender.com/expenses",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

   const formattedExpenses = response.data
  .sort(
    (a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
  )
  .map((item) => ({

      id: item.id,
     createdAt: item.created_at,

      title: item.title,

      subtitle: "Expense Item",

      category: item.category,

      categoryColor:
        item.category === "Food & Dining"
          ? "#7C3AED"
          : item.category === "Shopping"
          ? "#EC4899"
          : item.category === "Transportation"
          ? "#6366F1"
          : item.category === "Entertainment"
          ? "#22D3EE"
          : "#F59E0B",

date: item.created_at
  ? new Date(item.created_at).toLocaleDateString()
  : "No Date",

time: item.created_at
  ? new Date(item.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "No Time",

      paymentMethod: "UPI",

      paymentIcon: "upi",

      amount: `₹${item.amount}`,

      status: "Completed",

      avatarBg:
        item.category === "Food & Dining"
          ? "#FEF3C7"
          : item.category === "Shopping"
          ? "#DBEAFE"
          : item.category === "Transportation"
          ? "#F3F4F6"
          : item.category === "Entertainment"
          ? "#000000"
          : "#FEF3C7",

      avatarText:
        item.category === "Food & Dining"
          ? "🍔"
          : item.category === "Shopping"
          ? "🛍️"
          : item.category === "Transportation"
          ? "🚗"
          : item.category === "Entertainment"
          ? "🎬"
          : "⚡",

      avatarTextColor:
        item.category === "Entertainment"
          ? "#ffffff"
          : "#111827",
      type: "expense",

    }))

    setExpenses(formattedExpenses)

  } catch (error) {

    console.log(error)
toast.error("Expense Failed");

  }

}
const fetchIncome = async () => {

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

  const formattedIncome = response.data
  .sort(
    (a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
  )
  .map((item, index) => ({

     id: item.id,
createdAt: item.created_at,
      title: item.title,

      subtitle: "Income Item",

      category: item.category,

      categoryColor: "#16A34A",

date: item.created_at
  ? new Date(item.created_at).toLocaleDateString()
  : "No Date",

time: item.created_at
  ? new Date(item.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "No Time",

      paymentMethod: "Income",

      paymentIcon: "upi",

      amount: `₹${item.amount}`,

      status: "Received",

      avatarBg: "#DCFCE7",

      avatarText:
  item.category === "Salary"
    ? "💼"
    : item.category === "Freelancing"
    ? "🧑‍💻"
    : item.category === "Business"
    ? "🏢"
    : item.category === "Investment"
    ? "📈"
    : item.category === "Gift"
    ? "🎁"
    : "💰",

      avatarTextColor: "#166534",

      type: "income",

    }));

    setIncome(formattedIncome);

  } catch (error) {

    console.log(error);

  }
};
const handleSaveIncome = async () => {

  if (!incomeTitle || !incomeAmount || !incomeCategory) {
    alert("Fill all fields");
    return;
  }

  try {

    const token = localStorage.getItem("token");

    const response = await axios.post(
      "https://expense-tracker-backend-z7i5.onrender.com/income",
      {
        title: incomeTitle,
amount: Number(incomeAmount),
category: incomeCategory,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    setShowIncomeModal(false);

    setIncomeTitle("");
    setIncomeAmount("");
    await fetchIncome();
await fetchExpenses();
setCurrentPage(1);

   setShowIncomeSuccess(true);

setTimeout(() => {
  setShowIncomeSuccess(false);
}, 2500);

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.detail ||
      error.message ||
      "Income Failed"
    );
  }
};
const handleSaveExpense = async () => {

  if (!expenseTitle || !expenseAmount || !expenseCategory) {
    alert("Fill all fields");
    return;
  }

  try {

    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const response = await axios.post(
      "https://expense-tracker-backend-z7i5.onrender.com/expenses",
      {
        title: expenseTitle,
amount: Number(expenseAmount),
category: expenseCategory,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);

    setShowModal(false);

    setExpenseTitle("");
    setExpenseAmount("");
    setExpenseCategory("");

await Promise.all([
  fetchExpenses(),
  fetchIncome()
  
]);
setCurrentPage(1);

  } catch (error) {

    console.log(error);

    console.log(error.response);

    alert(
      error.response?.data?.detail ||
      error.message ||
      "Expense Failed"
    );
  }
};
const today = new Date().toDateString();

const todaySpend = expenses
  .filter(
    (item) =>
      new Date(item.createdAt).toDateString() === today
  )
  .reduce(
    (sum, item) =>
      sum +
      Number(
        item.amount.replace("₹", "").replace(/,/g, "")
      ),
    0
  );
const totalExpenses = expenses.reduce((total, item) => {
  return total + Number(item.amount.replace("₹", "").replace(",", ""));
}, 0);
const categoryTotals = {};

expenses.forEach((expense) => {

  const cleanAmount = Number(
    expense.amount.replace("₹", "").replace(/,/g, "")
  );

  if (!categoryTotals[expense.category]) {
    categoryTotals[expense.category] = 0;
  }

  categoryTotals[expense.category] += cleanAmount;
});

const topCategories = Object.entries(categoryTotals)
  .map(([name, amount]) => ({

    name,

    amount: `₹${amount.toLocaleString()}`,

    rawAmount: amount,

    pct:
      totalExpenses > 0
        ? Math.round((amount / totalExpenses) * 100)
        : 0,

    color:
      name === "Food & Dining"
        ? "#7C3AED"
        : name === "Shopping"
        ? "#EC4899"
        : name === "Transportation"
        ? "#6366F1"
        : name === "Entertainment"
        ? "#22D3EE"
        : "#F59E0B",

  }))
  .sort((a, b) => b.rawAmount - a.rawAmount);
  const categoryData = topCategories.map((cat) => ({
  name: cat.name,
  value: cat.pct,
  amount: cat.amount,
  color: cat.color,
}));
const weeklyTotals = {};

expenses.forEach((expense) => {

  const amount = Number(
    expense.amount.replace("₹", "").replace(/,/g, "")
  );

  const day = new Date(expense.createdAt).toLocaleDateString(
  "en-US",
  { weekday: "short" }
);

  if (!weeklyTotals[day]) {
    weeklyTotals[day] = 0;
  }

  weeklyTotals[day] += amount;
});

const daysOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const spendingData = daysOrder.map((day) => ({
  week: day,
  amount: weeklyTotals[day] || 0,
}));
const allTransactions = [...income, ...expenses].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
);
console.log(allTransactions);

  const filtered = allTransactions.filter((e) => {

  const matchSearch =
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.category.toLowerCase().includes(searchQuery.toLowerCase());

  const matchCat =
    selectedCategory === "All Categories"
      ? true
      : e.category === selectedCategory;

const matchPay =
  transactionType === "All Transactions"
    ? true
    : transactionType === "Income"
    ? e.type === "income"
    : e.type === "expense";
  return matchSearch && matchCat && matchPay;
});
  const itemsPerPage = 5;

const totalPages = Math.ceil(filtered.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const currentTransactions = filtered.slice(
  startIndex,
  startIndex + itemsPerPage
);
const recentActivity = [...income, ...expenses]
  .sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )
  .slice(0, 11000);

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

      <div className={showModal ? "blur-sm pointer-events-none" : ""}>
  <Sidebar />
</div>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex-1 ml-[260px] px-8 py-6 relative z-10"
      >
        <Navbar />

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-start justify-between mt-4 mb-8"
        >
          <div>
            <h1 className="text-[64px] leading-[1] font-black tracking-[-3px] text-[#111827]">
              Expense
              <span className="text-purple-600"> Management</span>
            </h1>
            <p className="text-[20px] text-slate-500 mt-3">
              Track, organise and control your daily spending
            </p>
          </div>

          <motion.button
  onClick={() => setShowModal(true)}
  whileHover={{ y: -3 }}
            className="
              px-6
              py-3
              rounded-2xl
              bg-[#7C3AED]
              text-white
              text-[20px]
              font-semibold
              shadow-lg
              shadow-purple-200
              hover:bg-purple-700
              transition-all
            "
          >
            + Add Expense
          </motion.button>
          <motion.button
  onClick={() => setShowIncomeModal(true)}
  whileHover={{ y: -3 }}
            className="
              px-6
              py-3
              rounded-2xl
              bg-[#7C3AED]
              text-white
              text-[20px]
              font-semibold
              shadow-lg
              shadow-purple-200
              hover:bg-purple-700
              transition-all
            "
          >
            + Add Income
          </motion.button>
        </motion.div>

        {/* ── TOP STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses.toLocaleString()}`}
            trend="12.5%"
            icon={<Wallet className="text-purple-600" />}
          />
          <StatCard
            title="This Week"
           value={`₹${expenses
  .reduce((total, item) => {
    const amount = Number(
      item.amount.replace("₹", "").replace(/,/g, "")
    );
    return total + amount;
  }, 0)
  .toLocaleString()}`}
            trend="8.3%"
            icon={<CreditCard className="text-purple-600" />}
          />
         <StatCard
  title="Highest Category"
  value={
    topCategories.length > 0
      ? topCategories[0].name
      : "No Data"
  }
  subValue={
    topCategories.length > 0
      ? topCategories[0].amount
      : "₹0"
  }
  icon={<PieChart className="text-purple-600" />}
/>
          <StatCard
  title="Today's Spend"
  value={`₹${todaySpend.toLocaleString("en-IN")}`}
  trend="5.6%"
  icon={<TrendingUp className="text-purple-600" />}
/>
        </div>

        {/* ── FILTER BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="
            bg-white/80
            backdrop-blur-xl
            border
            border-white/40
            rounded-[28px]
            p-4
            shadow-sm
            flex
            gap-4
            mb-6
            items-center
          "
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, category, or time..."
            className="flex-1 px-5 py-3 rounded-2xl border border-gray-200 outline-none text-[18px] bg-white/60"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-gray-200 outline-none text-[18px] bg-white/60 font-medium"
          >
            <option>All Categories</option>
            <option>Food & Dining</option>
            <option>Transportation</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Bills & Utilities</option>
          </select>

          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-gray-200 outline-none text-[18px] bg-white/60 font-medium"
          >
            <option>All Payment Methods</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Net Banking</option>
          </select>

<select
  value={transactionType}
  onChange={(e) => setTransactionType(e.target.value)}
  className="
    px-4
    py-3
    rounded-2xl
    border
    border-gray-200
    outline-none
    text-[18px]
    bg-white/60
    font-medium
  "
>
  <option>All Transactions</option>
  <option>Expense</option>
  <option>Income</option>
</select>

          <motion.button
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-200 bg-white/60 text-[18px] font-medium text-slate-600 hover:shadow-md transition-all"
          >
            <SlidersHorizontal size={18} />
            Filters
          </motion.button>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-[1fr_340px] gap-6">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">

            {/* EXPENSE TABLE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="
                bg-white/80
                backdrop-blur-xl
                border
                border-white/40
                rounded-[30px]
                overflow-hidden
                shadow-sm
                hover:shadow-2xl
                transition-all
              "
            >
              <div className="flex items-center justify-between p-6 pb-4">
                <h2 className="text-[28px] font-bold text-[#111827]"> Recent Transactions</h2>
                <span className="text-[16px] text-slate-400 font-medium">
                 Showing {startIndex + 1} to{" "}
{Math.min(startIndex + itemsPerPage, filtered.length)} of{" "}
{filtered.length} expenses
                </span>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] px-6 py-4 border-b border-slate-100 text-[16px] font-semibold text-gray-400 uppercase tracking-wide">
                <p className="ml-14">Item</p>
                <p>Category</p>
                <p>Date</p>
                <p>Amount</p>
                <p>Action</p>
              </div>

             {currentTransactions.length > 0 ? (
currentTransactions.map((expense, i) => (
   <ExpenseRow
  key={expense.id}
  expense={expense}
  index={i}
  onEdit={(expense) => {
    setEditingExpense(expense);
    setShowEditModal(true);
  }}
/>
  ))
) : (
  <div className="px-6 py-12 text-center text-slate-400 text-[18px]">
    No transactions match your filters.
  </div>
)}

              {/* Pagination row */}
              <div className="flex items-center justify-center gap-2 p-5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <motion.button
                    key={n}
                    onClick={() => setCurrentPage(n)}
                    whileHover={{ y: -2 }}
                    className={`w-10 h-10 rounded-xl text-[16px] font-semibold transition-all ${
                     n === currentPage
                        ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-200"
                        : "bg-white/80 border border-white/40 text-slate-500 hover:shadow-md"
                    }`}
                  >
                    {n}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* LOWER ANALYTICS ROW */}
            <div className="grid grid-cols-[1.4fr_1fr] gap-6">

              {/* SPENDING OVERVIEW */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
                className="
                  bg-white/80
                  backdrop-blur-xl
                  border
                  border-white/40
                  rounded-[30px]
                  p-6
                  shadow-sm
                  hover:shadow-2xl
                  transition-all
                "
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[28px] font-bold">Spending Overview</h2>
                  <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-[18px] font-medium">
                    <option>This Month</option>
                  </select>
                </div>

                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={spendingData}>
                      <defs>
                        <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis
                        dataKey="week"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94A3B8", fontSize: 13 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#94A3B8", fontSize: 13 }}
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#7C3AED"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#spendGrad)"
                        dot={{ r: 5, fill: "#7C3AED", strokeWidth: 2, stroke: "#ffffff" }}
                        activeDot={{ r: 8 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* TOP CATEGORIES */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                whileHover={{ y: -5 }}
                className="
                  bg-white/80
                  backdrop-blur-xl
                  border
                  border-white/40
                  rounded-[30px]
                  p-6
                  shadow-sm
                  hover:shadow-2xl
                  transition-all
                "
              >
                <h2 className="text-[28px] font-bold mb-6">Top Categories</h2>
                <div className="space-y-5">
                  {topCategories.map((cat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between mb-1.5">
                        <p className="text-[17px] font-semibold text-slate-700">{cat.name}</p>
                        <div className="flex gap-4">
                          <span className="text-[17px] font-bold text-[#111827]">{cat.amount}</span>
                          <span className="text-[16px] text-slate-400 w-8">{cat.pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.pct}%` }}
                          transition={{ duration: 1, delay: i * 0.15 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-6">

            {/* PIE CHART — Expense by Category */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="
                bg-white/80
                backdrop-blur-xl
                p-6
                rounded-[30px]
                border
                border-white/40
                shadow-sm
                hover:shadow-2xl
                transition-all
              "
            >
              <h3 className="text-[28px] font-bold mb-6">Expense by Category</h3>

              <div className="h-[280px] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-purple-400/10 blur-3xl rounded-full" />

                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={85}
                      outerRadius={125}
                      paddingAngle={2}
                      cornerRadius={3}
                      stroke="none"
                      isAnimationActive={true}
                      animationBegin={200}
                      animationDuration={1400}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RePieChart>
                </ResponsiveContainer>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                  <span className="text-slate-400 text-[15px]">Total</span>
                  <span className="text-[34px] font-black tracking-[-2px] text-[#111827]">₹{totalExpenses.toLocaleString()}</span>
                </motion.div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-2">
                {categoryData.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[15px] text-slate-600 leading-tight">{item.name}</span>
                    <span className="text-[14px] font-bold text-slate-500 ml-auto">{item.value}%</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RECENT ACTIVITY */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="
                bg-white/80
                backdrop-blur-xl
                p-6
                rounded-[30px]
                border
                border-white/40
                shadow-sm
                hover:shadow-2xl
                transition-all
                max-h-[500px]
                overflow-y-auto scrollbar-hide
              "
            >
              <h3 className="text-[28px] font-bold mb-6">Recent Activity</h3>

              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-bold flex-shrink-0"
                        style={{
                          backgroundColor: item.avatarBg,
                          color: item.avatarTextColor || "#111827",
                        }}
                      >
                        {item.avatarText}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[18px] text-[#111827]">{item.title}</h3>
                        <p className="text-[14px] text-gray-500">{item.date} • {item.time}</p>
                      </div>
                    </div>
                    <span
  className={`font-bold text-[18px] ${
    item.type === "income"
      ? "text-green-600"
      : "text-red-500"
  }`}
>
  {item.type === "income" ? "+" : "-"}
  {item.amount}
</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                className="
                  w-full
                  mt-6
                  py-3
                  rounded-2xl
                  bg-purple-50
                  text-purple-600
                  font-semibold
                  text-[18px]
                  hover:bg-purple-100
                  transition-all
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                View All Activity
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>

          </div>
        </div>
        {showModal && (

  <div className="
    fixed
    inset-0
    bg-black/40
    backdrop-blur-sm
    flex
    items-center
    justify-center
    z-[9999]
  ">

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        w-full
        max-w-[600px]
        bg-white
        rounded-[32px]
        p-8
        shadow-2xl
      "
    >

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-[32px] font-black text-[#111827]">
          Add Expense
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="
            text-slate-400
            hover:text-red-500
            text-[28px]
            font-bold
          "
        >
          ×
        </button>

      </div>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Expense Title"
          value={expenseTitle}
onChange={(e) => setExpenseTitle(e.target.value)}
          className="
            w-full
            h-[65px]
            px-5
            rounded-2xl
            border
            border-slate-200
            outline-none
            text-[18px]
          "
        />

        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
onChange={(e) => setExpenseAmount(e.target.value)}
          className="
            w-full
            h-[65px]
            px-5
            rounded-2xl
            border
            border-slate-200
            outline-none
            text-[18px]
          "
        />

        <select
        value={expenseCategory}
onChange={(e) => setExpenseCategory(e.target.value)}
          className="
            w-full
            h-[65px]
            px-5
            rounded-2xl
            border
            border-slate-200
            outline-none
            text-[18px]
          "
        >
<option>Food & Dining</option>
<option>Shopping</option>
<option>Transportation</option>
<option>Entertainment</option>
<option>Others</option>
        </select>

       <button
  type="button"
  onClick={handleSaveExpense}
  className="
    w-full
    h-[65px]
    rounded-2xl
    bg-[#7C3AED]
    text-white
    text-[20px]
    font-semibold
    hover:bg-purple-700
    transition-all
    active:scale-[0.98]
  "
>
  Save Expense
</button>

      </div>

    </motion.div>

  </div>

)}
 {showIncomeModal && (

  <div className="
    fixed
    inset-0
    bg-black/40
    backdrop-blur-sm
    flex
    items-center
    justify-center
    z-[9999]
  ">

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        w-full
        max-w-[600px]
        bg-white
        rounded-[32px]
        p-8
        shadow-2xl
      "
    >

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-[32px] font-black text-[#111827]">
          Add Income
        </h2>

        <button
          onClick={() =>setShowIncomeModal(false)}
          className="
            text-slate-400
            hover:text-red-500
            text-[28px]
            font-bold
          "
        >
          ×
        </button>

      </div>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Expense Title"
          value={incomeTitle}
onChange={(e) => setIncomeTitle(e.target.value)}
          className="
            w-full
            h-[65px]
            px-5
            rounded-2xl
            border
            border-slate-200
            outline-none
            text-[18px]
          "
        />

        <input
          type="number"
          placeholder="Amount"
          value={incomeAmount}
onChange={(e) => setIncomeAmount(e.target.value)}
          className="
            w-full
            h-[65px]
            px-5
            rounded-2xl
            border
            border-slate-200
            outline-none
            text-[18px]
          "
        />

        <select
        value={incomeCategory}
onChange={(e) => setIncomeCategory(e.target.value)}
          className="
            w-full
            h-[65px]
            px-5
            rounded-2xl
            border
            border-slate-200
            outline-none
            text-[18px]
          "
        >
          <option>Salary</option>
<option>Freelancing</option>
<option>Business</option>
<option>Investment</option>
<option>Gift</option>
<option>Other Income</option>
        </select>

       <button
  type="button"
  onClick={handleSaveIncome}
  className="
    w-full
    h-[65px]
    rounded-2xl
    bg-[#7C3AED]
    text-white
    text-[20px]
    font-semibold
    hover:bg-purple-700
    transition-all
    active:scale-[0.98]
  "
>
  Save Income
</button>

      </div>

    </motion.div>

  </div>

)}
{showEditModal && editingExpense && (

  <div className="
    fixed inset-0 z-[99999]
    bg-black/40 backdrop-blur-sm
    flex items-center justify-center
  ">

    <div className="
      w-full max-w-[600px]
      bg-white rounded-[32px]
      p-8 shadow-2xl
    ">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-[32px] font-black">
          Edit Transaction
        </h2>

        <button
          onClick={() => setShowEditModal(false)}
          className="text-[28px] font-bold text-slate-400"
        >
          ×
        </button>

      </div>

      <div className="space-y-5">

        <input
          type="text"
          value={editingExpense.title}
          onChange={(e) =>
            setEditingExpense({
              ...editingExpense,
              title: e.target.value,
            })
          }
          className="
            w-full h-[65px]
            px-5 rounded-2xl
            border border-slate-200
            outline-none text-[18px]
          "
        />

        <input
          type="number"
          value={editingExpense.amount.replace("₹", "")}
          onChange={(e) =>
            setEditingExpense({
              ...editingExpense,
              amount: `₹${e.target.value}`,
            })
          }
          className="
            w-full h-[65px]
            px-5 rounded-2xl
            border border-slate-200
            outline-none text-[18px]
          "
        />

        <button
onClick={async () => {

  const token = localStorage.getItem("token");

  const cleanId = editingExpense.id;

  const endpoint =
    editingExpense.type === "income"
      ? `https://expense-tracker-backend-z7i5.onrender.com/income/${cleanId}`
      : `https://expense-tracker-backend-z7i5.onrender.com/expenses/${cleanId}`;

  await axios.put(
    endpoint,
    {
      title: editingExpense.title,
      amount: Number(
        editingExpense.amount.replace("₹", "")
      ),
      category: editingExpense.category,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  await fetchExpenses();
  await fetchIncome();

  setShowEditModal(false);

}}
          className="
            w-full h-[65px]
            rounded-2xl
            bg-blue-600
            text-white
            text-[20px]
            font-semibold
          "
        >
          Save Changes
        </button>
        <button
onClick={async () => {

  const token = localStorage.getItem("token");

  const cleanId = editingExpense.id;

  const endpoint =
    editingExpense.type === "income"
      ? `https://expense-tracker-backend-z7i5.onrender.com/income/${cleanId}`
      : `https://expense-tracker-backend-z7i5.onrender.com/expenses/${cleanId}`;

  await axios.delete(
    endpoint,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  await fetchExpenses();
  await fetchIncome();

  setShowEditModal(false);

}}
  className="
    w-full
    h-[65px]
    rounded-2xl
    bg-red-600
    text-white
    text-[20px]
    font-semibold
    mt-3
  "
>
  Delete Transaction
</button>

      </div>

    </div>

  </div>

)}
{showSuccess && (

  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0 }}
    className="
      fixed
      bottom-8
      right-8
      z-[99999]
      bg-white
      border
      border-green-100
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
        bg-green-100
        flex
        items-center
        justify-center
      "
    >
      <span className="text-green-600 text-[28px] font-black">
        ✓
      </span>
    </div>

    <div>
      <h3 className="text-[20px] font-bold text-[#111827]">
        Expense Added
      </h3>

      <p className="text-slate-500 text-[15px]">
        Your expense was saved successfully
      </p>
    </div>

  </motion.div>

)}
{showIncomeSuccess && (

  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0 }}
    className="
      fixed
      bottom-8
      right-8
      z-[99999]
      bg-white
      border
      border-green-100
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
        bg-green-100
        flex
        items-center
        justify-center
      "
    >
      <span className="text-green-600 text-[28px] font-black">
        ✓
      </span>
    </div>

    <div>
      <h3 className="text-[20px] font-bold text-[#111827]">
        Income Added
      </h3>

      <p className="text-slate-500 text-[15px]">
        Your Income was saved successfully
      </p>
    </div>

  </motion.div>

)}
      </motion.main>
    </div>
  )
}

export default ExpensesPage