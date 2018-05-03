const DATAMALL_KEY = process.env.REACT_APP_DATAMALL_API_KEY;
const ONEMAP_EMAIL = process.env.REACT_APP_ONEMAP_EMAIL;
const ONEMAP_PW = process.env.REACT_APP_ONEMAP_PW;
const CORS_ANYWHERE_URL = `https://cors-anywhere.herokuapp.com/`;

export const fetchLTAData = apiEndpoint => {
  return fetch(
    CORS_ANYWHERE_URL +
      `datamall2.mytransport.sg/ltaodataservice/${apiEndpoint}`,
    {
      method: "get",
      headers: {
        Accept: "application/json",
        AccountKey: DATAMALL_KEY
      }
    }
  );
};

const getOneMapToken = async () => {
  const response = await fetch(
    CORS_ANYWHERE_URL + `developers.onemap.sg/privateapi/auth/post/getToken`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: ONEMAP_EMAIL,
        password: ONEMAP_PW
      })
    }
  );
  if (!response.ok) {
    console.error("Fail to retrieve access token");
  }
  console.log(" Successfully retrieve access token");
  const json = await response.json();
  return json.access_token;
};

const reverseGeocode = async (latitude, longitude, token) => {
  const response = await fetch(
    CORS_ANYWHERE_URL +
      `developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${latitude},${longitude}&token=${token}&buffer=0&addressType=all`,
    {
      method: "get",
      headers: {
        Accept: "application/json"
      }
    }
  );
  if (response.ok) {
    try {
      const json = await response.json();
      const geoCodeInfoArray = json.GeocodeInfo;
      return geoCodeInfoArray[0];
    } catch (error) {
      console.error("Network error?");
    }
  } else {
    console.error(
      `Failed to reverse Geocode of latitude:${latitude} longtitude:${longitude}`
    );
  }
};

export const getData = async endpoint => {
  const response = await fetchLTAData(endpoint);
  if (response.ok) {
    const json = await response.json();
    return json.value;
  } else {
    console.error("Failed to fetch Traffic Incident API");
  }
};

const test = [
  { Latitude: 1.2923784122598472, Longitude: 103.8436934274694 },
  { Latitude: 1.3337418427143688, Longitude: 103.81353117504871 },
  { Latitude: 1.3553132342549212, Longitude: 103.85682693417448 }
];
export const addBuildingName = async datas => {
  const token = await getOneMapToken();
  console.log("datas", datas);
  datas.map(async data => {
    let response = await reverseGeocode(data.Latitude, data.Longitude, token);
    data.ROAD = response.ROAD;
    console.log(response);
    console.log(data);
  });
};
addBuildingName(test);
