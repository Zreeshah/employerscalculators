export type SourceStatus = "in-force" | "announced-pending-publication" | "reference";

/**
 * Evidence ledger for the teacher-pay pages. Keep data updates tied to a named
 * source and effective date. An announced award is never presented as a
 * statutory document until the jurisdiction publishes it.
 */
export interface TeacherPaySource {
  jurisdiction: "england" | "wales" | "scotland" | "england-wales";
  label: string;
  url: string;
  effectiveFrom: string;
  status: SourceStatus;
  checkedOn: string;
}

export const teacherPaySources: TeacherPaySource[] = [
  {
    jurisdiction: "england",
    label: "Department for Education: School teachers’ pay and conditions 2026",
    url: "https://www.gov.uk/government/publications/school-teachers-pay-and-conditions",
    effectiveFrom: "2026-09-01",
    status: "in-force",
    checkedOn: "2026-10-19",
  },
  {
    jurisdiction: "england",
    label: "NEU England pay scales 2026/27 (published scale reference)",
    url: "https://neu.org.uk/advice/your-rights-work/pay/pay-scales/england-pay-scales",
    effectiveFrom: "2026-09-01",
    status: "reference",
    checkedOn: "2026-10-19",
  },
  {
    jurisdiction: "england-wales",
    label: "Teachers’ Pensions: calculating contributions",
    url: "https://www.teacherspensions.co.uk/employers/managing-members/contributions/calculating-contributions.aspx",
    effectiveFrom: "2026-04-01",
    status: "in-force",
    checkedOn: "2026-10-19",
  },
  {
    jurisdiction: "wales",
    label: "Welsh Government: teacher pay award 2026 to 2027",
    url: "https://www.gov.wales/written-statement-teacher-pay-award-2026-2027",
    effectiveFrom: "2026-09-01",
    status: "announced-pending-publication",
    checkedOn: "2026-10-19",
  },
  {
    jurisdiction: "scotland",
    label: "EIS current salary scales",
    url: "https://www.eis.org.uk/pay-and-conditions-of-service/salary-scales",
    effectiveFrom: "2026-08-01",
    status: "reference",
    checkedOn: "2026-10-19",
  },
  {
    jurisdiction: "scotland",
    label: "Scottish Public Pensions Agency: teacher pension contributions",
    url: "https://pensions.gov.scot/teachers/about-teachers-pensions/how-your-pension-works",
    effectiveFrom: "2026-04-01",
    status: "in-force",
    checkedOn: "2026-10-19",
  },
];
