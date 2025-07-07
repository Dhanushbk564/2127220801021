import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerForm from './shortner';
import RedirectPage from './redirect';
import StatisticsPage from './stats';
import Testing from './registration';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerForm />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
        <Route path="/registartion" element={<Testing/>}/>
        <Route path="/stats" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
