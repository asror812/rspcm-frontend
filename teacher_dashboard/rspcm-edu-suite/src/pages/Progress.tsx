import { TrendingUp, Users, Calendar, Target, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const studentsProgress = [
  { name: "Emily Chen", team: "Team Gamma", progress: 92, trend: "up", change: 8, reportsSubmitted: 55, totalReports: 60 },
  { name: "Sarah Wilson", team: "Team Beta", progress: 88, trend: "up", change: 5, reportsSubmitted: 53, totalReports: 60 },
  { name: "Alex Johnson", team: "Team Alpha", progress: 78, trend: "up", change: 3, reportsSubmitted: 47, totalReports: 60 },
  { name: "Emma Taylor", team: "Team Alpha", progress: 71, trend: "stable", change: 0, reportsSubmitted: 43, totalReports: 60 },
  { name: "Maria Garcia", team: "Team Beta", progress: 65, trend: "down", change: -2, reportsSubmitted: 39, totalReports: 60 },
  { name: "Michael Brown", team: "Team Delta", progress: 54, trend: "down", change: -5, reportsSubmitted: 32, totalReports: 60 },
  { name: "John Smith", team: "Team Alpha", progress: 45, trend: "down", change: -8, reportsSubmitted: 27, totalReports: 60 },
  { name: "David Lee", team: "Team Gamma", progress: 32, trend: "down", change: -12, reportsSubmitted: 19, totalReports: 60 },
];

const weeklyStats = [
  { week: "Week 1", avgProgress: 15, reportsSubmitted: 180 },
  { week: "Week 2", avgProgress: 28, reportsSubmitted: 165 },
  { week: "Week 3", avgProgress: 42, reportsSubmitted: 172 },
  { week: "Week 4", avgProgress: 55, reportsSubmitted: 168 },
  { week: "Week 5", avgProgress: 68, reportsSubmitted: 175 },
  { week: "Week 6", avgProgress: 72, reportsSubmitted: 158 },
];

const milestones = [
  { name: "Project Setup", dueDate: "Week 1", completed: true },
  { name: "Database Design", dueDate: "Week 2", completed: true },
  { name: "Core Features", dueDate: "Week 4", completed: true },
  { name: "Testing Phase", dueDate: "Week 5", completed: false, current: true },
  { name: "Final Submission", dueDate: "Week 6", completed: false },
];

const Progress = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-success" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-success";
    if (progress >= 50) return "bg-warning";
    return "bg-destructive";
  };

  const overallProgress = Math.round(
    studentsProgress.reduce((sum, s) => sum + s.progress, 0) / studentsProgress.length
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
          <p className="text-muted-foreground mt-1">Monitor student and team progress throughout the practice</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            <SelectItem value="alpha">Team Alpha</SelectItem>
            <SelectItem value="beta">Team Beta</SelectItem>
            <SelectItem value="gamma">Team Gamma</SelectItem>
            <SelectItem value="delta">Team Delta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{overallProgress}%</p>
                <p className="text-xs text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {studentsProgress.filter((s) => s.progress >= 70).length}
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
                  {studentsProgress.filter((s) => s.progress < 50).length}
                </p>
                <p className="text-xs text-muted-foreground">Need Attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Week 6</p>
                <p className="text-xs text-muted-foreground">Current Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student Progress List */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
            <CardDescription>Individual student completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentsProgress.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {student.team} • {student.reportsSubmitted}/{student.totalReports} reports
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {getTrendIcon(student.trend)}
                          <span className={`text-xs ${getTrendColor(student.trend)}`}>
                            {student.change > 0 ? "+" : ""}
                            {student.change}%
                          </span>
                        </div>
                        <span className={`text-sm font-semibold w-12 text-right ${
                          student.progress >= 80 ? "text-success" :
                          student.progress >= 50 ? "text-warning" : "text-destructive"
                        }`}>
                          {student.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${getProgressColor(student.progress)}`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Practice Milestones</CardTitle>
            <CardDescription>Key deadlines and checkpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
              
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-4 pl-8">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      milestone.completed
                        ? "bg-success border-success"
                        : milestone.current
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    }`}>
                      {milestone.completed && (
                        <svg className="w-3 h-3 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {milestone.current && (
                        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                      )}
                    </div>
                    
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${
                          milestone.completed ? "text-muted-foreground" :
                          milestone.current ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {milestone.name}
                        </p>
                        {milestone.current && (
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{milestone.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Stats */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Weekly Progress Overview</CardTitle>
          <CardDescription>Average progress and report submissions by week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-6">
            {weeklyStats.map((week, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-xs font-medium text-muted-foreground mb-2">{week.week}</p>
                <p className="text-2xl font-bold text-foreground">{week.avgProgress}%</p>
                <p className="text-xs text-muted-foreground mt-1">{week.reportsSubmitted} reports</p>
                <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${week.avgProgress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
