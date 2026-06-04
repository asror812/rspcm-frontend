import { useState } from "react";
import { Plus, Search, MoreHorizontal, Trash2, Edit, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Practice {
  id: string;
  name: string;
  deadline: string;
  isCalendarRequired: boolean;
  resultFormat: string;
  description: string;
  status: "active" | "completed" | "draft";
}

const initialPractices: Practice[] = [
  { id: "1", name: "Web Development Internship", deadline: "2024-03-15", isCalendarRequired: true, resultFormat: "PDF Report", description: "Full-stack web development practice", status: "active" },
  { id: "2", name: "Database Design Project", deadline: "2024-02-28", isCalendarRequired: true, resultFormat: "SQL Scripts + Documentation", description: "Database modeling and implementation", status: "active" },
  { id: "3", name: "Mobile App Development", deadline: "2024-04-01", isCalendarRequired: false, resultFormat: "APK + Source Code", description: "Android/iOS application development", status: "draft" },
  { id: "4", name: "Machine Learning Research", deadline: "2024-01-31", isCalendarRequired: true, resultFormat: "Jupyter Notebook", description: "ML model training and evaluation", status: "completed" },
];

const resultFormats = ["PDF Report", "Word Document", "SQL Scripts + Documentation", "Source Code", "APK + Source Code", "Jupyter Notebook", "Presentation"];

const Practices = () => {
  const { toast } = useToast();
  const [practices, setPractices] = useState<Practice[]>(initialPractices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [newPractice, setNewPractice] = useState({
    name: "",
    deadline: "",
    isCalendarRequired: true,
    resultFormat: "",
    description: "",
  });

  const filteredPractices = practices.filter((practice) =>
    practice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    if (!newPractice.name || !newPractice.deadline) return;
    const practice: Practice = {
      id: Date.now().toString(),
      name: newPractice.name,
      deadline: newPractice.deadline,
      isCalendarRequired: newPractice.isCalendarRequired,
      resultFormat: newPractice.resultFormat || "PDF Report",
      description: newPractice.description,
      status: "draft",
    };
    setPractices([...practices, practice]);
    setNewPractice({ name: "", deadline: "", isCalendarRequired: true, resultFormat: "", description: "" });
    setIsCreateOpen(false);
    toast({ title: "Practice created", description: `${practice.name} has been added.` });
  };

  const handleDelete = (id: string) => {
    setPractices(practices.filter((p) => p.id !== id));
    toast({ title: "Practice deleted", variant: "destructive" });
  };

  const handleEdit = (practice: Practice) => {
    setSelectedPractice(practice);
    setNewPractice({
      name: practice.name,
      deadline: practice.deadline,
      isCalendarRequired: practice.isCalendarRequired,
      resultFormat: practice.resultFormat,
      description: practice.description,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedPractice || !newPractice.name) return;
    setPractices(
      practices.map((p) =>
        p.id === selectedPractice.id
          ? { ...p, ...newPractice }
          : p
      )
    );
    setIsEditOpen(false);
    toast({ title: "Practice updated" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-0">Active</Badge>;
      case "completed":
        return <Badge className="bg-primary/10 text-primary border-0">Completed</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Practices</h1>
          <p className="text-muted-foreground mt-1">Manage practice themes and requirements</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Practice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Practice</DialogTitle>
              <DialogDescription>Define a new practice theme with requirements</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Practice Name</Label>
                <Input
                  placeholder="Web Development Internship"
                  value={newPractice.name}
                  onChange={(e) => setNewPractice({ ...newPractice, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input
                  type="date"
                  value={newPractice.deadline}
                  onChange={(e) => setNewPractice({ ...newPractice, deadline: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Result Format</Label>
                <Select
                  value={newPractice.resultFormat}
                  onValueChange={(value) => setNewPractice({ ...newPractice, resultFormat: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    {resultFormats.map((format) => (
                      <SelectItem key={format} value={format}>{format}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Calendar Required</Label>
                  <p className="text-xs text-muted-foreground">Students must fill daily calendar</p>
                </div>
                <Switch
                  checked={newPractice.isCalendarRequired}
                  onCheckedChange={(checked) => setNewPractice({ ...newPractice, isCalendarRequired: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Practice description and requirements..."
                  value={newPractice.description}
                  onChange={(e) => setNewPractice({ ...newPractice, description: e.target.value })}
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
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search practices..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Practice Name</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Calendar</TableHead>
                <TableHead>Result Format</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPractices.map((practice) => (
                <TableRow key={practice.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{practice.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{practice.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(practice.deadline).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={practice.isCalendarRequired ? "bg-primary/10 text-primary border-0" : "bg-muted text-muted-foreground border-0"}>
                      {practice.isCalendarRequired ? "Required" : "Optional"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {practice.resultFormat}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(practice.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(practice)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDelete(practice.id)} className="text-destructive">
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Practice</DialogTitle>
            <DialogDescription>Update practice details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Practice Name</Label>
              <Input
                value={newPractice.name}
                onChange={(e) => setNewPractice({ ...newPractice, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Deadline</Label>
              <Input
                type="date"
                value={newPractice.deadline}
                onChange={(e) => setNewPractice({ ...newPractice, deadline: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Result Format</Label>
              <Select
                value={newPractice.resultFormat}
                onValueChange={(value) => setNewPractice({ ...newPractice, resultFormat: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {resultFormats.map((format) => (
                    <SelectItem key={format} value={format}>{format}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Calendar Required</Label>
                <p className="text-xs text-muted-foreground">Students must fill daily calendar</p>
              </div>
              <Switch
                checked={newPractice.isCalendarRequired}
                onCheckedChange={(checked) => setNewPractice({ ...newPractice, isCalendarRequired: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newPractice.description}
                onChange={(e) => setNewPractice({ ...newPractice, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} className="gradient-primary text-primary-foreground">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Practices;
