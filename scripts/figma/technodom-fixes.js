// Technodom case study: small fixes after the translation script.
// Run in Figma desktop with Scripter, on the Archive page, like technodom-translate.js.
//
// 1. Phone numbers no longer break across lines: the number moves whole to the second line.
// 2. Terms read "mon" everywhere ("24 mo" → "24 mon"), to match the edited chips.

const SECTION_ID = "132:14865"
const SECTION_NAME = "Technodom — case study (EN)"
const log = typeof print === "function" ? print : (...a) => console.log(...a)
const getNode = async (id) => (figma.getNodeByIdAsync ? figma.getNodeByIdAsync(id) : figma.getNodeById(id))

let sec = await getNode(SECTION_ID)
if (!sec) sec = figma.currentPage.findOne((n) => n.type === "SECTION" && n.name === SECTION_NAME)
if (!sec) throw new Error("Section not found. Open the Archive page and run again.")

const fixes = []
for (const frame of sec.children.filter((c) => c.type === "FRAME")) {
  for (const t of frame.findAll((n) => n.type === "TEXT")) {
    const s = t.characters
    let next = null
    const phone = s.match(/^We sent a confirmation code to\s+(\+7[\d ]+)$/)
    if (phone) next = "We sent a confirmation code to\n" + phone[1].trim()
    else if (/^\d+ mo$/.test(s)) next = s + "n"
    if (next === null || next === s) continue
    for (const seg of t.getStyledTextSegments(["fontName"])) await figma.loadFontAsync(seg.fontName)
    t.characters = next
    fixes.push(frame.name + ": " + JSON.stringify(s) + " → " + JSON.stringify(next))
  }
}
log(fixes.length ? fixes.join("\n") : "Nothing to fix.")
