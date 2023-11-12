import { Dispatch, SetStateAction } from "react";

export interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

export interface PlaceType {
  place_id: string;
  description: string;
  structured_formatting: any;
}

export interface GoogleMapsButtonProps {
  GOOGLE_MAPS_API_KEY: any;
  required: boolean;
  value: PlaceType | null;
  setValue: Dispatch<SetStateAction<PlaceType>>;
}

export interface ListProps {
  pontos: PlaceType[];
  setPontos: Dispatch<SetStateAction<PlaceType[]>>;
}
