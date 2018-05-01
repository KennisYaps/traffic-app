const DATAMALL_KEY = process.env.REACT_APP_DATAMALL_API_KEY;
module.exports = function(apiEndpoint) {
  return fetch(`https://cors-anywhere.herokuapp.com/datamall2.mytransport.sg/ltaodataservice/${apiEndpoint}`, {
    method: "get",
    headers: {
      Accept: "application/json",
      AccountKey: DATAMALL_KEY
    }
  });
};
