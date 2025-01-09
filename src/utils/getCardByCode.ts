import { CardInterface } from "../types/CardInterface";
import { getCardData } from "./cardDataManager";

export async function getCardByCode(code: string) {
    const cardsData = await getCardData() as CardInterface[];

    return cardsData.find(card=>card.cardCode === code);
}
