import Image from "next/image";
import { cn } from "cn";

/**
 * The Hemta brand mark: the actual knot icon render (public/brand/app-icon.png),
 * used in the nav and footer next to the wordmark.
 */
export function AppIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/app-icon.png"
      alt=""
      width={56}
      height={56}
      className={cn("select-none", className)}
    />
  );
}
