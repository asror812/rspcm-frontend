import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, FileText, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Active Practice",
    value: "Web Development",
    icon: BookOpen,
    description: "Current theme",
    color: "bg-blue-500",
  },
  {
    title: "Team Members",
    value: "4",
    icon: Users,
    description: "In your team",
    color: "bg-green-500",
  },
  {
    title: "Days Completed",
    value: "12 / 30",
    icon: Calendar,
    description: "Practice progress",
    color: "bg-purple-500",
  },
  {
    title: "Reports Submitted",
    value: "12",
    icon: FileText,
    description: "Total reports",
    color: "bg-orange-500",
  },
];

const recentActivities = [
  { title: "Daily Report Submitted", time: "2 hours ago", icon: FileText },
  { title: "Team Meeting Scheduled", time: "5 hours ago", icon: Users },
  { title: "Project Files Uploaded", time: "Yesterday", icon: TrendingUp },
  { title: "Teacher Feedback Received", time: "2 days ago", icon: Clock },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your practice activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-smooth hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest practice activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-4 text-left bg-accent hover:bg-accent/80 rounded-lg transition-smooth">
                <div className="font-medium">Submit Daily Report</div>
                <div className="text-sm text-muted-foreground">Fill out today's practice report</div>
              </button>
              <button className="w-full p-4 text-left bg-accent hover:bg-accent/80 rounded-lg transition-smooth">
                <div className="font-medium">Upload Project Files</div>
                <div className="text-sm text-muted-foreground">Share your work with the team</div>
              </button>
              <button className="w-full p-4 text-left bg-accent hover:bg-accent/80 rounded-lg transition-smooth">
                <div className="font-medium">View Calendar</div>
                <div className="text-sm text-muted-foreground">Check upcoming deadlines</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
