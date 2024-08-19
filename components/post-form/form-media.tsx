import { PostMediaSchema, PostSchema } from "@/types";
import { useFormContext, useWatch } from "react-hook-form";
import useEmblaCarousel from "embla-carousel-react";
import { RiCloseLine } from "@remixicon/react";

function FormMedia({
  setMedia,
  itemIndex,
}: {
  itemIndex: number;
  setMedia: (media: PostMediaSchema[]) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
  });
  const media = useWatch({
    name: `posts.${itemIndex}.media`,
  }) as PostMediaSchema[];

  // const [aspectRatios, setAspectRatios] = React.useState<number[]>([]);

  // useEffect(() => {
  //   const calculateAspectRatios = async () => {
  //     const ratios = await Promise.all(
  //       media.map(
  //         (item) =>
  //           new Promise<number>((resolve) => {
  //             const img = new Image();
  //             img.src = item.url;
  //             img.onload = () => resolve(img.width / img.height);
  //           })
  //       )
  //     );
  //     setAspectRatios(ratios);
  //   };

  //   if (media.length > 0) {
  //     calculateAspectRatios();
  //   }
  // }, [media]);

  return (
    <div
      className="overflow-hidden mb-4"
      ref={media.length > 2 ? emblaRef : undefined}
    >
      <div className="flex flex-nowrap gap-x-2 w-full ">
        {media.map((mediaItem) => (
          <div key={mediaItem.url} className={`relative w-full min-w-20`}>
            <span>
              <button
                onClick={() => {
                  const newMedia = media.filter(
                    (item) => item.url !== mediaItem.url
                  );
                  setMedia(newMedia);
                }}
                className="absolute top-2 right-2 p-1 bg-muted hover:bg-muted text-muted-foreground transition-colors rounded-lg"
              >
                <RiCloseLine className="w-4 h-4 text-muted-foreground" />
              </button>
            </span>
            <img
              src={mediaItem.url}
              alt={mediaItem.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormMedia;
