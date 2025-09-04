import type React from "react"
import { ThemeProvider } from "next-themes"
import type { Settings } from "@/basehub"

export function Providers({
  children,
  defaultTheme,
  forcedTheme,
}: {
  children: React.ReactNode
  defaultTheme: Settings["defaultTheme"]
  forcedTheme: Settings["forcedTheme"]
}) {
  return (
    <ThemeProvider
      enableSystem
      disableTransitionOnChange
      attribute="class"
      defaultTheme={defaultTheme || "dark"}
      forcedTheme={forcedTheme || undefined}
    >
      {children}
    </ThemeProvider>
  )
}
