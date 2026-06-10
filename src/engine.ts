import type { Scenario, AccountState } from "./types"

export interface PerformanceData {
 days: number
 spend: number // forbrug i kr
 clicks: number // antal klik
 reportedConversions: number // det Ads-kontoen VISER som konverteringer
 realSales: number // faktiske salg
 realRevenue: number // faktisk omsætning i kr
 realRoas: number // faktisk ROAS
}

export function simulate(
 scenario: Scenario,
 account: AccountState,
 days: number,
): PerformanceData {
 const dailyBudget = scenario.monthlyBudget / 30
 const spend = dailyBudget * days

 const clicks = Math.round(spend / scenario.baseCpc)
 const realSales = Math.round(clicks * scenario.baseConvRate)
 const realRevenue = realSales * scenario.avgOrderValue
 const realRoas = spend > 0 ? realRevenue / spend : 0

 // Det vigtige: hvad kontoen RAPPORTERER afhænger af spillerens valg
 let reportedConversions: number
 switch (account.primaryConversion) {
  case "purchase":
   reportedConversions = realSales // sandheden — 1 konvertering = 1 salg
   break
  case "addToCart":
   reportedConversions = realSales * 4 // flere kurve end køb
   break
  case "pageview":
   reportedConversions = clicks // hvert klik "tæller" — meningsløst
   break
  default:
   reportedConversions = 0
 }

 // Uden Consent Mode mister du ~25% af målingerne
 if (!account.consentMode) {
  reportedConversions = reportedConversions * 0.75
 }

 return {
  days,
  spend: Math.round(spend),
  clicks,
  reportedConversions: Math.round(reportedConversions),
  realSales,
  realRevenue,
  realRoas: Math.round(realRoas * 100) / 100,
 }
}

export type Rating = "good" | "warning" | "bad"

export interface SetupFeedback {
 rating: Rating
 headline: string
 explanation: string
}

export function evaluateSetup(account: AccountState): SetupFeedback[] {
 const feedback: SetupFeedback[] = []

 // Vurder konverteringsvalget
 switch (account.primaryConversion) {
  case "purchase":
   feedback.push({
    rating: "good",
    headline: "Stærkt konverteringsvalg",
    explanation:
     "Med køb som primær konvertering måler du det, der faktisk betyder noget: salg. Din ROAS er retvisende, og automatisk budgivning vil optimere mod rigtige salg.",
   })
   break
  case "addToCart":
   feedback.push({
    rating: "warning",
    headline: "Kurv som konvertering — pas på",
    explanation:
     "Kurv-handlinger sker oftere end køb, så dine konverteringstal ser bedre ud end virkeligheden. Som primær konvertering risikerer du, at budgivningen jagter kurve frem for salg.",
   })
   break
  case "pageview":
   feedback.push({
    rating: "bad",
    headline: "Sidevisning er en fælde",
    explanation:
     "Sidevisninger tæller hvert klik som en 'konvertering'. Tallene eksploderer og kontoen ser fantastisk ud — men du måler reelt ingenting, og budgivningen optimerer mod skrald.",
   })
   break
 }

 // Vurder Consent Mode
 if (account.consentMode) {
  feedback.push({
   rating: "good",
   headline: "Consent Mode er slået til",
   explanation:
    "Du måler korrekt, selv når brugere afviser cookies. Dine konverteringstal er ikke kunstigt lave.",
  })
 } else {
  feedback.push({
   rating: "warning",
   headline: "Consent Mode er slået fra",
   explanation:
    "Du mister en del af dine målinger, når brugere afviser cookies. Dine rapporterede konverteringer er lavere end virkeligheden, hvilket kan få dig til at undervurdere kampagnerne.",
  })
 }

 return feedback
}
