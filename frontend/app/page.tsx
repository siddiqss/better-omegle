"use client";
import { Suspense, useRef, useState } from "react";
import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import Room from "../components/Room";
import Loading from "./loading";

const Home = () => {
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setlocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mirror, setMirror] = useState(false);

  const [joined, setJoined] = useState(false);

  const getCam = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // MediaStream
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    setLocalAudioTrack(audioTrack);
    setlocalVideoTrack(videoTrack);
    if (!videoRef.current) {
      return;
    }

    videoRef.current.srcObject = new MediaStream([videoTrack, audioTrack]);
    videoRef.current.play();
    setMirror(true);
    // MediaStream
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-8">
          Better Omegle - Meet Strangers Online
        </h1>
        <Suspense fallback={<Loading />}>
          <div className="w-[600px] h-auto ">
            <video
              autoPlay
              ref={videoRef}
              className="w-full h-auto rounded-2xl border-2"
            ></video>
          </div>
        </Suspense>

        <div>
          {mirror == false ? (
            <div className="flex gap-2 m-2 items-center">
              <p>Want to see how you look? Turn mirror on</p>
              <Button
                onClick={() => {
                  if (videoRef && videoRef.current) {
                    getCam();
                  }
                }}
              >
                On
              </Button>
            </div>
          ) : (
            <div className="flex items-center m-2 gap-2">
              <p>Turn mirror off</p>
              <Button
                onClick={async () => {
                  localVideoTrack?.stop();
                  localAudioTrack?.stop();
                  setMirror(false);
                }}
              >
                Off
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 m-2">
          <Input
            type="text"
            placeholder="Enter name"
            onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
            }}
          ></Input>
          <Button
            onClick={() => {
              getCam();

              setJoined(true);
            }}
          >
            Join
          </Button>
        </div>
      </div>
    );
  }

  console.log("entering room");

  return (
    <Room
      name={name}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
    />
  );
};

export default Home;
