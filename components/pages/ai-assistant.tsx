"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Sparkles, TrendingUp, Users, Mail, Calendar, FileText, Lightbulb } from "lucide-react"

const suggestedPrompts = [
  {
    icon: TrendingUp,
    title: "Summarize recent lead activity",
    description: "Get an overview of leads from the past week",
  },
  {
    icon: Users,
    title: "Recommend follow-up for pending deals",
    description: "AI suggestions for next steps on active deals",
  },
  {
    icon: Mail,
    title: "Generate email to re-engage cold lead",
    description: "Create personalized outreach templates",
  },
  {
    icon: Calendar,
    title: "Schedule optimization suggestions",
    description: "Optimize your calendar for maximum productivity",
  },
]

const chatHistory = [
  {
    id: 1,
    type: "user",
    message: "Can you summarize my deals that are in negotiation stage?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "assistant",
    message:
      "You currently have 3 deals in negotiation stage with a total value of $185,000:\n\n1. **Custom Development** - NextGen Tech ($85,000)\n   - Contact: Robert Johnson\n   - Close date: Jan 30, 2024\n   - Probability: 80%\n\n2. **Data Analytics Platform** - Smart Systems ($60,000)\n   - Contact: David Kim\n   - Close date: Feb 5, 2024\n   - Probability: 65%\n\n3. **Security Audit Service** - Digital Dynamics ($40,000)\n   - Contact: Lisa Park\n   - Close date: Feb 12, 2024\n   - Probability: 70%\n\n**Recommendations:**\n- Follow up with NextGen Tech this week as the close date is approaching\n- Send additional case studies to Smart Systems to increase confidence\n- Schedule a final presentation with Digital Dynamics",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    type: "user",
    message: "What should I prioritize today?",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    type: "assistant",
    message:
      "Based on your current pipeline and tasks, here are your top priorities for today:\n\n**🔥 High Priority:**\n1. Call NextGen Tech (Robert Johnson) - Deal closes in 2 days\n2. Send proposal follow-up to TechStart Inc. - $45K opportunity\n3. Prepare contract for Innovation Labs - High-value CRM deal\n\n**📋 Medium Priority:**\n4. Schedule demo with Global Solutions\n5. Research Smart Systems technical requirements\n\n**💡 Quick Wins:**\n6. Send thank you email to Future Corp\n7. Update deal stages in pipeline\n\nFocus on the high-priority items first - they have the biggest impact on your monthly targets!",
    timestamp: "10:36 AM",
  },
]

export function AIAssistant() {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
      setIsTyping(true)

      setTimeout(() => {
        setIsTyping(false)
      }, 2000)
    }
  }

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Assistant</h1>
          <p className="text-slate-600 mt-1">Get intelligent insights and recommendations for your sales activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            Online
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Chat Interface */}
        <Card className="xl:col-span-2 border-slate-200 order-2 xl:order-1">
          <CardHeader className="border-b border-slate-100 p-4 sm:p-6">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-slate-900">ArkCRM Assistant</h3>
                <p className="text-sm text-slate-500">Powered by AI • Always learning</p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[400px] sm:h-[500px] p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex gap-3 ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                    {chat.type === "assistant" && (
                      <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className={`max-w-[85%] sm:max-w-[80%] ${chat.type === "user" ? "order-1" : ""}`}>
                      <div
                        className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                          chat.type === "user" ? "bg-blue-500 text-white ml-auto" : "bg-slate-100 text-slate-900"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">{chat.message}</div>
                      </div>
                      <p className={`text-xs text-slate-500 mt-1 ${chat.type === "user" ? "text-right" : "text-left"}`}>
                        {chat.timestamp}
                      </p>
                    </div>

                    {chat.type === "user" && (
                      <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                        <AvatarFallback className="bg-slate-200 text-slate-700 text-sm">JD</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-100 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t border-slate-100 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about your sales data..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
                  disabled={!message.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions Panel */}
        <div className="space-y-4 sm:space-y-6 order-1 xl:order-2">
          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 text-left hover:bg-slate-50"
                  onClick={() => handlePromptClick(prompt.title)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <prompt.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-medium text-slate-900 text-sm line-clamp-2">{prompt.title}</p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{prompt.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-orange-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 text-sm mb-1">Deal Alert</h4>
                <p className="text-blue-700 text-xs leading-relaxed">
                  NextGen Tech deal closes in 2 days. Consider scheduling a final call.
                </p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 text-sm mb-1">Opportunity</h4>
                <p className="text-green-700 text-xs leading-relaxed">
                  3 warm leads haven't been contacted in 5+ days. Perfect time for follow-up.
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 text-sm mb-1">Performance</h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  You're 15% ahead of your monthly target. Great work!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Recent AI Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <FileText className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Generated follow-up email template</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <TrendingUp className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Analyzed pipeline performance</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Identified high-value prospects</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
