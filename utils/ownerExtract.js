function ownerExtract(object) {
  let name = ((object).owner).name;
  let zipCode = ((object).owner).zipCode;
  let city = ((object).owner).city;
  let street = ((object).owner).street;
  let houseNumber = ((object).owner).houseNumber;
  let comment = ((object).owner).comment;
  return {name, contact: {zipCode, city, street, houseNumber}, comment};
}

module.exports = ownerExtract;
