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
