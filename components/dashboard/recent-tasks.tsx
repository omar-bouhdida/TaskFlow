"use client"

import { Badge } from "@/components/ui/badge"

const recentTasks = [
  {
    id: 1,
    title: "Design new landing page",
    status: "In Progress",
    assignee: "John Doe",
    dueDate: "2024-03-25",
  },
  {
    id: 2,
    title: "Fix navigation bug",
    status: "Completed",
    assignee: "Jane Smith",
    dueDate: "2024-03-24",
  },
  {
    id: 3,
    title: "Update documentation",
    status: "Pending",
    assignee: "Mike Johnson",
    dueDate: "2024-03-26",
  },
]

export function RecentTasks() {
  return (
    <div className="space-y-4">
      {recentTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div>
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-muted-foreground">
              Assigned to {task.assignee}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={
                task.status === "Completed"
                  ? "default"
                  : task.status === "In Progress"
                  ? "secondary"
                  : "outline"
              }
            >
              {task.status}
            </Badge>
            <span className="text-sm text-muted-foreground">{task.dueDate}</span>
          </div>
        </div>
      ))}
    </div>
  )
}