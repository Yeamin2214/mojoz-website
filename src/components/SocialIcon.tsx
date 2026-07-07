export type SocialName = "twitter" | "instagram" | "linkedin" | "threads";

interface SocialIconProps {
  name: SocialName;
  size?: number;
  className?: string;
}

const paths: Record<SocialName, React.ReactNode> = {
  twitter: (
    <path d="M22 5.9c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.7-2.2 8 8 0 0 1-2.5 1 4 4 0 0 0-6.9 3.6A11.4 11.4 0 0 1 3.2 4.6a4 4 0 0 0 1.2 5.3 4 4 0 0 1-1.8-.5 4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A11.5 11.5 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5A8.1 8.1 0 0 0 22 5.9Z" />
  ),
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
      <path d="M7.5 10.5v6M7.5 7.7v.01M12 16.5v-3.6c0-1.3.9-2.4 2.2-2.4 1.3 0 2.3 1 2.3 2.4v3.6" />
    </>
  ),
  threads: (
    <path d="M12 2C6.9 2 3.2 5.7 3.2 12c0 6 3.7 10 8.8 10 3.9 0 6.7-2 7.6-5.2l-2-.6c-.6 2.1-2.3 3.4-4.9 3.4-3.2 0-5.2-1.9-6.1-4.8 1.2.6 2.6.9 4 .9 3.4 0 6-1.7 6-4.6 0-2.6-2.1-4.3-5-4.3-2.1 0-3.7.8-4.7 2.1.3-2.1 2-3.5 4.6-3.5 1.7 0 3.1.6 4 1.6l1.6-1.3C16.9 2.9 14.7 2 12 2Zm-.4 8.6c1.7 0 2.8.8 2.8 2 0 1.3-1.4 2.2-3.3 2.2-1.1 0-2.2-.2-3.2-.7.4-2.3 1.9-3.5 3.7-3.5Z" />
  ),
};

export function SocialIcon({ name, size = 18, className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
