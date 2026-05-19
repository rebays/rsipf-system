import Image from "next/image";
import { cn } from "@/lib/cn";

type ShieldProps = {
  className?: string;
  alt?: string;
};

export function Shield({ className, alt = "" }: ShieldProps) {
  return (
    <Image
      src="/rsipf-logo.png"
      alt={alt}
      width={36}
      height={40}
      priority
      className={cn("brandbar__shield", className)}
    />
  );
}
