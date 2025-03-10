import { mapLocationResponse } from "./mapLocationResponse";

describe("mapLocationResponse", () => {
  it("should return a formatted string with all administrative levels when admin3 is present", () => {
    const locationResponse = {
      name: "Springfield",
      admin1: "State",
      admin2: "County",
      admin3: "District",
      country: "USA",
    };
    const result = mapLocationResponse(locationResponse);
    expect(result).toBe("Springfield, District, County, State, USA");
  });

  it("should return a formatted string without admin3 when it is not present", () => {
    const locationResponse = {
      name: "Springfield",
      admin1: "State",
      admin2: "County",
      country: "USA",
    };
    const result = mapLocationResponse(locationResponse);
    expect(result).toBe("Springfield, County, State, USA");
  });

  it("should return a formatted string with only name and country when only they are present", () => {
    const locationResponse = {
      name: "Springfield",
      country: "USA",
    };
    const result = mapLocationResponse(locationResponse);
    expect(result).toBe("Springfield, USA");
  });

  it("should filter out duplicate entries", () => {
    const locationResponse = {
      name: "Springfield",
      admin1: "State",
      admin2: "State",
      country: "USA",
    };
    const result = mapLocationResponse(locationResponse);
    expect(result).toBe("Springfield, State, USA");
  });
});
