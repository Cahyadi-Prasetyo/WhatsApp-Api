// whatsapp-api/index.js
const express = require("express");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const QRCode = require("qrcode");

const app = express();
app.use(express.json());

let sock;

async function startSock() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
  });

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", async ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log("📱 Scan QR Code:");
      QRCode.toString(qr, { type: "terminal", small: true }, (err, url) => {
        if (err) return console.error("❌ QR Error:", err.message);
        console.log(url);
      });
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      console.log("🔌 Disconnected, reason:", reason);
      if (reason !== 401) startSock();
      else console.log("❌ Unauthorized. Hapus folder ./auth dan scan ulang QR.");
    }

    if (connection === "open") {
      console.log("✅ WhatsApp connected");
    }
  });
  return WebSocket;
}

startSock().then((s) => {
    sock = s;
  });
  

app.post("/send-wa", async (req, res) => {
  const { number, message } = req.body;
  if (!number || !message) {
    return res.status(400).json({ success: false, error: "Number and message required" });
  }

  try {
    console.log("📤 Sending to:", number, "Message:", message);
    await sock.sendMessage(`${number}@s.whatsapp.net`, { text: message });
    res.json({ success: true, message: "Message sent" });
  } catch (err) {
    console.error("❌ Send failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Baileys API ready at http://localhost:3000");
});
