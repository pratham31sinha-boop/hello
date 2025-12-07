import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, model, apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key not provided" }, { status: 400 })
    }

    let response

    if (model === "chatgpt") {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: message }],
          max_tokens: 1024,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.log("[v0] OpenAI error:", data)
        return NextResponse.json(
          {
            error: `ChatGPT Error: ${data.error?.message || "Unknown error"}. Check your API key and account quota.`,
          },
          { status: response.status },
        )
      }

      if (data.choices?.[0]?.message?.content) {
        return NextResponse.json({ response: data.choices[0].message.content })
      }
    } else if (model === "gemini") {
      response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
            generationConfig: {
              maxOutputTokens: 1024,
            },
          }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        console.log("[v0] Gemini error:", data)
        const errorMsg = data.error?.message || "Gemini API error"
        if (errorMsg.includes("quota") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
          return NextResponse.json(
            {
              error: `Gemini Error: Free tier quota exceeded. Visit https://makersuite.google.com/app/apikey to upgrade your plan or wait for quota reset.`,
            },
            { status: response.status },
          )
        }
        return NextResponse.json(
          {
            error: `Gemini Error: ${errorMsg}`,
          },
          { status: response.status },
        )
      }

      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return NextResponse.json({ response: data.candidates[0].content.parts[0].text })
      }
    } else if (model === "perplexity") {
      response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar-pro",
          messages: [{ role: "user", content: message }],
          max_tokens: 1024,
        }),
      })

      const contentType = response.headers.get("content-type")
      let data

      if (contentType?.includes("application/json")) {
        data = await response.json()
      } else {
        const text = await response.text()
        console.log("[v0] Perplexity non-JSON response:", text.slice(0, 200))
        data = { error: { message: "Invalid response from Perplexity API" } }
      }

      if (!response.ok) {
        console.log("[v0] Perplexity error (status " + response.status + "):", data)
        if (response.status === 401) {
          return NextResponse.json(
            {
              error: `Perplexity Error: Unauthorized (401). Your API key is invalid or expired. Get a valid key from https://www.perplexity.ai/settings/keys`,
            },
            { status: response.status },
          )
        }
        return NextResponse.json(
          {
            error: `Perplexity Error: ${data.error?.message || "Unknown error"}`,
          },
          { status: response.status },
        )
      }

      if (data.choices?.[0]?.message?.content) {
        return NextResponse.json({ response: data.choices[0].message.content })
      }
    }

    return NextResponse.json({ error: "Failed to get response from API" }, { status: 500 })
  } catch (error) {
    console.log("[v0] Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
