import { useState } from 'react';
import axios from 'axios';

export default function ShortenerForm() {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/shorten', {
        url,
        validity,
        shortcode
      });
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="container">
      <h2>URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="number"
        placeholder="Validity (minutes)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <button onClick={handleSubmit}>Shorten</button>

      {result && (
        <div className="result">
          <p>Short URL: <a href={result.short_url} target="_blank" rel="noreferrer">{result.short_url}</a></p>
          <p>Expires At: {new Date(result.expiry).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
