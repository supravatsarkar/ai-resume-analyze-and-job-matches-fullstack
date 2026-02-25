export const getLocationByIp = (ip) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://ip-api.com/json/${ip}?fields=country,countryCode,region,regionName,city`,
    )
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
