function createPopup() {
  let popup = document.createElement("div")
  popup.className = "popup"
  let title = document.createElement("h2")

  let titleText = document.createTextNode(`${"Choose a file"}`)
  title.appendChild(titleText)
  let buttonDiv = document.createElement("div")
  let newButton = document.createElement("button")
  popup.appendChild(title)

  let files = JSON.parse(localStorage.getItem("saveFiles"))
  console.log(files)

  for (x in files) {
    let link = document.createElement("a")
   
    link.href = `stocks.html?id=${x}`
    let file = document.createElement("div")
    file.className = "savefile"
    let fileCash = document.createElement("p")
    let dataCash = document.createTextNode(`Money: ${files[x].fileCash.toFixed(2)}`)
    fileCash.appendChild(dataCash)
    file.appendChild(fileCash)
    let datanetworth = files[x].fileCash
    for (let i = 0; i < files[x].fileAssets.length; i++) {
      datanetworth += (files[x].fileAssets[i] * files[x].fileCost[i])

    }
    let filenetworth = document.createElement("p")
    let networthtext = document.createTextNode(`Net Worth: ${datanetworth.toFixed(2)}`)
    filenetworth.appendChild(networthtext)
    file.appendChild(filenetworth)
    let fileDay = document.createElement("p")
    let dataday = document.createTextNode(`Day: ${files[x].fileDay + 1}`)
    fileDay.appendChild(dataday)
    file.appendChild(fileDay)
    let fileTimestamp = document.createElement("p")
    let fileDate = new Date(Number(x))
    let dataDate = document.createTextNode(`
    ${fileDate.getMonth() + 1}/${fileDate.getDate()}/${fileDate.getFullYear()} ${fileDate.getHours()}:${fileDate.getMinutes() < 10 ? "0" + fileDate.getMinutes() : fileDate.getMinutes()}`)
    fileTimestamp.appendChild(dataDate)
    file.appendChild(fileTimestamp)
    link.appendChild(file)
    popup.appendChild(link)
  }
  document.body.appendChild(popup)

}
function showStockMenu() {
  let popup = document.getElementById("stockie")
  popup.hidden = false;
}

async function fetchData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch {
    console.log("failedfetchdata")
  }
}
//Tried to use the secret feature but Replit does not allow you to use it with static deployments
// Extremely insecure way to use the API key - improvement for the future
async function createNewFile(){
    const realPrices = await fetchData(`https://api.marketdata.app/v1/stocks/prices/?symbols=AAPL,DIS,TSLA,INTC&token=NEF1U0xUNElKUkZTRmJHNm9CcVkxOGFJZDY2TGpCNm1FOG50aS15SC1VTT0`) 
    
  localStorage.setItem("middle", JSON.stringify(realPrices))
  location.href = "stocks.html"
}
