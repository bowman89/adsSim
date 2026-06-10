import type { PerformanceData, SetupFeedback } from "../engine"

const ratingStyles: Record<SetupFeedback["rating"], string> = {
 good: "border-green-500 bg-green-600/15",
 warning: "border-amber-500 bg-amber-600/15",
 bad: "border-red-500 bg-red-600/15",
}

interface ResultsScreenProps {
 data: PerformanceData
 feedback: SetupFeedback
 onBack: () => void
}

export function ResultsScreen({ data, feedback, onBack }: ResultsScreenProps) {
 return (
  <>
   <h1 className="text-2xl font-bold">Efter {data.days} dage</h1>

   <div className="mt-6">
    <p className="text-sm uppercase tracking-wide text-slate-400">
     Sådan ser kontoen ud
    </p>
    <div className="mt-2 grid grid-cols-3 gap-3">
     <Metric
      label="Forbrug"
      value={`${data.spend.toLocaleString("da-DK")} kr`}
     />
     <Metric label="Klik" value={data.clicks.toLocaleString("da-DK")} />
     <Metric
      label="Konverteringer"
      value={data.reportedConversions.toLocaleString("da-DK")}
     />
    </div>
   </div>

   <div className="mt-6">
    <p className="text-sm uppercase tracking-wide text-slate-400">
     Virkeligheden
    </p>
    <div className="mt-2 grid grid-cols-3 gap-3">
     <Metric
      label="Faktiske salg"
      value={data.realSales.toLocaleString("da-DK")}
     />
     <Metric
      label="Omsætning"
      value={`${data.realRevenue.toLocaleString("da-DK")} kr`}
     />
     <Metric label="Faktisk ROAS" value={data.realRoas.toString()} />
    </div>
   </div>

   <div
    className={`mt-6 rounded-xl border p-4 ${ratingStyles[feedback.rating]}`}
   >
    <p className="font-semibold">{feedback.headline}</p>
    <p className="mt-1 text-sm text-slate-300">{feedback.explanation}</p>
   </div>

   <button
    onClick={onBack}
    className="mt-8 text-sm text-slate-400 hover:text-slate-200"
   >
    ← Tilbage til opsætning
   </button>
  </>
 )
}

function Metric({ label, value }: { label: string; value: string }) {
 return (
  <div className="bg-slate-700/40 rounded-xl p-3">
   <p className="text-xs text-slate-400">{label}</p>
   <p className="text-lg font-semibold">{value}</p>
  </div>
 )
}
