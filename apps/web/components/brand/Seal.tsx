import Image from "next/image";
import { cn } from "@/lib/cn";

type SealProps = {
  className?: string;
  alt?: string;
};

export function Seal({ className, alt = "Royal Solomon Islands Police Force emblem" }: SealProps) {
  return (
    <Image
      src="/rsipf-logo.png"
      alt={alt}
      width={200}
      height={220}
      priority
      className={cn("hero__seal", className)}
    />
  );
}
