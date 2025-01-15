"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PenLine, Tag, Send, CheckCircle } from "lucide-react";
import { SignaturePanel } from "./signature-panel";
import { TaggingPanel } from "./tagging-panel";

export function DocumentActions() {
  return (
    <Card className="mt-6">
      <Tabs defaultValue="sign" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="sign" className="flex-1">
            <PenLine className="h-4 w-4 mr-2" />
            Sign
          </TabsTrigger>
          <TabsTrigger value="tag" className="flex-1">
            <Tag className="h-4 w-4 mr-2" />
            Tag
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sign">
          <SignaturePanel />
        </TabsContent>
        <TabsContent value="tag">
          <TaggingPanel />
        </TabsContent>
      </Tabs>
    </Card>
  );
}