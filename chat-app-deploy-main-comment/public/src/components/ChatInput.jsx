import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  // State untuk menyimpan teks pesan yang diketik pengguna
  const [msg, setMsg] = useState("");

  // State untuk menunjukkan/menyembunyikan emoji picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Fungsi untuk menampilkan/menyembunyikan emoji picker
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Fungsi untuk menangani saat pengguna memilih emoji dari picker
  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  // Fungsi untuk mengirim pesan saat pengguna menekan tombol kirim
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      {/* Bagian tombol emoji */}
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      {/* Bagian input pesan */}
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

/* Kode di atas merupakan komponen ChatInput dalam aplikasi React yang digunakan untuk memungkinkan pengguna untuk memasukkan dan mengirimkan pesan ke obrolan. Komponen ini terdiri dari dua bagian utama:

Bagian "tombol emoji":
useState digunakan untuk mengelola state msg (pesan yang diketik pengguna) dan showEmojiPicker (untuk menampilkan atau menyembunyikan emoji picker).
handleEmojiPickerhideShow adalah fungsi untuk menampilkan atau menyembunyikan emoji picker saat tombol emoji di-klik.
handleEmojiClick adalah fungsi untuk menangani saat pengguna memilih emoji dari picker.
Ketika pengguna mengklik tombol emoji (BsEmojiSmileFill), emoji picker (Picker) ditampilkan atau disembunyikan tergantung pada showEmojiPicker yang diubah oleh handleEmojiPickerhideShow.

Bagian "input pesan":
Ketika pengguna mengetik pesan, onChange akan dipanggil untuk memperbarui state msg.
Ketika pengguna menekan tombol "kirim" (IoMdSend), fungsi sendChat akan dipanggil. Jika pesan memiliki panjang lebih dari 0, pesan akan dikirim ke handleSendMsg, dan state msg akan direset menjadi string kosong.*/
