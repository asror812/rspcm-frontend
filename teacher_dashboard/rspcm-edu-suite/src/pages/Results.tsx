import { useState } from "react";
import { Upload, Search, Filter, Check, X, Eye, Download, FileArchive, Clock } from "lucide-react";
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

const resultsData = [
  {
    id: 1,
    student: "Alex Johnson",
    team: "Team Alpha",
    title: "User Authentication Module",
    description: "Complete implementation of JWT-based authentication system with login, registration, and password reset functionality.",
    files: ["auth-module.zip", "documentation.pdf"],
    fileSize: "2.4 MB",
    status: "pending",
    submittedAt: "3 hours ago",
  },
  {
    id: 2,
    student: "Emily Chen",
    team: "Team Gamma",
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard with charts, graphs, and real-time data visualization components.",
    files: ["dashboard-v2.zip", "user-guide.pdf", "test-results.xlsx"],
    fileSize: "8.7 MB",
    status: "approved",
    submittedAt: "1 day ago",
    score: 92,
  },
  {
    id: 3,
    student: "Michael Brown",
    team: "Team Delta",
    title: "Shopping Cart System",
    description: "E-commerce shopping cart with product management, quantity updates, and checkout flow.",
    files: ["cart-module.zip"],
    fileSize: "1.8 MB",
    status: "pending",
    submittedAt: "5 hours ago",
  },
  {
    id: 4,
    student: "Maria Garcia",
    team: "Team Beta",
    title: "Mobile Navigation Component",
    description: "Responsive navigation component with drawer menu, tabs, and gesture support.",
    files: ["navigation.zip", "assets.zip", "readme.md"],
    fileSize: "4.2 MB",
    status: "rejected",
    feedback: "The navigation doesn't work properly on iOS devices. Please fix the touch handling and resubmit.",
    submittedAt: "2 days ago",
  },
  {
    id: 5,
    student: "Sarah Wilson",
    team: "Team Beta",
    title: "API Integration Layer",
    description: "REST API integration module with caching, error handling, and retry logic.",
    files: ["api-layer.zip", "api-docs.pdf"],
    fileSize: "1.1 MB",
    status: "approved",
    submittedAt: "3 days ago",
    score: 88,
  },
];

const Results = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/10 text-success hover:bg-success/20 border-0">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-0">Rejected</Badge>;
      default:
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20 border-0">Pending Review</Badge>;
    }
  };

  const filteredResults = resultsData.filter(
    (result) =>
      result.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingResults = filteredResults.filter((r) => r.status === "pending");
  const reviewedResults = filteredResults.filter((r) => r.status !== "pending");

  const ResultCard = ({ result }: { result: typeof resultsData[0] }) => (
    <Card className="shadow-card hover:shadow-lg transition-all duration-200">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FileArchive className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{result.title}</h3>
                  {getStatusBadge(result.status)}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
                      {result.student.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{result.student}</span>
                  <span className="text-muted-foreground">•</span>
                  <Badge variant="secondary" className="text-xs">{result.team}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{result.description}</p>
              </div>
              {result.status === "approved" && result.score && (
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-success">{result.score}</p>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
              )}
            </div>

            {/* Files */}
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {result.files.length} file{result.files.length > 1 ? "s" : ""} • {result.fileSize}
                </p>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  Download All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.files.map((file, index) => (
                  <Badge key={index} variant="outline" className="text-xs font-normal">
                    {file}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Feedback for rejected */}
            {result.status === "rejected" && result.feedback && (
              <div className="mt-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-xs font-medium text-destructive">Rejection Reason:</p>
                <p className="text-sm text-muted-foreground mt-1">{result.feedback}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {result.submittedAt}
              </span>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{result.title}</DialogTitle>
                      <DialogDescription>
                        Submitted by {result.student} • {result.team}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-foreground">{result.description}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-2">Submitted Files:</p>
                        <div className="space-y-2">
                          {result.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-background rounded">
                              <span className="text-sm">{file}</span>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      {result.status === "pending" && (
                        <div className="space-y-3">
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="text-sm font-medium">Score (0-100)</label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Enter score"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <Textarea
                            placeholder="Add feedback or comments..."
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
                    </div>
                  </DialogContent>
                </Dialog>
                {result.status === "pending" && (
                  <>
                    <Button size="sm" variant="ghost" className="text-success hover:text-success hover:bg-success/10">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Results & Uploads</h1>
        <p className="text-muted-foreground mt-1">Review and approve student project submissions</p>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student, team, or project title..."
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

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Upload className="h-4 w-4" />
            Pending
            <Badge variant="secondary" className="ml-1">{pendingResults.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="gap-2">
            <Check className="h-4 w-4" />
            Reviewed
            <Badge variant="secondary" className="ml-1">{reviewedResults.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingResults.length > 0 ? (
            pendingResults.map((result) => <ResultCard key={result.id} result={result} />)
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No pending submissions to review</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          {reviewedResults.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;
