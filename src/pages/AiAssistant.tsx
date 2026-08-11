import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import './AiAssistant.css';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am FitAI. I can help you with health, food, and exercise advice. What would you like to know today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: getMockResponse(userMsg.text) 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getMockResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes('food') || q.includes('eat') || q.includes('diet')) {
      return 'For optimal recovery, try a high-protein meal within 30 minutes of your workout. Grilled chicken with quinoa or a plant-based protein shake are excellent choices!';
    } else if (q.includes('weight') || q.includes('lose') || q.includes('fat')) {
      return 'Weight loss is about a consistent caloric deficit combined with strength training and aerobic exercise. Have you tried our Evening Fat Burn routine?';
    } else if (q.includes('sore') || q.includes('pain') || q.includes('injury')) {
      return 'If you are experiencing sharp pain, please consult a medical professional. For general soreness, active recovery like light walking and our Flexibility routines can help.';
    } else {
      return 'That is a great question! As your personal AI trainer, I recommend staying hydrated, getting 8 hours of sleep, and sticking to your scheduled routines for the best results.';
    }
  };

  return (
    <div className="ai-container">
      <header className="ai-header">
        <h1>FitAI Assistant</h1>
        <p className="text-secondary">Your personal health and fitness expert.</p>
      </header>
      
      <div className="chat-window glass-panel">
        <div className="messages-area">
          {messages.map(msg => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              <div className="message-icon">
                {msg.sender === 'ai' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            value={input}
            onChange={e => setInput(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="btn btn-primary" style={{borderRadius: '12px'}}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
