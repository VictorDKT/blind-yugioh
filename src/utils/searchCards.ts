import { CardInterface } from "../types/CardInterface";
import { getCardData } from "./cardDataManager";

interface ISearchCardsProps {
  filters: Record<string, string | number>;
  pageNumber?: number;
}

export async function searchCards(props: ISearchCardsProps) {
  const entitiesPerPage = 10;
  const cardsData = (await getCardData()) as CardInterface[];
  const pageNumber = props.pageNumber ? props.pageNumber : 1;
  let filteredData: CardInterface[] = [];
  const hasFilter = hasValidFilter(props.filters);

  if (hasFilter) {
    Object.keys(props.filters).forEach((key) => {
      if (
        (props.filters[key] && !isNaN(props.filters[key] as number)) ||
        props.filters[key].toString().length > 0
      ) {
        cardsData.forEach((card) => {
          if (key === "name") {
            if (card.name.toLocaleLowerCase().includes((props.filters[key] as string).toLocaleLowerCase())) {
              filteredData.push(card);
            }
          } else if (key === "level") {
            if (
              card.level === props.filters[key] ||
              card.linkRate === props.filters[key]
            ) {
              filteredData.push(card);
            }
          } else {
            if (card.name === props.filters[key]) {
              filteredData.push(card);
            }
          }
        });
      }
    });
  } else {
    filteredData = cardsData;
  }

  return {
    data: filteredData.slice(
      (pageNumber - 1) * entitiesPerPage,
      (pageNumber - 1) * entitiesPerPage + entitiesPerPage
    ),
    numberOfPages: Math.ceil(filteredData.length / entitiesPerPage),
  };
}

function hasValidFilter(obj: Record<string, unknown>): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        typeof value !== "number"
      ) {
        return true;
      }
    }
  }
  return false;
}
