// NEF1U0xUNElKUkZTRmJHNm9CcVkxOGFJZDY2TGpCNm1FOG50aS15SC1VTT0
let queryString = window.location.search
let params = new URLSearchParams(queryString)

if (params.get("id")) {
  let files = JSON.parse(localStorage.getItem("saveFiles"))
  const storedFile = files[params.get("id")]
  var fielID = Number(params.get("id"))
  var day = storedFile.fileDay
  var assets = storedFile.fileAssets
  
  var cost = storedFile.fileCost
var stockHistory = storedFile.fileHistory
  var cash = storedFile.fileCash
} else {
  var stockHistory = {
    0:[],
    1:[],
    2:[],
    3:[],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
    9:[],
    10:[]
  }
  var fileID = -1
  var day = 0
  var assets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  var bonds = 0
  var funds = 0
  var stocks = 0
  var midPrices = JSON.parse (localStorage.getItem("middle")).mid
    console.log(midPrices)
  if(midPrices){
    var cost = [...midPrices, 100, 40, 35, 100, 120, 140, 160]
  } else{
  var cost = [200, 95, 250, 25, 100, 40, 35, 100, 120, 140, 160]
  }
  var cash = 50000
  
}
let turns = 10
let netWorth = 0
const dayCounter = document.getElementById("day")
//This is a collection of the sliders and their values. It is used for calculating the total cost when you buy and sell and updates the value of the slider underneath.
const appleSliderValue = document.getElementById("appleShares")
const appleSlider = document.getElementById("appleRange");
let disneySliderValue = document.getElementById("disneyShares")
let disneySlider = document.getElementById("disneyRange");
let teslaSliderValue = document.getElementById("teslaShares")
let teslaSlider = document.getElementById("teslaRange");
let intelSliderValue = document.getElementById("intelShares")
let intelSlider = document.getElementById("intelRange");
let insuranceSliderValue = document.getElementById("insuranceShares")
let insuranceSlider = document.getElementById("insuranceRange");
let realestateSliderValue = document.getElementById("realEstateShares")
let realestateSlider = document.getElementById("realestateRange");
let technologySliderValue = document.getElementById("technologyShares")
let technologySlider = document.getElementById("technologyRange");
let treasurySliderValue = document.getElementById("treasuryShares")
let treasurySlider = document.getElementById("treasuryRange");
let schwabSliderValue = document.getElementById("schwabShares")
let schwabSlider = document.getElementById("schwabRange");
let vanguardSliderValue = document.getElementById("vanguardShares")
let vanguardSlider = document.getElementById("vanguardRange");
let fidelitySliderValue = document.getElementById("fidelityShares")
let fidelitySlider = document.getElementById("fidelityRange");
// This is a visual of how much the stocks, bonds and mutual funds costs.
let applecost = document.getElementById("applecost")
let disneycost = document.getElementById("disneycost")
let teslacost = document.getElementById("teslacost")
let intelcost = document.getElementById("intelcost")
let insurancecost = document.getElementById("insurancecost")
let realestatecost = document.getElementById("realestatecost")
let technologycost = document.getElementById("technologycost")
let treasurycost = document.getElementById("treasurycost")
let schwabcost = document.getElementById("schwabcost")
let vanguardcost = document.getElementById("vanguardcost")
let fidelitycost = document.getElementById("fidelitycost")
const sliders = [appleSlider, disneySlider, teslaSlider, intelSlider, insuranceSlider, realestateSlider, technologySlider, treasurySlider, schwabSlider, vanguardSlider, fidelitySlider]
const sliderValues = [appleSliderValue, disneySliderValue, teslaSliderValue, intelSliderValue, insuranceSliderValue, realestateSliderValue, technologySliderValue, treasurySliderValue, schwabSliderValue, vanguardSliderValue, fidelitySliderValue]
const costarray =
  [applecost, disneycost, teslacost, intelcost, insurancecost, realestatecost, technologycost, treasurycost, schwabcost, vanguardcost, fidelitycost]
// This shows the shares owned and the net value under each card.
let ownedArray = document.getElementsByClassName("sharesOwned");
let sharesValueArray = document.getElementsByClassName("sharesValue");
/**
 * Updates the shares owned and the net value on screen.
 */
function updateSharesOwned() {
  for (let i = 0; i < assets.length; i++) {
    ownedArray[i].innerHTML = `Shares owned: ${assets[i]}`
    sharesValueArray[i].innerHTML = `Net value: $${(assets[i] * cost[i]).toFixed(2)}`
  }
}


/*
 * Calculate and display the portion of net value.
 * allocated to each individual stock
 */

function updatePie() {
 

  let canvas = document.getElementById("pie")
  let ctx = canvas.getContext("2d")

  
  let total = 0
  let maxvalue = 0
  for (let i = 0; i < cost.length; i++) {
    total += cost[i] * assets[i]
    if (cost[i] > maxvalue){
      maxvalue = cost[i]
    }
  }
  total += cash
  
  let moneyEnd = cash / total 
  let sliceStart = 0
  let sliceEnd = moneyEnd
  //Draw the initial slice for cash percentage
  ctx.beginPath()
  ctx.strokeStyle = "#78c28c"
 
  let lastx = 0
  let lasty = 160
  ctx.beginPath()
 ctx.arc(80,80,80, 0, 2*Math.PI)
  ctx.arc(80, 80, 80, sliceStart*Math.PI/2, sliceEnd*Math.PI/2)
  ctx.moveTo(80,80)
  ctx.closePath()
   ctx.fillStyle="#78c28c"
  ctx.stroke()
  ctx.fill()
  sliceStart+=sliceEnd
  let sliceColor = [
                      "red",
                      "blue",
                      "black",
                      "#9ac6f5",
                      "#f277b9",
                      "#dbdbaf",
                      "yellow",
                      "#4bad9b",
                      "gray",
                      "#8f2446",
                      "#1c8c22"]
  for(let i=0; i < cost.length; i++){
    let slicePercent = (cost[i]*assets[i])/(total)
    console.log(sliceStart, sliceStart + slicePercent)
    ctx.fillStyle = sliceColor[i]
    ctx.beginPath()
    ctx.arc(80, 80, 80, (sliceStart)*Math.PI*2, (((sliceStart+slicePercent)))*Math.PI*2)
    ctx.lineTo(80,80)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  sliceStart+=slicePercent
    
  }
 
}

console.log(pie.style);
function buy(stockid) {
  if (cash >= sliders[stockid].value * cost[stockid]) {
    console.log(appleSlider.value)
    assets[stockid] += Number(sliders[stockid].value)
    console.log(assets)
    cash -= Number(sliders[stockid].value) * cost[stockid]

    updatePie()
    updateSharesOwned();
  }
  else {
    alert("You can't buy stocks at this time")
  }
  turns += 1
}
function sell(stockid) {
  if (assets[stockid] >= sliders[stockid].value) {

    console.log(appleSlider.value)
    assets[stockid] -= Number(sliders[stockid].value)
    console.log(assets)
    cash += Number(sliders[stockid].value) * cost[stockid]

    updatePie()
    updateSharesOwned();
  }

  else {
    alert("You can't sell stocks at this time")
  }
  turns += 1
}
function updateShare(stockid) {
  sliderValues[stockid].innerHTML = sliders[stockid].value;
}
function updateCash() {
  if (updateCost()) {
    let moneydisplay = document.getElementById("cash")
    moneydisplay.innerHTML = `Money: $${cash.toFixed(2)}`
    netWorth = cash
    for (let i = 0; i < cost.length; i++) {
      netWorth += cost[i] * assets[i]

    }
    let netWorthDisplay = document.getElementById("worth")
    netWorthDisplay.innerHTML = `Net Worth: $${netWorth.toFixed(2)}`
    day++;
    dayCounter.innerHTML = `Day ${day}`

  }
}
function updateCost() {

  if (turns < 10) {
    let turnsleft = 10 - turns
    alert("You need to buy or sell " + turnsleft + " items")
    return false;
  }
  //Update the stock history before changing the price

  dailyEvents()
   const graphs = document.getElementsByClassName("stockGraph")
  for (let i = 0; i < costarray.length; i++) {
    stockHistory[i].push(cost[i])
    costarray[i].innerHTML = `Worth = $${cost[i].toFixed(2)}`
    drawHistory(graphs[i].getContext('2d'),i)
  }

  turns = 0
  return true;
}
function dailyEvents() {
  const events = [
    {
      title: "Market Crash",
      message: "A movie hyped up by Disney was delayed numerous times.",
      effect: {
        marketchange: "negative",
        change: {
          0: -2.0,
          1: -2.0,
          6: -2.5,
          9: -2.5
          
        }
      },
      weight: 1
    },
    {
      title: "Market Crash",
      message: "Tech Turmoil: Industry Layoffs Surge as Market Confidence Crumbles",
      effect: {
        marketchange: "negative",
        change: {
          0: -2.0,
          3: -4.0,
          6: -3.0,
          2: -4.5

        }
      },
      weight: 1
    },

    {
      title: "Surge in Market",
      message: "Apple releases the new Apple Car. It is a self driving car that changed the auto industry.",
      effect: {
        marketchange: "positive",
        change: {
          0: 2.5,
          2: 2.0,
          4: 3.0,
          6: 4.0
        }
      },
      weight: 1
    },
    {
      title: "Surge in Market",
      message: "Legal loophole leads to bond value surging.",
      effect: {
        marketchange: "positive",
        change: {
          7: 2.5,
          8: 2.0,
          9: 3.5,
          10: 4.3
        }
      },
      weight: 1
    },

    {
      title: "Stable Market",
      message: "It's a regular day.",
      effect: {
        marketchange: "stable",
        change: {
          0:-0.25,
          5: 0.25,
          7: -0.5,
          2: 0.5
        }
      },
      weight: 2
    },
    {
      title: "Stable Market",
      message: "People are regularly investing.",
      effect: {
        marketchange: "stable",
        change: {
          6: 0.25,
          3: -0.5,
          8: 0.5,
          0: 0.25
        }
      },
      weight: 2
    }
  ];
  let weightedevents = [];
  events.forEach(event => {
    for (let i = 0; i < event.weight; i++) {
      weightedevents.push(event);
    }
  });
  let event = weightedevents[Math.floor(Math.random() * weightedevents.length)]

  for ([stocks, change] of Object.entries(event["effect"]["change"])) {

    cost[stocks] *= 1 + (change / 100)
  }
  if (day !== 29) {
    createPopup(event)
  } else {
    let endEvent =
    {
      title: "Thanks for playing.",
      message: `You earned: ${(netWorth - 50000).toFixed(2)}`,
      change: {}
    }
    createPopup(endEvent)
  }
  for (let i = 0; i < cost.length; i++) {
    if (event.effect === "decrease") {
      cost[i] -= Math.max(1, cost[i] - Math.floor(Math.random() * 50 + 100));
    }
    else if (event.effect === "increase") {
      cost[i] += Math.floor(Math.random() * 50 + 100)
    }


  }
}

function removePopup(btn) {
  console.log(btn.parentElement)
  btn.parentElement.remove()

}
/**
 * Creates an event popup on the page based on the given event
 * @param e The event to appear on the screen.
 */
function createPopup(e) {
  let popup = document.createElement("div")
  popup.className = "popUp"
  let title = document.createElement("h2")
  let titleText = document.createTextNode(`${e.title}`)
  title.appendChild(titleText)
  let message = document.createElement("p")
  message.appendChild(document.createTextNode(`${e.message}`))
  let effect = document.createElement("h3")
  let acknowledgeBtn = document.createElement("button")
  let btnText = document.createTextNode("Acknowledge")
  acknowledgeBtn.appendChild(btnText)

  popup.appendChild(title)
  popup.appendChild(message)
  popup.appendChild(effect)
  popup.appendChild(acknowledgeBtn)
  acknowledgeBtn.onclick = () => { removePopup(acknowledgeBtn) }
  document.body.prepend(popup)

}

document.addEventListener("DOMContentLoaded", () => {
  updateCash()
  updateSharesOwned();
  updatePie();
  setClock();
  setInterval(setClock, 1000)
})
function setClock() {
  const date = new Date(Date.now())
  const clock = document.getElementById("clock")
  clock.innerHTML = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
  const sunOrMoon = document.getElementById("picture")
  if (date.getHours() >= 6 && date.getHours() <= 17) {
  } else { }
  sunOrMoon.src = "sun.png"
}
function saveData() {
  let allSaves = localStorage.getItem("saveFiles")
  //If save files don't exist in localStorage create an object to hold all.
  allSaves = !allSaves ? {} : JSON.parse(allSaves)

  let data = {
    fileDay: day - 1,
    fileCash: cash,
    fileAssets: assets,
    fileCost: cost,
  fileHistory: stockHistory

  }
  if (fileID === -1) {
    //generate new ID
    fileID = Date.now()
  }
  allSaves[fileID] = data
  localStorage.setItem("saveFiles", JSON.stringify(allSaves))
  alert("Data saved!")
}
function drawHistory(ctx,id){
  console.log(stockHistory)
  ctx.rect(0, 0, 280, 50)
  ctx.fillStyle = '#266193'
  ctx.fill();
  // Establishing baseline and range of prices
  let basePrice = stockHistory[id][0]
  let stockPrices = stockHistory[id]
  let maxPrice= Math.max(...stockPrices,basePrice + 1)
  let minPrice = Math.min(...stockPrices, basePrice - 1)
  function drawBaseLine(ctx){
    let percentHeight = (basePrice-minPrice)/(maxPrice - minPrice)
    let baseheight = percentHeight* 50

    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.moveTo(0,50-baseheight)
    ctx.lineTo(280,50-baseheight)
    ctx.stroke()
  }
  drawBaseLine(ctx)
  function plotPoints(ctx){
    let xposition = 0
    ctx.moveTo(xposition, 50-((100-minPrice)/(maxPrice - minPrice))*50)
    if(stockPrices[stockPrices.length - 1] > basePrice){
      ctx.strokeStyle = "#37fc28"
    } else {
      ctx.strokeStyle = "red"
    }
    ctx.beginPath()
    for(price of stockPrices){
     
      let percentHeight = (price-minPrice)/(maxPrice - minPrice)
     
      let baseheight = percentHeight* 50
      ctx.lineTo(xposition, 50-baseheight)
      ctx.moveTo(xposition, 50-baseheight)
      
      
      xposition+= 280/(stockPrices.length - 1)
      console.log(price, xposition, 50-baseheight)
    }
    ctx.stroke()
  }
  plotPoints(ctx)
}











