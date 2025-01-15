"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { Document } from "@/lib/types/document";
import { formatDistanceToNow } from "date-fns";

interface DocumentInfoProps {
  document: Document;
}

export function DocumentInfo({ document }: DocumentInfoProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold">{document.title}</h1>
        <div className="flex items-center gap-4 mt-2">
          <Badge variant="secondary">{document.type.replace('_', ' ')}</Badge>
          <Badge variant={document.status === 'completed' ? 'success' : 'warning'}>
            {document.status.replace('_', ' ')}
          </Badge>
          <p className="text-sm text-muted-foreground">
            Last modified: {formatDistanceToNow(new Date(document.modifiedAt))} ago
          </p>
        </div>
        {document.pendingSigners.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <p className="text-sm text-muted-foreground">Awaiting signatures from:</p>
            <div className="flex -space-x-2">
              {document.pendingSigners.map((signer) => (
                <Avatar key={signer.id} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback>{signer.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        )}
      </div>
      <Button variant="outline">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
}