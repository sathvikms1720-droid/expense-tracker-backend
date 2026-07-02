import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import StatCard from "../components/StatCard"
import ExpenseChart from "../components/ExpenseChart"
import ExpenseBreakdown from "../components/ExpenseBreakdown"
import Insights from "../components/Insights"
import RecentTransactions from "../components/RecentTransactions"

import { motion } from "framer-motion"
import { Wallet, CreditCard, ArrowDownRight, ArrowUpRight } from "lucide-react"

function Dashboard() {
  const navigate = useNavigate();
const [expenses, setExpenses] = useState([]);
const [income, setIncome] = useState([]);

const [totalExpenses, setTotalExpenses] = useState(0);
const [totalIncome, setTotalIncome] = useState(0);
const [showExpenseModal, setShowExpenseModal] = useState(false);

const [showIncomeModal, setShowIncomeModal] = useState(false);
const [incomeTitle, setIncomeTitle] = useState("");

const [incomeAmount, setIncomeAmount] = useState("");

const [incomeCategory, setIncomeCategory] = useState("Salary");

const [expenseTitle, setExpenseTitle] = useState("");

const [expenseAmount, setExpenseAmount] = useState("");

const [expenseCategory, setExpenseCategory] = useState("Food & Dining");
const [showSuccess, setShowSuccess] = useState(false);

const [showIncomeSuccess, setShowIncomeSuccess] = useState(false);
  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  fetchExpenses();
  fetchIncome();
  

}, []);

const fetchExpenses = async () => {

  try {

    const token = localStorage.getItem("token");

const response = await API.get("/expenses");

    setExpenses(response.data);

    const total = response.data.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    setTotalExpenses(total);

  } catch (error) {

    console.log("Error fetching expenses", error);

  }

};
const fetchIncome = async () => {

  try {

    const token = localStorage.getItem("token");

const response = await API.get("/income");
    

    setIncome(response.data);

    const total = response.data.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );

    setTotalIncome(total);

  } catch (error) {

    console.log("Error fetching income", error);

  }

};
const handleSaveExpense = async () => {

  if (!expenseTitle || !expenseAmount || !expenseCategory) {
    return;
  }

  try {

    const token = localStorage.getItem("token");

await API.post(
    "/expenses",

      {
        title: expenseTitle,
        amount: expenseAmount,
        category: expenseCategory,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    fetchExpenses();
    setShowSuccess(true);

setTimeout(() => {
  setShowSuccess(false);
}, 2500);

    setExpenseTitle("");
    setExpenseAmount("");
    setExpenseCategory("Food & Dining");

    setShowExpenseModal(false);

  } catch (error) {

    console.log(error);

  }

};

const handleSaveIncome = async () => {

  if (!incomeTitle || !incomeAmount || !incomeCategory) {
    return;
  }

  try {

    const token = localStorage.getItem("token");

await API.post(
    "/income",

      {
        title: incomeTitle,
        amount: incomeAmount,
        category: incomeCategory,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    fetchIncome();
    setShowIncomeSuccess(true);

setTimeout(() => {
  setShowIncomeSuccess(false);
}, 2500);

    setIncomeTitle("");
    setIncomeAmount("");
    setIncomeCategory("Salary");

    setShowIncomeModal(false);

  } catch (error) {

    console.log(error);

  }

};
  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-[#f7f5ff]
      via-[#f3f0ff]
      to-[#f8fafc]
      flex
      overflow-hidden
      relative
    ">

      {/* BACKGROUND GLOW */}

      <div className="
        absolute
        top-[-200px]
        right-[-120px]
        w-[500px]
        h-[500px]
        bg-purple-300/20
        blur-[140px]
        rounded-full
      " />

      <div className="
        absolute
        bottom-[-200px]
        left-[30%]
        w-[500px]
        h-[500px]
        bg-violet-200/20
        blur-[140px]
        rounded-full
      " />

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="
        flex-1
        ml-[260px]
        px-6
        py-4
        relative
        z-10
        overflow-x-hidden
      ">

        {/* NAVBAR */}

        <Navbar />

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            mb-8
            relative
          "
        >

          {/* SMALL BADGE */}

          {/* MAIN TITLE */}

          <h1 className="
            text-[64px]
            leading-[1]
            font-black
            tracking-[-3px]
            text-[#111827]
            max-w-4xl
          ">

            Smart Finance

            <span className="text-purple-600">
              {" "}Dashboard
            </span>

          </h1>

          {/* DESCRIPTION */}
          <p className="
    text-slate-500
    text-[22px]
    mt-3
    font-medium
  ">
    Track, organise and control your daily spending
  </p>
      

        </motion.div>

        {/* STATS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        ">

          <StatCard
            title="Total Balance"
          amount={(totalIncome - totalExpenses).toLocaleString("en-IN")}
            color="bg-[#8b5cf6]"
            icon={
              <button 
               className="
  p-2.5
  bg-[#F3E8FF]
hover:bg-purple-100
  active:scale-95
  transition-all
  rounded-xl
  shadow-sm
  flex
  items-center
  justify-center
  border
  border-[#E9D5FF]
"
                onClick={() => console.log('Balance clicked')}
              >
               <Wallet size={20} className="text-purple-600 stroke-[2.5]" />
              </button>
            }
          />

          <StatCard
            title="Income"
           amount={totalIncome.toLocaleString("en-IN")}
            color="bg-[#7c3aed]"
            icon={
              <button 
               className="
  p-2.5
  bg-[#F3E8FF]
hover:bg-purple-100
  active:scale-95
  transition-all
  rounded-xl
  shadow-sm
  flex
  items-center
  justify-center
  border
  border-[#E9D5FF]
"
                onClick={() => setShowIncomeModal(true)}
              >
              <ArrowDownRight size={20} className="text-purple-600 stroke-[2.5]" />
              </button>
            }
          />

          <StatCard
            title="Expenses"
            amount={totalExpenses.toLocaleString("en-IN")}
            color="bg-[#9333ea]"
            icon={
              <button 
              className="
  p-2.5
  bg-[#F3E8FF]
hover:bg-purple-100
  active:scale-95
  transition-all
  rounded-xl
  shadow-sm
  flex
  items-center
  justify-center
  border
  border-[#E9D5FF]
"
               onClick={() => setShowExpenseModal(true)}
              >
               <ArrowUpRight size={20} className="text-purple-600 stroke-[2.5]" />
              </button>
            }
          />

          <StatCard
            title="This Month Savings"
            amount={(
  income
    .filter((item) => {
      const date = new Date(item.created_at);
      return date.getMonth() === new Date().getMonth();
    })
    .reduce((sum, item) => sum + Number(item.amount), 0)

  -

  expenses
    .filter((item) => {
      const date = new Date(item.created_at);
      return date.getMonth() === new Date().getMonth();
    })
    .reduce((sum, item) => sum + Number(item.amount), 0)

).toLocaleString("en-IN")}
            color="bg-[#a855f7]"
            icon={
              <button 
           className="
  p-2.5
  bg-[#F3E8FF]
  hover:bg-[#E9D5FF]
  active:scale-95
  transition-all
  rounded-xl
  shadow-sm
  flex
  items-center
  justify-center
  border
  border-[#E9D5FF]
"
                onClick={() => console.log('Savings clicked')}
              >
              <CreditCard size={20} className="text-purple-600 stroke-[2.5]" />
              </button>
            }
          />

        </div>

        {/* CHART SECTION */}

        <div className="
          grid
          grid-cols-1
          xl:grid-cols-[2fr_1.2fr]
          gap-6
          mt-6
          items-stretch
        ">

         <ExpenseChart expenses={expenses} />

          <ExpenseBreakdown expenses={expenses} />

        </div>

        {/* LOWER SECTION */}

        <div className="
          grid
          grid-cols-1
          xl:grid-cols-[1.15fr_1fr]
          gap-6
          mt-6
          items-start
        ">

          <Insights />

          <RecentTransactions
  expenses={expenses}
  income={income}
/>
        </div>
   {showExpenseModal && (

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
          onClick={() => setShowExpenseModal(false)}
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
          onClick={() => setShowIncomeModal(false)}
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
          placeholder="Income Title"
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
          "
        >
          Save Income
        </button>

      </div>

    </motion.div>

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
        Your income was saved successfully
      </p>
    </div>

  </motion.div>

)}
      </main>

    </div>
  )
}

export default Dashboard