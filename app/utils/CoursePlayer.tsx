import React, { FC, useEffect, useRef, useState } from 'react';
import axios from "axios"

type Props = {
    videoUrl: string;
    title: string;
}

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: "",
    });

    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const localStorageKey = `lastPosition-${videoUrl}`;

    useEffect(() => {
        axios.post("https://elearningapi-rjgb.onrender.com/api/v1/getVdoCipherOTP", {
            videoId: videoUrl,
        }).then((res) => {
            setVideoData(res.data);
        });
    }, [videoUrl]);

    useEffect(() => {
        const handlePlaybackUpdate = (event: MessageEvent) => {
            // Ensure the event is from the VdoCipher iframe
            if (event.origin !== 'https://player.vdocipher.com') return;

            const data = event.data;

            if (data?.event === "timeupdate") {
                const lastPosition = data.currentTime; // in seconds
                localStorage.setItem(localStorageKey, String(lastPosition));
            }
        };

        window.addEventListener("message", handlePlaybackUpdate);

        return () => {
            window.removeEventListener("message", handlePlaybackUpdate);
        };
    }, [videoUrl]);

    const getLastPosition = () => {
        const savedPosition = localStorage.getItem(localStorageKey);
        return savedPosition ? parseFloat(savedPosition) : 0;
    };

    /*useEffect(() => {
        axios.post("http://localhost:8000/api/v1/getVdoCipherOTP",{
            videoId: videoUrl,
        }).then((res) => {
            setVideoData(res.data);
        });
    }, [videoUrl]);*/

    return (
        <div style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}>
            {
                videoData.otp && videoData.playbackInfo !== "" && (
                    <iframe src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=76JQrEzivLboEVug`}
                        style={{
                            border: 0,
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                        allowFullScreen={true}
                        allow="encrypted-media"
                    ></iframe>
                )
            }
        </div>
    )
}

export default CoursePlayer;
