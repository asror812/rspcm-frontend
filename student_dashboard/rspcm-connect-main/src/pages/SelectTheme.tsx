import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Palette, Database, Globe, Smartphone, Cloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const themes = [
  {
    id: 1,
    title: "Web Development",
    description: "Full-stack web application development with modern frameworks",
    icon: Code2,
    duration: "30 days",
    students: 24,
    available: true,
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "User interface and experience design principles and practices",
    icon: Palette,
    duration: "30 days",
    students: 18,
    available: true,
  },
  {
    id: 3,
    title: "Database Management",
    description: "Relational and NoSQL database design and optimization",
    icon: Database,
    duration: "30 days",
    students: 20,
    available: true,
  },
  {
    id: 4,
    title: "Network Administration",
    description: "Computer networks setup, security, and maintenance",
    icon: Globe,
    duration: "30 days",
    students: 15,
    available: false,
  },
  {
    id: 5,
    title: "Mobile Development",
    description: "iOS and Android application development",
    icon: Smartphone,
    duration: "30 days",
    students: 22,
    available: true,
  },
  {
    id: 6,
    title: "Cloud Computing",
    description: "Cloud infrastructure and services deployment",
    icon: Cloud,
    duration: "30 days",
    students: 16,
    available: false,
  },
];

const SelectTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(1);
  const { toast } = useToast();

  const handleSelectTheme = (themeId: number) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme?.available) {
      setSelectedTheme(themeId);
      toast({
        title: "Theme Selected",
        description: `You've selected ${theme.title} as your practice theme`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Select Practice Theme</h1>
        <p className="text-muted-foreground">
          Choose a practice theme that aligns with your learning goals and interests
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-smooth hover:shadow-lg ${
              selectedTheme === theme.id ? "ring-2 ring-primary" : ""
            } ${!theme.available ? "opacity-60" : ""}`}
            onClick={() => handleSelectTheme(theme.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <theme.icon className="w-6 h-6 text-primary" />
                </div>
                {!theme.available && <Badge variant="secondary">Full</Badge>}
                {selectedTheme === theme.id && <Badge>Selected</Badge>}
              </div>
              <CardTitle className="mt-4">{theme.title}</CardTitle>
              <CardDescription>{theme.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>⏱ {theme.duration}</span>
                <span>👥 {theme.students} students</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTheme && (
        <div className="flex justify-end">
          <Button size="lg">
            Confirm Selection
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectTheme;
