
// const finnhub = require('finnhub');
import finnhub from "finnhub"
const api_key = finnhub.ApiClient.instance.authentications['api_key'];

coapi_key.apiKey = "csemb1hr01qrf7qi3640csemb1hr01qrf7qi364g";
const finnhubClient = new finnhub.DefaultApi()

finnhubClient.quote("AAPL", (error, data, response) => {
  console.log(data)
});