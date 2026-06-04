import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Crown, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const myTeam = {
  id: 1,
  name: "Team Alpha",
  code: "ALPHA-2024",
  members: [
    { id: 1, name: "John Doe", role: "Leader", initials: "JD" },
    { id: 2, name: "Jane Smith", role: "Member", initials: "JS" },
    { id: 3, name: "Bob Johnson", role: "Member", initials: "BJ" },
    { id: 4, name: "Alice Brown", role: "Member", initials: "AB" },
  ],
};

const availableTeams = [
  { id: 2, name: "Team Beta", code: "BETA-2024", members: 3, maxMembers: 5 },
  { id: 3, name: "Team Gamma", code: "GAMMA-2024", members: 4, maxMembers: 5 },
  { id: 4, name: "Team Delta", code: "DELTA-2024", members: 2, maxMembers: 5 },
];

const Teams = () => {
  const [teamCode, setTeamCode] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const { toast } = useToast();

  const handleJoinTeam = () => {
    if (teamCode) {
      toast({
        title: "Request Sent",
        description: `Join request sent for team code: ${teamCode}`,
      });
      setTeamCode("");
    }
  };

  const handleCreateTeam = () => {
    if (newTeamName) {
      toast({
        title: "Team Created",
        description: `Successfully created team: ${newTeamName}`,
      });
      setNewTeamName("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Teams</h1>
        <p className="text-muted-foreground">
          Manage your practice team or join an existing one
        </p>
      </div>

      {/* My Team */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Team</CardTitle>
              <CardDescription>Your current practice team</CardDescription>
            </div>
            <Badge variant="outline" className="text-primary">
              {myTeam.code}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">{myTeam.name}</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {myTeam.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-accent"
                  >
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        {member.role === "Leader" ? (
                          <>
                            <Crown className="w-3 h-3" /> {member.role}
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3" /> {member.role}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Join Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Join Existing Team
            </CardTitle>
            <CardDescription>Enter a team code to join</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamCode">Team Code</Label>
              <Input
                id="teamCode"
                placeholder="e.g., BETA-2024"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
              />
            </div>
            <Button onClick={handleJoinTeam} className="w-full">
              Send Join Request
            </Button>
            
            <div className="pt-4">
              <p className="text-sm font-medium mb-3">Available Teams:</p>
              <div className="space-y-2">
                {availableTeams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => setTeamCode(team.code)}
                    className="w-full p-3 text-left bg-accent hover:bg-accent/80 rounded-lg transition-smooth"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{team.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {team.members}/{team.maxMembers}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{team.code}</div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Team
            </CardTitle>
            <CardDescription>Start your own practice team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newTeamName">Team Name</Label>
              <Input
                id="newTeamName"
                placeholder="Enter team name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  Create Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Team</DialogTitle>
                  <DialogDescription>
                    You're about to create a new practice team. You will be the team leader.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="confirmTeamName">Team Name</Label>
                    <Input
                      id="confirmTeamName"
                      placeholder="Enter team name"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                    />
                  </div>
                  <div className="bg-accent p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Team Leader Responsibilities:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Coordinate team activities</li>
                      <li>• Manage team members</li>
                      <li>• Ensure timely report submissions</li>
                      <li>• Communicate with teachers</li>
                    </ul>
                  </div>
                  <Button onClick={handleCreateTeam} className="w-full">
                    Confirm & Create
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Teams;
