import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload as UploadIcon, File, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const uploadedFiles = [
  {
    id: 1,
    name: "project_documentation.pdf",
    size: "2.4 MB",
    uploadedAt: "2024-11-29 14:30",
    status: "approved",
  },
  {
    id: 2,
    name: "source_code.zip",
    size: "15.8 MB",
    uploadedAt: "2024-11-28 16:45",
    status: "pending",
  },
  {
    id: 3,
    name: "presentation.pptx",
    size: "8.2 MB",
    uploadedAt: "2024-11-27 11:20",
    status: "approved",
  },
];

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      toast({
        title: "Upload Started",
        description: `Uploading ${selectedFiles.length} file(s)...`,
      });
      setTimeout(() => {
        toast({
          title: "Upload Complete",
          description: "Your files have been uploaded successfully",
        });
        setSelectedFiles([]);
      }, 2000);
    } else {
      toast({
        title: "No Files Selected",
        description: "Please select files to upload",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Upload Results</h1>
        <p className="text-muted-foreground">
          Upload your project files and documentation
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Select files to upload for review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-smooth">
              <Label htmlFor="fileUpload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <UploadIcon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Click to upload files</p>
                    <p className="text-sm text-muted-foreground">
                      or drag and drop files here
                    </p>
                  </div>
                </div>
              </Label>
              <Input
                id="fileUpload"
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files ({selectedFiles.length})</Label>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-accent rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <File className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              className="w-full"
              size="lg"
              disabled={selectedFiles.length === 0}
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </CardContent>
        </Card>

        {/* Upload Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Guidelines</CardTitle>
            <CardDescription>File requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Accepted Formats</h4>
                <p className="text-muted-foreground">
                  PDF, DOC, DOCX, ZIP, RAR, PPT, PPTX
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Maximum Size</h4>
                <p className="text-muted-foreground">
                  50 MB per file
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Naming Convention</h4>
                <p className="text-muted-foreground">
                  Use descriptive names without special characters
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Required Files</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Project documentation</li>
                  <li>• Source code archive</li>
                  <li>• Final presentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Files History */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Files</CardTitle>
          <CardDescription>Your submission history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-accent"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <File className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {file.size} • Uploaded {file.uploadedAt}
                      </p>
                    </div>
                    <Badge
                      variant={file.status === "approved" ? "default" : "secondary"}
                      className="capitalize flex-shrink-0"
                    >
                      {file.status}
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

export default Upload;
