import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Image as ImageIcon, Mic, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataInputSection = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [textInput, setTextInput] = useState("");
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
      toast({
        title: "Files selected",
        description: `${files.length} file(s) ready to upload`,
      });
    }
  };

  const handleSubmit = (type: string) => {
    toast({
      title: "Data submitted",
      description: `Your ${type} has been processed successfully`,
    });
  };

  return (
    <section id="get-started" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Start Your Analysis
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload your medical data or enter patient information to get AI-powered clinical insights
          </p>
        </div>

        <Tabs defaultValue="reports" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="images" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <Mic className="w-4 h-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="text" className="gap-2">
              <FileText className="w-4 h-4" />
              Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Upload Medical Reports</CardTitle>
                <CardDescription>
                  Upload PDF, DOCX, or image files of medical reports, prescriptions, or lab results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <label htmlFor="report-upload" className="cursor-pointer">
                    <Input
                      id="report-upload"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button variant="outline" asChild>
                      <span>Choose Files</span>
                    </Button>
                  </label>
                  {selectedFiles.length > 0 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {selectedFiles.map(f => f.name).join(", ")}
                    </p>
                  )}
                </div>
                <Button onClick={() => handleSubmit("medical reports")} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Analyze Reports
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Upload Diagnostic Images</CardTitle>
                <CardDescription>
                  Upload X-rays, CT scans, MRI images, or other diagnostic imaging
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button variant="outline" asChild>
                      <span>Choose Images</span>
                    </Button>
                  </label>
                  {selectedFiles.length > 0 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {selectedFiles.map(f => f.name).join(", ")}
                    </p>
                  )}
                </div>
                <Button onClick={() => handleSubmit("diagnostic images")} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Analyze Images
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio">
            <Card>
              <CardHeader>
                <CardTitle>Upload Audio Samples</CardTitle>
                <CardDescription>
                  Upload audio recordings of cough, breathing patterns, or voice samples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
                  <Mic className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <Input
                      id="audio-upload"
                      type="file"
                      multiple
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button variant="outline" asChild>
                      <span>Choose Audio Files</span>
                    </Button>
                  </label>
                  {selectedFiles.length > 0 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      {selectedFiles.map(f => f.name).join(", ")}
                    </p>
                  )}
                </div>
                <Button onClick={() => handleSubmit("audio samples")} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Analyze Audio
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text">
            <Card>
              <CardHeader>
                <CardTitle>Enter Patient Information</CardTitle>
                <CardDescription>
                  Describe symptoms, medical history, or any relevant clinical information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter patient symptoms, medical history, current medications, or any relevant clinical notes..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button onClick={() => handleSubmit("patient information")} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Analyze Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DataInputSection;
