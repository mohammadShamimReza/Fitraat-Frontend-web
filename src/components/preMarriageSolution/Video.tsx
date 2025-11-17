import VideoPlayer from "../shared/VideoPlayer";

interface Props {
  videos: { id: number; url: string; name: string }[];
}

export default function PreMarriageVideo({ videos }: Props) {
  if (!videos || videos.length === 0)
    return (
      <div className="text-center text-white py-20 bg-black rounded-lg">
        No videos available.
      </div>
    );

  return (
    <div className="border rounded-lg bg-black mb-6">
      <VideoPlayer videoUrl={videos[0].url} />
    </div>
  );
}
