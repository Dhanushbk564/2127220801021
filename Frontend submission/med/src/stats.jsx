import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StatisticsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stats')
      .then(res => setStats(res.data))
      .catch(err => alert("Failed to load stats"));
  }, []);

  return (
    <div className="container">
      <h2>URL Statistics</h2>
      {stats.map((entry, index) => (
        <div className="stat-card" key={index}>
          <p><strong>Short URL:</strong> <a href={`http://localhost:3000/${entry.shortcode}`} target="_blank">{entry.shortcode}</a></p>
          <p><strong>Original URL:</strong> {entry.original_url}</p>
          <p><strong>Created:</strong> {new Date(entry.created).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          <p><strong>Expires:</strong> {new Date(entry.expiry).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          <p><strong>Total Clicks:</strong> {entry.click_count}</p>

          {entry.clicks.length > 0 && (
            <div className="click-log">
              <p><strong>Click Log:</strong></p>
              <ul>
                {entry.clicks.map((click, i) => (
                  <li key={i}>
                    Time: {new Date(click.time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} | Source: {click.source}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
