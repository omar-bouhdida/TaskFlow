  "use client"

  import { DashboardHeader } from "@/components/dashboard/header"
  import { DashboardNav } from "@/components/dashboard/nav"
  import { TeamList } from "@/components/team/team-list"
  import { InviteTeamMemberButton } from "@/components/team/invite-team-member-button"

  export default function TeamPage() {
    return (
      <div className="flex min-h-screen">
        <DashboardNav />
        <main className="flex-1 bg-muted/10">
          <DashboardHeader />
          <div className="container p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Team</h1>
              <InviteTeamMemberButton />
            </div>
            <TeamList />
          </div>
        </main>
      </div>
    )
  }