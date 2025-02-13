"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface TaskDialogProps {
  task: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDialog({ task, open, onOpenChange }: TaskDialogProps) {
  const [newComment, setNewComment] = useState("")

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
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
          <DialogTitle className="text-2xl">{task.title}</DialogTitle>
          <p className="text-muted-foreground">{task.description}</p>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={task.assignee.avatar} />
                <AvatarFallback>
                  {task.assignee.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{task.assignee.name}</p>
                <p className="text-sm text-muted-foreground">Assignee</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Due Date</p>
              <p className="text-sm text-muted-foreground">{task.dueDate}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Comments</h3>
            <div className="space-y-4">
              {task.comments.map((comment: any) => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {comment.user
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{comment.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-4">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button className="w-full">
                <Icons.tasks className="mr-2 h-4 w-4" />
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}