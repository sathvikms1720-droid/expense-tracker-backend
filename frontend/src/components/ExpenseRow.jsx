import { motion } from "framer-motion"
function ExpenseRow({ expense }) {

  return (

    <motion.div
  initial={{
    opacity: 0,
    y: 10,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.25,
  }}
  className="
      grid
      grid-cols-[2fr_1fr_1fr_1fr_100px]
      items-center
      px-6
      py-5
      border-b
      hover:bg-purple-50/40
      transition-all
      duration-300
      hover:bg-purple-50/40
transition-all
duration-200
    ">

      {/* ITEM */}

      <div>

        <h3 className="
          font-semibold
          text-[#111827]
        ">
          {expense.title}
        </h3>

        <p className="
          text-sm
          text-gray-500
          mt-1
        ">
          {expense.note}
        </p>

      </div>

      {/* CATEGORY */}

      <div>

        <span className="
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          bg-purple-100
          text-purple-600
        ">
          {expense.category}
        </span>

      </div>

      {/* DATE */}

      <div>

        <p className="
          text-sm
          text-gray-600
        ">
          {expense.date}
        </p>

      </div>

      {/* AMOUNT */}

      <div>

        <p className="
          text-red-500
          font-bold
        ">
          ₹{expense.amount}
        </p>

      </div>

      {/* ACTION */}

      <button className="
        text-gray-400
        hover:text-purple-600
        transition-all
      ">
        ⋮
      </button>
</motion.div>

  )
}

export default ExpenseRow