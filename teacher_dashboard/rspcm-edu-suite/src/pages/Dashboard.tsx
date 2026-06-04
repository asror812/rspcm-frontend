import { Users, FileText, CheckCircle, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const statsCards = [
  {
    title: "Total Students",
    value: "48",
    change: "+3 this week",
    icon: Users,
    trend: "up",
  },
  {
    title: "Pending Reports",
    value: "12",
    change: "5 need review",
    icon: FileText,
    trend: "warning",
  },
  {
    title: "Approved Results",
    value: "156",
    change: "+24 this month",
    icon: CheckCircle,
    trend: "up",
  },
  {
    title: "Active Teams",
    value: "8",
    change: "All on track",
    icon: TrendingUp,
    trend: "up",
  },
];

const recentReports = [
  { student: "Alex Johnson", team: "Team Alpha", status: "pending", time: "2 hours ago" },
  { student: "Maria Garcia", team: "Team Beta", status: "approved", time: "4 hours ago" },
  { student: "John Smith", team: "Team Alpha", status: "pending", time: "5 hours ago" },
  { student: "Emily Chen", team: "Team Gamma", status: "rejected", time: "Yesterday" },
  { student: "Michael Brown", team: "Team Delta", status: "approved", time: "Yesterday" },
];

const teamProgress = [
  { name: "Team Alpha", progress: 78, members: 6 },
  { name: "Team Beta", progress: 65, members: 5 },
  { name: "Team Gamma", progress: 92, members: 7 },
  { name: "Team Delta", progress: 54, members: 6 },
];

const Dashboard = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/10 text-success hover:bg-success/20 border-0">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">Rejected</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your practice activities.</p>
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
        {/* Recent Reports */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Reports
            </CardTitle>
            <CardDescription>Latest daily reports from students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {report.student.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.student}</p>
                      <p className="text-xs text-muted-foreground">{report.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(report.status)}
                    <p className="text-xs text-muted-foreground mt-1">{report.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Team Progress
            </CardTitle>
            <CardDescription>Practice completion by team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {teamProgress.map((team, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{team.name}</p>
                      <p className="text-xs text-muted-foreground">{team.members} members</p>
                    </div>
                    <span className={`text-sm font-semibold ${
                      team.progress >= 80 ? "text-success" :
                      team.progress >= 50 ? "text-warning" : "text-destructive"
                    }`}>
                      {team.progress}%
                    </span>
                  </div>
                  <Progress value={team.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Pending Actions
          </CardTitle>
          <CardDescription>Items requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg border border-warning/20 bg-warning/5">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-foreground">12 Reports</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
            </div>
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">5 Uploads</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">New submissions</p>
            </div>
            <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-foreground">3 Students</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Behind schedule</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
