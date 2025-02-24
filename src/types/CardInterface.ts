export interface CardInterface {
  cardCode: string;
  name: string;
  type: string;
  frameType: string;
  description: string;
  atk: number;
  def?: number;
  level?: string;
  race: string;
  attribute: string;
  scale?: number;
  linkRate?: string;
  linkMarkers?: string[];
}
