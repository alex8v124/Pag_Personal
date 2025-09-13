"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { generateImageAction } from "@/app/actions";
import { Loader2, Upload, Sparkles } from "lucide-react";
import Image from "next/image";

type ProfilePictureGeneratorProps = {
  onImageGenerated: (url: string) => void;
  children: React.ReactNode;
};

export function ProfilePictureGenerator({
  onImageGenerated,
  children,
}: ProfilePictureGeneratorProps) {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [textPrompt, setTextPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("text");
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    let result;

    if (activeTab === "upload" && uploadedImage) {
      result = await generateImageAction({ imageUri: uploadedImage });
    } else if (activeTab === "text" && textPrompt) {
      result = await generateImageAction({ textPrompt });
    } else {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: "Please provide either a text prompt or an image.",
      });
      setIsGenerating(false);
      return;
    }

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error,
      });
    } else if (result.profilePictureUri) {
      onImageGenerated(result.profilePictureUri);
      toast({
        title: "Success!",
        description: "Your new profile picture has been generated.",
      });
      setOpen(false); // Close dialog on success
    }

    setIsGenerating(false);
  };
  
  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setTextPrompt("");
      setUploadedImage(null);
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Generate Profile Picture</DialogTitle>
          <DialogDescription>
            Create a new profile picture using AI. Generate from a text prompt or
            enhance an existing photo.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">
              <Sparkles className="mr-2 h-4 w-4" />
              From Text
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="mr-2 h-4 w-4" />
              From Image
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="py-4">
            <div className="grid gap-2">
              <Label htmlFor="text-prompt">Text Prompt</Label>
              <Input
                id="text-prompt"
                placeholder='e.g., "A programmer in a neon-lit room"'
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
              />
               <p className="text-xs text-muted-foreground">Describe the profile picture you want to create.</p>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="py-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="picture">Upload an image</Label>
              <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} className="file:text-primary file:font-medium"/>
              <p className="text-xs text-muted-foreground">We'll enhance your photo to a professional profile picture.</p>
              {uploadedImage && (
                <div className="mt-4 flex justify-center">
                  <Image
                    src={uploadedImage}
                    alt="Image preview"
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
            </DialogClose>
          <Button onClick={handleSubmit} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
