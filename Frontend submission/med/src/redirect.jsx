import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export default function RedirectPage() {
  const { shortcode } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/resolve/${shortcode}`)
      .then(res => {
        window.location.href = res.data.url;
      })
      .catch(() => {
        alert("Invalid or expired link.");
        window.location.href = "/";
      });
  }, [shortcode]);

  return null;
}
