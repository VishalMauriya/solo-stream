import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VideoCallScreen from './screens/VideoCallScreen';
import VideoChatScreen from './screens/VideoChatScreen';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VideoCallScreen/>}/>
        <Route path="/" element={<VideoChatScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
