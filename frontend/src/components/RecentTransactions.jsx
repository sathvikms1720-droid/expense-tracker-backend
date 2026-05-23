import { motion } from "framer-motion"

import {
  ArrowUpRight,
  ShoppingBag,
  Utensils,
  Car,
  Film,
  Wallet,
} from "lucide-react"

import { useEffect, useState } from "react"
import axios from "axios"

const getCategoryIcon = (category) => {

  switch (category?.toLowerCase()) {

    case "shopping":
      return <ShoppingBag size={22} className="text-[#8b5cf6]" />

    case "food":
    case "food & dining":
      return <Utensils size={22} className="text-[#ec4899]" />

    case "transport":
    case "transportation":
      return <Car size={22} className="text-[#3b82f6]" />

    case "entertainment":
      return <Film size={22} className="text-[#06b6d4]" />

    default:
      return <Wallet size={22} className="text-[#22c55e]" />
  }
}
function RecentTransactions({
  expenses = [],
  income = [],
}) {

const transactions = [

  ...expenses.map((item) => ({
    ...item,
    type: "expense",
  })),

  ...income.map((item) => ({
    ...item,
    type: "income",
  })),

].sort(
  (a, b) =>
    new Date(b.created_at) -
    new Date(a.created_at)
);
  return (

    <div className="bg-white rounded-[28px] border border-[#ececf3] p-5 shadow-sm">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-[28px] font-bold text-[#111827]">
            Recent Transactions
          </h2>

          <p className="text-[#8c8ca1] mt-1">
            Latest transactions and activities
          </p>

        </div>

        <button className="bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg">

          View All

        </button>

      </div>

      {/* TRANSACTIONS */}

      <div className="
  space-y-4
  max-h-[620px]
  overflow-y-auto
  pr-2
">

        {transactions.map((item, index) => (

          <motion.div
            key={index}
              whileHover={{

              x: 4,
              }}
                transition={{
                  duration: 0.2,
              }}        
           className="flex items-center justify-between gap-4 bg-[#fafafa] border border-[#f1f1f5] rounded-2xl p-4 hover:shadow-md transition-all duration-300">

            {/* LEFT */}

            <div className="flex items-center gap-4 min-w-0 flex-1">

             <div className="
  w-12
  h-12
  rounded-2xl
  flex
  items-center
  justify-center
  bg-[#f3f0ff]
">

  {getCategoryIcon(item.category)}

</div>
              <div>

                <h3 className="font-bold text-[#111827] text-[17px]">
                  {item.title}
                </h3>

                <p className="text-[#8c8ca1] text-sm mt-1">
                  {item.category}
                </p>

              </div>

            </div>

            {/* RIGHT */}

            <div className="text-right">

              <h3 className={`font-bold text-lg ${
  item.type === "income"
    ? "text-[#22c55e]"
    : "text-[#ef4444]"
}`}>

               {item.type === "income" ? "+" : "-"}₹{item.amount}

              </h3>

              <p className="text-[#8c8ca1] text-sm mt-1">
                {new Date(item.created_at).toLocaleDateString()}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  )
}

export default RecentTransactions