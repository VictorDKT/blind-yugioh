import { CardInterface } from "../types/CardInterface";
import { getCardData } from "./cardDataManager";

interface ISearchCardsProps {
    filters?: {
        key: string,
        value: string | number,
    }[],
    pageNumber?: number,
}

export async function searchCards(props: ISearchCardsProps) {
    const entitiesPerPage = 10;
    const cardsData = await getCardData() as CardInterface[];

    let filteredData: CardInterface[] = [];
    const pageNumber = props.pageNumber ? props.pageNumber : 1;

    if(props.filters) {
        props.filters.forEach(filter=>{
            cardsData.forEach(card=>{
                if(filter.key === "name") {
                    if(card.name.includes(filter.value as string)) {
                        filteredData.push(card);
                    }
                } else {
                    if(card.name === filter.value) {
                        filteredData.push(card);
                    }
                }
            })
        });
    } else {
        filteredData = cardsData;
    }

    return {
        data: filteredData.slice((pageNumber-1)*entitiesPerPage, (pageNumber-1)*entitiesPerPage+entitiesPerPage),
        numberOfPages: Math.floor(filteredData.length / entitiesPerPage),
    };
}
