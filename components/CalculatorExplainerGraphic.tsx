import type { IntroVisual } from "@/content/types";

export type InfographicMetadata = {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  caption: string;
  note: string;
  width: number;
  height: number;
};

export const infographicByType: Record<IntroVisual, InfographicMetadata> = {
  companyCarBikBands: {
    desktopSrc: "/images/infographics/company-car-bik-rates-2026-27.svg",
    mobileSrc: "/images/infographics/company-car-bik-rates-2026-27-mobile.svg",
    alt: "Illustrative 2026/27 company-car benefit-in-kind rates by CO₂ band: electric 4%, PHEV 4–16%, petrol 30%, and high-emission cars 37%.",
    caption: "CO₂ emissions and company-car BIK rates",
    note: "2026/27 illustrative bands. PHEV rates depend on its approved electric range.",
    width: 720,
    height: 300,
  },
  employeeCostStack: {
    desktopSrc: "/images/infographics/employee-cost-breakdown-30000-2026-27.svg",
    mobileSrc: "/images/infographics/employee-cost-breakdown-30000-2026-27-mobile.svg",
    alt: "A £30,000 salary plus £3,750 employer National Insurance and £712.80 employer pension totals £34,462.80 in annual employment cost.",
    caption: "The statutory cost of a £30,000 employee",
    note: "Standard employee, before Employment Allowance and any extra annual costs.",
    width: 720,
    height: 230,
  },
  workplacePensionBasis: {
    desktopSrc: "/images/infographics/workplace-pension-qualifying-earnings-2026-27.svg",
    mobileSrc: "/images/infographics/workplace-pension-qualifying-earnings-2026-27-mobile.svg",
    alt: "On a £35,000 salary, minimum workplace-pension contributions are £2,300.80 on £28,760 qualifying earnings, compared with £2,800 on total earnings.",
    caption: "Qualifying earnings versus total salary",
    note: "£35,000 annual salary example at the 3% employer and 5% employee minimums.",
    width: 720,
    height: 254,
  },
  sspPaymentProcess: {
    desktopSrc: "/images/infographics/ssp-payment-process-2026-27.svg",
    mobileSrc: "/images/infographics/ssp-payment-process-2026-27-mobile.svg",
    alt: "2026/27 Statutory Sick Pay process: record a period of incapacity, check eligibility, calculate the daily rate, then pay from the first qualifying day for up to 28 weeks.",
    caption: "Statutory Sick Pay: from reported absence to payment",
    note: "Illustrative process. Check the employee's pattern, earnings and linked sickness periods before payroll.",
    width: 720,
    height: 280,
  },
  smpPaymentTimeline: {
    desktopSrc: "/images/infographics/smp-payment-timeline-2026-27.svg",
    mobileSrc: "/images/infographics/smp-payment-timeline-2026-27-mobile.svg",
    alt: "2026/27 Statutory Maternity Pay timeline: qualifying week, eligibility checks, six weeks at 90% of average weekly earnings, then 33 weeks at the statutory rate or 90% of earnings if lower.",
    caption: "Statutory Maternity Pay: qualifying checks and 39-week payment timeline",
    note: "Illustrative schedule. Payroll must use the actual statutory earnings reference period and evidence.",
    width: 720,
    height: 280,
  },
  annualLeaveAccrualProcess: {
    desktopSrc: "/images/infographics/annual-leave-accrual-process.svg",
    mobileSrc: "/images/infographics/annual-leave-accrual-process-mobile.svg",
    alt: "Annual leave process: start the leave year, set statutory or contractual entitlement, track accrual, then deduct taken and booked leave and check carry-over.",
    caption: "Annual leave: entitlement, accrual and balance process",
    note: "Use the employer's leave year and contract; statutory leave continues to accrue during sickness and family leave.",
    width: 720,
    height: 280,
  },
  companySickPayProcess: {
    desktopSrc: "/images/infographics/company-sick-pay-process.svg",
    mobileSrc: "/images/infographics/company-sick-pay-process-mobile.svg",
    alt: "Company sick-pay payroll process: record absence, check the Statutory Sick Pay floor, apply the contractual sick-pay policy, then process payment and return-to-work actions.",
    caption: "Company sick pay: absence-to-payroll process",
    note: "Illustrative process. The employment contract determines any enhanced full-pay or half-pay stages.",
    width: 720,
    height: 280,
  },
  nationalInsuranceThresholds: {
    desktopSrc: "/images/infographics/national-insurance-thresholds-rates-2026-27.svg",
    mobileSrc: "/images/infographics/national-insurance-thresholds-rates-2026-27-mobile.svg",
    alt: "2026/27 National Insurance thresholds and rates: employee NI starts above £12,570 at 8% then 2% above £50,270; employer NI starts above £5,000 at 15%; self-employed Class 4 is 6% then 2% above £50,270.",
    caption: "National Insurance thresholds and rates for 2026/27",
    note: "Annual standard-rate figures. Employer NI has no upper limit; reduced categories can use a different threshold.",
    width: 720,
    height: 338,
  },
};

export default function CalculatorExplainerGraphic({ type }: { type: IntroVisual }) {
  const image = infographicByType[type];
  const captionId = `infographic-${type}-caption`;

  return (
    <figure className="not-prose rounded-xl border border-ink/10 bg-white p-5" aria-labelledby={captionId}>
      <figcaption id={captionId} className="text-sm font-semibold text-ink">
        {image.caption}
      </figcaption>
      <p className="mt-1 text-xs text-ink/60">{image.note}</p>
      <picture className="mt-4 block">
        <source media="(max-width: 639px)" srcSet={image.mobileSrc} />
        <img
          src={image.desktopSrc}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </picture>
    </figure>
  );
}
