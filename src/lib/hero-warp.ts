// Lets UI outside the hero canvas (e.g. the CV button) toggle the particle field's warp mode
export const HERO_WARP_EVENT = "hero:warp"

export type HeroWarpDetail = { active: boolean }

export function setHeroWarp(active: boolean) {
  window.dispatchEvent(new CustomEvent<HeroWarpDetail>(HERO_WARP_EVENT, { detail: { active } }))
}
