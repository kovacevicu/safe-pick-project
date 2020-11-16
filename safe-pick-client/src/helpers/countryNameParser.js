export function parseCountryName(results) {
  let name;
  let data = results[0].address_components;
  for (let i = 0; i < data.length; i++) {
    let addr = data[i];
    if (addr.types[0] === "country") name = addr.long_name;
  }
  return name;
}

export function reFormatCountryName(name) {
  let country;
  let reFormat = {
    "United States": "North-America",
    "Democratic Republic of the Congo": "Congo",
  };
  if (reFormat[name]) {
    country = reFormat[name];
    let parsedName = country.replace(/\s/g, "-");
    return parsedName;
  } else {
    return name;
  }
}
