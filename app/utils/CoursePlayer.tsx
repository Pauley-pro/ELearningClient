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

    const playerRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        axios.post("https://elearningapi-rjgb.onrender.com/api/v1/getVdoCipherOTP", {
            videoId: videoUrl,
        }).then((res) => {
            setVideoData(res.data);
        });
    }, [videoUrl]);

    useEffect(() => {
        const savedPosition = localStorage.getItem(`lastPosition-${videoUrl}`);
        if (savedPosition && playerRef.current) {
            const player = playerRef.current.contentWindow;
            if (player) {
                // Wait for the iframe player to initialize and then seek to the last position
                player.postMessage(
                    {
                        event: 'seek',
                        time: parseFloat(savedPosition),
                    },
                    '*'
                );
            }
        }
    }, [videoData]);

    const handleTimeUpdate = (event: MessageEvent) => {
        const data = event.data;
        if (data.event === 'timeupdate') {
            // Save current time to localStorage
            localStorage.setItem(`lastPosition-${videoUrl}`, data.time.toString());
        }
    };

    useEffect(() => {
        // Listen for messages from the VdoCipher iframe
        window.addEventListener('message', handleTimeUpdate);
        return () => {
            window.removeEventListener('message', handleTimeUpdate);
        };
    }, []);

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
