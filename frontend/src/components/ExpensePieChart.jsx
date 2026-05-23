import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Food & Dining",
    value: 35,
    color: "#9333ea",
  },
  {
    name: "Transportation",
    value: 25,
    color: "#ec4899",
  },
  {
    name: "Shopping",
    value: 20,
    color: "#3b82f6",
  },
  {
    name: "Entertainment",
    value: 12,
    color: "#f59e0b",
  },
  {
    name: "Bills & Utilities",
    value: 8,
    color: "#14b8a6",
  },
]

function ExpensePieChart() {

  return (

    <div>

      <div className="relative w-[220px] h-[220px] mx-auto">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={78}
              outerRadius={122}
              paddingAngle={2}
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

        <div className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
        ">

          <h2 className="
            text-[42px]
            font-black
            text-[#111827]
          ">
            ₹25000
          </h2>

          <p className="text-gray-500 text-sm">
            Total
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        {data.map((item) => (

          <div
            key={item.name}
            className="flex items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <div
                className="w-3 h-3 rounded-full"
                style={{ background: item.color }}
              />

              <p className="text-sm text-gray-700">
                {item.name}
              </p>

            </div>

            <span className="text-sm font-semibold text-gray-700">
              {item.value}%
            </span>

          </div>

        ))}

      </div>

    </div>

  )
}

export default ExpensePieChart