import React, { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"

import Navbar from "../components/Navbar"

import { motion } from "framer-motion"
import API from "../services/api";

import {
  Wallet,
  TrendingUp,
  PieChart,
  CreditCard,
  Download,
  Calendar,
  ChevronRight,
  Utensils,
  Car,
  ShoppingBag,
  Zap,
  Film,
  MoreHorizontal,
  Search,
  Bell,
  ChevronDown,
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



const categoryColors = {
  "Food & Dining": "#7C3AED",
  Transportation: "#6366F1",
  Shopping: "#EC4899",
  Utilities: "#F59E0B",
  Entertainment: "#22D3EE",
  Others: "#94A3B8",
};

const categoryIcons = {
  "Food & Dining": <Utensils size={18} />,
  Transportation: <Car size={18} />,
  Shopping: <ShoppingBag size={18} />,
  Utilities: <Zap size={18} />,
  Entertainment: <Film size={18} />,
  Others: <MoreHorizontal size={18} />,
};

function AnalyticsPage() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  useEffect(() => {
  
  const fetchExpenses = async () => {

    try {

      const token = localStorage.getItem("token");

const response = await API.get("/expenses");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }
  };
  
  const fetchIncome = async () => {

  try {

    const token = localStorage.getItem("token");

const response = await API.get("/income");

    setIncome(response.data);

    console.log("INCOME DATA:", response.data);

  } catch (error) {

    console.log(error);

  }
};

  fetchExpenses();
  fetchIncome();

}, []);
const totalExpenses = expenses.reduce((total, expense) => {
  return total + Number(expense.amount);
}, 0);

const categoryTotals = {};

expenses.forEach((expense) => {

  const validCategories = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Utilities",
    "Entertainment",
  ];

  const category = validCategories.includes(
    expense.category
  )
    ? expense.category
    : "Others";

  if (!categoryTotals[category]) {
    categoryTotals[category] = 0;
  }

  categoryTotals[category] += Number(expense.amount);

});

const categoryOrder = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Utilities",
  "Entertainment",
  "Others",
];

const categoryData = Object.entries(categoryTotals)

  .map(([name, amount]) => ({

    name,

    amount: `₹${amount.toLocaleString()}`,

    value:
      totalExpenses > 0
        ? Math.round((amount / totalExpenses) * 100)
        : 0,

    color: categoryColors[name] || "#94A3B8",

    icon: categoryIcons[name] || <MoreHorizontal size={18} />,

  }))

  .sort(
    (a, b) =>
      categoryOrder.indexOf(a.name) -
      categoryOrder.indexOf(b.name)
  );
const highestIncome =
  income.length > 0
    ? income.reduce((max, item) =>
        Number(item.amount) > Number(max.amount)
          ? item
          : max
      )
    : null;
  const highestExpense =
  expenses.length > 0
    ? expenses.reduce((max, expense) =>
        Number(expense.amount) > Number(max.amount)
          ? expense
          : max
      )
    : null;

const lineData = expenses.map((expense, index) => ({

  date: expense.created_at
    ? new Date(expense.created_at).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      )
    : `Expense ${index + 1}`,

  amount: Number(expense.amount),

}));

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

      <Sidebar />

      <main className="
        flex-1
        ml-[260px]
        p-8
        relative
        z-10
      ">

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
            flex
            justify-between
            items-center
            mb-8
          "
        >

          <div>

            <h1 className="
             text-[42px] xl:text-[64px]
              leading-[1]
              font-black
              tracking-[-3px]
              text-[#111827]
            ">
              Analytics
              <span className="text-purple-600">
                {" "}Overview
              </span>
            </h1>

            <p className="
              text-[20px]
              text-slate-500
              mt-3
            ">
              Track your spending patterns and financial insights
            </p>

          </div>

          <div className="flex gap-4">

            
          </div>

        </motion.div>

        {/* TOP STATS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-8
        ">

          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses.toLocaleString()}`}
            trend="+12.5%"
            icon={<Wallet className="text-purple-600" />}
          />

          <StatCard
  title="Highest Income"
  value={
    highestIncome
      ? `₹${Number(
          highestIncome.amount
        ).toLocaleString()}`
      : "₹0"
  }
  subValue="Largest income transaction"
  icon={<TrendingUp className="text-green-600" />}
/>

          <StatCard
  title="Highest Expense"
  value={
    highestExpense
      ? `₹${Number(
          highestExpense.amount
        ).toLocaleString()}`
      : "₹0"
  }
  subValue="Largest single transaction"
  icon={<PieChart className="text-purple-600" />}
/>

          <StatCard
            title="Total Transactions"
            value={expenses.length.toString()}
            trend="+7.7%"
            icon={<CreditCard className="text-purple-600" />}
          />

        </div>

        {/* MAIN GRID */}

        <div className="
  grid
  grid-cols-1
  xl:grid-cols-12
  gap-8
">

          {/* LEFT SIDE */}

          <div className="
            xl:col-span-7
            space-y-8
          ">

            {/* GRAPH */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              whileHover={{
                y: -5,
              }}
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

              <div className="
                flex
                justify-between
                items-center
                mb-6
              ">

                <h3 className="
                  text-[28px]
                  font-bold
                ">
                  Spending Over Time
                </h3>

                <select className="
                  bg-slate-50
                  border-none
                  rounded-xl
                  px-4
                  py-2
                  text-[18px]
                  font-medium
                ">
                  <option>Daily</option>
                </select>

              </div>

              <div className="h-[320px] w-full">

                <ResponsiveContainer width="100%" height="100%">

                  <AreaChart data={lineData}>

                    <defs>

                      <linearGradient
                        id="colorAmt"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="5%"
                          stopColor="#7C3AED"
                          stopOpacity={0.25}
                        />

                        <stop
                          offset="95%"
                          stopColor="#7C3AED"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F1F5F9"
                    />

                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#94A3B8",
                        fontSize: 15,
                      }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#94A3B8",
                        fontSize: 15,
                      }}
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#7C3AED"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorAmt)"
                      dot={{
                        r: 5,
                        fill: "#7C3AED",
                        strokeWidth: 2,
                        stroke: "#ffffff",
                      }}
                      activeDot={{
                        r: 8,
                      }}
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </motion.div>

            {/* CATEGORY BREAKDOWN */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              whileHover={{
                y: -5,
              }}
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

              <h3 className="
                text-[28px]
                font-bold
                mb-8
              ">
                Category Breakdown
              </h3>

              <div className="space-y-6">

                {categoryData.map((cat, i) => (

                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.1,
                    }}
                    whileHover={{
                      x: 5,
                    }}
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        p-3
                        rounded-xl
                      "
                      style={{
                        backgroundColor: `${cat.color}20`,
                        color: cat.color,
                      }}
                    >

                      {cat.icon}

                    </div>

                    <div className="flex-1">

                      <div className="
                        flex
                        justify-between
                        mb-2
                      ">

                        <span className="
                          font-semibold
                          text-slate-700
                          text-[20px]
                        ">
                          {cat.name}
                        </span>

                        <div className="flex gap-8">

                          <span className="
                            font-bold
                            text-[20px]
                          ">
                            {cat.amount}
                          </span>

                          <span className="
                            text-slate-400
                            w-8
                            text-[20px]
                          ">
                            {cat.value}%
                          </span>

                        </div>

                      </div>

                      <div className="
                        w-full
                        bg-slate-100
                        h-3
                        rounded-full
                        overflow-hidden
                      ">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${cat.value}%`,
                          }}
                          transition={{
                            duration: 1,
                            delay: i * 0.15,
                          }}
                          className="
                            h-full
                            rounded-full
                          "
                          style={{
                            backgroundColor: cat.color,
                          }}
                        />

                      </div>

                    </div>

                  </motion.div>

                ))}

              </div>

            </motion.div>

          </div>

          {/* RIGHT SIDE */}

          <div className="
            col-span-5
            space-y-8
          ">

            {/* PIE CHART */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              whileHover={{
                y: -5,
              }}
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

              <h3 className="
                text-[28px]
                font-bold
                mb-6
              ">
                Expense by Category
              </h3>

              <div className="
                h-[360px]
                relative
              ">
                <div className="
  absolute
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
  w-[220px]
  h-[220px]
  bg-purple-400/10
  blur-3xl
  rounded-full
" /> 

                <ResponsiveContainer width="100%" height="100%">

                  <RePieChart>

                    <Pie
                      data={categoryData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={110}
                      outerRadius={150}
                      paddingAngle={2}
                      cornerRadius={3}
                      stroke="none"
                      isAnimationActive={true}
                      animationBegin={200}
                      animationDuration={1400}
                    >

                      {categoryData.map((entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />

                      ))}

                    </Pie>

                  </RePieChart>

                </ResponsiveContainer>

                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.6,
                    duration: 0.4,
                  }}
                  className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                    pointer-events-none
                  "
                >

                  <span className="
                    text-slate-400
                    text-[20px]
                  ">
                    Total
                  </span>

                  <span className="
                    text-[42px]
                    font-black
                    tracking-[-2px]
                    text-[#111827]
                  ">
                    ₹{totalExpenses.toLocaleString()}
                  </span>

                </motion.div>

              </div>

              {/* LEGENDS */}

              <div className="
                grid
                grid-cols-2
                gap-y-5
                gap-x-2
                mt-2
              ">

                {categoryData.map((item, index) => (

                  <motion.div
                    key={index}
                    whileHover={{
                      x: 5,
                    }}
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        w-4
                        h-4
                        rounded-full
                      "
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span className="
                      text-[20px]
                      text-slate-600
                    ">
                     <div className="
  flex
  items-center
  w-full
  relative
">

  <span>{item.name}</span>

  <span className="
  text-slate-400
  text-[15px]
  absolute
  left-[200px]
">
  {item.value}%
</span>

</div>
                    </span>

                  </motion.div>

                ))}

              </div>

            </motion.div>

            {/* INSIGHTS */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.5,
              }}
              whileHover={{
                y: -5,
              }}
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

              <h3 className="
                text-[28px]
                font-bold
                mb-6
              ">
                Insights
              </h3>

              <div className="space-y-5">

                <InsightItem
                  icon={<TrendingUp size={18} />}
                  color="purple"
                  text="Your spending increased by 12.5%"
                  sub="Compared to last 30 days"
                />

                <InsightItem
                  icon={<Utensils size={18} />}
                  color="green"
                  text="Food & Dining is your highest category"
                  sub="32% of your total expenses"
                />

                <InsightItem
                  icon={<PieChart size={18} />}
                  color="orange"
                  text="You're on track with your budget"
                  sub="75% of monthly budget remaining"
                />

              </div>

            </motion.div>

          </div>

        </div>

      </main>

    </div>

  )
}

/* STAT CARD */

function StatCard({
  title,
  value,
  trend,
  subValue,
  icon,
}) {

  return (

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
      whileHover={{
        y: -5,
        transition: {
          duration: 0.2,
        },
      }}
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

      <div className="
        flex
        justify-between
        items-start
      ">

        <p className="
          text-gray-500
          text-[20px]
          font-medium
        ">
          {title}
        </p>

        <div className="
          p-3
          bg-purple-50
          rounded-2xl
        ">
          {icon}
        </div>

      </div>

      <h2 className="
        text-[38px]
        font-black
        mt-4
        text-[#111827]
      ">
        {value}
      </h2>

      {trend && (

        <p className="
          text-green-500
          font-bold
          text-[20px]
          mt-4
        ">

          ↑ {trend}

          <span className="
            text-gray-400
            font-normal
          ">
            {" "}vs last 30 days
          </span>

        </p>

      )}

      {subValue && (

        <p className="
          text-purple-600
          font-bold
          text-[20px]
          mt-4
        ">
          {subValue}
        </p>

      )}

    </motion.div>

  )
}

/* INSIGHT ITEM */

function InsightItem({
  icon,
  color,
  text,
  sub,
}) {

  const colors = {
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  }

  return (

    <motion.div
      whileHover={{
        x: 5,
      }}
      className={`
        flex
        items-center
        justify-between
        p-5
        rounded-[24px]
        transition-all
        duration-300
        ${colors[color]}
      `}
    >

      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          p-3
          bg-white
          rounded-2xl
          shadow-sm
        ">
          {icon}
        </div>

        <div>

          <p className="
            font-bold
            text-[20px]
          ">
            {text}
          </p>

          <p className="
            text-[18px]
            opacity-70
          ">
            {sub}
          </p>

        </div>

      </div>

      <ChevronRight
        size={20}
        className="opacity-50"
      />

    </motion.div>

  )
}

export default AnalyticsPage