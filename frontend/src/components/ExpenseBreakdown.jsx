import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

import { motion } from "framer-motion"



function ExpenseBreakdown({ expenses = [] }) {

 const colors = [
  "#8b5cf6",
  "#ec4899",
  "#3b82f6",
  "#94a3b8",
  "#f59e0b",
];

  const categoryTotals = {};

  expenses.forEach((expense) => {

    const category = expense.category;

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += Number(expense.amount);

  });

  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

const data = Object.entries(categoryTotals)
  .sort(([a], [b]) => {

    if (a === "Others") return 1;

    if (b === "Others") return -1;

    return 0;

  })
  .map(([name, value]) => {

    let color = "#8b5cf6";

    if (name === "Transportation") {
      color = "#8b5cf6";
    }

    else if (name === "Food & Dining") {
      color = "#ec4899";
    }

    else if (name === "Shopping") {
      color = "#3b82f6";
    }

    else if (name === "Others") {
      color = "#f59e0b";
    }

    else if (name === "Entertainment") {
      color = "#22d3ee";
    }

    return {
      name,
      value,
      color,
    };

  });
   



  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      whileHover={{
        y: -4,
      }}
      className="
        relative
        rounded-[34px]
        bg-white/80
        backdrop-blur-xl
        border
        border-white/60
        shadow-[0_10px_40px_rgba(139,92,246,0.08)]
        p-7
        overflow-hidden
        h-full
      "
    >

      {/* GLOW */}

      <div className="
        absolute
        top-[-120px]
        right-[-80px]
        w-[240px]
        h-[240px]
        bg-purple-200/30
        blur-[100px]
        rounded-full
      " />

      {/* HEADER */}

      <div className="relative z-10">

        <h2 className="
          text-[22px]
          font-bold
          text-[#111827]
          tracking-tight
        ">
          Expense Breakdown
        </h2>

        <p className="
          text-gray-500
          mt-1
          text-sm
        ">
          Category-wise spending analysis
        </p>

      </div>

      {/* CHART */}

      <div className="
        h-[280px]
        mt-2
        relative
        z-10
      ">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={entry.color}
                />

              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

        {/* CENTER TEXT */}

        <div className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          pointer-events-none
        ">

          <h1 className="
            text-[28px]
            font-black
            text-[#111827]
          ">
            ₹{totalExpenses.toLocaleString("en-IN")}
          </h1>

          <p className="
            text-gray-400
            text-sm
            mt-[-2px]
          ">
            Total
          </p>

        </div>

      </div>

      {/* LEGEND */}

      <div className="
        mt-2
        space-y-5
        relative
        z-10
      ">

        {data.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{
              x: 4,
            }}
            className="
              flex
              items-center
              justify-between
            "
          >

            <div className="
              flex
              items-center
              gap-3
            ">

              <div
                className="
                  w-3
                  h-3
                  rounded-full
                "
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="
                text-[#111827]
                font-medium
                text-[15px]
              ">
                {item.name}
              </span>

            </div>

            <span className="
              text-gray-700
              font-semibold
              text-sm
            ">
              ₹{item.value.toLocaleString("en-IN")}
            </span>

          </motion.div>

        ))}

      </div>

    </motion.div>
  )
}

export default ExpenseBreakdown