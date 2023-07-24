const mongoose = require("mongoose"); // Mengimpor modul mongoose untuk berinteraksi dengan MongoDB.

const MessageSchema = mongoose.Schema(
  // Membuat skema MongoDB untuk koleksi pesan.
  {
    message: {
      text: { type: String, required: true }, // Sub-skema pesan yang berisi properti "text" dengan tipe data String yang wajib diisi (required).
    },
    users: Array, // Properti "users" dengan tipe data Array yang akan digunakan untuk menyimpan daftar pengguna terkait dengan pesan.
    sender: {
      type: mongoose.Schema.Types.ObjectId, // Properti "sender" berisi tipe data ObjectId, yang akan digunakan untuk menghubungkan pesan dengan pengguna yang mengirimnya.
      ref: "User", // Mengacu ke koleksi "User" dalam database untuk menemukan pengguna yang terkait dengan pesan.
      required: true, // Menandakan bahwa properti "sender" harus diisi (required).
    },
  },
  {
    timestamps: true, // Opsi timestamps akan menambahkan properti "createdAt" dan "updatedAt" untuk menyimpan waktu pembuatan dan pembaruan data.
  }
);

module.exports = mongoose.model("Messages", MessageSchema); // Membuat model MongoDB dengan nama "Messages" berdasarkan skema MessageSchema, sehingga nantinya dapat digunakan untuk berinteraksi dengan koleksi pesan dalam database.

/* Kode di atas mendefinisikan sebuah skema MongoDB (Mongoose) untuk koleksi pesan. 
Skema ini berisi beberapa properti seperti message untuk isi pesan, users untuk menyimpan daftar pengguna terkait dengan pesan, dan sender untuk mengaitkan pesan dengan pengguna yang mengirimnya menggunakan tipe data ObjectId yang mengacu ke koleksi "User" dalam database.
Opsi timestamps: true digunakan untuk secara otomatis menambahkan dua properti waktu, yaitu createdAt dan updatedAt, yang akan menyimpan waktu pembuatan dan pembaruan data dalam dokumen pesan.
Setelah skema didefinisikan, model MongoDB dengan nama "Messages" dibuat berdasarkan skema MessageSchema. Model ini akan digunakan untuk berinteraksi dengan koleksi pesan dalam database, seperti membuat, membaca, memperbarui, atau menghapus data pesan*/
