import { lastUpdated, taxYearLabel } from "@/data/rates";

// Site-wide reviewer defaults — E-E-A-T signals.
// Override per page by passing props.
const DEFAULT_REVIEWER = "James Sheridan";
const DEFAULT_CREDENTIAL = "CIPP-qualified payroll specialist";

interface Props {
  reviewer?: string;
  credential?: string;
  verifiedDate?: string;
}

export default function ReviewedByByline({ reviewer, credential, verifiedDate }: Props) {
  const name = reviewer ?? DEFAULT_REVIEWER;
  const cred = credential ?? DEFAULT_CREDENTIAL;
  const verified = verifiedDate ?? `${lastUpdated} (${taxYearLabel} rates)`;
  return (
    <p className="text-sm text-ink/60">
      Reviewed by <span className="font-medium text-ink/80">{name}</span>, {cred} · Last verified{" "}
      <time>{verified}</time>
    </p>
  );
}
