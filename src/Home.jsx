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

  const overlayButtonStyle = {
    pointerEvents: 'auto',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(199, 189, 189, 0.6)', 
    color: '#000000',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
  };

  

  return (
    <div style={{
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        marginBottom: '20px',
        boxSizing: 'border-box'
    }}>
      
      <h2>
        Latest Releases
      </h2>
      
      <div style={{
        position: 'relative',
        width: '640px',
        height: '390px'
      }}>
        
        <YouTube 
        key={currentSong} videoId={currentSong} opts={opts} />
      
        <div style={{position: 'absolute',
          top: '50%',
          left: '0',
          width: '100%',
          transform: 'translateY(-50%)',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10px',
          boxSizing: 'border-box',
          pointerEvents: 'none'}}>
        
          <button type="button" 
            onClick={handlePrevious}
            style={overlayButtonStyle}>
            &#10094;
          </button>
        
          <button type="button" 
            onClick={handleNext}
            style={overlayButtonStyle}>
            &#10095;
          </button>
        
        </div>
      
      </div>

      <h2> 
        Follow Me
      </h2>

      <div style={{fontSize: '25px', marginBottom: '20px'}}>
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