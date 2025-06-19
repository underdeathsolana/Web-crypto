document.getElementById("tokenForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const ca = document.getElementById("contractInput").value.trim();

  if (!ca) return alert("Contract Address tidak boleh kosong!");

  const tokenGrid = document.getElementById("tokenGrid");
  tokenGrid.innerHTML = `<p style="color:#ff0;">Loading...</p>`;

  try {
    // Ganti URL API berikut sesuai layanan yang kamu gunakan (misal: dari bot kamu nanti)
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${ca}`);
    const json = await res.json();
    const token = json.pairs[0];

    const html = `
      <div class="token-card">
        <h3>${token.baseToken.symbol}</h3>
        <p>Name: ${token.baseToken.name}</p>
        <p>Price: $${parseFloat(token.priceUsd).toFixed(6)}</p>
        <p>LP: $${token.liquidity.usd.toLocaleString()}</p>
        <p>Volume 24H: $${token.volume.h24.toLocaleString()}</p>
        <p>FDV: $${token.fdv ? token.fdv.toLocaleString() : 'N/A'}</p>
        <a href="${token.url}" target="_blank">🔍 View on Dex</a>
      </div>
    `;

    tokenGrid.innerHTML = html;
  } catch (err) {
    console.error(err);
    tokenGrid.innerHTML = `<p style="color:red;">Gagal fetch data. Pastikan contract address benar.</p>`;
  }
});
