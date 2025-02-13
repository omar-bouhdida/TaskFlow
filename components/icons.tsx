import { Loader2, LucideCrop as LucideProps, Moon, SunMedium, Laptop, LayoutDashboard, ClipboardList, Users, Settings, Bell, LogOut, CheckCircle2, Clock, XCircle, BarChart2 } from "lucide-react"

export const Icons = {
  logo: LayoutDashboard,
  spinner: Loader2,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  dashboard: LayoutDashboard,
  tasks: ClipboardList,
  team: Users,
  settings: Settings,
  notifications: Bell,
  logout: LogOut,
  completed: CheckCircle2,
  pending: Clock,
  cancelled: XCircle,
  chart: BarChart2,
}

export type Icon = keyof typeof Icons