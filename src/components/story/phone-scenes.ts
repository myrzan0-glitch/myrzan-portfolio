/**
 * Types for the story cases' phone panels (see stages.tsx): screens are 390 × 844 exports, and
 * bands and layer parts are given in those screen pixels.
 */

/** `mark` sets a band apart: a part designed from scratch, or a problem found on an old screen. */
export type LayerPart = { y: [number, number]; name: string; mark?: "new" | "problem"; from?: string }

/** A band to highlight on a row phone, in 390 × 844 screen pixels; `x` defaults to the full width. */
export type RowBand = { y: [number, number]; x?: [number, number]; problem?: boolean }
/** `on` sets the label in the accent colour: the new design, as opposed to the old one or an example. */
export type RowPhone = { screen: string; label: string; short?: string; on?: boolean; bands?: RowBand[] }
