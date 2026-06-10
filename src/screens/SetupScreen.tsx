import type { PrimaryConversion } from "../types"

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

interface SetupScreenProps {
 selected: PrimaryConversion | null
 onSelect: (value: PrimaryConversion) => void
 onNext: () => void
 onBack: () => void
}

export function SetupScreen({
 selected,
 onSelect,
 onNext,
 onBack,
}: SetupScreenProps) {
 return (
  <>
   <h1 className="text-2xl font-bold">Fase 1: Opsætning</h1>
   <p className="mt-2 text-slate-300">
    Hvad skal være din primære konvertering?
   </p>

   <div className="mt-6 flex flex-col gap-3">
    {conversionOptions.map((option) => {
     const isSelected = selected === option.value
     return (
      <button
       key={option.value}
       onClick={() => onSelect(option.value)}
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
    disabled={selected === null}
    onClick={onNext}
    className={`mt-6 w-full rounded-xl py-3 font-semibold transition-colors ${
     selected === null
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
