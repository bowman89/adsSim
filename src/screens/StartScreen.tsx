import type { Scenario } from "../types"

interface StartScreenProps {
 scenario: Scenario
 onStart: () => void
}

export function StartScreen({ scenario, onStart }: StartScreenProps) {
 return (
  <>
   <p className="text-sm uppercase tracking-wide text-slate-400">
    {scenario.businessType}
   </p>
   <h1 className="text-3xl font-bold mt-1">{scenario.companyName}</h1>
   <p className="mt-4 text-slate-300 leading-relaxed">{scenario.description}</p>

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
    onClick={onStart}
    className="mt-8 w-full bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl py-3 font-semibold"
   >
    Start opsætning
   </button>
  </>
 )
}
