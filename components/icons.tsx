import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const base = "h-6 w-6";

export function PoundSterlingIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 7c0-2.8-2.2-5-5-5s-5 2.2-5 5c0 2 1 3.5 2.5 4.5L8 17h8" />
      <path d="M6 21h12" />
      <path d="M10 13h6" />
    </svg>
  );
}

export function BanknoteIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 10v4M18 10v4" />
    </svg>
  );
}

export function CalculatorIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <rect x="7" y="6" width="10" height="3" rx="0.5" fill="currentColor" stroke="none" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01M16 17h.01" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <rect x="7" y="13" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

export function HeartPulseIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.5-1.5 3-3.5 3-6a4 4 0 0 0-7-2.7A4 4 0 0 0 8 8c0 2.5 1.5 4.5 3 6l1 1 1-1 6 0z" />
      <path d="M3 12h4l2-3 3 6 2-3h7" />
    </svg>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M6 7h12M6 21h12" />
      <path d="M3 11l3-4 3 4M15 11l3-4 3 4M3 11h6M15 11h6" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function CarIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14l-1.5-5h-11L5 17z" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...props} className={`${base} ${props.className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export const ICONS = {
  pound: PoundSterlingIcon,
  banknote: BanknoteIcon,
  calculator: CalculatorIcon,
  calendar: CalendarIcon,
  trending: TrendingUpIcon,
  heart: HeartPulseIcon,
  scale: ScaleIcon,
  briefcase: BriefcaseIcon,
  clock: ClockIcon,
  users: UsersIcon,
  car: CarIcon,
  alert: AlertIcon,
} as const;

export type IconKey = keyof typeof ICONS;