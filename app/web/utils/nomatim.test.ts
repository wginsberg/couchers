import {
  filterDuplicatePlaces,
  filterImportantPlaces,
  NominatimPlace,
} from "./nominatim";

test("filterDuplicatePlaces function", () => {
  const places: Partial<NominatimPlace>[] = [
    {
      place_id: 1,
      importance: 0.1,
      address: {
        city: "Toronto",
        state_district: "",
        state: "Ontario",
        postcode: "",
        country: "Canada",
        country_code: "",
      },
    },
    {
      place_id: 2,
      importance: 0.9,
      address: {
        city: "Toronto",
        state_district: "",
        state: "Ontario",
        postcode: "",
        country: "Canada",
        country_code: "",
      },
    },
    {
      place_id: 3,
      importance: 0.1,
      address: {
        city: "Ottawa",
        state_district: "",
        state: "Ontario",
        postcode: "",
        country: "Canada",
        country_code: "",
      },
    },
    {
      place_id: 4,
      importance: 0.1,
      address: {
        city: "Ottawa",
        state_district: "",
        state: "Ontario",
        postcode: "",
        country: "Canada",
        country_code: "",
      },
    },
    {
      place_id: 5,
      importance: 0.2,
      address: {
        city: "Toronto",
        state_district: "",
        state: "Ohio",
        postcode: "",
        country: "United States",
        country_code: "",
      },
    },
  ];
  const expected: Partial<NominatimPlace>[] = [
    {
      place_id: 2,
      importance: 0.9,
      address: {
        city: "Toronto",
        state_district: "",
        state: "Ontario",
        postcode: "",
        country: "Canada",
        country_code: "",
      },
    },
    {
      place_id: 3,
      importance: 0.1,
      address: {
        city: "Ottawa",
        state_district: "",
        state: "Ontario",
        postcode: "",
        country: "Canada",
        country_code: "",
      },
    },
    {
      place_id: 5,
      importance: 0.2,
      address: {
        city: "Toronto",
        state_district: "",
        state: "Ohio",
        postcode: "",
        country: "United States",
        country_code: "",
      },
    },
  ];
  const actual = filterDuplicatePlaces(places as NominatimPlace[]);

  expect(actual).toEqual(expected);
});

describe("filterImportantPlaces function", () => {
  it("removes results with quality score < 0.4", () => {
    const places: Partial<NominatimPlace>[] = [
      {
        place_id: 1,
        importance: 0.8,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Ontario",
          postcode: "",
          country: "Canada",
          country_code: "",
        },
      },
      {
        place_id: 2,
        importance: 0.5,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Iowa",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
      {
        place_id: 3,
        importance: 0.5,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Kansas",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
      {
        place_id: 4,
        importance: 0.4,
        address: {
          city: "Toronto",
          state_district: "",
          state: "South Dakota",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
      {
        place_id: 5,
        importance: 0.35,
        address: {
          municipality: "okres Praha-západ",
          hamlet: "Toronto",
          state_district: "",
          state: "Central Bohemia",
          postcode: "",
          country: "Czechia",
          country_code: "",
        },
      },
    ];

    const expected: Partial<NominatimPlace>[] = [
      {
        place_id: 1,
        importance: 0.8,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Ontario",
          postcode: "",
          country: "Canada",
          country_code: "",
        },
      },
      {
        place_id: 2,
        importance: 0.5,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Iowa",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
      {
        place_id: 3,
        importance: 0.5,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Kansas",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
      {
        place_id: 4,
        importance: 0.4,
        address: {
          city: "Toronto",
          state_district: "",
          state: "South Dakota",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
    ];

    const actual = filterImportantPlaces(places as NominatimPlace[]);

    expect(actual).toEqual(expected);
  });

  it("returns at least 3 results", () => {
    const places: Partial<NominatimPlace>[] = [
      {
        place_id: 1,
        importance: 0.01,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Ontario",
          postcode: "",
          country: "Canada",
          country_code: "",
        },
      },
      {
        place_id: 2,
        importance: 0.02,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Iowa",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
      {
        place_id: 3,
        importance: 0.03,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Kansas",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
      {
        place_id: 4,
        importance: 0.04,
        address: {
          municipality: "okres Praha-západ",
          hamlet: "Toronto",
          state_district: "",
          state: "Central Bohemia",
          postcode: "",
          country: "Czechia",
          country_code: "",
        },
      },
    ];

    const expected: Partial<NominatimPlace>[] = [
      {
        place_id: 1,
        importance: 0.01,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Ontario",
          postcode: "",
          country: "Canada",
          country_code: "",
        },
      },
      {
        place_id: 2,
        importance: 0.02,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Iowa",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
      {
        place_id: 3,
        importance: 0.03,
        address: {
          city: "Toronto",
          state_district: "",
          state: "Kansas",
          postcode: "",
          country: "United States",
          country_code: "",
        },
      },
    ];

    const actual = filterImportantPlaces(places as NominatimPlace[]);

    expect(actual).toEqual(expected);
  });
});
