"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

export function TaggingPanel() {
  const [tags, setTags] = useState([
    "Legal",
    "Contract",
    "Urgent",
  ]);

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Input placeholder="Add new tag..." />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1">
              {tag}
              <button className="ml-2" onClick={() => setTags(tags.filter(t => t !== tag))}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
      <Button className="w-full">Save Tags</Button>
    </div>
  );
}