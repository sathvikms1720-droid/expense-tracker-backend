import { motion } from "framer-motion"

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Sparkles,
} from "lucide-react"

function StatCard({
  title,
  amount,
  color,
  icon,
}) {

  const icons = {
    "Total Balance": <Wallet size={20} />,
    "Income": <ArrowDownCircle size={20} />,
    "Expenses": <ArrowUpCircle size={20} />,
    "Savings": <Sparkles size={20} />,
  }

  return (

   <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        relative
        overflow-visible
      "
    >

      {/* FLOATING GLOW */}

      <div className="
        absolute
        -top-8
        right-5
        w-20
        h-20
        rounded-3xl
        blur-2xl
        opacity-20
        bg-gradient-to-br
        from-purple-400
        to-violet-500
      " />

      {/* CARD */}

      <div className="
        relative
        bg-white/90
        backdrop-blur-xl
        border
        border-white/60
        rounded-[34px]
        px-7
        py-6
        shadow-[0_10px_40px_rgba(139,92,246,0.08)]
        min-h-[170px]
        transition-all
        duration-300
      ">

        {/* FLOATING ICON */}

<motion.button
  whileHover={{
    scale: 1.05,
    y: -2,
  }}
  whileTap={{
    scale: 0.96,
  }}
  animate={{
    y: [0, -4, 0],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
  }}
  className="
    absolute
    top-5
    right-5
    w-12
    h-12
    rounded-2xl
    flex
    items-center
    justify-center
    bg-[#F3E8FF]
    border
    border-[#E9D5FF]
    text-[#9333EA]
    shadow-sm
    hover:shadow-md
    transition-all
    duration-300
    cursor-pointer
    z-50
  "
>

 {icon}

</motion.button>

        {/* TITLE */}

        <p className="
          text-gray-500
          text-[20px]
          font-medium
        ">
          {title}
        </p>

        {/* AMOUNT */}

        <h2 className="
          text-[44px]
          font-bold
          text-[#111827]
          mt-4
          tracking-tight
        ">
          ₹{amount}
        </h2>

        {/* BOTTOM */}

        <div className="
          flex
          items-center
          justify-between
          mt-8
        ">

          <span className="
            text-green-500
            text-sm
            font-semibold
          ">
            ↑ 12.5%
          </span>

          <span className="
            text-gray-400
            text-sm
          ">
            This month
          </span>

        </div>

      </div>

    </motion.div>
  )
}

export default StatCard