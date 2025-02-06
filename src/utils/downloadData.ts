import { setCardData } from "./cardDataManager";
import { formatCardData } from "./formatCardData";

export async function downloadData() {
  try {
    const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&sort=name");
    if(response) {
      const responseJson = await response.json();
      const cartData = formatCardData(responseJson.data);
  
      setCardData(cartData);
    }
  } catch (error) {
    console.error("Erro ao baixar dados:", error);
  }
}
