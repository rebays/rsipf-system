import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Seal({ className, ...rest }: ComponentProps<"svg">) {
  return (
    <svg
      className={cn("hero__seal", className)}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <linearGradient id="sealGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#102b4f" />
          <stop offset="100%" stopColor="#0a1f3a" />
        </linearGradient>
      </defs>
      <path
        d="M100 6 L186 32 V112 C186 168 148 198 100 214 C52 198 14 168 14 112 V32 Z"
        fill="url(#sealGrad)"
        stroke="#c9a961"
        strokeWidth="2"
      />
      <path
        d="M100 22 L172 44 V112 C172 158 142 184 100 196 C58 184 28 158 28 112 V44 Z"
        fill="none"
        stroke="#c9a961"
        strokeWidth="0.8"
        opacity=".6"
      />
      <text
        x="100"
        y="80"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#c9a961"
        letterSpacing="2"
      >
        ★ RECRUITS ★
      </text>
      <path d="M100 92 L100 138" stroke="#c9a961" strokeWidth="1.2" />
      <path d="M76 110 L124 110" stroke="#c9a961" strokeWidth="1.2" />
      <circle cx="100" cy="115" r="14" fill="none" stroke="#c9a961" strokeWidth="1.4" />
      <path
        d="M93 115 L98 120 L108 110"
        stroke="#c9a961"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="100"
        y="158"
        textAnchor="middle"
        fontFamily="Public Sans"
        fontWeight="700"
        fontSize="11"
        fill="#c9a961"
        letterSpacing="3"
      >
        SERVE
      </text>
      <text
        x="100"
        y="174"
        textAnchor="middle"
        fontFamily="Public Sans"
        fontWeight="700"
        fontSize="11"
        fill="#c9a961"
        letterSpacing="3"
      >
        PROTECT
      </text>
      <text
        x="100"
        y="190"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="7"
        fill="#c9a961"
        opacity=".7"
        letterSpacing="2"
      >
        EST. SENTINEL DS · v1.0
      </text>
    </svg>
  );
}
