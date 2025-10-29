# TODO: Menambahkan API RSVP dengan Firebase Firestore

## Tugas Utama
- [x] Update invite-classic.html dengan Firebase SDK dan fungsi submit RSVP
- [x] Update invite-minimal.html dengan Firebase SDK dan fungsi submit RSVP
- [x] Update invite-tradisional.html dengan Firebase SDK dan fungsi submit RSVP
- [x] Test penyimpanan data RSVP ke Firestore (Server local berhasil dijalankan di port 8000)
- [x] Perbaiki event handler form RSVP untuk mencegah page refresh
- [x] Ganti placeholder konfigurasi Firebase dengan key asli dari Firebase console
- [x] Integrasi Fetch API dari Quotes API (https://api.quotable.io/) untuk menampilkan kutipan romantis secara dinamis
- [x] Tambahkan musik latar pernikahan "Rio Clappy - Bunga Abadi" dengan auto-play di semua template undangan

## Langkah Implementasi
1. Tambahkan Firebase SDK via CDN di head template undangan
2. Inisialisasi Firebase dengan konfigurasi placeholder
3. Buat fungsi submitRSVP yang mengirim data form ke Firestore
4. Update form onsubmit untuk memanggil fungsi baru
5. Tambahkan feedback loading dan success/error message
6. Tambahkan elemen audio dengan auto-play musik latar pernikahan

## Catatan
- Gunakan placeholder untuk apiKey, authDomain, dll. Ganti dengan key asli dari Firebase console.
- Pastikan Firestore Database diaktifkan di Firebase project.
- Test dengan data dummy untuk memastikan penyimpanan berhasil.
- Musik latar diatur dengan volume rendah (0.3) untuk tidak mengganggu pengalaman pengguna.
