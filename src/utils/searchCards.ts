import { CardInterface } from "../types/CardInterface";
import { getCardData } from "./cardDataManager";

interface ISearchCardsProps {
  filters: Record<string, string | number>;
  pageNumber?: number;
}

export async function searchCards(props: ISearchCardsProps) {
  const entitiesPerPage = 10;
  let cardsData = (await getCardData()) as CardInterface[];
  const pageNumber = props.pageNumber ? props.pageNumber : 1;
  const hasFilter = hasValidFilter(props.filters);

  if (hasFilter) {
    Object.keys(props.filters).forEach((key) => {
      if (
        (props.filters[key] && props.filters[key].toString().length > 0)
      ) {
        cardsData = cardsData.filter((card) => {
          if (key === "name") {
            if (card.name.toLocaleLowerCase().includes((props.filters[key] as string).toLocaleLowerCase())) {
              return true;
            } else {
              return false;
            }
          } if (key === "category") {
            if (card.category.includes((props.filters[key] as string))) {
              return true;
            } else {
              return false;
            }
          } else if (key === "level") {
            if (
              (card.level !== "0" && (card.level === props.filters[key] || card.linkRate === props.filters[key])) ||
              (card.level === "0" && card.category !== "link" && (card.level === props.filters[key] || card.linkRate === props.filters[key]))
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            if ((card as unknown as Record<string, unknown>)[key] === props.filters[key]) {
              return true;
            } else {
              return false;
            }
          }
        });
      }
    });
  }

  return {
    data: cardsData.slice(
      (pageNumber - 1) * entitiesPerPage,
      (pageNumber - 1) * entitiesPerPage + entitiesPerPage
    ),
    numberOfPages: Math.ceil(cardsData.length / entitiesPerPage),
  };
}

function hasValidFilter(obj: Record<string, unknown>): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (
        value !== null &&
        value !== undefined &&
        value !== ""
      ) {
        return true;
      }
    }
  }
  return false;
}
