import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    date: "2024-12-01",
    title: "Practice Start",
    type: "milestone",
    time: "09:00",
    location: "Online",
  },
  {
    id: 2,
    date: "2024-12-05",
    title: "Team Meeting",
    type: "meeting",
    time: "14:00",
    location: "Room 301",
  },
  {
    id: 3,
    date: "2024-12-10",
    title: "Progress Review",
    type: "review",
    time: "10:00",
    location: "Online",
  },
  {
    id: 4,
    date: "2024-12-15",
    title: "Mid-term Presentation",
    type: "presentation",
    time: "15:00",
    location: "Auditorium",
  },
  {
    id: 5,
    date: "2024-12-20",
    title: "Team Checkpoint",
    type: "meeting",
    time: "13:00",
    location: "Room 205",
  },
  {
    id: 6,
    date: "2024-12-30",
    title: "Final Submission",
    type: "deadline",
    time: "23:59",
    location: "Online",
  },
];

const typeColors: Record<string, string> = {
  milestone: "bg-blue-500",
  meeting: "bg-green-500",
  review: "bg-purple-500",
  presentation: "bg-orange-500",
  deadline: "bg-red-500",
};

const CalendarPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Practice Calendar</h1>
        <p className="text-muted-foreground">
          Important dates and events for your practice period
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Schedule for December 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-accent hover:bg-accent/80 transition-smooth"
              >
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 ${typeColors[event.type]} rounded-lg flex items-center justify-center`}>
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize flex-shrink-0">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">30</div>
            <p className="text-sm text-muted-foreground">Practice duration</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Days Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">12</div>
            <p className="text-sm text-muted-foreground">40% progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Days Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">18</div>
            <p className="text-sm text-muted-foreground">Until completion</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
