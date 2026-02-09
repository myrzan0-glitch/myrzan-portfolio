"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y }}
      animate={
        isInView
          ? { opacity: 1, y: 0, transition: { duration: 0.7, delay } }
          : undefined
      }
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
  delayChildren = 0.1
}: {
  children: React.ReactNode
  className?: string
  delayChildren?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn("grid gap-6", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren }
              }
            }
      }
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }
      }
    >
      {children}
    </motion.div>
  )
}
