interface Props {
  reviewer?: string;
  credential?: string;
  verifiedDate?: string;
}

export default function ReviewedByByline({ reviewer, credential, verifiedDate }: Props) {
  const name = reviewer ?? "[PLACEHOLDER — reviewer pending]";
  const cred = credential ?? "[PLACEHOLDER — credential pending]";
  const verified = verifiedDate ?? "[PLACEHOLDER — date pending]";
  return (
    <p className="text-sm text-ink/60">
      Reviewed by <span className="font-medium text-ink/80">{name}</span>, {cred} · Last verified{" "}
      <time>{verified}</time>
    </p>
  );
}
