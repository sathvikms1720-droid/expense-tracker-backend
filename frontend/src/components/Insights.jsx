import { motion } from "framer-motion"
import {
  TrendingUp,
  PiggyBank,
  Wallet,
  ShieldCheck,
} from "lucide-react"

const insights = [
  {
    title: "Great Spending Control!",
    description:
      "You've spent 15% less on dining out this month. Keep it up!",
    growth: "+15%",
    bg: "from-[#8b5cf6] to-[#d946ef]",
    icon: TrendingUp,
  },

  {
    title: "Savings Growing",
    description:
      "Your monthly savings increased compared to last month.",
    growth: "+22%",
    bg: "from-[#22c55e] to-[#06b6d4]",
    icon: PiggyBank,
  },

  {
    title: "Budget Stable",
    description:
      "Your weekly expenses remain inside your planned budget.",
    growth: "+8%",
    bg: "from-[#6366f1] to-[#8b5cf6]",
    icon: Wallet,
  },

  {
    title: "Security Protected",
    description:
      "No suspicious activities detected in recent transactions.",
    growth: "100%",
    bg: "from-[#0f172a] to-[#1e293b]",
    icon: ShieldCheck,
  },
]

function Insights() {
  return (

    <div className="bg-white rounded-[28px] border border-[#ececf3] p-5 shadow-sm">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-[28px] font-bold text-[#111827]">
            Smart Insights
          </h2>

          <p className="text-[#8c8ca1] mt-1">
            AI-powered financial recommendations
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button className="w-9 h-9 rounded-full border border-[#ececf3] flex items-center justify-center text-[#8b5cf6]">
            ←
          </button>

          <button className="w-9 h-9 rounded-full border border-[#ececf3] flex items-center justify-center text-[#8b5cf6]">
            →
          </button>

        </div>

      </div>

      {/* CARDS */}

      <div className="space-y-4">

        {insights.map((item, index) => {

          const Icon = item.icon

          return (

            <motion.div
              key={index}
              whileHover={{
              scale: 1.015,
                y: -4,
                }}
                transition={{
                  duration: 0.2,
              }}
              className="bg-[#fafafa] overflow-hidden border border-[#f1f1f5] rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300">

              <div className="flex items-center gap-4 min-w-0 flex-1">

                {/* ICON */}

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center shadow-lg`}>

                  <Icon
                    size={24}
                    className="text-white"
                  />

                </div>

                {/* CONTENT */}

                <div>

                  <h3 className="text-[16px] font-bold text-[#111827]">
                    {item.title}
                  </h3>

                  <p className="text-[#8c8ca1] text-sm mt-1 max-w-[220px]">
                    {item.description}
                  </p>

                </div>

              </div>

              {/* GROWTH */}

              <div className="bg-[#ecfdf3] text-[#22c55e] px-4 py-3 rounded-2xl text-center min-w-[90px]">

                <h4 className="font-bold text-lg">
                  {item.growth}
                </h4>

                <p className="text-xs mt-1">
                  vs last month
                </p>

              </div>

           </motion.div>

          )
        })}

      </div>

    </div>
  )
}

export default Insights