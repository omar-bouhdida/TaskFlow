"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardNav } from "@/components/dashboard/nav"
import { TaskList } from "@/components/tasks/task-list"
import { CreateTaskButton } from "@/components/tasks/create-task-button"

export default function TasksPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 bg-muted/10">
        <DashboardHeader />
        <div className="container p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <CreateTaskButton />
          </div>
          <TaskList />
        </div>
      </main>
    </div>
  )
}