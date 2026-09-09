import React from 'react';

export const AmazonIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <path
      d="M8.2 15.8c.9.7 2.1 1.1 3.5 1.1 2.6 0 4.4-1.6 4.4-4.2V9.4c-.7-.4-1.5-.6-2.5-.6-2.4 0-3.8 1.2-3.8 3.1 0 1.2.7 2 1.8 2 .9 0 1.7-.5 2.1-1.4v-1.1c-.4-.2-.8-.3-1.3-.3-.8 0-1.3.3-1.3.9 0 .4.3.7.8.7.7 0 1.3-.5 1.8-1.4v1.4c-.3 1-1 1.6-2 1.6-1.1 0-1.9-.8-1.9-2.1 0-1.7 1.3-2.9 3.7-2.9 1 0 1.9.2 2.7.6v4.7c0 1-.2 1.7-.7 2.2-.7.8-1.8 1.2-3.3 1.2-1.5 0-2.8-.5-3.9-1.4l-.1-.1Z"
      fill="currentColor"
    />
    <path
      d="M5.2 18.2c3.4 2.2 7.8 2.8 11.7 1.2 1-.4 1.9-.9 2.7-1.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="m17.8 17.7 1.8.1-.4 1.7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);