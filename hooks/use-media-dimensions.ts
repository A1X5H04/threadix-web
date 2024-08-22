import { useState, useEffect } from "react";

const useMediaDimensions = (media: File) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getMediaDimensions = async () => {
      let url = "";
      if (media instanceof File) {
        url = URL.createObjectURL(media);
      } else if (typeof media === "string") {
        url = media;
      }

      if (url) {
        let width = 0;
        let height = 0;

        if (
          media.type?.startsWith("image") ||
          url.match(/\.(jpeg|jpg|gif|png)$/)
        ) {
          const img = new Image();
          img.src = url;
          await img.decode();
          width = img.width;
          height = img.height;
        } else if (
          media.type?.startsWith("video") ||
          url.match(/\.(mp4|webm|ogg)$/)
        ) {
          const video = document.createElement("video");
          video.src = url;
          await new Promise((resolve) => {
            video.onloadedmetadata = () => {
              width = video.videoWidth;
              height = video.videoHeight;
              resolve();
            };
          });
        }

        setDimensions({ width, height });
      }
    };

    if (media) {
      getMediaDimensions();
    }
  }, [media]);

  return dimensions;
};

export default useMediaDimensions;
