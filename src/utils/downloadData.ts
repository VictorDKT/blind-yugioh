import { formatCardData } from "./formatCardData";

export async function downloadData() {
    try {
        const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&sort=name");
        const responseJson = await response.json();

        return formatCardData(responseJson.data);
    } catch (error) {
        console.error("Erro ao baixar dados:", error);
    }
}
