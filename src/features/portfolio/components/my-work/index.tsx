"use client"

import { motion } from "motion/react"

import { MYWORK } from "../../data/my-work"
import { Panel, PanelHeader, PanelTitle } from "../panel"
import { MyWorkItem } from "./my-work-item"

export function MyWork() {
  return (
    <Panel id="my-work">
      <PanelHeader className="border-y border-border py-4">
        <PanelTitle className="tracking-wide">My Work</PanelTitle>
      </PanelHeader>

      <motion.div
        className="mx-4 my-4 px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.12 },
          },
        }}
      >
        {MYWORK.map((work) => (
          <motion.div
            key={work.id}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <MyWorkItem work={work} />
          </motion.div>
        ))}
      </motion.div>
    </Panel>
  )
}
