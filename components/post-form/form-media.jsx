import React from "react";

import Image from "next/image";

function FormMedia() {
  const videoRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const random = Math.floor(Math.random() * 3);

  if (random === 0) {
    return (
      <div className="relative w-60 h-44">
        <Image
          src="https://images.unsplash.com/photo-1719386217659-6bde4641915c?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={150}
          height={150}
          alt="Post Image"
          className="rounded-md object-cover"
        />
      </div>
    );
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full bg-secondary rounded-md grid place-items-center"
    >
      <video
        ref={videoRef}
        src="https://videos.pexels.com/video-files/856382/856382-hd_1920_1080_30fps.mp4"
        alt="Post Image"
        className="rounded-md object-cover"
        muted
      />
    </div>
  );
}

export default FormMedia;

{
  /* <div className="relative w-fit h-fit bg-gray-200 rounded-md group ">
      <Image
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxvMmx0ZTM3bGh2bzZ1MTRvM2M2NGw5ejl0c2Rwb3E5d2MxOTAyYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2UxTW1Q2Vzh0NFelQ5/giphy.webp"
        width={250}
        height={250}
        alt="Post Image"
        className="rounded-md object-cover"
      />
    </div> */
}

{
  /* <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-fit h-fit bg-gray-200 rounded-md group"
    >
      <div className="absolute inset-0 flex items-center justify-center w-full h-full z-[1] bg-black bg-opacity-75 group-hover:opacity-0 transition-opacity">
        <RiVideoFill className="w-8 h-8 text-muted-foreground" />
      </div>
      <video
        ref={videoRef}
        src="https://videos.pexels.com/video-files/856382/856382-hd_1920_1080_30fps.mp4"
        alt="Post Image"
        className="rounded-md object-cover"
        muted
      />
    </div> */
}
