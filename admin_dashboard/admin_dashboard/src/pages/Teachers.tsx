import { useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2, BookOpen, UsersRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface Teacher {
  id: string;
  name: string;
  username: string;
  email: string;
  subjects: string[];
  groups: string[];
  status: "active" | "inactive";
}

const initialTeachers: Teacher[] = [
  { id: "1", name: "Dr. John Smith", username: "jsmith", email: "jsmith@rspcm.edu", subjects: ["Web Development", "Database Systems"], groups: ["CS-401", "CS-301"], status: "active" },
  { id: "2", name: "Prof. Maria Garcia", username: "mgarcia", email: "mgarcia@rspcm.edu", subjects: ["Machine Learning"], groups: ["CS-501"], status: "active" },
  { id: "3", name: "Dr. Alex Johnson", username: "ajohnson", email: "ajohnson@rspcm.edu", subjects: ["Software Engineering"], groups: ["CS-401"], status: "active" },
  { id: "4", name: "Prof. Emily Chen", username: "echen", email: "echen@rspcm.edu", subjects: ["Data Structures"], groups: ["CS-201", "CS-202"], status: "inactive" },
];

const availableSubjects = ["Web Development", "Database Systems", "Machine Learning", "Software Engineering", "Data Structures", "Algorithms", "Operating Systems"];
const availableGroups = ["CS-201", "CS-202", "CS-301", "CS-401", "CS-501"];

const Teachers = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState({ name: "", username: "" });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    if (!newTeacher.name || !newTeacher.username) return;
    const teacher: Teacher = {
      id: Date.now().toString(),
      name: newTeacher.name,
      username: newTeacher.username,
      email: `${newTeacher.username}@rspcm.edu`,
      subjects: [],
      groups: [],
      status: "active",
    };
    setTeachers([...teachers, teacher]);
    setNewTeacher({ name: "", username: "" });
    setIsCreateOpen(false);
    toast({ title: "Teacher created", description: `${teacher.name} has been added.` });
  };

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter((t) => t.id !== id));
    toast({ title: "Teacher deleted", variant: "destructive" });
  };

  const handleAttachSubjects = () => {
    if (!selectedTeacher) return;
    setTeachers(
      teachers.map((t) =>
        t.id === selectedTeacher.id ? { ...t, subjects: selectedSubjects } : t
      )
    );
    setIsSubjectsOpen(false);
    toast({ title: "Subjects updated" });
  };

  const handleAttachGroups = () => {
    if (!selectedTeacher) return;
    setTeachers(
      teachers.map((t) =>
        t.id === selectedTeacher.id ? { ...t, groups: selectedGroups } : t
      )
    );
    setIsGroupsOpen(false);
    toast({ title: "Groups updated" });
  };

  const openSubjectsDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSelectedSubjects(teacher.subjects);
    setIsSubjectsOpen(true);
  };

  const openGroupsDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSelectedGroups(teacher.groups);
    setIsGroupsOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teachers</h1>
          <p className="text-muted-foreground mt-1">Manage teachers and their assignments</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Teacher</DialogTitle>
              <DialogDescription>Add a new teacher to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="Dr. John Smith"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  placeholder="jsmith"
                  value={newTeacher.username}
                  onChange={(e) => setNewTeacher({ ...newTeacher, username: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} className="gradient-primary text-primary-foreground">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Groups</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {teacher.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{teacher.name}</p>
                        <p className="text-xs text-muted-foreground">{teacher.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{teacher.username}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subjects.slice(0, 2).map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {teacher.subjects.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{teacher.subjects.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.groups.map((group) => (
                        <Badge key={group} className="bg-primary/10 text-primary text-xs border-0">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={teacher.status === "active" ? "bg-success/10 text-success border-0" : "bg-muted text-muted-foreground border-0"}>
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openSubjectsDialog(teacher)}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Attach Subjects
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openGroupsDialog(teacher)}>
                          <UsersRound className="h-4 w-4 mr-2" />
                          Attach Groups
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(teacher.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Attach Subjects Dialog */}
      <Dialog open={isSubjectsOpen} onOpenChange={setIsSubjectsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attach Subjects</DialogTitle>
            <DialogDescription>Select subjects for {selectedTeacher?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {availableSubjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={subject}
                  checked={selectedSubjects.includes(subject)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedSubjects([...selectedSubjects, subject]);
                    } else {
                      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
                    }
                  }}
                />
                <Label htmlFor={subject}>{subject}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubjectsOpen(false)}>Cancel</Button>
            <Button onClick={handleAttachSubjects} className="gradient-primary text-primary-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Attach Groups Dialog */}
      <Dialog open={isGroupsOpen} onOpenChange={setIsGroupsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attach Groups</DialogTitle>
            <DialogDescription>Select groups for {selectedTeacher?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {availableGroups.map((group) => (
              <div key={group} className="flex items-center space-x-2">
                <Checkbox
                  id={group}
                  checked={selectedGroups.includes(group)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedGroups([...selectedGroups, group]);
                    } else {
                      setSelectedGroups(selectedGroups.filter((g) => g !== group));
                    }
                  }}
                />
                <Label htmlFor={group}>{group}</Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGroupsOpen(false)}>Cancel</Button>
            <Button onClick={handleAttachGroups} className="gradient-primary text-primary-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teachers;
