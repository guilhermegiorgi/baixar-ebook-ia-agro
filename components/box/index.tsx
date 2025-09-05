import clsx from "clsx"
import type { PropsWithChildren } from "react"
import { ThemeSwitcher } from "../switch-theme"

export function WaitlistWrapper({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "w-full mx-auto flex flex-col bg-gray-1/85 pb-0 rounded-2xl",
        "shadow-[0px_170px_48px_0px_rgba(18,_18,_19,_0.00),_0px_109px_44px_0px_rgba(18,_18,_19,_0.01),_0px_61px_37px_0px_rgba(18,_18,_19,_0.05),_0px_27px_27px_0px_rgba(18,_18,_19,_0.09),_0px_7px_15px_0px_rgba(18,_18,_19,_0.10)]",
        className
      )}
    >
      {/* Container central controlado — evita “corte” nas laterais */}
      <div className="w-full max-w-[1080px] mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col gap-6">{children}</div>
      </div>

      <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-sm bg-gray-12/[.07]">
        <p className="text-xs text-slate-10">© 2025 Guilherme Giorgi - Agricultura Digital e IA</p>
        <ThemeSwitcher />
      </footer>
    </div>
  )
}
