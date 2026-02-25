import axios from "axios";

export const fetchIpLookup = async () => {
  const ipLookup = await axios.get("https://ipapi.co/json/");
  return ipLookup;
};
