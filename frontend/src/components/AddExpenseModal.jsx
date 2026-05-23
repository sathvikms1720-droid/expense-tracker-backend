import { X } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

function AddExpenseModal() {
  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          w-[500px]
          rounded-3xl
          p-8
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-[#111827]
          "
        >
          Add New Expense
        </h2>

        <div className="mt-6 space-y-4">

          <input
            type="text"
            placeholder="Expense title"
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              px-4
              py-3
              outline-none
            "
          />

          <input
            type="number"
            placeholder="Amount"
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              px-4
              py-3
              outline-none
            "
          />

          <select
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              px-4
              py-3
              outline-none
              bg-white
            "
          >
            <option>
              Select Category
            </option>
          </select>

          <button
            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              text-white
              py-3
              rounded-2xl
              font-semibold
            "
          >
            Save Expense
          </button>

        </div>

      </div>

    </div>
  )
}

export default AddExpenseModal