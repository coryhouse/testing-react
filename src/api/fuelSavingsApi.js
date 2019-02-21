import axios from "axios";

var api = axios.create({
  baseURL: "http://localhost:3001/", // Insert logic here for determining the baseURL in each environment.
  responseType: "json"
});

export function save(fuelSavings) {
  return api
    .post("fuelSavings", {
      newMpg: parseInt(fuelSavings.newMpg, 10),
      tradeMpg: parseInt(fuelSavings.tradeMpg, 10),
      newPpg: parseInt(fuelSavings.newPpg, 10),
      tradePpg: parseInt(fuelSavings.tradePpg, 10),
      milesDriven: parseInt(fuelSavings.milesDriven, 10),
      milesDrivenTimeframe: fuelSavings.milesDrivenTimeframe,
      dateModified: new Date()
    })
    .then(onSuccess)
    .catch(onError);
}

function onSuccess(response) {
  return response;
}

function onError(error) {
  console.log(error);
}
