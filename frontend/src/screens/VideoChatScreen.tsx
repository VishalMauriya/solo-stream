// VideoChatScreen.tsx
import React from 'react';

const VideoChatScreen: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        {/* Display user's video feed */}
        <video className="w-full h-auto" controls autoPlay />
      </div>
      <div className="w-1/2">
        {/* Display other participant's video feed */}
        {/* <video className="w-full h-auto" controls autoPlay /> */}
      </div>
    </div>
  );
};

export default VideoChatScreen;
