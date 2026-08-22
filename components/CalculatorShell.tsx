import CalculatorForm from "./CalculatorForm";
import type { NhsCalculatorPreset } from "@/content/types";
import type { CalculatorKind } from "@/lib/calculators";

// Shared wrapper every calculator page uses: input panel + live result panel,
// calculator front-and-center above the fold.
export default function CalculatorShell({
  kind,
  defaults,
  nhsPreset,
}: {
  kind: CalculatorKind;
  defaults?: Record<string, number>;
  nhsPreset?: NhsCalculatorPreset;
}) {
  return (
    <section aria-label="Calculator">
      <CalculatorForm kind={kind} defaults={defaults} nhsPreset={nhsPreset} />
    </section>
  );
}
