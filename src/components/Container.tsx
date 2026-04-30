import { cn } from "@/lib/utils"

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("max-w-6xl w-full mx-auto px-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
