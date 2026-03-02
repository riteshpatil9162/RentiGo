import React, { useState } from 'react';
import axios from 'axios';

const TestAPI = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testDirectFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/properties');
      const data = await response.json();
      setResult('Direct Fetch Success: ' + JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Direct Fetch Error: ' + error.message);
    }
    setLoading(false);
  };

  const testAxios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setResult('Axios Success: ' + JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult('Axios Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>API Connection Test</h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={testDirectFetch} disabled={loading}>
          Test with Fetch API
        </button>
        <button onClick={testAxios} disabled={loading} style={{ marginLeft: '1rem' }}>
          Test with Axios
        </button>
      </div>
      <pre style={{ 
        background: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '4px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}>
        {result || 'Click a button to test API connection'}
      </pre>
    </div>
  );
};

export default TestAPI;
