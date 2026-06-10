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

export function evaluateConversionChoice(account: AccountState): SetupFeedback {
 switch (account.primaryConversion) {
  case "purchase":
   return {
    rating: "good",
    headline: "Stærkt valg",
    explanation:
     "Med køb som primær konvertering måler du det, der faktisk betyder noget: salg. Din ROAS er retvisende, og bruger du senere automatisk budgivning, optimerer den mod rigtige salg.",
   }
  case "addToCart":
   return {
    rating: "warning",
    headline: "Brugbart, men pas på",
    explanation:
     "Kurv-handlinger sker oftere end køb, så dine konverteringstal ser bedre ud end virkeligheden. Fint som supplerende signal, men som primær konvertering risikerer du, at budgivningen jagter kurve frem for salg.",
   }
  case "pageview":
   return {
    rating: "bad",
    headline: "Det her er en fælde",
    explanation:
     "Sidevisninger tæller hvert eneste klik som en 'konvertering'. Tallene eksploderer og kontoen ser fantastisk ud — men du måler reelt ingenting. Din ROAS bliver meningsløs, og automatisk budgivning vil optimere mod skrald.",
   }
  default:
   return {
    rating: "warning",
    headline: "Intet valgt",
    explanation: "Du har ikke valgt en primær konvertering endnu.",
   }
 }
}
