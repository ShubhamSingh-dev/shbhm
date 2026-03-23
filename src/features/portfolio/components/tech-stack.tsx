import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";
import { TECH_STACK_ICONS } from "./tech-stack-icons";

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <ul className="flex flex-wrap gap-4 select-none">
          {TECH_STACK.map((tech) => {
            const icons = TECH_STACK_ICONS[tech.key];
            if (!icons) return null;

            return (
              <li key={tech.key} className="flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener"
                      aria-label={tech.title}
                    >
                      <Image
                        src={icons.light}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                        className="dark:hidden block"
                        unoptimized
                      />
                      <Image
                        src={icons.dark}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                        className="hidden dark:block"
                        unoptimized
                      />
                    </a>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{tech.title}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
