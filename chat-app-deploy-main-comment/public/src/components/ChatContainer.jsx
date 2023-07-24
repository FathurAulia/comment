import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  // State untuk menyimpan pesan-pesan dalam obrolan
  const [messages, setMessages] = useState([]);

  // Referensi untuk elemen pesan terakhir agar dapat di-scroll ke tampilan
  const scrollRef = useRef();

  // State untuk menyimpan pesan yang baru saja diterima
  const [arrivalMessage, setArrivalMessage] = useState(null);

  // Ambil pesan-pesan awal ketika obrolan berubah
  useEffect(async () => {
    // Ambil data pengguna dari local storage
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    // Kirim permintaan ke server untuk mendapatkan pesan-pesan untuk obrolan saat ini
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });

    // Perbarui state pesan dengan data yang diterima
    setMessages(response.data);
  }, [currentChat]);

  // Ambil detail obrolan saat ini
  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        // Ambil data pengguna dari local storage (tidak digunakan dalam useEffect ini)
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  // Fungsi untuk menangani pengiriman pesan baru
  const handleSendMsg = async (msg) => {
    // Ambil data pengguna dari local storage
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    // Emit event "send-msg" ke server socket
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    // Kirim permintaan ke server untuk menyimpan pesan yang dikirim
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    // Tambahkan pesan yang dikirim ke state pesan
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  // Set up event listener untuk menerima pesan dari server socket
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  // Perbarui state pesan ketika pesan baru diterima
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // Scroll ke pesan terakhir ketika state pesan berubah
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Render komponen kontainer obrolan
  return (
    <Container>
      {/* Bagian header obrolan */}
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>

      {/* Bagian pesan-pesan obrolan */}
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bagian input obrolan */}
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

/*kode ini merupakan komponen obrolan dalam aplikasi React yang menggunakan styled-components untuk gaya tampilan dan axios untuk melakukan permintaan HTTP. 
Komponen ini terhubung ke server WebSocket (socket) untuk mengirim dan menerima pesan. Komponen ini mengelola state pesan, mendengarkan pesan yang masuk, dan menangani pengiriman pesan baru. Pesan-pesan ditampilkan dalam obrolan, dengan setiap pesan dirender sebagai elemen div terpisah. */
