"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return (
    <Button variant="ghost" size="icon" onClick={onToggle} className="rounded-full">
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  )
}
