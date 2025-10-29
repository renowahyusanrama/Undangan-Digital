// src/integrations.js
(() => {
  "use strict";

  // ========= Instagram Basic Display (client-side demo) =========
  // CATATAN: panggilan langsung ke graph.instagram.com dari browser
  // sering ke-block CORS / butuh proxy server. Ini hanya contoh struktur.
  const IG_ACCESS_TOKEN = "PASTE_YOUR_TOKEN_HERE"; // <-- ganti nanti
  const IG_FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink";
  const IG_LIMIT = 9;

  const GRID_SEL = "#instagram-grid";
  const MSG_SEL  = "#instagram-msg";

  async function loadInstagram() {
    const grid = document.querySelector(GRID_SEL);
    const msg  = document.querySelector(MSG_SEL);
    if (!grid) return;

    if (msg) msg.textContent = "Memuat galeri…";

    try {
      const url =
        `https://graph.instagram.com/me/media?fields=${encodeURIComponent(IG_FIELDS)}` +
        `&access_token=${encodeURIComponent(IG_ACCESS_TOKEN)}&limit=${IG_LIMIT}`;

      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const items = (data && data.data) ? data.data.slice(0, IG_LIMIT) : [];
      if (!items.length) {
        if (msg) msg.textContent = "Belum ada media yang bisa ditampilkan.";
        return;
      }

      grid.innerHTML = items.map((m) => {
        const isVideo = m.media_type === "VIDEO";
        const img = isVideo ? (m.thumbnail_url || m.media_url) : m.media_url;
        const cap = (m.caption || "").replace(/"/g, "&quot;");

        // PENTING: gunakan template literal + return SATU BARIS
        return `
          <a class="ig-item" href="${m.permalink}" target="_blank" rel="noopener" title="${cap}">
            <img loading="lazy" src="${img}" alt="${cap}" />
            ${isVideo ? '<span class="ig-badge">VIDEO</span>' : ""}
          </a>
        `;
      }).join("");

      if (msg) msg.textContent = "";
    } catch (err) {
      console.warn("[IG] gagal:", err);
      if (msg) {
        msg.innerHTML =
          'Tidak bisa memuat galeri Instagram.<br>' +
          '<small>Periksa token di <code>integrations.js</code> atau aktifkan proxy server.</small>';
      }
    }
  }

  document.addEventListener("DOMContentLoaded", loadInstagram);
})();
