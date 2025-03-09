export const mapLocationResponse = (locationResponse: any) => {
  const { name, admin1, admin2, admin3, country } = locationResponse;

  const filterDuplicates = (locationItems: string[]) => {
    return locationItems
      .filter((item, index, self) => item && self.indexOf(item) === index)
      .join(", ");
  };

  if (admin3) {
    return filterDuplicates([name, admin3, admin2, admin1, country]);
  }
  if (admin2) {
    return filterDuplicates([name, admin2, admin1, country]);
  } else {
    return filterDuplicates([name, country]);
  }
};
