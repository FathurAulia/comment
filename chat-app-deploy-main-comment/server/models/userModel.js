const mongoose = require("mongoose"); // Mengimpor modul mongoose untuk berinteraksi dengan MongoDB.

const userSchema = new mongoose.Schema({
  // Membuat skema MongoDB untuk koleksi pengguna (user).
  username: {
    type: String,
    required: true, // Properti "username" harus diisi (required).
    min: 3, // Minimal panjang karakter untuk properti "username" adalah 3.
    max: 20, // Maksimal panjang karakter untuk properti "username" adalah 20.
    unique: true, // Properti "username" harus unik, tidak boleh ada dua pengguna dengan username yang sama.
  },
  email: {
    type: String,
    required: true, // Properti "email" harus diisi (required).
    unique: true, // Properti "email" harus unik, tidak boleh ada dua pengguna dengan email yang sama.
    max: 50, // Maksimal panjang karakter untuk properti "email" adalah 50.
  },
  password: {
    type: String,
    required: true, // Properti "password" harus diisi (required).
    min: 8, // Minimal panjang karakter untuk properti "password" adalah 8.
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false, // Properti "isAvatarImageSet" memiliki nilai default false.
  },
  avatarImage: {
    type: String,
    default: "", // Properti "avatarImage" memiliki nilai default berupa string kosong.
  },
});

module.exports = mongoose.model("Users", userSchema); // Membuat model MongoDB dengan nama "Users" berdasarkan skema userSchema, sehingga nantinya dapat digunakan untuk berinteraksi dengan koleksi pengguna (user) dalam database.

/* Kode di atas mendefinisikan sebuah skema MongoDB (Mongoose) untuk koleksi pengguna (user). 
Skema ini berisi beberapa properti seperti username untuk nama pengguna, email untuk alamat email pengguna, password untuk kata sandi pengguna, isAvatarImageSet untuk menandakan apakah avatar (gambar profil) telah diatur atau belum, dan avatarImage untuk menyimpan URL gambar avatar pengguna.
Beberapa properti memiliki konfigurasi tambahan, seperti required yang menandakan properti tersebut harus diisi, min dan max yang menentukan batas panjang karakter untuk properti tersebut, dan unique yang menandakan bahwa nilai properti tersebut harus unik dalam koleksi.
Setelah skema didefinisikan, model MongoDB dengan nama "Users" dibuat berdasarkan skema userSchema. Model ini akan digunakan untuk berinteraksi dengan koleksi pengguna (user) dalam database, seperti membuat, membaca, memperbarui, atau menghapus data pengguna.*/
