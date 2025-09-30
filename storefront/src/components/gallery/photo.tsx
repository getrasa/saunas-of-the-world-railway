"use client";

import { Dialog, DialogContent, DialogTrigger } from "~/lib/components/ui/dialog";
import Image from "next/image";

export interface PhotoProps {
  children: React.ReactNode;
  path: string;
}

export const Photo: React.FC<PhotoProps> = ({ children, path }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-h-[calc(100%-32px)] min-w-[calc(100%-32px)] max-w-[calc(100%-32px)]">
        <div className="relative h-full w-full">
          <img
            loading="lazy"
            src={path}
            alt="Gallery photo"
            className="absolute h-full w-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
