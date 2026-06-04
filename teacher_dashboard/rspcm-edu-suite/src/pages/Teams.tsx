import { Users, Plus, Settings, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const teamsData = [
  {
    id: 1,
    name: "Team Alpha",
    theme: "Web Application Development",
    members: [
      { name: "Alex Johnson", role: "Team Lead" },
      { name: "John Smith", role: "Developer" },
      { name: "Emma Taylor", role: "Developer" },
      { name: "Chris Davis", role: "Developer" },
      { name: "Lisa Wang", role: "Developer" },
      { name: "Tom Wilson", role: "Tester" },
    ],
    progress: 78,
    status: "active",
    reportsSubmitted: 45,
    totalReports: 60,
  },
  {
    id: 2,
    name: "Team Beta",
    theme: "Mobile App Development",
    members: [
      { name: "Maria Garcia", role: "Team Lead" },
      { name: "Sarah Wilson", role: "Developer" },
      { name: "Kevin Martinez", role: "Developer" },
      { name: "Amy Chen", role: "Designer" },
      { name: "Ryan Scott", role: "Tester" },
    ],
    progress: 65,
    status: "active",
    reportsSubmitted: 38,
    totalReports: 60,
  },
  {
    id: 3,
    name: "Team Gamma",
    theme: "Data Analytics Platform",
    members: [
      { name: "Emily Chen", role: "Team Lead" },
      { name: "David Lee", role: "Developer" },
      { name: "Sophie Brown", role: "Developer" },
      { name: "James Kim", role: "Developer" },
      { name: "Nina Patel", role: "Developer" },
      { name: "Mark Thompson", role: "Analyst" },
      { name: "Laura White", role: "Tester" },
    ],
    progress: 92,
    status: "active",
    reportsSubmitted: 55,
    totalReports: 60,
  },
  {
    id: 4,
    name: "Team Delta",
    theme: "E-commerce Solution",
    members: [
      { name: "Michael Brown", role: "Team Lead" },
      { name: "Jessica Moore", role: "Developer" },
      { name: "Daniel Clark", role: "Developer" },
      { name: "Olivia Hall", role: "Developer" },
      { name: "Andrew Young", role: "Designer" },
      { name: "Megan King", role: "Tester" },
    ],
    progress: 54,
    status: "needs attention",
    reportsSubmitted: 32,
    totalReports: 60,
  },
];

const Teams = () => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-success";
    if (progress >= 50) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teams</h1>
          <p className="text-muted-foreground mt-1">Manage practice teams and track their progress</p>
        </div>
        <Button className="gradient-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{teamsData.length}</p>
                <p className="text-xs text-muted-foreground">Total Teams</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {teamsData.filter((t) => t.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground">On Track</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {teamsData.reduce((sum, t) => sum + t.members.length, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(teamsData.reduce((sum, t) => sum + t.progress, 0) / teamsData.length)}%
                </p>
                <p className="text-xs text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {teamsData.map((team) => (
          <Card key={team.id} className="shadow-card hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {team.name}
                    <Badge
                      className={
                        team.status === "active"
                          ? "bg-success/10 text-success hover:bg-success/20 border-0"
                          : "bg-warning/10 text-warning hover:bg-warning/20 border-0"
                      }
                    >
                      {team.status === "active" ? "On Track" : "Needs Attention"}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-1">{team.theme}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Practice Progress</span>
                  <span className="font-medium text-foreground">{team.progress}%</span>
                </div>
                <Progress value={team.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {team.reportsSubmitted} of {team.totalReports} reports submitted
                </p>
              </div>

              {/* Members */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">
                  Team Members ({team.members.length})
                </p>
                <div className="flex -space-x-2">
                  {team.members.slice(0, 5).map((member, index) => (
                    <Avatar key={index} className="h-8 w-8 border-2 border-card">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {team.members.length > 5 && (
                    <div className="h-8 w-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        +{team.members.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 gradient-primary text-primary-foreground">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teams;
