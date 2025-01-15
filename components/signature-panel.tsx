"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenLine, Type, Upload } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import DrawingCanvas from '@/components/ui/drawingCanvas'
export function SignaturePanel() {
  const [signature, setSignature] = useState<string | null>(null);
  const [typedSignature, setTypedSignature] = useState('');

  const handleApplySignature = () => {
    // Here you can handle the final signature based on the active tab
    console.log('Drawn signature:', signature);
    console.log('Typed signature:', typedSignature);
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="draw">
        <TabsList className="mb-4">
          <TabsTrigger value="draw">
            <PenLine className="h-4 w-4 mr-2" />
            Draw
          </TabsTrigger>
          <TabsTrigger value="type">
            <Type className="h-4 w-4 mr-2" />
            Type
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="draw" className="h-40">
          <DrawingCanvas onSignatureChange={setSignature} />
        </TabsContent>
        
        <TabsContent value="type">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Type your signature</Label>
              <Input 
                placeholder="Your name" 
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="font-serif">Style 1</Button>
              <Button variant="outline" className="font-handwriting">Style 2</Button>
              <Button variant="outline" className="font-cursive">Style 3</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="h-40 border-2 border-dashed rounded-lg flex items-center justify-center">
            <Button variant="outline">Upload Signature Image</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Button className="w-full" onClick={handleApplySignature}>
        <PenLine className="h-4 w-4 mr-2" />
        Apply Signature
      </Button>
    </div>
  );
}