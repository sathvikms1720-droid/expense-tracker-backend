import { useLocation, Link } from "react-router-dom"
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  Settings,
  BarChart3,
} from "lucide-react"

import { motion } from "framer-motion"

function Sidebar() {
  const location = useLocation()

  return (

    <aside className="
      fixed
      top-0
      left-0
      h-screen
      w-[260px]
      bg-white/80
      backdrop-blur-xl
      border-r
      border-white/40
      px-5
      py-6
      flex
      flex-col
      justify-between
    
    ">

      <div>

        {/* LOGO */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="mb-10"
        >

          <h1
            className="
              text-[#111827]
              text-[24px]
              leading-[1.1]
              font-black
              tracking-tight
            "
          >
            Expense
            <br />
            Tracker
          </h1>

          <p
            className="
              text-gray-500
              mt-3
              text-sm
            "
          >
            Smart finance dashboard
          </p>

        </motion.div>

        {/* MENU */}

        <div className="flex flex-col gap-3 mt-8">

          {/* DASHBOARD */}

          <Link to="/dashboard">

            <motion.div
              whileHover={{
                x: 5,
              }}
              className={`
                relative
                flex
                items-center
                gap-3
                px-5
                py-4
                rounded-2xl
                transition-all
                ${
                  location.pathname === "/dashboard"
                    ? "bg-purple-100 text-purple-600 border border-purple-200"
                    : "text-gray-500 hover:bg-purple-50"
                }
              `}
            >

              {
                location.pathname === "/dashboard" && (
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[4px]
                      bg-purple-600
                      rounded-full
                    "
                  />
                )
              }

              <LayoutDashboard
                size={20}
                className={
                  location.pathname === "/dashboard"
                    ? "text-purple-700"
                    : ""
                }
              />

              <span
                className={`
                  ${
                    location.pathname === "/dashboard"
                      ? "text-[#111827] font-semibold"
                      : "font-medium"
                  }
                `}
              >
                Dashboard
              </span>

            </motion.div>

          </Link>

          {/* EXPENSES */}

          <Link to="/expenses">

            <motion.div
              whileHover={{
                x: 5,
              }}
              className={`
                relative
                flex
                items-center
                gap-3
                px-5
                py-4
                rounded-2xl
                transition-all
                ${
                  location.pathname === "/expenses"
                    ? "bg-purple-100 text-purple-600 border border-purple-200"
                    : "text-gray-500 hover:bg-purple-50"
                }
              `}
            >

              {
                location.pathname === "/expenses" && (
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[4px]
                      bg-purple-600
                      rounded-full
                    "
                  />
                )
              }

              <Wallet
                size={20}
                className={
                  location.pathname === "/expenses"
                    ? "text-purple-700"
                    : ""
                }
              />

              <span
                className={`
                  ${
                    location.pathname === "/expenses"
                      ? "text-[#111827] font-semibold"
                      : "font-medium"
                  }
                `}
              >
                Expenses
              </span>

            </motion.div>

          </Link>

          {/* ANALYTICS */}

          <Link to="/analytics">

            <motion.div
              whileHover={{
                x: 5,
              }}
              className={`
                relative
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-200
                cursor-pointer
                ${
                  location.pathname === "/analytics"
                    ? "bg-purple-100 text-purple-600 border border-purple-200"
                    : "text-gray-500 hover:text-purple-700 hover:bg-purple-50"
                }
              `}
            >

              {
                location.pathname === "/analytics" && (
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[4px]
                      bg-purple-600
                      rounded-full
                    "
                  />
                )
              }

              <PieChart
                size={20}
                className={
                  location.pathname === "/analytics"
                    ? "text-purple-700"
                    : ""
                }
              />

              <span
                className={`
                  ${
                    location.pathname === "/analytics"
                      ? "text-[#111827] font-semibold"
                      : "font-medium"
                  }
                `}
              >
                Analytics
              </span>

            </motion.div>

          </Link>

          {/* REPORTS */}

          <Link to="/reports">

            <motion.div
              whileHover={{
                x: 5,
              }}
              className={`
                relative
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-200
                cursor-pointer
                ${
                  location.pathname === "/reports"
                    ? "bg-purple-100 text-purple-600 border border-purple-200"
                    : "text-gray-500 hover:text-purple-700 hover:bg-purple-50"
                }
              `}
            >

              {
                location.pathname === "/reports" && (
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[4px]
                      bg-purple-600
                      rounded-full
                    "
                  />
                )
              }

              <BarChart3
                size={20}
                className={
                  location.pathname === "/reports"
                    ? "text-purple-700"
                    : ""
                }
              />

              <span
                className={`
                  ${
                    location.pathname === "/reports"
                      ? "text-[#111827] font-semibold"
                      : "font-medium"
                  }
                `}
              >
                Reports
              </span>

            </motion.div>

          </Link>

          {/* SETTINGS */}

          <Link to="/settings">

            <motion.div
              whileHover={{
                x: 5,
              }}
              className={`
                relative
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-200
                cursor-pointer
                ${
                  location.pathname === "/settings"
                    ? "bg-purple-100 text-purple-600 border border-purple-200"
                    : "text-gray-500 hover:text-purple-700 hover:bg-purple-50"
                }
              `}
            >

              {
                location.pathname === "/settings" && (
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[4px]
                      bg-purple-600
                      rounded-full
                    "
                  />
                )
              }

              <Settings
                size={20}
                className={
                  location.pathname === "/settings"
                    ? "text-purple-700"
                    : ""
                }
              />

              <span
                className={`
                  ${
                    location.pathname === "/settings"
                      ? "text-[#111827] font-semibold"
                      : "font-medium"
                  }
                `}
              >
                Settings
              </span>

            </motion.div>

          </Link>

        </div>

      </div>

    </aside>
  )
}

export default Sidebar