import CalculatorForm from "./CalculatorForm";
import type { CalculatorKind } from "@/lib/calculators";

// Shared wrapper every calculator page uses: input panel + live result panel,
// calculator front-and-center above the fold.
export default function CalculatorShell({
  kind,
  defaults,
}: {
  kind: CalculatorKind;
  defaults?: Record<string, number>;
}) {
  return (
    <section aria-label="Calculator">
      <CalculatorForm kind={kind} defaults={defaults} />
    </section>
  );
}
