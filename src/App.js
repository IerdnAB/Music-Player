import { AudioPlayer } from './components/audioplayer/AudioPlayer';
import { NavigationBar } from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WikiSearch } from './components/wikisearch/WikiSearch';





function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar/>
        <Routes>
          <Route index path="/" element={<AudioPlayer />} />
          <Route path="/wikisearch" element={<WikiSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
