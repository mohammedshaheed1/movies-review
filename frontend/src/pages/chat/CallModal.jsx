// import { useEffect, useRef, useState } from "react";
// import Peer from "simple-peer";
// import { io } from "socket.io-client";

// export default function CallModal({ me, peerUser, onClose, video = true }) {
//   const localVideo  = useRef(null);
//   const remoteVideo = useRef(null);
//   const connection  = useRef(null);
//   const [stream, setStream] = useState(null);

//   // one global Socket.IO client per tab is fine
//   const socket = useRef(
//     io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000")
//   ).current;

//   /* ----------------------------------------------------------- */
//   /* A.  get local media & join signalling room                  */
//   /* ----------------------------------------------------------- */
//   useEffect(() => {
//     (async () => {
//       const media = await navigator.mediaDevices.getUserMedia({
//         video,
//         audio: true,
//       });
//       setStream(media);
//       localVideo.current.srcObject = media;
//       socket.emit("join-call-room", me._id);
//     })();
//   }, []);

//   /* ----------------------------------------------------------- */
//   /* B.  outbound call  (when user is the caller)                */
//   /* ----------------------------------------------------------- */
//   const startCall = () => {
//     //  console.log("peer",peerUser)
//     console.log("stream",stream)
//     // const peer = new Peer({
//     //   initiator: true,
//     //   trickle: false,
//     //   stream,
//     // });
  
//     // peer.on("signal", (sig) =>
//     //   socket.emit("call-user", { to: peerUser._id, from: me._id, signal: sig })
//     // );
//     // peer.on("stream", (remote) => (remoteVideo.current.srcObject = remote));
//     // connection.current = peer;
//     navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {
//   const peer = new Peer({
//     initiator: true,
//     trickle: false,
//     stream, // This must be a valid MediaStream
//   })

//   // Peer event handlers
//   peer.on("signal", data => {
//     console.log("SIGNAL DATA", data)
//   })

//   peer.on("stream", remoteStream => {
//     // Attach to video element
//     remoteVideoRef.current.srcObject = remoteStream
//   })
// })
//   };

//   /* ----------------------------------------------------------- */
//   /* C.  inbound call  (when user is callee)                     */
//   /* ----------------------------------------------------------- */
//   socket.once("incoming-call", ({ from, signal }) => {
//     if (from !== peerUser._id) return; // ignore if not the selected user
//     const peer = new Peer({ initiator: false, trickle: false, stream });
//     peer.on("signal", (sig) =>
//       socket.emit("accept-call", { to: from, signal: sig })
//     );
//     peer.on("stream", (remote) => (remoteVideo.current.srcObject = remote));
//     peer.signal(signal);
//     connection.current = peer;
//   });

//   socket.once("call-accepted", (signal) => {
//     connection.current?.signal(signal); // caller receives callee’s answer
//   });

//   socket.once("call-ended", () => endCall());

//   /* ----------------------------------------------------------- */
//   /* D.  cleanup                                                 */
//   /* ----------------------------------------------------------- */
//   const endCall = () => {
//     stream?.getTracks().forEach((t) => t.stop());
//     connection.current?.destroy?.();
//     socket.emit("end-call", { to: peerUser._id });
//     onClose();
//   };

//   /* ----------------------------------------------------------- */
//   /* UI                                                          */
//   /* ----------------------------------------------------------- */
//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 z-50">
//       <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col gap-4">
//         <div className="flex gap-2">
//           <video ref={localVideo} muted autoPlay playsInline className="w-40 h-28 bg-black rounded" />
//           <video ref={remoteVideo}        autoPlay playsInline className="w-40 h-28 bg-black rounded" />
//         </div>
//         <div className="flex justify-center gap-4">
//           <button onClick={startCall} className="px-4 py-2 bg-emerald-500 rounded text-white">Start</button>
//           <button onClick={endCall}   className="px-4 py-2 bg-red-500 rounded text-white">End</button>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useEffect, useRef, useState } from "react"
import Peer from "simple-peer"
// import { io } from "socket.io-client"
import { getSocket } from "@/socket"

export default function CallModal({ me, peerUser, onClose, video,incoming }) {

  const isCaller = !incoming
  const localVideo  = useRef(null)
  const remoteVideo = useRef(null)
  const peerRef     = useRef(null)
  // const socket      = useRef(io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000")).current
  const socket      = useRef(getSocket(me._id)).current
  const [stream, setStream] = useState(null)

  /* A. get local media once ------------------------------------ */
  useEffect(() => {
    (async () => {
      const media = await navigator.mediaDevices.getUserMedia({ video, audio: true })
      setStream(media)
      localVideo.current.srcObject = media
       if (incoming) answerCall(media);
      // socket.emit("join-call-room", me._id)
    })()

    // return () => socket.disconnect()
  }, [])

  /* B. make an outgoing call ----------------------------------- */
  const startCall = () => {
    if (!stream){
      console.log("Stream not ready yet");
      return   
    }    
              // <‑‑ guard: stream must exist
     console.log("step1")
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,                          // valid MediaStream!
    })
    console.log("step2",peer)

    peer.on("signal", sig =>{
            console.log("📡 local signal", sig); 
            console.log("📡 sending call-user to", peerUser._id)
            socket.emit("call-user", { to: peerUser._id, from: me._id, signal: sig })
    }
      

    )

    peer.on("stream", remote =>
      {console.log("🎥 remote stream received (caller)");
        remoteVideo.current.srcObject = remote
      }
    )

    peerRef.current = peer
  }


   /* 🔹 receiver answers immediately with offer already saved */
  const answerCall = (media) => {
    const peer = new Peer({ initiator: false, trickle: false, stream: media });
    peer.on("signal", sig => socket.emit("accept-call", { to: incoming.from, signal: sig }));
    peer.on("stream", remote => (remoteVideo.current.srcObject = remote));
    peer.signal(incoming.signal);   // apply caller’s offer
    peerRef.current = peer;
  };

  /* C. answer an incoming call --------------------------------- */
  // useEffect(() => {
  //   const handleIncoming = ({ from, signal }) => {
  //     console.log("📞 incoming-call", from, signal)
  //     if (from !== peerUser._id) return
  //     if (!stream) return              // wait until we have media
  //     const peer = new Peer({ initiator: false, trickle: false, stream })
  //     peer.on("signal", sig => socket.emit("accept-call", { to: from, signal: sig }))
  //     peer.on("stream", remote => (remoteVideo.current.srcObject = remote))
  //     peer.signal(signal)
  //     peerRef.current = peer
  //   }

  //   socket.on("incoming-call", handleIncoming)
  //   socket.on("call-accepted", sig => peerRef.current?.signal(sig))
  //   socket.on("call-ended", endCall)

  //   return () => {
  //     socket.off("incoming-call", handleIncoming)
  //     socket.off("call-accepted")
  //     socket.off("call-ended")
  //   }
  // }, [stream])
    /* C. once caller gets answer */
  useEffect(() => {
    socket.on("call-accepted", sig => peerRef.current?.signal(sig));
    socket.on("call-ended",   endCall);
    return () => {
      socket.off("call-accepted");
      socket.off("call-ended");
    };
  }, []);
  /* D. tidy up -------------------------------------------------- */
  const endCall = () => {
    peerRef.current?.destroy()
    stream?.getTracks().forEach(t => t.stop())
    socket.emit("end-call", { to: peerUser._id })
    onClose()
  }

  /* UI ---------------------------------------------------------- */
  // return (
  //   <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
  //     <div className="bg-white rounded-xl p-4 shadow-lg flex flex-col gap-4 w-80">
  //       <div className="flex gap-2">
  //         <video ref={localVideo}  muted autoPlay playsInline className="w-36 h-28 bg-black rounded" />
  //         <video ref={remoteVideo}       autoPlay playsInline className="w-36 h-28 bg-black rounded" />
  //       </div>
  //       <div className="flex justify-center gap-4">
  //         <button onClick={startCall} className="px-4 py-2 bg-emerald-500 text-white rounded">Start</button>
  //         <button onClick={endCall}   className="px-4 py-2 bg-red-500    text-white rounded">End</button>
  //       </div>
  //     </div>
  //   </div>
  // )
  {/* UI ---------------------------------------------------------- */}
return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
    <div className="bg-white rounded-xl p-4 shadow-lg flex flex-col gap-4 w-80">
      <div className="flex gap-2">
        <video ref={localVideo}  muted autoPlay playsInline className="w-36 h-28 bg-black rounded" />
        <video ref={remoteVideo}       autoPlay playsInline className="w-36 h-28 bg-black rounded" />
      </div>

      {/* ↓ caller sees “Start”; receiver sees “Accept / Decline” */}
      <div className="flex justify-center gap-4">
        {isCaller ? (
          <button
            onClick={startCall}
            className="px-4 py-2 bg-emerald-500 text-white rounded"
          >
            Start
          </button>
        ) : (
          <>
            <button
              onClick={() => answerCall(stream)}     // receiver accepts
              className="px-4 py-2 bg-emerald-500 text-white rounded"
            >
              Accept
            </button>
            <button
              onClick={endCall}                      // receiver declines
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Decline
            </button>
          </>
        )}

        <button
          onClick={endCall}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          End
        </button>
      </div>
    </div>
  </div>
)

}
