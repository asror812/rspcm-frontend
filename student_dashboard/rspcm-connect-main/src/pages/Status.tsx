import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, MessageSquare } from "lucide-react";

const reviews = [
  {
    id: 1,
    item: "Daily Report - Nov 29",
    type: "report",
    status: "approved",
    reviewer: "Dr. Smith",
    reviewedAt: "2024-11-30 10:15",
    comment: "Excellent progress. Keep up the good work!",
    score: 95,
  },
  {
    id: 2,
    item: "Project Documentation",
    type: "file",
    status: "approved",
    reviewer: "Dr. Smith",
    reviewedAt: "2024-11-29 16:30",
    comment: "Well-structured and comprehensive documentation.",
    score: 90,
  },
  {
    id: 3,
    item: "Daily Report - Nov 28",
    type: "report",
    status: "pending",
    reviewer: "Dr. Smith",
    reviewedAt: null,
    comment: null,
    score: null,
  },
  {
    id: 4,
    item: "Source Code Package",
    type: "file",
    status: "needs_revision",
    reviewer: "Dr. Smith",
    reviewedAt: "2024-11-28 14:20",
    comment: "Please add more code comments and improve error handling.",
    score: 75,
  },
];

const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
  approved: {
    icon: CheckCircle,
    color: "bg-green-500",
    label: "Approved",
  },
  pending: {
    icon: Clock,
    color: "bg-orange-500",
    label: "Pending Review",
  },
  needs_revision: {
    icon: XCircle,
    color: "bg-red-500",
    label: "Needs Revision",
  },
};

const Status = () => {
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const revisionCount = reviews.filter((r) => r.status === "needs_revision").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Review Status</h1>
        <p className="text-muted-foreground">
          Track the review status of your submissions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{approvedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-white" />
              </div>
              Needs Revision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{revisionCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Submission Reviews</CardTitle>
          <CardDescription>Detailed review status and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => {
              const config = statusConfig[review.status];
              const StatusIcon = config.icon;

              return (
                <div
                  key={review.id}
                  className="p-4 rounded-lg border border-border hover:bg-accent transition-smooth"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold">{review.item}</h3>
                          <p className="text-sm text-muted-foreground">
                            {review.reviewer}
                            {review.reviewedAt && (
                              <> • Reviewed on {review.reviewedAt}</>
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {review.score !== null && (
                            <Badge variant="outline" className="font-semibold">
                              {review.score}/100
                            </Badge>
                          )}
                          <Badge
                            variant={review.status === "approved" ? "default" : "secondary"}
                          >
                            {config.label}
                          </Badge>
                        </div>
                      </div>
                      {review.comment && (
                        <div className="mt-3 p-3 bg-accent/50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Status;
