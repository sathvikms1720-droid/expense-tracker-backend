import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  CartesianGrid,
} from "recharts"

const data = [
  {
    week: "Week 1",
    amount: 1800,
  },
  {
    week: "Week 2",
    amount: 4200,
  },
  {
    week: "Week 3",
    amount: 5100,
  },
  {
    week: "Week 4",
    amount: 3700,
  },
  {
    week: "Week 5",
    amount: 6900,
  },
]

function SpendingChart() {

  return (

    <div className="h-[240px]">

      <ResponsiveContainer width="100%" height="100%">

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="colorSpend"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#9333ea"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#9333ea"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <XAxis
            dataKey="week"
            tickLine={false}
            axisLine={false}
            tick={{
              fontSize: 12,
            }}
          />

          <Tooltip />
        <CartesianGrid
  strokeDasharray="4 4"
  stroke="rgba(139,92,246,0.08)"
/>  

         <Area
  type="monotone"
  dataKey="amount"
  stroke="#8b5cf6"
  strokeWidth={4}
  fillOpacity={1}
  fill="url(#colorSpend)"
  tension={0.5}
  dot={{
    r: 5,
    fill: "#8b5cf6",
    stroke: "#ffffff",
    strokeWidth: 3,
  }}
  activeDot={{
    r: 8,
  }}
/>

        </AreaChart>

      </ResponsiveContainer>

    </div>

  )
}

export default SpendingChart