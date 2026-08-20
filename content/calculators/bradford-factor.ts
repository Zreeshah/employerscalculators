import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "bradford-factor-calculator",
  kind: "bradford-factor",
  title: "Bradford Factor Calculator UK",
  metaDescription:
    "Bradford Factor calculator: score absence as S² × D. See why short, frequent absences score higher than one long absence",
  h1: "Bradford Factor Calculator",
  intro:
    "The Bradford Factor is a formula some UK employers use to measure the disruption caused by employee absence, weighting frequent short spells more heavily than one long absence. This bradford factor calculator is built for HR teams and small-business owners scoring absence patterns over a rolling 52-week period. It is a management tool, not a legal requirement, and should always be used alongside context — never as an automatic trigger for disciplinary action.",
  formulaExplainer:
    ":::callout info\n**Bradford Factor formula:** score = **S² × D**, where **S** is the number of separate spells of absence and **D** is the total days absent in the period (usually a rolling 52 weeks).\n\nBecause spells are squared, five separate one-day absences (25 × 5 = **125**) score far higher than one five-day absence (1 × 5 = **5**), even though the total days lost are identical. This is by design — frequent short spells are treated as more disruptive.\n:::",
  howToSteps: [
    {
      name: "Count the spells of absence (S)",
      text: "Count each separate spell of sickness absence in the rolling 52-week period. A spell is a continuous run of sickness days; two working days between spells starts a new spell. Unrelated absences (for example a one-off medical appointment) are usually counted too, depending on the policy.",
    },
    {
      name: "Count the total days absent (D)",
      text: "Add up every working day missed across those spells. Bank holidays, weekends and non-working days are excluded. The total is the second input to the formula.",
    },
    {
      name: "Square the number of spells",
      text: "Multiply S by itself: S². This is the multiplier that pushes frequent short absences up the scale. Three one-day spells score 3² × 3 = 27; one three-day spell scores 1 × 3 = 3.",
    },
    {
      name: "Multiply S² by D",
      text: "Multiply S² by the total days absent. The result is the Bradford Factor score. The calculator above returns this number directly — no need to do the arithmetic by hand.",
    },
    {
      name: "Compare against the trigger thresholds",
      text: "By common convention, scores around 100 prompt monitoring, 200 an informal review, and 500 or more formal action — but these trigger points are set by the employer, not by law. Use the score as one input alongside context, not as an automatic disciplinary trigger.",
    },
  ],
  sections: [
    {
      heading: "What is the Bradford Factor?",
      body:
        "The **Bradford Factor** is an absence-scoring formula developed by Bradford University in the 1980s, designed to flag disruptive patterns of short, repeated sickness absence. It is widely used in UK HR practice but has no statutory status — it is one possible tool, not a legal test.\n\nThe formula is deliberately weighted against frequent short absences. One long absence of ten days scores 1 × 10 = **10**. Ten separate one-day absences score 100 × 10 = **1,000** — the same total days lost, but the score reflects the operational cost of repeated disruption. The idea is that frequent short absences are harder to plan around than one long absence.",
    },
    {
      heading: "How the Bradford Factor formula works",
      body:
        "The arithmetic is simple enough to do by hand, and the calculator above applies it directly.\n\n- **S** = number of spells of absence in the period (typically a rolling 52 weeks).\n- **D** = total working days missed across those spells.\n- **Score** = S² × D.\n\nWorked example: an employee has been off six times in the last 12 months — three one-day colds, one three-day flu, and two two-day absences — for a total of 10 days.\n\n- S = 6, so S² = 36\n- D = 10\n- **Bradford Factor = 36 × 10 = 360**\n\nA different employee off once for ten days scores 1 × 10 = 10. The pattern matters as much as the volume.",
    },
    {
      heading: "Common Bradford Factor trigger thresholds",
      body:
        "There is no legal Bradford Factor score that triggers a particular action. The thresholds below are common conventions used across UK employers — each organisation sets its own and should write them into the absence policy.\n\n:::table\n| Score | Typical employer action |\n|---|---|\n| 0 – 99 | Within normal range — no action |\n| 100 – 199 | Informal discussion at return-to-work interview |\n| 200 – 499 | Formal review, possibly with occupational health referral |\n| 500+ | Formal absence review and potential disciplinary procedure |\n:::\n\nThese are guides, not rules. A score of 600 for an employee with a long-term condition that is well-managed should be treated differently from a score of 600 driven by repeated short unexplained absences. The score tells you a pattern exists; the conversation tells you what to do about it.",
    },
    {
      heading: "Legal limits on using the Bradford Factor",
      body:
        "The score is conventional, but the way an employer uses it is regulated. The main risks are:\n\n- **Equality Act 2010.** Disability-related absence must be disregarded in the score, or the policy will indirectly discriminate against disabled employees. Pregnancy-related absence is protected in the same way. Adjusting or discounting such absence is what ACAS advises.\n- **Disability discrimination.** Long-term or fluctuating conditions (ME, MS, cancer treatment) can push a Bradford Factor score very high even when the absences are all covered by fit notes. Treating the score mechanically in those cases is unlawful.\n- **Unfair dismissal.** Using the Bradford Factor as an automatic trigger for disciplinary action without considering context risks a finding of unfair dismissal at tribunal. The score is one input, not the decision.\n- **Transparency.** Under the employment contract and ACAS guidance, absence policies and trigger thresholds should be in writing and shared with employees in advance.\n\n:::callout tip\n**Discount protected absence.** The safest pattern is to remove any spell flagged as disability-related, pregnancy-related or covered by a fit note before computing the score. That keeps the policy proportionate and reduces the risk of an Equality Act claim.\n:::",
    },
    {
      heading: "Summary: how to use this calculator",
      body:
        "Two numbers in, one number out. Enter the number of absence spells (S) and the total days absent (D) over the same period — usually a rolling 52 weeks. The Bradford Factor calculator returns the S² × D score, ready to compare against the trigger thresholds in your absence policy. Treat the score as one input alongside context: it tells you a pattern exists, the return-to-work conversation tells you what to do about it.",
    },
  ],
  faq: [
    {
      question: "What is the Bradford Factor formula?",
      answer:
        "Bradford Factor score = S² × D, where S is the number of separate spells of absence and D is the total days absent in the period (typically a rolling 52 weeks).",
    },
    {
      question: "What is a 'good' or 'bad' Bradford Factor score?",
      answer:
        "There is no legal standard. By common convention, scores around 100 may prompt monitoring, 200 an informal review, and 500 or more formal action — but these trigger points are set by each employer, not by law.",
    },
    {
      question: "Is the Bradford Factor legal in the UK?",
      answer:
        "Using it is legal, but it is only a convention, not law. Employers must apply it carefully: disregarding disability-related or pregnancy-related absence can breach the Equality Act 2010, and ACAS advises adjusting or discounting such absences.",
    },
    {
      question: "Why do frequent short absences score higher?",
      answer:
        "Because the formula squares the number of spells (S²). Three one-day absences score 9 × 3 = 27, while one three-day absence scores 1 × 3 = 3 — reflecting the view that repeated short absences are more disruptive to plan around.",
    },
    {
      question: "Should employers rely on the Bradford Factor alone?",
      answer:
        "No. It should be one input alongside return-to-work conversations and individual circumstances. Using the score mechanically to trigger disciplinary action, without considering context, risks unfairness and legal challenge.",
    },
  ],
  relatedSlugs: [],
});
