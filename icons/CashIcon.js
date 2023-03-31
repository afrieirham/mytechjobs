import { Icon } from "@chakra-ui/react";

export default function CashIcon(props) {
  return (
    <Icon
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <rect x="7" y="9" width="14" height="10" rx="2" />
      <circle cx="14" cy="14" r="2" />
      <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
    </Icon>
  );
}
