import axios from "axios";
let airtableKey = process.env.REACT_APP_AIRTABLE_ID;
let stravaSecret = process.env.REACT_APP_STRAVA_SECRET;

let refresh;
let auth;

const airtableHeader = {
  headers: {
    Authorization: airtableKey,
    "Content-Type": "application/json",
  },
};

//get data from airtable//

export async function fetchTraining() {
  const response = await axios
    .get(
      "https://api.airtable.com/v0/appCxNHOlPKoOiFeE/training/?sort%5B0%5D%5Bfield%5D=date",
      airtableHeader
    )
    .catch((error) => console.log(error, "get fetchTraining error"));

  return response.data.records;
}

export async function fetchRaces() {
  const response = await axios
    .get(
      "https://api.airtable.com/v0/app51Ub4aBrwWISd5/races/?view=Grid%20view",
      airtableHeader
    )
    .catch((error) => console.log(error, "get fetchRaces error"));
  return response.data.records;
}

export async function fetchStats() {
  const response = await axios
    .get(
      "https://api.airtable.com/v0/appmvdwUHwS2I0QDd/Table%201?&view=Grid%20view",
      airtableHeader
    )
    .then((response) =>
      response.data.records.map((item) => ({
        date: item.fields.date,
        "weight (kg)": item.fields.weight,
        "fitness (v02)": item.fields.fitness,
        "booze (units)": item.fields.booze,
        "load (km)": item.fields.load,
      }))
    );
  return response;
}

//get tokens for strava from airtable//

export async function getTokens() {
  await axios
    .get(
      "https://api.airtable.com/v0/appB944pnqlNcrQda/kicktokens/recPtaP7rRYatGese",
      airtableHeader
    )
    .then((response) => {
      auth = response.data.fields.auth;
      refresh = response.data.fields.refresh;
      return response;
    })
    .then(async (response) => {
      if (response.data.fields.exp < Date.now()) {
        await getRefresh().then(async (response) => {
          auth = response.data.access_token;
          postRefresh(response.data);
        });
      }
    })
    .catch((error) => console.log(error, "get getTokens error"));

  return auth;
}

export async function getRefresh() {
  const response = await axios
    .post(
      `https://www.strava.com/api/v3/oauth/token?client_id=53708&client_secret=${stravaSecret}&grant_type=refresh_token&refresh_token=${refresh}`
    )
    .catch((error) => console.log(error, "get fetchStats error"));
  return response;
}

const postRefresh = (response) => {
  var config = {
    method: "put",
    url: "https://api.airtable.com/v0/appB944pnqlNcrQda/kicktokens",
    headers: {
      authorization: airtableKey,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      records: [
        {
          id: "recPtaP7rRYatGese",
          fields: {
            auth: response.access_token,
            refresh: response.refresh_token,
            exp: Date.now() + response.expires_in * 1000,
          },
        },
      ],
    }),
  };
  axios(config).catch((error) => console.log(error, "get getRefresh error"));
};

//get data from strava//

export async function getAthlete() {
  const response = await axios
    .get(`https://www.strava.com/api/v3/athletes/3118597?access_token=${auth}`)
    .catch((error) => console.log(error, "get getAthlete error"));

  return response;
}

export async function getAthleteStats() {
  const response = await axios
    .get(
      `https://www.strava.com/api/v3/athletes/3118597/stats?access_token=${auth}`
    )
    .catch((error) => console.log(error, "get getAthleteStats error"));
  return response;
}

export async function getTraining() {
  //get data ids of last runs//
  const response = axios
    .get("https://www.strava.com/api/v3/athlete/activities?per_page=10", {
      headers: { Authorization: "Bearer " + auth },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log("get getActivities error"))
    //use ids to get detail of each run//
    .then(async (data) => {
      await Promise.all(
        data.map((e, index, array) => {
          return axios
            .get(
              "https://www.strava.com/api/v3/activities/" +
                e.id +
                "?include_all_efforts=false",
              { headers: { Authorization: "Bearer " + auth } }
            )
            .then((response) => {
              array[index] = { ...response.data };
            })
            .catch((error) => console.log(error, "tis me"));
        })
      );
      return data;
    })
    .catch((error) => console.log(error, "get getTraining error"));

  return response;
}
