import { Users, GraduationCap, UsersRound, BookOpen, ClipboardList, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const statsCards = [
  {
    title: "Total Students",
    value: "256",
    change: "+12 this month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Total Teachers",
    value: "24",
    change: "+2 this month",
    icon: GraduationCap,
    trend: "up",
  },
  {
    title: "Active Groups",
    value: "18",
    change: "3 pending",
    icon: UsersRound,
    trend: "neutral",
  },
  {
    title: "Practice Themes",
    value: "12",
    change: "4 active",
    icon: BookOpen,
    trend: "up",
  },
];

const recentActivities = [
  { user: "Admin", action: "Created new group", target: "Group CS-401", time: "10 min ago", type: "group" },
  { user: "System", action: "New student registered", target: "Ivan Petrov", time: "1 hour ago", type: "student" },
  { user: "Admin", action: "Assigned teacher", target: "Dr. Smith to CS-301", time: "2 hours ago", type: "teacher" },
  { user: "System", action: "Practice started", target: "Web Development", time: "3 hours ago", type: "practice" },
  { user: "Admin", action: "Created exam", target: "Final Exam CS-201", time: "Yesterday", type: "exam" },
];

const pendingItems = [
  { type: "Students", count: 5, description: "Awaiting group assignment" },
  { type: "Teachers", count: 2, description: "Pending subject assignment" },
  { type: "Groups", count: 3, description: "Missing practice theme" },
];

const Dashboard = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "group":
        return <UsersRound className="h-4 w-4 text-primary" />;
      case "student":
        return <Users className="h-4 w-4 text-success" />;
      case "teacher":
        return <GraduationCap className="h-4 w-4 text-warning" />;
      case "practice":
        return <BookOpen className="h-4 w-4 text-info" />;
      case "exam":
        return <ClipboardList className="h-4 w-4 text-destructive" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.trend === "up" ? "text-success" : 
                    stat.trend === "warning" ? "text-warning" : "text-muted-foreground"
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                  stat.trend === "up" ? "bg-success/10" : 
                  stat.trend === "warning" ? "bg-warning/10" : "bg-primary/10"
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.trend === "up" ? "text-success" : 
                    stat.trend === "warning" ? "text-warning" : "text-primary"
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">{activity.user}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Items */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingItems.map((item, index) => (
                <div key={index} className="p-4 rounded-lg border border-warning/20 bg-warning/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.type}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0">
                      {item.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-4">System Health</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                  <p className="text-2xl font-bold text-success">98%</p>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-2xl font-bold text-primary">142</p>
                  <p className="text-xs text-muted-foreground">Active Sessions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
