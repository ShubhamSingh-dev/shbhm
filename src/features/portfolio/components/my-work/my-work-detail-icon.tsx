import type { LucideProps } from "lucide-react"
import {
  BotIcon,
  BoxIcon,
  CodeXmlIcon,
  CpuIcon,
  DraftingCompassIcon,
  LayersIcon,
} from "lucide-react"

import type { MyWorkIcon } from "../../types/my-work"

const iconMap: Record<MyWorkIcon, React.ComponentType<LucideProps>> = {
  code: CodeXmlIcon,
  design: DraftingCompassIcon,
  blockchain: BoxIcon,
  ai: BotIcon,
  backend: CpuIcon,
  fullstack: LayersIcon,
}

export function MyWorkDetailIcon({
  icon,
  ...props
}: { icon: MyWorkIcon | undefined } & LucideProps) {
  const IconComponent = icon ? iconMap[icon] : CodeXmlIcon
  return <IconComponent {...props} />
}
