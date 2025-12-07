"use client"

import { useState, useEffect } from "react"
import { Home, Settings } from "lucide-react"
import HomeScreen from "@/components/home-screen"
import ChatScreen from "@/components/chat-screen"
import SettingsScreen from "@/components/settings-screen"
import ThemeToggle from "@/components/theme-toggle"

export default function Page() {
  const [currentTab, setCurrentTab] = useState<"home" | "chatgpt" | "gemini" | "perplexity" | "settings">("home")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-bold">AI Hub 3X</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentTab === "home" && <HomeScreen onSelectModel={(model) => setCurrentTab(model as any)} />}
        {currentTab === "chatgpt" && <ChatScreen model="chatgpt" onBack={() => setCurrentTab("home")} />}
        {currentTab === "gemini" && <ChatScreen model="gemini" onBack={() => setCurrentTab("home")} />}
        {currentTab === "perplexity" && <ChatScreen model="perplexity" onBack={() => setCurrentTab("home")} />}
        {currentTab === "settings" && <SettingsScreen />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t border-border px-4 py-2 flex justify-around">
        <NavButton icon={Home} label="Home" active={currentTab === "home"} onClick={() => setCurrentTab("home")} />
        <NavButton label="ChatGPT" active={currentTab === "chatgpt"} onClick={() => setCurrentTab("chatgpt")} />
        <NavButton label="Gemini" active={currentTab === "gemini"} onClick={() => setCurrentTab("gemini")} />
        <NavButton
          label="Perplexity"
          active={currentTab === "perplexity"}
          onClick={() => setCurrentTab("perplexity")}
        />
        <NavButton
          icon={Settings}
          label="Settings"
          active={currentTab === "settings"}
          onClick={() => setCurrentTab("settings")}
        />
      </nav>
    </div>
  )
}

function NavButton({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {Icon && <Icon size={20} />}
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}
