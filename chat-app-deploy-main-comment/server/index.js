const express = require("express"); // Mengimpor modul Express untuk membuat server HTTP.
const cors = require("cors"); // Mengimpor modul cors untuk mengizinkan permintaan dari domain yang berbeda.
const mongoose = require("mongoose"); // Mengimpor modul mongoose untuk berinteraksi dengan MongoDB.
const authRoutes = require("./routes/auth"); // Mengimpor file dengan rute terkait otentikasi.
const messageRoutes = require("./routes/messages"); // Mengimpor file dengan rute terkait pesan.
const app = express(); // Membuat instance aplikasi Express.

const socket = require("socket.io"); // Mengimpor modul socket.io untuk komunikasi real-time.
require("dotenv").config(); // Menggunakan modul dotenv untuk mengatur variabel lingkungan dari file .env.
const path = require("path"); // Mengimpor modul path untuk mengatur jalur direktori.

app.use(cors()); // Menggunakan middleware cors untuk mengizinkan permintaan dari semua domain.
app.use(express.json()); // Middleware untuk menguraikan body permintaan sebagai JSON.

mongoose
  .connect(process.env.MONGO_URL, {
    // Menghubungkan ke database MongoDB dengan menggunakan nilai dari variabel MONGO_URL di file .env.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful"); // Jika koneksi berhasil, mencetak pesan sukses.
  })
  .catch((err) => {
    console.log(err.message); // Jika terjadi kesalahan dalam koneksi, mencetak pesan kesalahan.
  });

app.use("/api/auth", authRoutes); // Menggunakan rute terkait otentikasi dengan awalan /api/auth.
app.use("/api/messages", messageRoutes); // Menggunakan rute terkait pesan dengan awalan /api/messages.

// Static file serving
app.use(express.static(path.join(__dirname, "./public/build"))); // Mengatur direktori statis yang akan digunakan untuk menyajikan file build dari React.
app.get("*", function (req, res) {
  // Rute fallback untuk menyajikan file index.html pada semua permintaan GET yang tidak cocok dengan rute lain.
  res.sendFile(path.join(__dirname, "./public/build/index.html"));
});

const server = app.listen(process.env.PORT, () =>
  // Membuat server yang mendengarkan pada port yang ditentukan dalam variabel lingkungan PORT.
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  // Membuat instance socket.io yang terhubung dengan server yang ada.
  cors: {
    origin: "http://localhost:3000", // Mengizinkan koneksi dari domain http://localhost:3000.
    credentials: true, // Mengizinkan pengiriman kredensial seperti cookie dari klien.
  },
});

global.onlineUsers = new Map(); // Membuat variabel global untuk menyimpan informasi tentang pengguna online.
io.on("connection", (socket) => {
  // Event listener untuk saat klien terhubung melalui socket.io.
  global.chatSocket = socket; // Menyimpan instance socket.io dalam variabel global untuk digunakan nanti.

  socket.on("add-user", (userId) => {
    // Event listener untuk saat klien menambahkan pengguna baru.
    onlineUsers.set(userId, socket.id); // Menambahkan pengguna baru ke dalam Map onlineUsers dengan ID socket sebagai nilainya.
  });

  socket.on("send-msg", (data) => {
    // Event listener untuk saat klien mengirimkan pesan.
    const sendUserSocket = onlineUsers.get(data.to); // Mendapatkan ID socket penerima pesan dari Map onlineUsers berdasarkan ID pengguna yang akan menerima pesan.
    if (sendUserSocket) {
      // Jika socket penerima ditemukan.
      socket.to(sendUserSocket).emit("msg-receive", data.msg); // Mengirimkan pesan ke socket penerima dengan event "msg-receive".
    }
  });
});

/* Kode di atas adalah implementasi dari server untuk aplikasi real-time chat yang menggunakan teknologi Socket.IO. 
Berikut adalah penjelasan untuk setiap bagian utamanya:

Mengimpor Modul dan Middleware:
express digunakan untuk membuat aplikasi web server.
cors digunakan untuk mengatasi masalah kebijakan lintas sumber (CORS).
mongoose digunakan untuk menghubungkan aplikasi dengan MongoDB.
authRoutes dan messageRoutes adalah modul rute untuk mengelola permintaan terkait autentikasi dan pesan.
app adalah aplikasi express yang akan digunakan sebagai server.

Mengatur Koneksi ke MongoDB:
Mongoose digunakan untuk menghubungkan aplikasi dengan MongoDB menggunakan URL yang disimpan dalam variabel lingkungan MONGO_URL.
Jika koneksi berhasil, akan mencetak "DB Connection Successful", jika tidak, akan mencetak pesan kesalahan.

Menggunakan Middleware:
app.use(cors()) mengizinkan permintaan dari domain lain.
app.use(express.json()) menguraikan data permintaan berformat JSON.

Menggunakan Rute:
Rute /api/auth digunakan untuk mengelola permintaan terkait autentikasi pengguna.
Rute /api/messages digunakan untuk mengelola permintaan terkait pesan.

Membuat Server HTTP:
Server HTTP dibuat dengan menggunakan app.listen() pada port yang disimpan dalam variabel lingkungan PORT.

Mengatur Koneksi Socket.IO:
Objek io digunakan untuk mengatur koneksi Socket.IO dengan menggunakan server HTTP yang telah dibuat.
Pengaturan cors digunakan untuk mengizinkan koneksi dari http://localhost:3000 (alamat asal aplikasi frontend) dengan menggunakan credentials: true.

Menggunakan Objek Global:
Digunakan untuk menyimpan daftar pengguna online (onlineUsers) menggunakan Map().

Mengatur Event 'connection' pada Socket.IO:
Saat klien terhubung ke Socket.IO, event 'connection' terjadi.
Socket menyimpan ID klien dengan global.chatSocket = socket.

Mengatur Event 'add-user':
Event 'add-user' digunakan untuk menambahkan pengguna ke daftar onlineUsers dengan pasangan ID pengguna dan ID socket.

Mengatur Event 'send-msg':
Event 'send-msg' digunakan untuk mengirim pesan kepada pengguna lain yang memiliki ID yang dituju (data.to).
Jika pengguna yang dituju online, pesan akan dikirim menggunakan socket.to untuk mengirim pesan ke socket pengguna tersebut.
*/
