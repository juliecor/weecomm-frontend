/** "Wee Comm AI" for Wee Community Developers, Inc.: the realty's name without the company words, as the realty shortens it (same rule as Laravel's Assistant::nameFor). */
export function assistantName(realty: string): string {
  const short = realty
    .replace(/\b(ventures?|corporation|corp\.?|inc\.?|realty|realties|properties|property|development|developers?|holdings?|co\.?)(?=[\s,.]|$)/gi, "")
    .replace(/[,.]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^Wee Community$/i, "Wee Comm")
  return `${short || realty} AI`
}
