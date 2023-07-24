import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  // State untuk menyimpan nama pengguna
  const [userName, setUserName] = useState("");

  // Efek samping untuk mendapatkan nama pengguna dari local storage saat komponen dipasang (mount)
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  // Render halaman welcome
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

/*Kode di atas merupakan halaman Welcome dalam aplikasi React yang digunakan untuk menyambut pengguna saat mereka masuk ke aplikasi. 
Komponen ini memiliki beberapa bagian utama:

State:
userName digunakan untuk menyimpan nama pengguna.

Efek Samping:
Di dalam useEffect, efek samping ini akan dipanggil saat komponen Welcome dipasang (mounted) ke dalam DOM.
Di dalamnya, kita mendapatkan nama pengguna dari local storage menggunakan localStorage.getItem() dan JSON.parse().
Nama pengguna kemudian disimpan dalam state userName menggunakan setUserName().

Render:
Komponen akan merender pesan sambutan dengan nama pengguna yang diambil dari state userName.
Sebuah gambar robot (Robot) ditampilkan di samping pesan sambutan.
Pesan sambutan menyarankan pengguna untuk memilih obrolan untuk mulai mengirim pesan.

Styling:
Dalam komponen styled-components, kode di atas mendefinisikan gaya (styling) untuk halaman Welcome. Beberapa gaya seperti warna, tata letak, dan ukuran diatur dalam kode tersebut. */
