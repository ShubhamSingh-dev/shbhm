import { resumeConfig } from '@/config/resume';
import { Metadata } from 'next';
import React from 'react';
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel";
import SectionDivider from "@/components/common/section-divider";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume — Shbhm",
  description: "Curriculum Vitae",
};

export default function ResumePage() {
  const previewUrl = resumeConfig.url.replace('/view', '/preview');

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-in-blur pb-20">
      <SectionDivider index="01" label="Resume" />
      
      <Panel>
        <PanelHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            <PanelTitle className="text-xl sm:text-2xl">Resume</PanelTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <a 
                href={resumeConfig.url} 
                target="_blank" 
                rel="noopener noreferrer"
                title="View full resume in new tab"
              >
                <ExternalLink className="mr-2 size-4" />
                View Full
              </a>
            </Button>
            <Button variant="outline" size="icon-sm" asChild className="sm:hidden">
              <a 
                href={resumeConfig.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View full resume in new tab"
                title="View full resume in new tab"
              >
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>
        </PanelHeader>
        
        <PanelContent className="p-0 overflow-hidden">
          <div className="relative h-[calc(100vh-250px)] min-h-[600px] w-full bg-muted/30">
            <iframe
              title="Resume Preview"
              src={previewUrl}
              className="absolute inset-0 h-full w-full border-0"
              allow="autoplay"
              allowFullScreen
            />
          </div>
        </PanelContent>
      </Panel>

      <div className="screen-line-bottom mt-8 border-line py-8 text-center text-muted-foreground">
        <p className="text-sm font-mono uppercase tracking-wider">
          Can&apos;t see the document clearly? 
          <a 
            href={resumeConfig.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ml-1 text-primary hover:underline"
            title="Open resume in Google Drive"
          >
            Open in Google Drive
          </a>
        </p>
      </div>
    </div>
  );
}