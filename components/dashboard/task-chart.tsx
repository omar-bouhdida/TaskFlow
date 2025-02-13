"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", completed: 4, pending: 2 },
  { name: "Tue", completed: 3, pending: 1 },
  { name: "Wed", completed: 2, pending: 4 },
  { name: "Thu", completed: 5, pending: 3 },
  { name: "Fri", completed: 4, pending: 2 },
]

export function TaskChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="hsl(var(--chart-1))" name="Completed" />
          <Bar dataKey="pending" fill="hsl(var(--chart-2))" name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}