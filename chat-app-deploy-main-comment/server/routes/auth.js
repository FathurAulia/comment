const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController"); // Mengimpor fungsi-fungsi dari file userController.

const router = require("express").Router(); // Membuat instance dari Express Router.

router.post("/login", login); // Mendefinisikan rute POST untuk endpoint /login yang akan diproses oleh fungsi login dari userController.
router.post("/register", register); // Mendefinisikan rute POST untuk endpoint /register yang akan diproses oleh fungsi register dari userController.
router.get("/allusers/:id", getAllUsers); // Mendefinisikan rute GET untuk endpoint /allusers/:id yang akan diproses oleh fungsi getAllUsers dari userController.
router.post("/setavatar/:id", setAvatar); // Mendefinisikan rute POST untuk endpoint /setavatar/:id yang akan diproses oleh fungsi setAvatar dari userController.
router.get("/logout/:id", logOut); // Mendefinisikan rute GET untuk endpoint /logout/:id yang akan diproses oleh fungsi logOut dari userController.

module.exports = router; // Mengekspor router agar dapat digunakan di file lain.

/*file ini menentukan rute-rute yang terkait dengan fitur otentikasi dan pengguna (login, registrasi, mengambil semua pengguna, mengatur avatar pengguna, dan logout). 
Rute-rute ini akan diproses oleh fungsi-fungsi yang diimpor dari file userController, yang kemudian akan menangani logika bisnis yang sesuai untuk setiap permintaan. 
Setelah rute-rute ini didefinisikan, router diekspor sehingga dapat digunakan oleh aplikasi utama untuk dipasangkan dengan rute-rute lainnya. */
