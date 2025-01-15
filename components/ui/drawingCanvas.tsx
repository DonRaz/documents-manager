"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenLine, Type, Upload, Eraser } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface DrawingCanvasProps {
  onSignatureChange: (signature: string | null) => void;
}

const DrawingCanvas = ({ onSignatureChange }: DrawingCanvasProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);

  // Handle canvas resize
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      // Get the device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas size based on container
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the context for high DPI displays
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw the signature line
      drawSignatureLine(ctx, rect.width, rect.height);
    };

    // Initial resize
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Prevent touch scrolling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preventDefault = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    canvas.addEventListener('touchstart', preventDefault, { passive: false });
    canvas.addEventListener('touchmove', preventDefault, { passive: false });
    canvas.addEventListener('touchend', preventDefault, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', preventDefault);
      canvas.removeEventListener('touchmove', preventDefault);
      canvas.removeEventListener('touchend', preventDefault);
    };
  }, []);

  const drawSignatureLine = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.strokeStyle = '#4B5563'; // Tailwind gray-600 for better visibility
    ctx.lineWidth = 2;
    ctx.setLineDash([]); // Solid line
    
    // Draw the line just above the instructions text
    const lineY = height * 0.85; // Positioned higher from bottom
    const marginX = width * 0.1; // 10% margin on each side
    
    ctx.beginPath();
    ctx.moveTo(marginX, lineY);
    ctx.lineTo(width - marginX, lineY);
    ctx.stroke();
    
    ctx.restore();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Calculate the scale ratio between canvas internal dimensions and CSS dimensions
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const coords = getCoordinates(e);
    if (!coords) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }

    setIsDrawing(true);
    setLastPosition(coords);
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPosition) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    setLastPosition(coords);
  }, [isDrawing, lastPosition]);

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    
    setIsDrawing(false);
    setLastPosition(null);

    const canvas = canvasRef.current;
    if (canvas) {
      onSignatureChange(canvas.toDataURL());
    }
  }, [isDrawing, onSignatureChange]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSignatureLine(ctx, rect.width, rect.height);
    onSignatureChange(null);
  }, [onSignatureChange]);

  return (
    <div ref={containerRef} className="relative h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none border rounded-lg"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div className="absolute inset-x-0 bottom-1 flex justify-center">
        <p className="text-sm text-muted-foreground">Sign above the line</p>
      </div>
      <Button
        size="icon"
        variant="outline"
        className="absolute left-2 bottom-2"
        onClick={clear}
      >
        <Eraser className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function SignaturePanel() {
  const [signature, setSignature] = useState<string | null>(null);
  const [typedSignature, setTypedSignature] = useState('');

  const handleApplySignature = () => {
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

export default DrawingCanvas;