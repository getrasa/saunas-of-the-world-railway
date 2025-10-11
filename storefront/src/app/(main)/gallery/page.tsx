import { Suspense } from "react";
import { GalleryScene } from "~/components/gallery";

export const dynamic = 'force-dynamic';

export default function GalleryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryScene />
    </Suspense>
  );
}
