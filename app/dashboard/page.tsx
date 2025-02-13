"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardNav } from "@/components/dashboard/nav"
import { TaskChart } from "@/components/dashboard/task-chart"
import { TaskStats } from "@/components/dashboard/task-stats"
import { RecentTasks } from "@/components/dashboard/recent-tasks"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 bg-muted/10">
        <DashboardHeader />
        <div className="container p-6 space-y-8">
          <TaskStats />
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Task Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentTasks />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}