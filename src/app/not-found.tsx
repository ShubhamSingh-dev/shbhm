import SectionDivider from "@/components/common/section-divider";
import { Link } from "next-view-transitions";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-in-blur pb-20 px-4 sm:px-0">
      <SectionDivider index="404" label="Object Not Found" />

      <Panel>
        <PanelHeader>
          <div className="flex items-center gap-2">
            <PanelTitle className="text-xl sm:text-2xl">Undefined Route</PanelTitle>
          </div>
        </PanelHeader>

        <PanelContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="relative mb-8">
            <h2 className="select-none font-mono text-[8rem] font-bold leading-none tracking-tighter text-foreground opacity-[0.03] sm:text-[12rem]">
              404
            </h2>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="max-w-[280px] text-sm leading-relaxed text-muted-foreground sm:text-base">
                The page is yet to be built. Please check back later.
              </p>
            </div>
          </div>

          <Button asChild variant="outline" size="sm" className="h-9 px-5">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
              Return Home
            </Link>
          </Button>
        </PanelContent>
      </Panel>

      <div className="screen-line-bottom mt-8 border-line py-8 text-center text-muted-foreground select-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] opacity-40">
           HTTP_STATUS_CODE: 404_NOT_FOUND
        </span>
      </div>
    </div>
  );
}
