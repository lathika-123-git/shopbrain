import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const AIAssistant = ({ products, customers, speakText }) => {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your ShopBrain AI Assistant. Ask me anything about your stock, margins, forecasts, or customer credits!' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');

    setTimeout(() => {
      const aiReply = generateReply(userText);
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
      speakText(aiReply);
    }, 600);
  };

  const generateReply = (query) => {
    const q = query.toLowerCase();

    if (q.includes("stock") || q.includes("இருக்கு") || q.includes("स्टॉक")) {
      const low = products.filter(p => p.stock <= p.threshold).map(p => p.name).join(", ");
      if (lang === 'ta') return `இருப்பு எச்சரிக்கை: தற்சமயம் ${low || "அனைத்து பொருட்களும் இருப்பு உள்ளன"} இருப்பு குறைவாக உள்ளது.`;
      if (lang === 'hi') return `स्टॉक चेतावनी: आपके पास ${low || "सभी सामान पर्याप्त हैं"} का स्टॉक कम है।`;
      return `Stock Warning: Currently, ${low || "all items are safe"} are running below warning thresholds.`;
    }

    if (q.includes("tomorrow") || q.includes("நாளைக்கு") || q.includes("कल")) {
      if (lang === 'ta') return "நாளை தேவைக்காக பால் (Milk) 25 பாக்கெட்டுகள் மற்றும் பிரெட் (Bread) 15 பாக்கெட்டுகள் வாங்கவும்.";
      return "Based on velocity, buy 25 packets of Milk and 15 loaves of Bread tomorrow.";
    }

    if (q.includes("credit") || q.includes("balance") || q.includes("கடன்")) {
      const owes = customers.filter(c => c.credit > 0).map(c => `${c.name}: ₹${c.credit}`).join(", ");
      return `Outstanding customer balances: ${owes || "No balances pending."}`;
    }

    return "I analyzed your query. You can view detailed stock predictions, profits, and customer credit ledgers in the sidebar menu.";
  };

  const askPrompt = (phrase) => {
    setInputVal(phrase);
    setTimeout(handleSend, 100);
  };

  return (
    <div className="view-app">
      <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Suggested Prompts */}
        <div className="card">
          <h3 style={{ color: 'var(--ai-purple)', marginBottom: '0.5rem' }}>💬 Suggested Queries</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--slate-medium)', marginBottom: '0.75rem' }}>Click template prompts to query AI:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="btn btn-outline btn-sm" style={{ textAlign: 'left', justifyContent: 'flex-start' }} onClick={() => askPrompt('What stock is available? / என்ன stock இருக்கு?')}>What stock is available? / என்ன stock இருக்கு?</button>
            <button className="btn btn-outline btn-sm" style={{ textAlign: 'left', justifyContent: 'flex-start' }} onClick={() => askPrompt('What should I buy tomorrow? / நாளைக்கு என்ன வாங்கணும்?')}>What should I buy tomorrow? / நாளைக்கு என்ன வாங்கணும்?</button>
            <button className="btn btn-outline btn-sm" style={{ textAlign: 'left', justifyContent: 'flex-start' }} onClick={() => askPrompt('Which product is selling fastest?')}>Which product is selling fastest?</button>
            <button className="btn btn-outline btn-sm" style={{ textAlign: 'left', justifyContent: 'flex-start' }} onClick={() => askPrompt('Who owes outstanding balance? / credit list')}>Who owes credit balance?</button>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '500px', border: '1px solid var(--ai-purple-border)', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: 'var(--ai-purple)' }}>✨ ShopBrain AI Assistant</span>
            <span className="badge badge-ai">UI: {lang.toUpperCase()}</span>
          </div>

          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-light)',
                  color: msg.sender === 'user' ? 'white' : 'var(--dark-navy)',
                  border: msg.sender === 'ai' ? '1px solid var(--border-color)' : 'none'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Ask question in Tamil, Hindi, English..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button className="btn btn-ai" onClick={handleSend}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
