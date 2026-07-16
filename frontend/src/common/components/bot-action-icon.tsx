interface BotActionIconProps {
  className?: string
}

/**
 * Minimal eye icon for bot view action.
 */
export function BotViewIcon({ className }: BotActionIconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.5 9s2.75-4.5 7.5-4.5S16.5 9 16.5 9s-2.75 4.5-7.5 4.5S1.5 9 1.5 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/**
 * Minimal book icon for knowledge base action.
 */
export function BotKnowledgeIcon({ className }: BotActionIconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3.75h4.5a1.5 1.5 0 0 1 1.5 1.5V15L7.5 13.125 3 15V3.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 3.75H15a1.5 1.5 0 0 1 1.5 1.5V15l-4.5-1.875-1.5-.75V5.25a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Minimal pencil icon for edit bot action.
 */
export function BotEditIcon({ className }: BotActionIconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12.75 2.25 15.75 5.25 6 15H3v-3L12.75 2.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 4.5 13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
