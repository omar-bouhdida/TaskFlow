"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TaskDialog } from "./task-dialog"

const tasks = [
  {
    id: 1,
    title: "Design new landing page",
    description: "Create a modern and responsive landing page design",
    status: "In Progress",
    priority: "High",
    assignee: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
    dueDate: "2024-03-25",
    comments: [
      {
        id: 1,
        user: "Jane Smith",
        content: "Looking good! Just need to adjust the spacing.",
        timestamp: "2024-03-23T10:30:00",
      },
    ],
  },
  {
    id: 2,
    title: "Fix navigation bug",
    description: "Resolve the navigation issue in the mobile menu",
    status: "Completed",
    priority: "Medium",
    assignee: {
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
    },
    dueDate: "2024-03-24",
    comments: [],
  },
]

export function TaskList() {
  const [selectedTask, setSelectedTask] = useState<typeof tasks[0] | null>(null)

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedTask(task)}>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
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
                <Badge variant="outline">{task.priority}</Badge>
              </div>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback>
                      {task.assignee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {task.assignee.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Due {task.dueDate}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <TaskDialog
        task={selectedTask}
        open={!!selectedTask}
        onOpenChange={() => setSelectedTask(null)}
      />
    </>
  )
}