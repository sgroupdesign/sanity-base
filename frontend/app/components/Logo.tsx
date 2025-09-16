import { cn } from "@/lib/utils";

interface LogoProps {
  type: string;
}

export default function Logo(props: LogoProps) {
  const type = props.type;
  return (
    <div
      className={cn(
        "text-4xl font-semibold",
        type == "dark" ? "text-white" : "text-black"
      )}
    >
      Jumpkit
    </div>
  );
}
