import { Icons } from "../icons";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Adjust the path to where Card components are defined

export function TaskStats() {
  const stats = [
    {
      name: "Total Tasks",
      value: "25",
      icon: Icons.tasks,
    },
    {
      name: "Completed",
      value: "18",
      icon: Icons.completed,
    },
    {
      name: "In Progress",
      value: "5",
      icon: Icons.pending,
    },
    {
      name: "Cancelled",
      value: "2",
      icon: Icons.cancelled,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}