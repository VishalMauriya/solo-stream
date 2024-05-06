// VideoCallScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneSlash, faVideoSlash } from '@fortawesome/free-solid-svg-icons';


const VideoCallScreen: React.FC = () => {
    const [isJoining, setIsJoining] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const myVideoRef = useRef<HTMLVideoElement>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false); // New state for showing the popup


    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: !isCameraOff, audio: true });
                if (videoRef.current && myVideoRef.current) {
                    videoRef.current.srcObject = stream;
                    myVideoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        if (isJoining) {
            setShowPopup(true); 
            setTimeout(() => {
                setShowPopup(false);
                getCameraStream();
            }, 5000);
        }
    }, [isJoining, isCameraOff]);

    const handleJoinClick = () => {
        setIsJoining(true);
        // Implement logic to join the call and switch to VideoChatScreen
    };

    const handleEndCallClick = () => {
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        if (myVideoRef.current) {
            myVideoRef.current.srcObject = null;
        }
        setIsJoining(false);
        setShowPopup(false);
        // Implement logic to end the call
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        const stream = myVideoRef.current?.srcObject as MediaStream;
        if (stream) {
            const audioTracks = stream.getAudioTracks();
            audioTracks.forEach((track) => {
                track.enabled = !isMuted;
            });
        }
    };

    const toggleCamera = () => {
        setIsCameraOff(!isCameraOff);
        const stream = myVideoRef.current?.srcObject as MediaStream;
        if (stream) {
            const videoTracks = stream.getVideoTracks();
            videoTracks.forEach((track) => {
                track.enabled = !isCameraOff;
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative w-full h-5/6 overflow-hidden">
                {showPopup && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-xl">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faMicrophoneSlash} size="2x" />
                            <span>Finding someone to connect with...</span>
                        </div>
                    </div>
                )}
                {isJoining && (
                    <>
                        <div className="absolute inset-0 flex justify-center items-center">
                            <video ref={videoRef} className={`w-full h-full object-cover rounded-xl ${isCameraOff ? 'bg-black' : ''}`} autoPlay muted />
                        </div>

                        <div className="absolute top-4 left-4 z-10">
                            <video ref={myVideoRef} className="w-60 h-40 object-cover rounded-xl" autoPlay muted />

                            <div className="absolute inset-0 flex items-center justify-center text-white grid grid-cols-2 gap-2">
                                <div className={`flex items-center justify-center ${isCameraOff || isMuted ? 'col-span-2' : ''}`}>
                                    {isCameraOff && (
                                        <div className="flex items-center justify-center">
                                            <FontAwesomeIcon icon={faVideoSlash} size="2x" />
                                        </div>
                                    )}

                                    {isMuted && (
                                        <div className="flex items-center justify-center">
                                            <FontAwesomeIcon icon={faMicrophoneSlash} size="2x" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {!isJoining && (
                <button onClick={handleJoinClick} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Join Call
                    </span>
                </button>
            )}

            {isJoining && (
                <div className="mt-4 flex items-center">
                    <button onClick={toggleMute} className="mr-4 inline-flex items-center justify-center px-8 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                    <button onClick={handleEndCallClick} className="mr-4 inline-flex items-center justify-center px-8 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-lg shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                        End Call
                    </button>
                    <button onClick={toggleCamera} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-lg shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        {isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                    </button>
                </div>
            )}

            <div className="mb-4"></div>
        </div>
    );

};

export default VideoCallScreen;
