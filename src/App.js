import React, { useState, useEffect } from "react";
import { createConnection } from "./chat";

const narutoStyle = {
  fontFamily: "'Naruto', sans-serif",
  backgroundColor: "#1a1a1a",
  color: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
};

const inputStyle = {
  padding: "8px",
  margin: "8px 0",
  borderRadius: "4px",
};

const selectStyle = {
  padding: "8px",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "8px 12px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const hrStyle = {
  border: "1px solid #fff",
  margin: "20px 0",
};

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState("https://localhost:123");

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  const roomInfo = {
    biography: {
      description: "Эта комната о Луффи",
      photo: "https://printler.com/media/photo/140781.jpg"
    },
    travel: {
      description: "Эта комната о путешествии Луффи",
      img: "https://pikuco.ru/upload/test_stable/6df/6dfb6304e589db1bb54aeaf106275c90.webp"
    },
    music: {
      description: "Эта комната о музыке про Ван пис",
      song: "https://global01.muzon-club.net/uploads/files/2023-05/one-piece-van-pis-pesnya-bruka----sake-binksa-www.lightaudio.ru--456239144.mp3"
    },
    series: {
      description: "Эта комната про серии",
      one: "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/10/one-piece-film-red-straw-hats-new-costumes-promo.jpg"
    },
  };

  return (
      <div style={{ ...narutoStyle, marginTop: "20px" }}>
        <label>
          Server Url:{" "}
          <input
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              style={{ ...inputStyle }}
          />
        </label>
        <h1 style={{ marginBottom: "20px", fontSize: "24px" }}>
          Welcome to the {roomId} room, dattebayo!
        </h1>
        <p>{roomInfo[roomId].description}</p>
        {roomId === "biography" &&
            <img src={roomInfo[roomId].photo} alt="Biography" style={{ maxWidth: "100%" }} />}
        {roomId === "travel" &&
            <img src={roomInfo[roomId].img} alt="Travel" style={{ maxWidth: "100%" }} />}
        {roomId === "music" &&
            <audio controls><source src={roomInfo[roomId].song} type="audio/mp3" /></audio>}
        {roomId === "series" &&
            <img src={roomInfo[roomId].one} alt="Series" style={{ maxWidth: "100%" }} />}
      </div>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState("biography");
  const [show, setShow] = useState(false);

  return (
      <div style={{ ...narutoStyle, margin: "20px" }}>
        <label>
          Choose the chat room:{" "}
          <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              style={{ ...selectStyle }}
          >
            <option value="biography">Biography</option>
            <option value="travel">Travel</option>
            <option value="music">Music</option>
            <option value="series">Series</option>
          </select>
        </label>
        <button
            style={{ ...buttonStyle }}
            onClick={() => setShow(!show)}
        >
          {show ? "Close Chat" : "Open Chat"}
        </button>
        {show && <hr style={{ ...hrStyle }} />}
        {show && <ChatRoom roomId={roomId} />}
      </div>
  );
}
