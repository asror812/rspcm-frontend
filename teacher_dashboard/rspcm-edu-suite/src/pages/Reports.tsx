import { useState } from "react";
import { FileText, Search, Filter, Check, X, Eye, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const reportsData = [
  {
    id: 1,
    student: "Alex Johnson",
    team: "Team Alpha",
    date: "2024-01-15",
    title: "Daily Progress Report - Day 12",
    content: "Completed the user authentication module. Implemented JWT token handling and session management. Started working on the dashboard layout.",
    status: "pending",
    submittedAt: "2 hours ago",
  },
  {
    id: 2,
    student: "Maria Garcia",
    team: "Team Beta",
    date: "2024-01-15",
    title: "Daily Progress Report - Day 12",
    content: "Worked on mobile app navigation. Fixed several UI bugs reported in testing. Prepared documentation for the API endpoints.",
    status: "approved",
    submittedAt: "4 hours ago",
  },
  {
    id: 3,
    student: "John Smith",
    team: "Team Alpha",
    date: "2024-01-15",
    title: "Daily Progress Report - Day 12",
    content: "Database schema optimization completed. Created indexes for frequently queried tables. Performance improved by 40%.",
    status: "pending",
    submittedAt: "5 hours ago",
  },
  {
    id: 4,
    student: "Emily Chen",
    team: "Team Gamma",
    date: "2024-01-14",
    title: "Daily Progress Report - Day 11",
    content: "Data visualization charts implemented using Chart.js. Created interactive dashboard widgets. Started on data export functionality.",
    status: "rejected",
    feedback: "Please provide more details about the implementation approach and any challenges faced.",
    submittedAt: "Yesterday",
  },
  {
    id: 5,
    student: "Michael Brown",
    team: "Team Delta",
    date: "2024-01-14",
    title: "Daily Progress Report - Day 11",
    content: "Shopping cart functionality completed. Payment gateway integration started. Need to resolve some API issues with Stripe.",
    status: "approved",
    submittedAt: "Yesterday",
  },
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<typeof reportsData[0] | null>(null);
  const [feedback, setFeedback] = useState("");

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

  const filteredReports = reportsData.filter(
    (report) =>
      report.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingReports = filteredReports.filter((r) => r.status === "pending");
  const reviewedReports = filteredReports.filter((r) => r.status !== "pending");

  const ReportCard = ({ report }: { report: typeof reportsData[0] }) => (
    <Card className="shadow-card hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10 mt-1">
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {report.student.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium text-foreground">{report.student}</p>
                <Badge variant="secondary" className="text-xs">{report.team}</Badge>
                {getStatusBadge(report.status)}
              </div>
              <p className="text-sm text-foreground mt-1">{report.title}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{report.content}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {report.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {report.submittedAt}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{report.title}</DialogTitle>
                  <DialogDescription>
                    Submitted by {report.student} • {report.team} • {report.date}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-foreground whitespace-pre-wrap">{report.content}</p>
                  </div>
                  {report.status === "pending" && (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Add feedback or comments (optional)..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" className="text-destructive">
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button className="gradient-primary text-primary-foreground">
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  )}
                  {report.status === "rejected" && report.feedback && (
                    <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                      <p className="text-sm font-medium text-destructive">Rejection Feedback:</p>
                      <p className="text-sm text-muted-foreground mt-1">{report.feedback}</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            {report.status === "pending" && (
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Daily Reports</h1>
        <p className="text-muted-foreground mt-1">Review and approve student daily practice reports</p>
      </div>

      {/* Search & Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports by student, team, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending
            <Badge variant="secondary" className="ml-1">{pendingReports.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="gap-2">
            <FileText className="h-4 w-4" />
            Reviewed
            <Badge variant="secondary" className="ml-1">{reviewedReports.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingReports.length > 0 ? (
            pendingReports.map((report) => <ReportCard key={report.id} report={report} />)
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No pending reports to review</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          {reviewedReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
