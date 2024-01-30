import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getLocalAudioVideo() {
  const stream = await window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  // MediaStream
  const audioTrack = stream.getAudioTracks()[0];
  const videoTrack = stream.getVideoTracks()[0];

  return [audioTrack, videoTrack]
}
