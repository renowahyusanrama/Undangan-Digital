import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';

// Initialize EmailJS with public key
emailjs.init('xWVSKIZ7kkEPsUPYX');

const firebaseConfig = {
  apiKey: "AIzaSyCw0DuB0b_2xyLyae4rheKP0zxg9uG4TKs",
  authDomain: "momen-lkita.firebaseapp.com",
  projectId: "momen-lkita",
  storageBucket: "momen-lkita.firebasestorage.app",
  messagingSenderId: "303834377913",
  appId: "1:303834377913:web:78c5fdf422ec8fb1fc7568",
  measurementId: "G-KV17XXM2CD"
};

let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
}

async function submitRSVP(form) {
  console.log('submitRSVP called with form:', form);

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  try {
    console.log('Starting RSVP submission');
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    console.log('Form data:', Object.fromEntries(formData));
    const rsvpData = {
      nama: formData.get('nama'),
      email: formData.get('email'),
      kehadiran: formData.get('kehadiran'),
      jumlahTamu: parseInt(formData.get('jumlahTamu')) || 1,
      ucapan: formData.get('ucapan'),
      timestamp: new Date(),
      template: 'tradisional'
    };

    console.log('RSVP Data:', rsvpData);

    if (db) {
      console.log('Saving to Firestore');
      await addDoc(collection(db, "rsvp"), rsvpData);
      console.log('Data saved to Firestore');
    } else {
      throw new Error('Firestore not initialized');
    }

    console.log('Sending email');
    await emailjs.send(
      'service_d291klq',
      'template_uq1ktop',
      {
        to_email: rsvpData.email,
        nama: rsvpData.nama,
        kehadiran: rsvpData.kehadiran,
        jumlahTamu: rsvpData.jumlahTamu,
        ucapan: rsvpData.ucapan,
        tanggal_acara: 'Senin, 2 Februari 2026',
        lokasi: 'Universitas Muhammadiyah Malang (UMM)'
      }
    );

    console.log('Email sent successfully');
    alert('Terima kasih! Konfirmasi kehadiran berhasil dikirim. Email konfirmasi telah dikirim ke ' + rsvpData.email);
    form.reset();

  } catch (error) {
    console.error('Error menyimpan RSVP:', error);
    console.log('Error details:', error);
    alert('Maaf, terjadi kesalahan: ' + error.message + '. Silakan coba lagi.');
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }

  return false;
}

document.addEventListener('DOMContentLoaded', function() {
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(event) {
      event.preventDefault();
      submitRSVP(this);
    });
  }
});