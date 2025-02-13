"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/frontend/lib/utils"
import { Icons } from "@/components/icons"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Icons.dashboard },
  { name: "Tasks", href: "/tasks", icon: Icons.tasks },
  { name: "Team", href: "/team", icon: Icons.team },
  { name: "Settings", href: "/settings", icon: Icons.settings },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 border-r bg-card min-h-screen">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Icons.logo className="h-6 w-6" />
          <span>TaskFlow</span>
        </Link>
      </div>
      <div className="p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}