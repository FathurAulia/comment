import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  // Hook `useNavigate` dari react-router-dom digunakan untuk mengalihkan pengguna ke halaman lain
  const navigate = useNavigate();

  // Fungsi `handleClick` akan dipanggil saat tombol logout diklik
  const handleClick = async () => {
    // Mendapatkan ID pengguna dari local storage
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;

    // Mengirim permintaan HTTP untuk logout ke server menggunakan axios
    const data = await axios.get(`${logoutRoute}/${id}`);

    // Jika permintaan berhasil (status 200), hapus semua data dari local storage dan alihkan pengguna ke halaman login
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  // Render tombol logout dengan ikon power off
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

/*Kode di atas merupakan komponen Logout dalam aplikasi React yang digunakan untuk memungkinkan pengguna untuk logout dari aplikasi. Komponen ini memiliki beberapa bagian utama:

useNavigate:
Dari react-router-dom, hook ini digunakan untuk mendapatkan fungsi navigate yang berguna untuk mengalihkan pengguna ke halaman lain.

Fungsi handleClick:
Ketika tombol logout diklik, fungsi ini akan dipanggil.
Mengambil ID pengguna dari local storage menggunakan JSON.parse.
Mengirim permintaan HTTP untuk logout ke server menggunakan axios.
Jika permintaan berhasil (status 200), data dari local storage akan dihapus menggunakan localStorage.clear(), dan pengguna akan dialihkan ke halaman login menggunakan fungsi navigate.

Render:
Komponen akan merender tombol logout dengan ikon power off (BiPowerOff) yang dapat diklik.
Saat tombol tersebut diklik, fungsi handleClick akan dipanggil.

Styling:
Dalam komponen styled-components, kode di atas mendefinisikan gaya (styling) untuk tombol logout. Beberapa gaya seperti warna, tata letak, dan ukuran diatur dalam kode tersebut. */
