export interface Scenario {
 // --- Læsefelter for spilleren (hvad er firmaet?) ---
 id: string // unik id, fx "haandvaerktoej-webshop"
 companyName: string // "Værktøjshjørnet"
 businessType: string // "Webshop – håndværktøj"
 description: string // kort situationstekst spilleren læser
 goal: string // hvad er målet? fx "Flest mulige salg inden for budgettet"

 // --- Motor-knapper (hvor svært er markedet?) ---
 monthlyBudget: number // kr/md til rådighed, fx 5000
 avgOrderValue: number // gns. ordreværdi i kr, fx 450 — bruges til at regne omsætning
 baseCpc: number // typisk pris pr. klik i kr, fx 6 — markedets "dyrhed"
 baseConvRate: number // andel klik der bliver til salg, fx 0.03 (= 3%)
 competitionPressure: number // 0–1, hvor hård konkurrencen er om impressions
}

export type PrimaryConversion = "purchase" | "addToCart" | "pageview"

export interface AccountState {
 primaryConversion: PrimaryConversion | null
}

export interface AccountState {
 primaryConversion: PrimaryConversion | null
 consentMode: boolean
 adGroup: AdGroup
}

export type MatchType = "broad" | "phrase" | "exact"

export interface Keyword {
 text: string
 matchType: MatchType
}

export interface Ad {
 headlines: string[] // korte overskrifter, max 30 tegn hver
 descriptions: string[] // beskrivelser, max 90 tegn hver
}

export interface AdGroup {
 name: string
 keywords: Keyword[]
 ad: Ad
}
