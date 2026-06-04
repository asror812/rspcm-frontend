import { useState } from "react";
import { ClipboardList, Plus, Search, Calendar, Users, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const examsData = [
  {
    id: 1,
    title: "Midterm Practice Evaluation",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: "2 hours",
    teams: ["Team Alpha", "Team Beta"],
    totalStudents: 11,
    status: "upcoming",
    maxScore: 100,
  },
  {
    id: 2,
    title: "Sprint 1 Code Review",
    date: "2024-01-18",
    time: "2:00 PM",
    duration: "1.5 hours",
    teams: ["Team Gamma"],
    totalStudents: 7,
    status: "completed",
    maxScore: 50,
    averageScore: 42,
  },
  {
    id: 3,
    title: "Final Project Presentation",
    date: "2024-02-15",
    time: "9:00 AM",
    duration: "4 hours",
    teams: ["Team Alpha", "Team Beta", "Team Gamma", "Team Delta"],
    totalStudents: 24,
    status: "scheduled",
    maxScore: 150,
  },
  {
    id: 4,
    title: "Database Design Assessment",
    date: "2024-01-10",
    time: "11:00 AM",
    duration: "1 hour",
    teams: ["Team Delta"],
    totalStudents: 6,
    status: "completed",
    maxScore: 30,
    averageScore: 24,
  },
];

const gradesData = [
  { id: 1, student: "Alex Johnson", team: "Team Alpha", exam: "Sprint 1 Code Review", score: 45, maxScore: 50 },
  { id: 2, student: "Maria Garcia", team: "Team Beta", exam: "Sprint 1 Code Review", score: 42, maxScore: 50 },
  { id: 3, student: "Emily Chen", team: "Team Gamma", exam: "Sprint 1 Code Review", score: 48, maxScore: 50 },
  { id: 4, student: "Michael Brown", team: "Team Delta", exam: "Database Design Assessment", score: 26, maxScore: 30 },
  { id: 5, student: "John Smith", team: "Team Alpha", exam: "Sprint 1 Code Review", score: 38, maxScore: 50 },
];

const Exams = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success hover:bg-success/20 border-0">Completed</Badge>;
      case "upcoming":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0">Upcoming</Badge>;
      default:
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">Scheduled</Badge>;
    }
  };

  const filteredExams = examsData.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.teams.some((team) => team.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exams & Scores</h1>
          <p className="text-muted-foreground mt-1">Manage evaluations and assign grades</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Exam</DialogTitle>
              <DialogDescription>Schedule a new evaluation for your students</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Exam Title</Label>
                <Input placeholder="e.g., Midterm Evaluation" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input placeholder="e.g., 2 hours" />
              </div>
              <div className="space-y-2">
                <Label>Max Score</Label>
                <Input type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Exam details and instructions..." rows={3} />
              </div>
              <Button className="w-full gradient-primary text-primary-foreground">Create Exam</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exams by title or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Exams List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            All Exams
          </CardTitle>
          <CardDescription>{filteredExams.length} exams total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{exam.title}</h3>
                      {getStatusBadge(exam.status)}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exam.date} at {exam.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {exam.totalStudents} students
                      </span>
                      <span>Duration: {exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {exam.teams.map((team, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {team}
                        </Badge>
                      ))}
                    </div>
                    {exam.status === "completed" && exam.averageScore && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Average Score: <span className="font-medium text-foreground">{exam.averageScore}/{exam.maxScore}</span>
                      </p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Grades</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Grades */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
          <CardDescription>Latest scores assigned to students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gradesData.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {grade.student.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{grade.student}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{grade.team}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{grade.exam}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-semibold ${
                      (grade.score / grade.maxScore) >= 0.8 ? "text-success" :
                      (grade.score / grade.maxScore) >= 0.5 ? "text-warning" : "text-destructive"
                    }`}>
                      {grade.score}/{grade.maxScore}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Exams;
