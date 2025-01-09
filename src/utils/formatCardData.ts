import { CardInterface } from "../types/CardInterface";

export function formatCardData(cardList: Record<string, unknown>[]) {
    return cardList.map((card)=>{
        return {
            cardCode: (card.id as number).toString(),
            name: card.name,
            type: card.type,
            frameType: card.frameType,
            description: card.desc,
            atk: card.atk,
            def: card.def,
            level: card.level,
            race: card.race,
            attribute: card.attribute,
            scale: card.scale, 
            linkRate: card.linkval,
            linkMarkers: formatLinkMarkersLabel(card.linkMarkers as string[]),
        } as CardInterface;
    });
}

function formatLinkMarkersLabel(linkMarkers?: string[]) {
    let linkMarkersLabel = "";
    const linkMarkersLabels: Record<string, string> = {
        "Top": "Cima",
        "Bottom": "Baixo",
        "Left": "Esquerda",
        "Right": "Direita",
        "Bottom-Left": "Inferior esquerda",
        "Bottom-Right": "Inferior direita", 
        "Top-Left": "Superior esquerda",
        "Top-Right": "Superior direita",
    };

    linkMarkers && linkMarkers.forEach((marker, index)=>{
        linkMarkersLabel = linkMarkersLabel + linkMarkersLabels[marker] + (index+1 !== linkMarkers.length ? ", " : "");
    });

    return linkMarkers ? linkMarkersLabel : undefined;
}
