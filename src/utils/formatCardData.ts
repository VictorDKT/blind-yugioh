import { CardInterface } from "../types/CardInterface";
import { formatArrayToSentence } from "./formatArrayToSentence";

export function formatCardData(cardList: Record<string, unknown>[]) {
  return cardList.map((card) => {
    return {
      cardCode: (card.id as number).toString(),
      name: card.name,
      characteriscs: card.type,
      category: card.frameType,
      description: card.desc,
      atk: typeof card.atk === "number" ? card.atk === -1 ? "?" : card.atk.toString() : undefined,
      def: typeof card.def === "number" ? card.atk === -1 ? "?" : card.def.toString() : undefined,
      level: card.level ? card.level.toString() : undefined,
      type: card.race,
      attribute: card.attribute,
      scale: card.scale ? card.scale.toString() : undefined,
      linkRate: card.linkval ? card.linkval.toString() : undefined,
      linkMarkers: card.linkmarkers && (card.linkmarkers as string[]).length > 0 ? formatLinkMarkersLabel(card.linkmarkers as string[]) : undefined,
    } as CardInterface;
  });
}

function formatLinkMarkersLabel(linkMarkers: string[]) {
  const linkMarkersLabels: Record<string, string> = {
    Top: "Cima",
    Bottom: "Baixo",
    Left: "Esquerda",
    Right: "Direita",
    "Bottom-Left": "Inferior esquerda",
    "Bottom-Right": "Inferior direita",
    "Top-Left": "Superior esquerda",
    "Top-Right": "Superior direita",
  };
  const translatedLinkMarkers = linkMarkers.map(marker=>linkMarkersLabels[marker]);

  return formatArrayToSentence(translatedLinkMarkers);
}
