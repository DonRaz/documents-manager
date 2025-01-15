"use client";

import { useDocument } from "@/lib/hooks/use-document";
import { DocumentViewer } from "@/components/document-viewer";
import { DocumentActions } from "@/components/document-actions";
import { DocumentInfo } from "@/components/document-info";
import { Timeline } from "@/components/document-timeline/timeline";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DocumentPageProps {
  id: string;
}

export function DocumentPage({ id }: DocumentPageProps) {
  const { document, getVersionHistory, getActionHistory } = useDocument(id);

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documents
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="container py-6">
        <DocumentInfo document={document} />
        
        <div className="grid lg:grid-cols-[1fr,400px] gap-6 mt-6">
          <div className="space-y-6">
            <DocumentViewer document={document} />
            <DocumentActions document={document} />
          </div>
          
          <div className="bg-card rounded-lg border h-[calc(100vh-12rem)]">
            <Timeline 
              versions={getVersionHistory()} 
              actions={getActionHistory()} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}