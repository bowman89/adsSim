import { useState } from "react"
import type { Keyword, MatchType } from "../types"

const matchTypes: { value: MatchType; label: string }[] = [
 { value: "broad", label: "Bredt" },
 { value: "phrase", label: "Sætning" },
 { value: "exact", label: "Eksakt" },
]

interface BuildScreenProps {
 keywords: Keyword[]
 onAddKeyword: (keyword: Keyword) => void
 onRemoveKeyword: (index: number) => void
 onNext: () => void
 onBack: () => void
}

export function BuildScreen({
 keywords,
 onAddKeyword,
 onRemoveKeyword,
 onNext,
 onBack,
}: BuildScreenProps) {
 const [text, setText] = useState("")
 const [matchType, setMatchType] = useState<MatchType>("phrase")

 function handleAdd() {
  const trimmed = text.trim()
  if (trimmed === "") return
  onAddKeyword({ text: trimmed, matchType })
  setText("")
 }

 return (
  <>
   <h1 className="text-2xl font-bold">Byg din annoncegruppe</h1>
   <p className="mt-2 text-slate-300">Tilføj de søgeord, du vil byde på.</p>

   <div className="mt-6 flex flex-col gap-3">
    <input
     type="text"
     value={text}
     onChange={(e) => setText(e.target.value)}
     placeholder="fx stregkodescanner"
     className="rounded-xl bg-slate-700/40 border border-slate-600 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
    />

    <div className="flex gap-2">
     {matchTypes.map((m) => (
      <button
       key={m.value}
       onClick={() => setMatchType(m.value)}
       className={`flex-1 rounded-xl py-2 text-sm border transition-colors ${
        matchType === m.value
         ? "border-blue-500 bg-blue-600/20"
         : "border-slate-600 bg-slate-700/40 hover:border-slate-500"
       }`}
      >
       {m.label}
      </button>
     ))}
    </div>

    <button
     onClick={handleAdd}
     className="rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors py-2 font-semibold"
    >
     Tilføj søgeord
    </button>
   </div>

   <div className="mt-6 flex flex-col gap-2">
    {keywords.length === 0 && (
     <p className="text-sm text-slate-500">Ingen søgeord endnu.</p>
    )}
    {keywords.map((kw, index) => (
     <div
      key={index}
      className="flex items-center justify-between rounded-xl bg-slate-700/40 px-4 py-2"
     >
      <span>
       {kw.text}{" "}
       <span className="text-xs text-slate-400">
        ({matchTypes.find((m) => m.value === kw.matchType)?.label})
       </span>
      </span>
      <button
       onClick={() => onRemoveKeyword(index)}
       className="text-sm text-slate-500 hover:text-red-400"
      >
       Fjern
      </button>
     </div>
    ))}
   </div>

   <button
    disabled={keywords.length === 0}
    onClick={onNext}
    className={`mt-6 w-full rounded-xl py-3 font-semibold transition-colors ${
     keywords.length === 0
      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-500 text-white"
    }`}
   >
    Videre
   </button>

   <button
    onClick={onBack}
    className="mt-8 text-sm text-slate-400 hover:text-slate-200"
   >
    ← Tilbage
   </button>
  </>
 )
}
