import { useState, useRef, useEffect } from 'react';
import { MdSkipPrevious } from 'react-icons/md';
import { MdSkipNext } from 'react-icons/md';
import { MdPlayCircleFilled } from 'react-icons/md';
import { MdPauseCircle } from 'react-icons/md';
import './AudioPlayer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { listRef, listAll, getDownloadURL } from '../../firebase/firebase'


const AudioPlayer = () => {

    const [isPlaying, setIsPlaying] = useState(true);
    const [data, setData] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);



    const playerRef = useRef();

    const listItems = async () => {
        try {
            const res = await listAll(listRef);
            const arr = await Promise.allSettled(res.items.map(async (item) => {
                const dwnUrl = await getDownloadURL(item)
                return {
                    downloadURL: dwnUrl,
                    name: item.name,
                }
            }))
            setData(arr.map(t => t.value))
        }
        catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        listItems()
    }, [])

    useEffect(() => {
        (playerRef.current && isPlaying) ? playerRef.current.pause() : playerRef.current.play()
    }, [isPlaying])

    useEffect(() => {
        if (!isPlaying) playerRef.current.play()
    }, [selectedTrack])



    const calculatedTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    };



    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    const handleSelectTrack = (index) => {
        setSelectedTrack(index)
    }

    const handlePrevTrack = () => {
        if (selectedTrack === 0) return;
        setSelectedTrack(state => state - 1);
    }

    const handleNextTrack = () => {
        if (selectedTrack === data.length - 1) return;
        setSelectedTrack(state => state + 1);
    }

    const changeRange = (e) => {
        playerRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    }

    const handlePlayProgress = () => {
        const currentTimeSeconds = Math.floor(playerRef.current.currentTime)
        const durationSeconds = Math.floor(playerRef.current.duration)
        setDuration(durationSeconds);
        setCurrentTime(currentTimeSeconds);
    }

    //playerRef.current.volume
    //playerRef.current.mute

    return (
        <div className='audio-player'>
            <div className="displayer">
                <ul className="list-song">
                    {data.map((val, index) => (
                        <li className="songs"
                            key={val.name}
                            onClick={() => handleSelectTrack(index)}
                            style={{ color: selectedTrack === index ? 'blue' : 'initial' }}>
                            {val.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="middle-part">
                <button className="forwardBackward" id="previous-botton" onClick={handlePrevTrack} disabled={selectedTrack === 0}><MdSkipPrevious /></button>
                <button className="playPause" id="play-button" onClick={togglePlayPause}> {isPlaying ? <MdPlayCircleFilled /> : <MdPauseCircle />}</button>
                <button className="forwardBackward" id="skip-button" onClick={handleNextTrack} disabled={selectedTrack === data.length - 1}><MdSkipNext /></button>
            </div>
            <div className="duration">
                <div className="durationTime">{calculatedTime(currentTime)}</div>
                <input type="range" min="0" max={isNaN(duration) ? 0 : duration} id="song-duration" step="0.1" value={currentTime} onChange={changeRange} />
                <div className="durationTime">{!isNaN(duration) && calculatedTime(duration)}</div>

            </div>
            <audio
                ref={playerRef}
                src={data.length > 0 ? data[selectedTrack].downloadURL : null}
                onTimeUpdate={handlePlayProgress}
            >
            </audio>





        </div>
    )
}

export { AudioPlayer };