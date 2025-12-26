import Link from "next/link";
import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  const LOGO_TEXT = {
    firstPart: "Pixel",
    secondPart: "Flow-AI",
  } as const;

  return (
    <Link
      href="/"
      className={`flex-1 flex items-center gap-1 text-2xl ${className}`}
      aria-label={`${LOGO_TEXT.firstPart}${LOGO_TEXT.secondPart} - Go to homepage`}
      title="Go to homepage"
      rel="home"
      prefetch={true}
    >
      <span className="inline-block font-extrabold text-primary">
        {LOGO_TEXT.firstPart}
      </span>
      <span className="font-semibold text-foreground">
        {LOGO_TEXT.secondPart}
      </span>
    </Link>
  );
};

export default Logo;