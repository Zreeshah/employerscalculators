import { calculator } from "../types";

export default calculator({
  type: "calculator",
  slug: "bradford-factor-calculator",
  kind: "bradford-factor",
  title: "Bradford Factor Calculator UK: Score, Thresholds & Absence Cost",
  metaDescription:
    "Bradford Factor calculator UK for S² × D scores, thresholds and absence-cost context. Compare episodes, understand review triggers and apply fair absence-management rules.",
  h1: "Bradford Factor Calculator: Score & Thresholds",
  intro:
    "Add each sickness absence episode and calculate the **Bradford Factor score** as S² × D over the period used by your organisation, often a rolling 52 weeks. The score deliberately weights repeated short absences more heavily than one continuous absence. This page also explains the difference between a pattern score and the underlying absence cost. It is not a statutory measure or a disciplinary decision, so review the record, policy, disability adjustments and individual context before acting.",
  formulaExplainer: `:::callout info
**Bradford Factor = S² × D.** **S** is the number of separate absence episodes in the measurement period and **D** is the total number of working days absent across those episodes.

The episode list supplies both inputs: its number of included rows is S, and the sum of their absence days is D. Five one-day episodes score 5² × 5 = **125**; one five-day episode scores 1² × 5 = **5**.
:::`,
  howToSteps: [
    {
      name: "Choose the measurement period",
      text: "Use the period written in the absence policy, commonly a rolling 52 weeks ending on the review date. Do not mix episodes from different periods.",
    },
    {
      name: "Add each separate absence episode",
      text: "Enter one row for each continuous sickness spell and record the working days lost. Merge dates that form one continuous episode under the policy.",
    },
    {
      name: "Review exclusions and adjustments",
      text: "Before relying on the score, identify pregnancy-related absence, disability-related absence and any other category the policy records separately or adjusts.",
    },
    {
      name: "Calculate S squared multiplied by D",
      text: "The calculator counts included episodes, totals their days, squares the episode count and multiplies it by total days absent.",
    },
    {
      name: "Use the score as a review prompt",
      text: "Compare the result with the employer's published, non-statutory review bands and discuss the employee's circumstances rather than applying an automatic sanction.",
    },
  ],
  sections: [
    {
      heading: "What is the Bradford Factor?",
      body: `The **Bradford Factor** is an attendance-management score designed to highlight frequent short sickness absences. It assumes that several separate disruptions can be harder to cover than one absence of the same total length. Employers sometimes use it as a consistent prompt for a return-to-work conversation or attendance review.

It has no status in UK employment law and there is no official “good” or “bad” score. The organisation chooses the measurement period, what counts as an episode and any review points. Those choices should be documented, communicated and applied consistently, with reasonable adjustments and protected absences considered separately.`,
    },
    {
      heading: "How the episode list becomes S² × D",
      body: `Enter each **separate continuous spell** as one episode. If the included episode lengths are 1, 2 and 4 working days, S is 3 and D is 7. The score is 3² × 7 = **63**. The list makes the arithmetic auditable because a manager can see which spells produced the count and total.

Overlapping records should not be double-counted. A weekend or non-working day inside one continuing sickness spell does not automatically create a new episode. If the employee returned to work and was later absent again, that will normally be a new episode, subject to the employer's written policy.`,
    },
    {
      heading: "Why absence patterns produce very different scores",
      body: `Squaring S makes the score sensitive to frequency. The same ten lost working days can produce scores from 10 to 1,000 depending on how they are grouped.

:::table
| Absence pattern | S | D | Bradford score |
|---|---:|---:|---:|
| One 10-day episode | 1 | 10 | 10 |
| Two 5-day episodes | 2 | 10 | 40 |
| Five 2-day episodes | 5 | 10 | 250 |
| Ten 1-day episodes | 10 | 10 | 1,000 |
:::

This weighting is both the purpose and the limitation of the formula. It describes a pattern; it does not explain the cause, predict future attendance or prove misconduct.`,
    },
    {
      heading: "Example Bradford Factor review bands",
      body: `No government body sets Bradford Factor thresholds. The bands below are **illustrative, non-statutory examples**, not recommended sanctions. An employer should choose review points that fit its operation, workforce and equality duties, then state them in the absence policy.

:::table
| Example score | Example policy label |
|---|---|
| 0–99 | No formal action |
| 100–199 | Verbal warning review point |
| 200–299 | Written warning review point |
| 300–399 | Final written warning review point |
| 400+ | Dismissal consideration review point |
:::

These labels mirror the calculator's example bands, not a lawful automatic sequence. Crossing a band should open a fair review, not determine its outcome. Length of service, cause, warnings, medical evidence and previous support remain relevant.`,
    },
    {
      heading: "Bradford score versus absence cost and SSP",
      body: `The Bradford Factor measures frequency and duration; it does **not** calculate the employer's financial cost. Two patterns can have the same total days absent and therefore a similar direct sick-pay cost, while producing very different scores because S is squared. For example, one five-day episode scores 5, while five one-day episodes score 125.

For an absence-cost estimate, keep the employee's normal weekly earnings, qualifying days, enhanced company sick pay and any cover or overtime costs separate from the Bradford score. The [SSP calculator](/ssp-calculator/) can model statutory sick pay, while the [company sick pay calculator](/sick-pay-calculator/) compares SSP with enhanced policies. Do not infer a pound cost from a threshold band alone.`,
    },
    {
      heading: "What should count as an absence episode?",
      body: `The policy should define whether D counts scheduled working days, calendar days, shifts or part-days. Most implementations use **working time actually missed**, excluding rest days that the employee was not due to work. A four-day sickness spanning a weekend may therefore contain two lost working days but remain one continuous episode.

Planned annual leave, authorised family leave, jury service and other non-sickness leave should not be silently mixed into the score. A fit note supports sickness absence but does not by itself decide whether an episode is included. Keep the raw absence record separate so adjustments do not erase the underlying facts.`,
    },
    {
      heading: "Disability, pregnancy and other edge cases",
      body: `Acas says employers should consider recording pregnancy-related and disability-related absence separately. Under the Equality Act 2010, reasonable adjustments for a disabled employee can include ignoring some disability-related absence, increasing a review trigger or using a different process. The correct adjustment is individual, not a blanket rule.

Pregnancy-related sickness must not lead to unlawful unfavourable treatment. Long-term conditions, treatment schedules and mental health episodes can also create high frequency scores without misconduct. Occupational health advice may help, but consent, confidentiality and the employee's explanation still matter. Never assume a high score removes the need to investigate and support.`,
    },
    {
      heading: "Fair process, consistency and data handling",
      body: `A defensible process starts with a written policy, accurate records and the same calculation window for comparable employees. Managers should verify dates with the employee, hold a return-to-work or review meeting, explore causes and support, and record why any action is proportionate. Acas describes trigger points as prompts for review when used appropriately.

Sickness details can reveal health information, which requires careful access controls and retention under data-protection rules. Share the score only with people who need it. Audit changes to episodes and exclusions so the result can be explained, corrected and distinguished from the separate managerial decision.`,
    },
    {
      heading: "Summary: calculate the score, then review the context",
      body: `Choose the policy period, add one row per separate sickness episode and check the working days lost. The calculator counts episodes as S, totals days as D and returns **S² × D**. If an episode is duplicated or one continuous spell is split, the squared frequency can distort the result sharply.

Compare the score only with the employer's published non-statutory bands. Before any decision, check protected and disability-related absence, reasonable adjustments, record accuracy and the employee's explanation. The calculator measures frequency and duration; it does not decide fairness, capability or conduct.`,
    },
  ],
  faq: [
    {
      question: "What is the Bradford Factor formula?",
      answer:
        "The formula is S² × D, where S is the number of separate absence episodes and D is the total working days absent in the chosen period.",
    },
    {
      question: "What counts as one absence episode?",
      answer:
        "One episode is normally one continuous spell of sickness. Non-working days inside a continuing spell do not necessarily split it, so follow the employer's written definition.",
    },
    {
      question: "What is a bad Bradford Factor score?",
      answer:
        "There is no legal or universal bad score. Employers set their own review points, and crossing one should trigger a contextual review rather than an automatic sanction.",
    },
    {
      question: "What score do three absences totalling seven days produce?",
      answer:
        "Three episodes and seven total days produce 3² × 7 = 63, assuming all three episodes fall inside the same measurement period and are included by the policy.",
    },
    {
      question: "Should disability-related absence be included?",
      answer:
        "Not automatically. Acas says reasonable adjustments can include excluding some disability-related absence or changing trigger points, depending on the individual circumstances.",
    },
    {
      question: "Can pregnancy-related sickness trigger a Bradford review?",
      answer:
        "Employers should record pregnancy-related sickness separately and must not treat an employee unfavourably because of pregnancy-related illness. Get HR or legal advice before relying on a score.",
    },
    {
      question: "Is the Bradford Factor required by UK law?",
      answer:
        "No. It is a non-statutory management tool. Employment law still requires a fair process, non-discrimination and reasonable adjustments where applicable.",
    },
    {
      question: "Does the Bradford Factor calculate SSP or absence cost?",
      answer:
        "No. It calculates S² × D from absence episodes. Use the SSP or company sick pay calculators for statutory or enhanced-pay estimates, and assess cover and overtime costs separately.",
    },
  ],
  relatedSlugs: ["ssp-calculator", "sick-pay-calculator", "ssp-vs-company-sick-pay", "employee-cost-calculator", "annual-leave-calculator"],
});
