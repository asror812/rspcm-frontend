import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  ChevronRight,
  Calendar,
  BookOpen,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Team {
  id: string;
  name: string;
  members: number;
  progress: number;
}

interface Group {
  id: string;
  name: string;
  description: string;
  practiceTheme: string;
  startDate: string;
  endDate: string;
  students: Student[];
  teams: Team[];
  status: "active" | "completed" | "upcoming";
}

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Web Development 2024",
    description: "Full-stack web development practice group",
    practiceTheme: "E-commerce Platform Development",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    status: "active",
    students: [
      { id: "s1", name: "Ivan Petrov", email: "ivan@rspcm.edu", avatar: "IP" },
      { id: "s2", name: "Maria Sidorova", email: "maria@rspcm.edu", avatar: "MS" },
      { id: "s3", name: "Alex Kozlov", email: "alex@rspcm.edu", avatar: "AK" },
      { id: "s4", name: "Elena Novikova", email: "elena@rspcm.edu", avatar: "EN" },
      { id: "s5", name: "Dmitry Volkov", email: "dmitry@rspcm.edu", avatar: "DV" },
    ],
    teams: [
      { id: "t1", name: "Frontend Masters", members: 3, progress: 75 },
      { id: "t2", name: "Backend Warriors", members: 2, progress: 60 },
    ],
  },
  {
    id: "2",
    name: "Mobile Development 2024",
    description: "Cross-platform mobile app development",
    practiceTheme: "Health Tracking App",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    status: "active",
    students: [
      { id: "s6", name: "Anna Smirnova", email: "anna@rspcm.edu", avatar: "AS" },
      { id: "s7", name: "Pavel Orlov", email: "pavel@rspcm.edu", avatar: "PO" },
      { id: "s8", name: "Olga Fedorova", email: "olga@rspcm.edu", avatar: "OF" },
    ],
    teams: [
      { id: "t3", name: "App Builders", members: 3, progress: 45 },
    ],
  },
  {
    id: "3",
    name: "Data Science 2024",
    description: "Machine learning and data analysis practice",
    practiceTheme: "Predictive Analytics System",
    startDate: "2024-03-01",
    endDate: "2024-05-01",
    status: "upcoming",
    students: [
      { id: "s9", name: "Nikolay Ivanov", email: "nikolay@rspcm.edu", avatar: "NI" },
      { id: "s10", name: "Tatiana Kuznetsova", email: "tatiana@rspcm.edu", avatar: "TK" },
    ],
    teams: [],
  },
  {
    id: "4",
    name: "DevOps Fundamentals 2023",
    description: "CI/CD and infrastructure management",
    practiceTheme: "Automated Deployment Pipeline",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    status: "completed",
    students: [
      { id: "s11", name: "Sergey Morozov", email: "sergey@rspcm.edu", avatar: "SM" },
      { id: "s12", name: "Yulia Popova", email: "yulia@rspcm.edu", avatar: "YP" },
      { id: "s13", name: "Viktor Lebedev", email: "viktor@rspcm.edu", avatar: "VL" },
      { id: "s14", name: "Natalia Sokolova", email: "natalia@rspcm.edu", avatar: "NS" },
    ],
    teams: [
      { id: "t4", name: "Infrastructure Team", members: 2, progress: 100 },
      { id: "t5", name: "Automation Squad", members: 2, progress: 100 },
    ],
  },
];

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredGroups = mockGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.practiceTheme.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && group.status === activeTab;
  });

  const getStatusBadge = (status: Group["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "completed":
        return <Badge className="bg-muted text-muted-foreground">Completed</Badge>;
      case "upcoming":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Upcoming</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Groups</h1>
          <p className="text-muted-foreground">
            Manage practice groups with students and teams
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Add a new practice group with students and teams
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Group Name</Label>
                <Input id="name" placeholder="e.g., Web Development 2024" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Brief description of the group" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="theme">Practice Theme</Label>
                <Input id="theme" placeholder="e.g., E-commerce Platform" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start">Start Date</Label>
                  <Input id="start" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end">End Date</Label>
                  <Input id="end" type="date" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button className="gradient-primary text-primary-foreground">Create Group</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search groups by name or theme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4 sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Groups Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => (
          <Card
            key={group.id}
            className="card-hover cursor-pointer"
            onClick={() => setSelectedGroup(group)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Group
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Group
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span className="truncate">{group.practiceTheme}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(group.startDate).toLocaleDateString()} -{" "}
                  {new Date(group.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{group.students.length}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{group.teams.length}</span>
                  </div>
                </div>
                {getStatusBadge(group.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium mb-2">No groups found</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search query"
              : "Create your first group to get started"}
          </p>
        </Card>
      )}

      {/* Group Details Dialog */}
      <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedGroup && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl">{selectedGroup.name}</DialogTitle>
                  {getStatusBadge(selectedGroup.status)}
                </div>
                <DialogDescription>{selectedGroup.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Group Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Practice Theme</p>
                    <p className="font-medium">{selectedGroup.practiceTheme}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {new Date(selectedGroup.startDate).toLocaleDateString()} -{" "}
                      {new Date(selectedGroup.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Students Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Students ({selectedGroup.students.length})
                    </h4>
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Student
                    </Button>
                  </div>
                  <div className="grid gap-2">
                    {selectedGroup.students.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teams Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-primary" />
                      Teams ({selectedGroup.teams.length})
                    </h4>
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Create Team
                    </Button>
                  </div>
                  {selectedGroup.teams.length > 0 ? (
                    <div className="grid gap-2">
                      {selectedGroup.teams.map((team) => (
                        <div
                          key={team.id}
                          className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{team.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {team.members} members
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {team.progress}%
                            </span>
                          </div>
                          <Progress value={team.progress} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center rounded-lg bg-muted/30 border border-dashed border-border">
                      <UserCheck className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                      <p className="text-sm text-muted-foreground">No teams yet</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setSelectedGroup(null)}>
                  Close
                </Button>
                <Button className="gradient-primary text-primary-foreground">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Group
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Groups;
