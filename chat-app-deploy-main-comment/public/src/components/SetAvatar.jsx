import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

/*Kode di atas merupakan halaman SetAvatar dalam aplikasi React yang digunakan untuk memungkinkan pengguna untuk memilih dan mengatur avatar sebagai gambar profil mereka. 
Komponen ini memiliki beberapa bagian utama:

URL API (api):
URL API untuk mengambil avatar dari multiavatar.com.

Hook useNavigate:
Dari react-router-dom, hook ini digunakan untuk mendapatkan fungsi navigate yang berguna untuk mengalihkan pengguna ke halaman lain.

State:
avatars digunakan untuk menyimpan daftar avatars yang akan ditampilkan.
isLoading digunakan untuk menunjukkan status loading (memuat) saat avatars sedang diambil dari API.
selectedAvatar digunakan untuk menyimpan indeks avatar yang dipilih oleh pengguna.

Opsi toast (toastOptions):
Digunakan untuk menentukan opsi tampilan toast yang muncul saat terjadi notifikasi.

Efek Samping:
Di dalam useEffect, memastikan pengguna telah login sebelum mengakses halaman SetAvatar.
Di dalam useEffect, memuat daftar avatars dari API multiavatar.com dan menyimpannya ke dalam state avatars.
Fungsi setProfilePicture:

Fungsi ini akan dipanggil saat pengguna mengklik tombol "Set as Profile Picture".
Jika pengguna belum memilih avatar, akan ditampilkan pesan toast untuk memilih avatar terlebih dahulu.
Jika pengguna telah memilih avatar, akan mengirim permintaan HTTP ke server untuk mengatur gambar profil pengguna dengan avatar yang dipilih. Jika berhasil, pengguna akan dialihkan kembali ke halaman utama (navigate("/")).

Render:
Jika sedang memuat (isLoading), akan menampilkan loader.
Jika sudah memuat, akan menampilkan daftar avatars yang dapat dipilih, tombol "Set as Profile Picture", dan pesan toast yang sesuai dengan tindakan pengguna.

Styling:
Dalam komponen styled-components, kode di atas mendefinisikan gaya (styling) untuk halaman SetAvatar. Beberapa gaya seperti warna, tata letak, dan ukuran diatur dalam kode tersebut. */
