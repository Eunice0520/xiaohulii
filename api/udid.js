import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getApps } from 'firebase/app';

// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyAWy8sDmp5Y2gL8UHij8q8GU9u4cj2Qfng",
  authDomain: "xiaohuli-sign.firebaseapp.com",
  projectId: "xiaohuli-sign",
  storageBucket: "xiaohuli-sign.firebasestorage.app",
  messagingSenderId: "827825939368",
  appId: "1:827825939368:web:21e2ccaa12e74e8c57739d"
};

// 初始化 Firebase（避免重複初始化）
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

// 主 handler
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { UDID, IMEI, ICCID, VERSION, PRODUCT } = req.body;

      await addDoc(collection(db, 'udids'), {
        udid: UDID || 'unknown',
        imei: IMEI || 'unknown',
        iccid: ICCID || 'unknown',
        version: VERSION || 'unknown',
        product: PRODUCT || 'unknown',
        timestamp: new Date()
      });

      // 回傳 redirect header 讓裝置跳轉到 udid.html 顯示畫面
      res.writeHead(301, { Location: '/udid.html' });
      res.end();
    } catch (err) {
      res.status(500).json({ error: '資料寫入失敗', details: err.message });
    }
  } else {
    res.status(405).json({ error: '僅支援 POST 方法' });
  }
}
