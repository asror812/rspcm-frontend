import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const previousReports = [
  {
    id: 1,
    date: "2024-11-29",
    status: "approved",
    summary: "Completed user authentication module",
  },
  {
    id: 2,
    date: "2024-11-28",
    status: "approved",
    summary: "Implemented database schema design",
  },
  {
    id: 3,
    date: "2024-11-27",
    status: "pending",
    summary: "Started frontend component development",
  },
];

const Reports = () => {
  const [reportText, setReportText] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (reportText.trim()) {
      toast({
        title: "Report Submitted",
        description: "Your daily report has been submitted successfully",
      });
      setReportText("");
    } else {
      toast({
        title: "Error",
        description: "Please write your daily report before submitting",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Daily Reports</h1>
        <p className="text-muted-foreground">
          Submit your daily practice reports and track your progress
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Submit New Report */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Report</CardTitle>
            <CardDescription>
              Document your daily activities and progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report">Report Content</Label>
              <Textarea
                id="report"
                placeholder="Describe what you worked on today, challenges faced, and achievements..."
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                rows={10}
                className="resize-none"
              />
              <p className="text-sm text-muted-foreground">
                Minimum 100 characters required
              </p>
            </div>
            <Button onClick={handleSubmit} className="w-full" size="lg">
              <Send className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </CardContent>
        </Card>

        {/* Report Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Report Guidelines</CardTitle>
            <CardDescription>What to include</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Tasks Completed</h4>
                <p className="text-muted-foreground">
                  List specific tasks and activities you completed today
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Challenges</h4>
                <p className="text-muted-foreground">
                  Describe any difficulties or obstacles you encountered
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Learning</h4>
                <p className="text-muted-foreground">
                  Share new skills or knowledge gained
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Next Steps</h4>
                <p className="text-muted-foreground">
                  Outline your plans for tomorrow
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Previous Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Reports</CardTitle>
          <CardDescription>Your submission history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {previousReports.map((report) => (
              <div
                key={report.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-smooth cursor-pointer"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{report.summary}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(report.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge
                      variant={report.status === "approved" ? "default" : "secondary"}
                      className="capitalize flex-shrink-0"
                    >
                      {report.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
