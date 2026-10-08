import { useState } from 'react';
import YouTube from 'react-youtube';
import Streaming from './Streaming';

function Home() {
  const songIds = ["emxEQBsQBB4", "dF2eolwJUW4", "KurLjp9LCx4"];
  const [currentSong, setCurrentSong] = useState(songIds[0]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0
    }
  };

  function handleNext() {
    const currentIndex = songIds.indexOf(currentSong);
    const nextIndex = (currentIndex + 1) % songIds.length;
    setCurrentSong(songIds[nextIndex]);
  }

  function handlePrevious() {
    const currentIndex = songIds.indexOf(currentSong);
    const previousIndex = (currentIndex - 1 + songIds.length) % songIds.length;
    setCurrentSong(songIds[previousIndex]);
  }

  return (
    <div className="home-page">
      
      <h2>
        Latest Releases
      </h2>
      
      <div className="video-player">
        
        <YouTube 
        key={currentSong} videoId={currentSong} opts={opts} />
      
        <div className="video-controls">
        
          <button type="button" 
            onClick={handlePrevious}
            className="video-control-button">
            &#10094;
          </button>
        
          <button type="button" 
            onClick={handleNext}
            className="video-control-button">
            &#10095;
          </button>
        
        </div>
      
      </div>

      <h2> 
        Follow Me
      </h2>

      <div className="home-social-links">
        <Streaming rows />
      </div>

      <h2>
        Next Show
      </h2>

      <h2>
        Featured Merch
      </h2>

      <h2>
        About Me
      </h2>
    
    </div>
  );
}

export default Home;