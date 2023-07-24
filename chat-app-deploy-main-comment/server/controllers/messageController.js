const Messages = require("../models/messageModel"); // Mengimpor model Messages dari file messageModel yang berisi definisi skema untuk koleksi pesan.

// Fungsi untuk mendapatkan daftar pesan antara dua pengguna tertentu.
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body; // Mendapatkan nilai 'from' dan 'to' dari body permintaan.

    // Menggunakan model Messages untuk mencari pesan-pesan antara pengguna 'from' dan 'to'.
    // Menggunakan $all operator untuk mencari dokumen yang memiliki kedua nilai 'from' dan 'to' dalam array 'users'.
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 }); // Mengurutkan pesan berdasarkan updatedAt secara menaik (ascending).

    // Proyeksikan hasil pesan agar hanya mengandung properti yang dibutuhkan.
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from, // Menandai apakah pesan berasal dari pengguna yang mengirim permintaan ('from') atau bukan.
        message: msg.message.text, // Mengambil isi teks pesan.
      };
    });

    // Mengirimkan daftar pesan yang telah diproyeksikan sebagai respons JSON.
    res.json(projectedMessages);
  } catch (ex) {
    next(ex); // Menangani kesalahan dan meneruskannya ke middleware berikutnya untuk penanganan kesalahan.
  }
};

// Fungsi untuk menambahkan pesan baru ke dalam koleksi pesan.
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body; // Mendapatkan nilai 'from', 'to', dan 'message' dari body permintaan.

    // Membuat dokumen pesan baru menggunakan model Messages.
    const data = await Messages.create({
      message: { text: message }, // Menyimpan isi teks pesan dalam properti 'text'.
      users: [from, to], // Menyimpan array pengguna terkait dalam properti 'users'.
      sender: from, // Menyimpan pengguna pengirim pesan dalam properti 'sender'.
    });

    // Jika data berhasil disimpan, mengirimkan respons JSON dengan pesan sukses.
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex); // Menangani kesalahan dan meneruskannya ke middleware berikutnya untuk penanganan kesalahan.
  }
};

/* file ini berisi dua fungsi untuk mengelola pesan. 
Fungsi getMessages digunakan untuk mendapatkan daftar pesan antara dua pengguna tertentu berdasarkan nilai from dan to yang diterima dari body permintaan. 
Fungsi ini akan mencari pesan-pesan dengan menggunakan model Messages, mengurutkan pesan berdasarkan waktu pembaruan (updatedAt), dan mengirimkan daftar pesan yang telah diproyeksikan ke dalam format JSON sebagai respons.
Fungsi addMessage digunakan untuk menambahkan pesan baru ke dalam koleksi pesan berdasarkan nilai from, to, dan message yang diterima dari body permintaan. 
Fungsi ini akan membuat dokumen pesan baru menggunakan model Messages dan menyimpannya ke dalam database. Jika data berhasil disimpan, fungsi ini akan mengirimkan respons JSON dengan pesan sukses, jika tidak berhasil, akan dikirimkan pesan gagal.*/
