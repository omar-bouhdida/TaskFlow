"use client"

import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardNav } from "@/components/dashboard/nav"
import { SettingsForm } from "@/components/settings/settings-form"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      <main className="flex-1 bg-muted/10">
        <DashboardHeader />
        <div className="container p-6">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          <SettingsForm />
        </div>
      </main>
    </div>
  )
}