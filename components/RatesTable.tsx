import { rateRows, taxYearLabel } from "@/data/rates";

export default function RatesTable() {
  return (
    <section aria-labelledby="rates-heading" className="card p-6">
      <h2 id="rates-heading" className="text-lg font-semibold">
        Key rates — tax year {taxYearLabel}
      </h2>
      <p className="mt-1 text-xs text-ink/60">
        Source: GOV.UK, &quot;Rates and thresholds for employers 2026 to 2027&quot; (HMRC).
      </p>
      <table className="mt-4 w-full text-sm">
        <tbody>
          {rateRows.map((row) => (
            <tr key={row.label} className="border-t border-ink/10">
              <th scope="row" className="py-2 pr-4 text-left font-normal text-ink/80">
                {row.label}
              </th>
              <td className="tabular py-2 text-right font-semibold">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
