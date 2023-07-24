const User = require("../models/userModel"); // Mengimpor model User dari file userModel yang berisi definisi skema untuk koleksi pengguna.
const bcrypt = require("bcrypt"); // Mengimpor modul bcrypt untuk mengenkripsi dan memeriksa kecocokan kata sandi.

// Fungsi untuk melakukan proses login pengguna.
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body; // Mendapatkan nilai 'username' dan 'password' dari body permintaan.
    const user = await User.findOne({ username }); // Mencari pengguna berdasarkan 'username' yang diberikan.

    // Jika pengguna dengan username tersebut tidak ditemukan, kembalikan respons dengan pesan kesalahan.
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // Memeriksa kecocokan kata sandi yang dimasukkan dengan kata sandi yang tersimpan dalam database.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Jika kata sandi tidak cocok, kembalikan respons dengan pesan kesalahan.
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    delete user.password; // Menghapus properti 'password' dari objek pengguna sebelum mengirimkan respons.

    // Mengirimkan respons dengan status true dan data pengguna setelah berhasil login.
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex); // Menangani kesalahan dan meneruskannya ke middleware berikutnya untuk penanganan kesalahan.
  }
};

// Fungsi untuk melakukan proses registrasi pengguna baru.
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body; // Mendapatkan nilai 'username', 'email', dan 'password' dari body permintaan.

    // Memeriksa apakah username yang diberikan sudah digunakan oleh pengguna lain.
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    // Memeriksa apakah email yang diberikan sudah digunakan oleh pengguna lain.
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    // Mengenkripsi kata sandi sebelum menyimpannya dalam database.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat dokumen pengguna baru menggunakan model User dan menyimpannya ke dalam database.
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password; // Menghapus properti 'password' dari objek pengguna sebelum mengirimkan respons.

    // Mengirimkan respons dengan status true dan data pengguna setelah berhasil registrasi.
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex); // Menangani kesalahan dan meneruskannya ke middleware berikutnya untuk penanganan kesalahan.
  }
};

// Fungsi untuk mendapatkan daftar semua pengguna, kecuali pengguna dengan ID tertentu.
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]); // Mencari semua pengguna dengan ID yang tidak sama dengan ID yang diberikan.

    // Mengirimkan daftar pengguna dalam format JSON sebagai respons.
    return res.json(users);
  } catch (ex) {
    next(ex); // Menangani kesalahan dan meneruskannya ke middleware berikutnya untuk penanganan kesalahan.
  }
};

// Fungsi untuk mengatur gambar avatar pengguna.
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id; // Mendapatkan ID pengguna dari parameter permintaan.
    const avatarImage = req.body.image; // Mendapatkan URL gambar avatar dari body permintaan.

    // Menggunakan model User untuk mencari dan memperbarui data pengguna dengan ID yang diberikan.
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true, // Mengatur isAvatarImageSet menjadi true, menandakan bahwa gambar avatar sudah diatur.
        avatarImage, // Menyimpan URL gambar avatar dalam properti avatarImage.
      },
      { new: true } // Opsi new: true mengembalikan dokumen yang diperbarui sebagai respons.
    );

    // Mengirimkan respons dengan informasi apakah gambar avatar telah diatur dan URL gambar avatar.
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex); // Menangani kesalahan dan meneruskannya ke middleware berikutnya untuk penanganan kesalahan.
  }
};

// Fungsi untuk menghapus pengguna dari daftar pengguna online saat logout.
module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });

    onlineUsers.delete(req.params.id); // Menghapus pengguna dengan ID yang diberikan dari daftar pengguna online.

    return res.status(200).send(); // Mengirimkan respons dengan status OK (200).
  } catch (ex) {
    next(ex); // Menangani kesalahan dan meneruskannya ke middleware berikutnya untuk penanganan kesalahan.
  }
};

/*  file tersebut berisi fungsi-fungsi yang digunakan untuk mengelola autentikasi pengguna dan beberapa fitur lainnya, seperti registrasi, mendapatkan daftar pengguna, mengatur gambar avatar pengguna, dan logout. 
Setiap fungsi ini akan berinteraksi dengan model User yang mewakili koleksi pengguna dalam database MongoDB. Fungsi-fungsi ini akan memproses data yang diterima dari permintaan, melakukan operasi pada database, dan mengirimkan respons sesuai dengan hasil operasi tersebut. 
Jika terjadi kesalahan, fungsi-fungsi tersebut akan menangani kesalahan dan meneruskannya ke middleware berikutnya untuk penanganan kesalahan.*/
