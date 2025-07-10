Terima kasih! Berikut ini deskripsi proyek berdasarkan kode `whatsapp-api/index.js` yang kamu berikan:

---

## 📱 WhatsApp API dengan QR Code – Node.js + Baileys

Proyek **WhatsApp API dengan Barcode (QR Code)** ini merupakan implementasi sederhana namun powerful dari integrasi WhatsApp menggunakan library [Baileys](https://github.com/WhiskeySockets/Baileys), sebuah API berbasis WhatsApp Web. Proyek ini memungkinkan pengguna untuk login WhatsApp via pemindaian QR Code dan mengirim pesan secara otomatis melalui endpoint HTTP.

### 🧩 Fitur Utama

* 🔐 **Login via QR Code Terminal**: Menampilkan QR secara langsung di terminal agar pengguna dapat login dengan cepat dan aman.
* 📤 **Kirim Pesan WhatsApp**: Endpoint `/send-wa` menerima `number` dan `message` untuk mengirim pesan teks ke WhatsApp.
* 🔄 **Reconnect Otomatis**: Jika koneksi terputus (kecuali karena unauthorized), socket akan tersambung ulang secara otomatis.
* 💾 **Multi File Auth State**: Otentikasi disimpan secara aman di folder `./auth`, memisahkan sesi login per pengguna/server.

### ⚙️ Teknologi Digunakan

* **Node.js**: Backend runtime.
* **Express.js**: HTTP server ringan untuk membuat endpoint REST.
* **Baileys**: WhatsApp Web API library.
* **QRCode**: Untuk menampilkan QR Code dalam terminal.
* **Socket Baileys**: Event-based communication untuk status koneksi dan QR.

### 📂 Struktur Utama

```
whatsapp-api/
├── auth/               # Folder penyimpanan kredensial otomatis
├── index.js            # Entry-point utama
└── package.json
```

### 🔄 Alur Kerja

1. Jalankan `node index.js`.
2. Terminal akan menampilkan QR Code.
3. Pindai dengan WhatsApp di HP untuk login.
4. Setelah koneksi terbentuk, kamu dapat mengirim pesan melalui endpoint:

   ```
   POST http://localhost:3000/send-wa
   {
     "number": "6281234567890",
     "message": "Halo, ini dari API!"
   }
   ```

### 🛡️ Penanganan Error

* Jika QR gagal ditampilkan: muncul pesan error dari QRCode lib.
* Jika koneksi ditutup karena unauthorized (`statusCode: 401`): kamu perlu hapus folder `./auth` lalu restart aplikasi.

### 🚀 Cara Menjalankan

```bash
# 1. Instal dependensi
npm install express @whiskeysockets/baileys qrcode

# 2. Jalankan server
node index.js
```
