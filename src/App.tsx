import { useState } from "react"
import { haandvaerktoejScenario } from "./scenarios"
import type { AccountState, PrimaryConversion } from "./types"
import { StartScreen } from "./screens/StartScreen"
import { SetupScreen } from "./screens/SetupScreen"
import { ResultsScreen } from "./screens/ResultsScreen"
import { simulate, evaluateSetup } from "./engine"

function App() {
 const scenario = haandvaerktoejScenario
 const [screen, setScreen] = useState<"start" | "setup" | "results">("start")
 const [account, setAccount] = useState<AccountState>({
  primaryConversion: null,
  consentMode: false,
 })

 return (
  <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
   <div className="max-w-xl w-full bg-slate-800 rounded-2xl p-8 shadow-xl">
    {screen === "start" && (
     <StartScreen scenario={scenario} onStart={() => setScreen("setup")} />
    )}
    {screen === "setup" && (
     <SetupScreen
      selected={account.primaryConversion}
      onSelect={(value: PrimaryConversion) =>
       setAccount({ ...account, primaryConversion: value })
      }
      consentMode={account.consentMode}
      onToggleConsent={() =>
       setAccount({ ...account, consentMode: !account.consentMode })
      }
      onNext={() => setScreen("results")}
      onBack={() => setScreen("start")}
     />
    )}
    {screen === "results" && (
     <ResultsScreen
      data={simulate(scenario, account, 28)}
      feedback={evaluateSetup(account)}
      onBack={() => setScreen("setup")}
     />
    )}
   </div>
  </div>
 )
}

export default App
