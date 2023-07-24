const { addMessage, getMessages } = require("../controllers/messageController"); // Mengimpor fungsi-fungsi dari file messageController.

const router = require("express").Router(); // Membuat instance dari Express Router.

router.post("/addmsg/", addMessage); // Mendefinisikan rute POST untuk endpoint /addmsg/ yang akan diproses oleh fungsi addMessage dari messageController.
router.post("/getmsg/", getMessages); // Mendefinisikan rute POST untuk endpoint /getmsg/ yang akan diproses oleh fungsi getMessages dari messageController.

module.exports = router; // Mengekspor router agar dapat digunakan di file lain.

/* file ini menentukan dua rute terkait dengan fitur pesan (addMessage dan getMessages). Rute-rute ini akan diproses oleh fungsi-fungsi yang diimpor dari file messageController, yang akan menangani logika bisnis terkait dengan pesan. 
Rute-rute ini menggunakan metode HTTP POST, tetapi bisa saja menggunakan metode HTTP lain seperti GET, PUT, atau DELETE sesuai dengan kebutuhan aplikasi.
Setelah rute-rute ini didefinisikan, router diekspor sehingga dapat digunakan oleh aplikasi utama untuk dipasangkan dengan rute-rute lainnya. 
Dengan cara ini, aplikasi dapat dengan mudah mengatur dan mengelompokkan rute-rute berdasarkan fitur atau kelompok tertentu.*/
