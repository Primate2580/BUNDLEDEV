import { useEffect, useState } from "react";
import { tracks } from "@/content";
import { useRouteIds } from "@/lib/useRouteIds";
import TrackSection from "./TrackSection";

export default function Sidebar() {
  const { trackId } = useRouteIds();
  const [open, setOpen] = useState<string[]>(() => [trackId ?? tracks[0].id]);

  // Opening a lesson from a link should reveal its track.
  useEffect(() => {
    if (trackId) setOpen((current) => (current.includes(trackId) ? current : [...current, trackId]));
  }, [trackId]);

  const toggle = (id: string) =>
    setOpen((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  return (
    <nav aria-label="Tracks" className="px-3 py-4">
      <div className="space-y-2">
        {tracks.map((track) => (
          <TrackSection
            key={track.id}
            track={track}
            open={open.includes(track.id)}
            onToggle={() => toggle(track.id)}
          />
        ))}
      </div>
    </nav>
  );
}
