const DATAMALL_KEY = process.env.REACT_APP_DATAMALL_API_KEY;
const ONEMAP_EMAIL = process.env.REACT_APP_ONEMAP_EMAIL;
const ONEMAP_PW = process.env.REACT_APP_ONEMAP_PW;
const CORS_ANYWHERE_URL = `https://cors-anywhere.herokuapp.com/`;

const fetchLTAData = apiEndpoint => {
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

export const getSearchResults = async searchValues => {
  const response = await fetch(
    CORS_ANYWHERE_URL +
      `developers.onemap.sg/commonapi/search?searchVal=${searchValues}&returnGeom=Y&getAddrDetails=Y`,
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
      const totalSearchFound = json.found;
      const resultsDisplayed = json.results;

      if (totalSearchFound !== resultsDisplayed) {
        const message = `Please indicate the full address if you did not manage to get the data\n +
          ${resultsDisplayed}`;
        return resultsDisplayed;
      }
      return resultsDisplayed;
    } catch (error) {
      console.error("Network error?");
    }
  } else {
    console.error("Network error: Failed to get searched datas");
  }
};

