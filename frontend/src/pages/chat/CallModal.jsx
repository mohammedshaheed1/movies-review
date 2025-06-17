import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { io } from "socket.io-client";

export default function CallModal({ me, peerUser, onClose, video = true }) {
  const localVideo  = useRef(null);
  const remoteVideo = useRef(null);
  const connection  = useRef(null);
  const [stream, setStream] = useState(null);

  // one global Socket.IO client per tab is fine
  const socket = useRef(
    io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000")
  ).current;

  /* ----------------------------------------------------------- */
  /* A.  get local media & join signalling room                  */
  /* ----------------------------------------------------------- */
  useEffect(() => {
    (async () => {
      const media = await navigator.mediaDevices.getUserMedia({
        video,
        audio: true,
      });
      setStream(media);
      localVideo.current.srcObject = media;
      socket.emit("join-call-room", me._id);
    })();
  }, []);

  /* ----------------------------------------------------------- */
  /* B.  outbound call  (when user is the caller)                */
  /* ----------------------------------------------------------- */
  const startCall = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (sig) =>
      socket.emit("call-user", { to: peerUser._id, from: me._id, signal: sig })
    );
    peer.on("stream", (remote) => (remoteVideo.current.srcObject = remote));
    connection.current = peer;
  };

  /* ----------------------------------------------------------- */
  /* C.  inbound call  (when user is callee)                     */
  /* ----------------------------------------------------------- */
  socket.once("incoming-call", ({ from, signal }) => {
    if (from !== peerUser._id) return; // ignore if not the selected user
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (sig) =>
      socket.emit("accept-call", { to: from, signal: sig })
    );
    peer.on("stream", (remote) => (remoteVideo.current.srcObject = remote));
    peer.signal(signal);
    connection.current = peer;
  });

  socket.once("call-accepted", (signal) => {
    connection.current?.signal(signal); // caller receives callee’s answer
  });

  socket.once("call-ended", () => endCall());

  /* ----------------------------------------------------------- */
  /* D.  cleanup                                                 */
  /* ----------------------------------------------------------- */
  const endCall = () => {
    stream?.getTracks().forEach((t) => t.stop());
    connection.current?.destroy?.();
    socket.emit("end-call", { to: peerUser._id });
    onClose();
  };

  /* ----------------------------------------------------------- */
  /* UI                                                          */
  /* ----------------------------------------------------------- */
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 z-50">
      <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col gap-4">
        <div className="flex gap-2">
          <video ref={localVideo} muted autoPlay playsInline className="w-40 h-28 bg-black rounded" />
          <video ref={remoteVideo}        autoPlay playsInline className="w-40 h-28 bg-black rounded" />
        </div>
        <div className="flex justify-center gap-4">
          <button onClick={startCall} className="px-4 py-2 bg-emerald-500 rounded text-white">Start</button>
          <button onClick={endCall}   className="px-4 py-2 bg-red-500 rounded text-white">End</button>
        </div>
      </div>
    </div>
  );
}
