"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomeScreen({ onSelectModel }: { onSelectModel: (model: string) => void }) {
  const models = [
    {
      id: "chatgpt",
      name: "ChatGPT",
      description: "Advanced AI assistant",
      icon: "🤖",
    },
    {
      id: "gemini",
      name: "Gemini",
      description: "Google's AI model",
      icon: "✨",
    },
    {
      id: "perplexity",
      name: "Perplexity",
      description: "Research assistant",
      icon: "🔍",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 gap-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome to AI Hub</h2>
        <p className="text-muted-foreground">Choose an AI model to start chatting</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {models.map((model) => (
          <Card
            key={model.id}
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center text-center gap-4 bg-card hover:bg-accent/10"
            onClick={() => onSelectModel(model.id)}
          >
            <div className="text-4xl">{model.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{model.name}</h3>
              <p className="text-sm text-muted-foreground">{model.description}</p>
            </div>
            <Button className="mt-2 w-full" variant="default">
              Chat Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
