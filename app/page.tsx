"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Filter } from "lucide-react";
import { DocumentList } from "@/components/document-list";
import { DocumentStats } from "@/components/document-stats";
import { RecentActivity } from "@/components/recent-activity";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Document Management</h1>
              <p className="text-muted-foreground">
                Manage and track your legal documents
              </p>
            </div>
            <div className="flex w-full sm:w-auto gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="flex-1 sm:flex-none">
                <FileText className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <DocumentStats />

          <Card className="mt-8">
            <DocumentList />
          </Card>
        </div>

        {/* Activity Sidebar - Moves below content on mobile */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <Card className="p-4 h-[calc(100vh-2rem)]">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <RecentActivity />
          </Card>
        </div>
      </div>
    </div>
  );
}