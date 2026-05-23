import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"


function ExpenseChart({ expenses }) {
  const monthlyData = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
].map((month, index) => {

  const total = expenses
    .filter((item) => {
      const date = new Date(item.created_at);
      return date.getMonth() === index;
    })
    .reduce((sum, item) => sum + Number(item.amount), 0);

return {
  month: month,
  expense: total,
};

});
  return (

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
    duration: 0.5,
  }}
  whileHover={{
    y: -4,
  }}
  className="bg-white rounded-[30px] border border-[#ececf3] p-7 shadow-[0_10px_40px_rgba(124,58,237,0.06)]">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-[42px] font-bold text-[#111827] tracking-tight">
            Expense Analytics
          </h2>

          <p className="text-[#8c8ca1] mt-1">
            Monthly spending overview
          </p>

        </div>

        <select className="bg-[#fafafa] border border-[#ececf3] rounded-xl px-4 py-2 text-sm outline-none">

          <option>2025</option>

        </select>

      </div>

      {/* CHART */}

      <div className="h-[430px] mt-4">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={monthlyData}>

            <defs>

              <linearGradient
                id="purpleGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopColor="#8b5cf6"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#ececf3"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              stroke="#9ca3af"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#9ca3af"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#8b5cf6"
              strokeWidth={5}
              fill="url(#purpleGradient)"
              dot={{
                fill: "#8b5cf6",
                r: 5,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

   </motion.div>
  )
}

export default ExpenseChart