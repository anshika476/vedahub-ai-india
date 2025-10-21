import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Image as ImageIcon, Mic, Send, X, Square, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataInputSection = () => {
  const [reportFiles, setReportFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [textInput, setTextInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const handleReportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setReportFiles(fileArray);
      toast({
        title: "Files selected",
        description: `${files.length} file(s) ready to analyze`,
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImageFiles(fileArray);
      
      // Create previews
      const previews = fileArray.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
      
      toast({
        title: "Images selected",
        description: `${files.length} image(s) ready to analyze`,
      });
    }
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setAudioFiles(fileArray);
      toast({
        title: "Audio files selected",
        description: `${files.length} audio file(s) ready to analyze`,
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        const file = new File([audioBlob], `recording-${Date.now()}.webm`, { type: 'audio/webm' });
        setAudioFiles([file]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak now to record your audio",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Audio ready to analyze",
      });
    }
  };

  const handleSubmit = (type: string, hasData: boolean) => {
    if (!hasData) {
      toast({
        title: "No data provided",
        description: `Please add ${type} before analyzing`,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Analysis started",
      description: `Processing your ${type} with AI...`,
    });
    
    // Simulate processing
    setTimeout(() => {
      toast({
        title: "Analysis complete",
        description: `Your ${type} has been successfully analyzed`,
      });
    }, 2000);
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

          <TabsContent value="reports" className="animate-fade-in">
            <Card className="border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Upload Medical Reports</CardTitle>
                <CardDescription>
                  Upload PDF, DOCX, or image files of medical reports, prescriptions, or lab results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <label htmlFor="report-upload" className="cursor-pointer">
                    <Input
                      id="report-upload"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleReportChange}
                      className="hidden"
                    />
                    <Button variant="outline" className="mb-2">
                      Choose Files
                    </Button>
                  </label>
                  <p className="text-sm text-muted-foreground mt-2">
                    Drag and drop files or click to browse
                  </p>
                  {reportFiles.length > 0 && (
                    <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                      <p className="font-medium text-sm mb-2">{reportFiles.length} file(s) selected:</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {reportFiles.map((f, i) => (
                          <div key={i} className="flex items-center justify-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span>{f.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Button 
                  onClick={() => handleSubmit("medical reports", reportFiles.length > 0)} 
                  className="w-full group hover:scale-[1.02] transition-transform"
                  disabled={reportFiles.length === 0}
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Analyze Reports
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="animate-fade-in">
            <Card className="border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Upload Diagnostic Images</CardTitle>
                <CardDescription>
                  Upload X-rays, CT scans, MRI images, or other diagnostic imaging
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button variant="outline" className="mb-2">
                      Choose Images
                    </Button>
                  </label>
                  <p className="text-sm text-muted-foreground mt-2">
                    Drag and drop images or click to browse
                  </p>
                </div>
                
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group animate-scale-in">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-primary/20 group-hover:border-primary/50 transition-all"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-lg truncate">
                          {imageFiles[index]?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Button 
                  onClick={() => handleSubmit("diagnostic images", imageFiles.length > 0)} 
                  className="w-full group hover:scale-[1.02] transition-transform"
                  disabled={imageFiles.length === 0}
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Analyze Images
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audio" className="animate-fade-in">
            <Card className="border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Upload or Record Audio</CardTitle>
                <CardDescription>
                  Upload or record cough, breathing patterns, or voice samples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
                    <Mic className={`w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform ${isRecording ? 'animate-pulse' : ''}`} />
                    
                    <div className="flex flex-col gap-3">
                      {!isRecording ? (
                        <Button 
                          onClick={startRecording}
                          variant="outline"
                          className="mx-auto"
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          Start Recording
                        </Button>
                      ) : (
                        <Button 
                          onClick={stopRecording}
                          variant="destructive"
                          className="mx-auto animate-pulse"
                        >
                          <Square className="w-4 h-4 mr-2" />
                          Stop Recording
                        </Button>
                      )}
                      
                      <div className="text-sm text-muted-foreground">
                        {isRecording ? "Recording in progress..." : "or"}
                      </div>
                      
                      {!isRecording && (
                        <label htmlFor="audio-upload" className="cursor-pointer">
                          <Input
                            id="audio-upload"
                            type="file"
                            multiple
                            accept="audio/*"
                            onChange={handleAudioChange}
                            className="hidden"
                          />
                          <Button variant="outline" className="mx-auto">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Audio Files
                          </Button>
                        </label>
                      )}
                    </div>
                  </div>

                  {audioUrl && (
                    <div className="bg-primary/5 p-4 rounded-lg space-y-2 animate-scale-in">
                      <p className="text-sm font-medium">Recorded Audio:</p>
                      <audio controls src={audioUrl} className="w-full" />
                    </div>
                  )}

                  {audioFiles.length > 0 && !audioUrl && (
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">{audioFiles.length} audio file(s) selected:</p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {audioFiles.map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Mic className="w-4 h-4" />
                            <span>{f.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={() => handleSubmit("audio samples", audioFiles.length > 0)} 
                  className="w-full group hover:scale-[1.02] transition-transform"
                  disabled={audioFiles.length === 0}
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Analyze Audio
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text" className="animate-fade-in">
            <Card className="border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Enter Patient Information</CardTitle>
                <CardDescription>
                  Describe symptoms, medical history, or any relevant clinical information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter patient symptoms, medical history, current medications, or any relevant clinical notes...&#10;&#10;Example:&#10;- Patient presents with persistent cough for 2 weeks&#10;- History of asthma&#10;- Currently taking albuterol inhaler"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[240px] focus:border-primary/50 transition-colors"
                />
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Be as detailed as possible for accurate analysis</span>
                  <span>{textInput.length} characters</span>
                </div>
                <Button 
                  onClick={() => handleSubmit("patient information", textInput.trim().length > 0)} 
                  className="w-full group hover:scale-[1.02] transition-transform"
                  disabled={textInput.trim().length === 0}
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
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
