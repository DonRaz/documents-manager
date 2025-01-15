"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TimelineSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimelineSearch({ value, onChange }: TimelineSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
        placeholder="Filter by user name..."
      />
    </div>
  );
}