'use server'




export async function fetchProductDescription(productId: number): Promise<string> {
  try {
    const response = await fetch(
      `https://apigw.trendyol.com/discovery-pdp-websfxcomponentread-santral/${productId}?campaignId=61&listingId=ec68d2ee4671e226ddf651b1b3505e9b&maxSaleLimit=10&merchantName=AVVA&channelId=1` // kendi endpoint'inle değiştir
    );

    const data = await response.json();

    const descriptions = data?.result?.descriptions || [];

    const relevantDescriptions = descriptions
      .filter(
        (desc: any) => desc.priority === 0 && desc.viewType === "inline"
      )
      .map((desc: any) => desc.text?.trim())
      .filter(Boolean);

    return relevantDescriptions.join("\n") || "Açıklama bulunamadı.";
  } catch (error) {
    console.error("🔴 Açıklama çekilirken hata:", error);
    return "Açıklama alınamadı.";
  }
}

