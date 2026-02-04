import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("azure");

  const handleExtract = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:8000/extract?provider=${provider}&raw_text=${encodeURIComponent(text)}`;
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert("Extraction failed. Check backend connection.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h2 style={{ margin: 0 }}>Electrical Retailer TechBench <span style={{fontWeight: 300}}>| AI Product Attribute Extractor</span></h2>
        <div>
          <label style={{ marginRight: '10px', fontSize: '14px' }}>Engine:</label>
          <select value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="azure">Azure GPT-4o</option>
            <option value="ollama">Local Llama 3</option>
          </select>
        </div>
      </div>

      <div className="card">
        <h3>1. Input Raw Product Data</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>Paste manufacturer blurbs or messy legacy descriptions below.</p>
        <textarea 
          rows="8" 
          placeholder="e.g., 'Samsung 55-inch 4K Smart TV with OLED...'"
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ marginTop: '15px', textAlign: 'right' }}>
          <button className="btn-primary" onClick={handleExtract} disabled={loading || !text}>
            {loading ? "AI is processing..." : "Run AI Extraction"}
          </button>
        </div>
      </div>

      {result && (
        <div className="card" style={{ borderTop: '4px solid var(--currys-magenta)' }}>
          <h3>2. Extracted Attributes</h3>
          <div className="grid">
            <div className="spec-item"><strong>Brand:</strong><br/>{result.brand}</div>
            <div className="spec-item"><strong>Model:</strong><br/>{result.model_name}</div>
            <div className="spec-item"><strong>Resolution:</strong><br/>{result.resolution}</div>
            <div className="spec-item"><strong>Energy Rating:</strong><br/>{result.energy_rating}</div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <strong>Key Features:</strong>
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              {(result.key_features || []).map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;