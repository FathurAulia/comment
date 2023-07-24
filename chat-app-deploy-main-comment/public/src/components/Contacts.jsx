import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  // State untuk menyimpan nama pengguna dan gambar avatar pengguna saat ini
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  // State untuk menyimpan indeks kontak yang dipilih saat ini
  const [currentSelected, setCurrentSelected] = useState(undefined);

  // Menggunakan useEffect untuk mendapatkan data pengguna saat komponen dimuat
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);

  // Fungsi untuk mengubah obrolan saat kontak dipilih
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  // Render komponen Contacts
  return (
    <>
      {/* Menampilkan konten hanya jika currentUserImage tidak kosong */}
      {currentUserImage && currentUserImage && (
        <Container>
          {/* Bagian brand/logo aplikasi */}
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>MisuhKawan</h3>
          </div>

          {/* Daftar kontak */}
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Informasi pengguna saat ini */}
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

/*Kode di atas merupakan komponen Contacts dalam aplikasi React yang digunakan untuk menampilkan daftar kontak pengguna dan informasi pengguna saat ini. Komponen ini memiliki beberapa bagian utama:

State:
currentUserName dan currentUserImage untuk menyimpan informasi nama pengguna dan gambar avatar pengguna saat ini.
currentSelected untuk menyimpan indeks kontak yang dipilih saat ini.

useEffect:
Digunakan untuk mendapatkan data pengguna saat komponen dimuat dan memperbarui state currentUserName dan currentUserImage.

Fungsi changeCurrentChat:
Fungsi ini digunakan untuk mengubah obrolan saat pengguna memilih kontak dari daftar. Fungsi ini mengubah state currentSelected dan memanggil fungsi changeChat dengan kontak yang dipilih.

Render:
Komponen ini akan menampilkan konten hanya jika currentUserImage tidak kosong.
Bagian "brand" menampilkan logo aplikasi.
Bagian "contacts" menampilkan daftar kontak dengan memetakan data kontak menggunakan .map(). Kontak yang dipilih akan diberi kelas "selected".
Bagian "current-user" menampilkan informasi pengguna saat ini, termasuk avatar dan nama pengguna.

Styling:
Dalam komponen styled-components, kode di atas mendefinisikan gaya (styling) untuk setiap bagian komponen. Beberapa gaya seperti warna, tata letak, dan ukuran diatur dalam kode tersebut. */
