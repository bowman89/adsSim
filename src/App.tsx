import { useState } from "react"
import { haandvaerktoejScenario } from "./scenarios"
import type { AccountState } from "./types"

// De tre valgmuligheder spilleren kan klikke på
const conversionOptions = [
 {
  value: "purchase",
  label: "Køb",
  hint: "Tæl et salg når kunden gennemfører et køb.",
 },
 {
  value: "addToCart",
  label: "Lagt i kurv",
  hint: "Tæl når kunden lægger en vare i kurven.",
 },
 {
  value: "pageview",
  label: "Sidevisning",
  hint: "Tæl hver gang en side bliver set.",
 },
] as const

function App() {
 const scenario = haandvaerktoejScenario

 const [screen, setScreen] = useState<"start" | "setup">("start")

 // Ny state: spillerens konto. Starter uden valgt konvertering.
 const [account, setAccount] = useState<AccountState>({
  primaryConversion: null,
 })

 return (
  <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
   <div className="max-w-xl w-full bg-slate-800 rounded-2xl p-8 shadow-xl">
    {screen === "start" && (
     <>
      <p className="text-sm uppercase tracking-wide text-slate-400">
       {scenario.businessType}
      </p>
      <h1 className="text-3xl font-bold mt-1">{scenario.companyName}</h1>
      <p className="mt-4 text-slate-300 leading-relaxed">
       {scenario.description}
      </p>

      <div className="mt-6 bg-slate-700/50 rounded-xl p-4">
       <p className="text-sm text-slate-400">Dit mål</p>
       <p className="font-medium">{scenario.goal}</p>
      </div>

      <div className="mt-4 text-sm">
       <p className="text-slate-400">Budget</p>
       <p className="font-semibold text-lg">
        {scenario.monthlyBudget.toLocaleString("da-DK")} kr/md
       </p>
      </div>

      <button
       onClick={() => setScreen("setup")}
       className="mt-8 w-full bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl py-3 font-semibold"
      >
       Start opsætning
      </button>
     </>
    )}

    {screen === "setup" && (
     <>
      <h1 className="text-2xl font-bold">Fase 1: Opsætning</h1>
      <p className="mt-2 text-slate-300">
       Hvad skal være din primære konvertering?
      </p>

      <div className="mt-6 flex flex-col gap-3">
       {conversionOptions.map((option) => {
        const isSelected = account.primaryConversion === option.value
        return (
         <button
          key={option.value}
          onClick={() =>
           setAccount({ ...account, primaryConversion: option.value })
          }
          className={`text-left rounded-xl p-4 border transition-colors ${
           isSelected
            ? "border-blue-500 bg-blue-600/20"
            : "border-slate-600 bg-slate-700/40 hover:border-slate-500"
          }`}
         >
          <p className="font-semibold">{option.label}</p>
          <p className="text-sm text-slate-400">{option.hint}</p>
         </button>
        )
       })}
      </div>

      <button
       onClick={() => setScreen("start")}
       className="mt-8 text-sm text-slate-400 hover:text-slate-200"
      >
       ← Tilbage
      </button>
     </>
    )}
   </div>
  </div>
 )
}

export default App
