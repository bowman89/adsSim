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
