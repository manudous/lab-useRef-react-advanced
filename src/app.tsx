import React from "react";
import styles from "./App.module.css";

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

function App() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = React.useState<number>(0);
  const [currentTime, setCurrentTime] = React.useState<number>(0);

  // https://stackoverflow.com/questions/49900527/javascript-video-loadmetadata-event-not-being-triggered-on-react-redux-applicati
  // https://www.w3schools.com/jsref/event_onloadedmetadata.asp
  const handleLoadedMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    const video = event.currentTarget;
    setVideoDuration(video.duration);
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    setCurrentTime(video.currentTime);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const seekTime = parseFloat(event.target.value);
      video.currentTime = seekTime;
    }
  };

  return (
    <div className={styles.root}>
      <video
        autoPlay
        muted
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className={styles.video}
      >
        <source src="https://www.w3schools.com/html/movie.mp4" />
      </video>
      <input
        type="range"
        min={0}
        max={videoDuration}
        step={.1}
        value={currentTime}
        onChange={handleSeek}
        className={styles.seekInput}
      />
      <p className={styles.infoText}>
        {formatTime(currentTime)} / {formatTime(videoDuration)}
      </p>
    </div>
  );
}

export default App;
