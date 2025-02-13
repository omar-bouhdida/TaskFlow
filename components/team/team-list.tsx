"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const team = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    avatar: "https://github.com/shadcn.png",
    tasks: 12,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "Active",
    avatar: "https://github.com/shadcn.png",
    tasks: 8,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Team Member",
    status: "Away",
    avatar: "https://github.com/shadcn.png",
    tasks: 5,
  },
]

export function TeamList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tasks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {team.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{member.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={member.status === "Active" ? "default" : "secondary"}
              >
                {member.status}
              </Badge>
            </TableCell>
            <TableCell>{member.tasks} tasks</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}