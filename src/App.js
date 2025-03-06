import { useState } from "react";
import { useRef } from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import "./App.css";

function App() {
  const audioFiles = [
    "/Music/Pag Ghunghroo Baandh - Namak Halaal.mp3",
    "/Music/Pyar Hamen Kis Mod Pe - Satte Pe Satta.mp3",
  ];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentIndex((prev) => (prev + 1) % audioFiles.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + audioFiles.length) % audioFiles.length
    );
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  if (audioFiles.length === 0) return <p>Loading music...</p>;

  return (
    <>
      <div class="player">
        <div class="imgBx">
          <img
            src="https://imgs.search.brave.com/3qqk4h6mchWnJ4yu1u15DSQZ-22k6dTCoAR0REspbXs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2lhbnRib21iLmNv/bS9hL3VwbG9hZHMv/b3JpZ2luYWwvOS85/NjQzNC8xMzkzNjE0/LWdldF91cF9raWRz/LmpwZw"
            alt="Album Art"
          />
        </div>
        <audio
          ref={audioRef}
          src={audioFiles[currentIndex]}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={nextTrack}
        />
        <div class="song-details">
          <h3>
            {audioFiles[currentIndex].split("/").pop().replace(".mp3", "")}
          </h3>
          <p></p>
        </div>
        <div class="player-controls">
          <button className="control-button" onClick={prevTrack}>
            <SkipBack size={24} />
          </button>

          <button className="control-button" onClick={togglePlayPause}>
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button className="control-button" onClick={nextTrack}>
            <SkipForward size={24} />
          </button>
        </div>

        <div className="player-controls2">
          <p>{formatTime(currentTime)}</p>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />

          <p>{formatTime(duration)}</p>
        </div>
      </div>
    </>
  );
}

export default App;
