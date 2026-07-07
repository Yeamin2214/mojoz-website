interface GummiConeProps {
  scoop: string;
  className?: string;
}

/**
 * A stylised illustration of the Mojoz GummiCone used as a placeholder for
 * real product photography (which could not be extracted from the source
 * .fig file). Swap the <GummiCone /> usages for <Image> once real assets
 * are available — see the README for details.
 */
export default function GummiCone({ scoop, className }: GummiConeProps) {
  return (
    <svg
      viewBox="0 0 220 320"
      className={className}
      role="img"
      aria-label="Illustration of a gummi ice cream cone"
    >
      <defs>
        <linearGradient id={`scoop-${scoop}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={scoop} stopOpacity="1" />
          <stop offset="100%" stopColor={scoop} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      {/* cone */}
      <path
        d="M60 150 L110 300 L160 150 Z"
        fill="#E8B978"
        stroke="#C89454"
        strokeWidth="2"
      />
      {/* waffle texture */}
      <g stroke="#C89454" strokeWidth="1.5" opacity="0.6">
        <path d="M72 175 L148 175" />
        <path d="M80 200 L140 200" />
        <path d="M88 225 L132 225" />
        <path d="M96 250 L124 250" />
        <path d="M104 275 L116 275" />
      </g>
      {/* scoop blobs */}
      <circle cx="110" cy="140" r="58" fill={`url(#scoop-${scoop})`} />
      <circle cx="72" cy="120" r="34" fill={`url(#scoop-${scoop})`} />
      <circle cx="150" cy="118" r="30" fill={`url(#scoop-${scoop})`} />
      <circle cx="110" cy="90" r="30" fill={`url(#scoop-${scoop})`} />
      {/* gummy shine */}
      <ellipse cx="88" cy="95" rx="14" ry="9" fill="white" opacity="0.35" />
    </svg>
  );
}
