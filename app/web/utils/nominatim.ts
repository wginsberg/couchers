const MIN_IMPORTANCE_SCORE = 0.4;
const MIN_RESULTS_LENGTH = 3;

export interface NominatimPlace {
  address: {
    [city: string]: string;
    state_district: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: Array<string>;
  category: string;
  display_name: string;
  icon: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_type: string;
  osm_id: string;
  place_id: number;
  place_rank: number;
  type: string;
}

export const simplifyPlaceDisplayName = (place: NominatimPlace) => {
  const addressFields = [
    "village",
    "town",
    "neighbourhood",
    "suburb",
    "city",
    "state",
    "country",
  ];

  const addressParts: Array<string> = [];

  for (const field of addressFields) {
    if (field in place.address) {
      addressParts.push(place.address[field]);
    }
  }
  return addressParts.join(", ");
};

export const filterDuplicatePlaces = (places: NominatimPlace[] = []) => {
  const deduplicatedPlaces = places.reduce((previousRecord, currentPlace) => {
    const importance = currentPlace.importance ?? 0;
    const displayName = simplifyPlaceDisplayName(currentPlace);

    return previousRecord[displayName]?.importance >= importance
      ? previousRecord
      : { ...previousRecord, [displayName]: currentPlace };
  }, {} as Record<string, NominatimPlace>);

  return Object.values(deduplicatedPlaces);
};

export const filterImportantPlaces = (places: NominatimPlace[] = []) => {
  const importantPlaces = places.filter(
    ({ importance }) => importance >= MIN_IMPORTANCE_SCORE
  );
  const unimportantPlaces = places.filter(
    ({ importance = 0 }) => importance < MIN_IMPORTANCE_SCORE
  );

  const numPlacesToPad = Math.max(
    0,
    MIN_RESULTS_LENGTH - importantPlaces.length
  );

  return [...importantPlaces, ...unimportantPlaces.slice(0, numPlacesToPad)];
};
