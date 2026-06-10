import type { Scenario } from "./types"

export const haandvaerktoejScenario: Scenario = {
 id: "haandvaerktoej-webshop",
 companyName: "Værktøjshjørnet",
 businessType: "Webshop – håndværktøj",
 description:
  "Du er lige blevet ansat til at styre Google Ads for Værktøjshjørnet, " +
  "en mindre webshop der sælger håndværktøj til gør-det-selv-folk og håndværkere. " +
  "Kontoen er helt ny — der er endnu ikke kørt en eneste annonce. Du starter fra bunden.",
 goal: "Få flest mulige salg ud af budgettet uden at brænde penge på spild.",

 monthlyBudget: 5000,
 avgOrderValue: 450,
 baseCpc: 6,
 baseConvRate: 0.03,
 competitionPressure: 0.4,
}
