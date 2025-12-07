"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsScreen() {
  const [apiKeys, setApiKeys] = useState({
    chatgpt_api_key: "",
    gemini_api_key: "",
    perplexity_api_key: "",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load API keys from localStorage
    const saved = {
      chatgpt_api_key: localStorage.getItem("chatgpt_api_key") || "",
      gemini_api_key: localStorage.getItem("gemini_api_key") || "",
      perplexity_api_key: localStorage.getItem("perplexity_api_key") || "",
    }
    setApiKeys(saved)
  }, [])

  const handleSaveKeys = () => {
    Object.entries(apiKeys).forEach(([key, value]) => {
      localStorage.setItem(key, value)
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClearKey = (key: keyof typeof apiKeys) => {
    setApiKeys((prev) => ({ ...prev, [key]: "" }))
    localStorage.removeItem(key)
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Settings</h2>
          <p className="text-muted-foreground">Configure your API keys for each AI model</p>
        </div>

        <Card className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">ChatGPT API Key</label>
            <input
              type="password"
              value={apiKeys.chatgpt_api_key}
              onChange={(e) => setApiKeys((prev) => ({ ...prev, chatgpt_api_key: e.target.value }))}
              placeholder="sk-..."
              className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
            />
            {apiKeys.chatgpt_api_key && (
              <Button variant="outline" onClick={() => handleClearKey("chatgpt_api_key")} className="text-xs">
                Clear
              </Button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gemini API Key</label>
            <input
              type="password"
              value={apiKeys.gemini_api_key}
              onChange={(e) => setApiKeys((prev) => ({ ...prev, gemini_api_key: e.target.value }))}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
            />
            {apiKeys.gemini_api_key && (
              <Button variant="outline" onClick={() => handleClearKey("gemini_api_key")} className="text-xs">
                Clear
              </Button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Perplexity API Key</label>
            <input
              type="password"
              value={apiKeys.perplexity_api_key}
              onChange={(e) => setApiKeys((prev) => ({ ...prev, perplexity_api_key: e.target.value }))}
              placeholder="Enter your Perplexity API key"
              className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-2"
            />
            {apiKeys.perplexity_api_key && (
              <Button variant="outline" onClick={() => handleClearKey("perplexity_api_key")} className="text-xs">
                Clear
              </Button>
            )}
          </div>

          <Button onClick={handleSaveKeys} className="w-full">
            {saved ? "✓ Saved!" : "Save API Keys"}
          </Button>
        </Card>

        <Card className="p-4 bg-muted">
          <p className="text-sm text-muted-foreground">
            💡 Your API keys are stored locally in your browser and never sent to our servers. You can manage them here
            anytime.
          </p>
        </Card>
      </div>
    </div>
  )
}
