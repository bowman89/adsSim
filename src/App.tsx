import { haandvaerktoejScenario } from "./scenarios"

function App() {
 const scenario = haandvaerktoejScenario

 return (
  <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
   <div className="max-w-xl w-full bg-slate-800 rounded-2xl p-8 shadow-xl">
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

    <div className="mt-4 flex gap-6 text-sm">
     <div>
      <p className="text-slate-400">Budget</p>
      <p className="font-semibold text-lg">
       {scenario.monthlyBudget.toLocaleString("da-DK")} kr/md
      </p>
     </div>
    </div>

    <button className="mt-8 w-full bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl py-3 font-semibold">
     Start opsætning
    </button>
   </div>
  </div>
 )
}

export default App
