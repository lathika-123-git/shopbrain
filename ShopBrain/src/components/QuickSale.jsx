import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const QuickSale = ({ products, addSale, updateProductStock }) => {
  const { t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("Tap microphone to dictate sale...");
  const [parsedItems, setParsedItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  const simulateDictation = (text) => {
    setTranscript(`"${text}"`);
    parseSpeech(text);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTranscript("Listening... Speak now (e.g., '2 milk, 1 biscuit sold')");
      setTimeout(() => {
        setIsRecording(false);
        simulateDictation("2 milk, 1 biscuit sold");
      }, 3000);
    }
  };

  const parseSpeech = (phrase) => {
    const text = phrase.toLowerCase();
    const results = [];
    let sum = 0;

    const patterns = [
      { regex: /(\d+)\s*(milk|दूध|பால்)/, id: "1001" },
      { regex: /(\d+)\s*(biscuit|बिस्कुट|பிஸ்கட்)/, id: "1002" },
      { regex: /(\d+)\s*(atta|आटा|மாவு)/, id: "1003" },
      { regex: /(\d+)\s*(bread|ब्रेड|ரொட்டி)/, id: "1006" }
    ];

    patterns.forEach(pat => {
      const match = text.match(pat.regex);
      if (match) {
        const qty = parseInt(match[1]);
        const prod = products.find(p => p.id === pat.id);
        if (prod && prod.stock >= qty) {
          const tot = qty * prod.sellingPrice;
          results.push({
            id: prod.id,
            name: prod.name,
            qty,
            price: prod.sellingPrice,
            purchasePrice: prod.purchasePrice,
            total: tot
          });
          sum += tot;
        }
      }
    });

    setParsedItems(results);
    setTotalSum(sum);
  };

  const handleConfirmSale = () => {
    if (parsedItems.length === 0) return;

    let totalProfit = 0;
    parsedItems.forEach(item => {
      totalProfit += (item.price - item.purchasePrice) * item.qty;
      updateProductStock(item.id, Math.max(0, item.price - item.qty));
    });

    const billObj = {
      id: `SB-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      items: parsedItems,
      subtotal: totalSum,
      tax: Math.round(totalSum * 0.18),
      discount: 0,
      grandTotal: totalSum,
      profit: Math.round(totalProfit),
      paymentMethod: "Cash",
      customer: "Walk-in"
    };

    addSale(billObj);
    alert(`Voice Sale Confirmed! Bill total: ₹${totalSum}`);
    setParsedItems([]);
    setTranscript("Tap microphone to dictate sale...");
  };

  return (
    <div className="view-app">
      <div className="card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h2 style={{ textAlign: 'center' }}>{t('voice_fast_counter')}</h2>
        <p style={{ textAlign: 'center', color: 'var(--slate-medium)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
          Dictate items to record sales instantly. Designed for quick mobile counters!
        </p>

        <button
          className={`voice-mic-btn ${isRecording ? 'recording' : ''}`}
          onClick={toggleRecording}
        >
          🎙️
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--slate-medium)', marginBottom: '1rem' }}>
          {isRecording ? 'Recording... Speak item details.' : 'Tap microphone button'}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label className="form-label">Example Prompts:</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-success" style={{ cursor: 'pointer' }} onClick={() => simulateDictation("2 milk, 1 biscuit sold")}>
              “2 milk, 1 biscuit sold”
            </span>
            <span className="badge badge-success" style={{ cursor: 'pointer' }} onClick={() => simulateDictation("Morning sales: 20 milk, 15 biscuit and 10 bread sold")}>
              “20 milk, 15 biscuit, 10 bread sold”
            </span>
          </div>
        </div>

        <div style={{ background: 'var(--bg-light)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem', textAlign: 'center', fontStyle: 'italic', marginBottom: '1.5rem' }}>
          {transcript}
        </div>

        {parsedItems.length > 0 && (
          <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
            <h4 style={{ marginBottom: '0.75rem' }}>Detected Items</h4>
            <div className="table-responsive" style={{ marginBottom: '1rem' }}>
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedItems.map(item => (
                    <tr key={item.id}>
                      <td><strong>{item.name}</strong></td>
                      <td>{item.qty}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem' }}>
              <span>Total Revenue:</span>
              <span>₹{totalSum}</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setParsedItems([])}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleConfirmSale}>Confirm Sale</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
