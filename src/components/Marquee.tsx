import dynamic from "next/dynamic";

export const Marquee = dynamic<{
  direction: string;
  childMargin: number;
  speed: number;
  delay: number;
}>(import("react-double-marquee"), { ssr: false });
