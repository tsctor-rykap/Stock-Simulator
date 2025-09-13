let queryString = window.location.search
let params = new URLSearchParams(queryString)

if (params.get("id")) {
  let files = JSON.parse(localStorage.getItem("saveFiles"))
  const storedFile = files[params.get("id")]
  var fielID = Number(params.get("id"))
  var day = storedFile.fileDay
  var assets = storedFile.fileAssets
  var cost = storedFile.fileCost

  var cash = storedFile.fileCash
} else {
  var fileID = -1
  var day = 0
  var assets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  var bonds = 0
  var funds = 0
  var stocks = 0
  var cost = [200, 95, 250, 25, 100, 40, 35, 100, 120, 140, 160]
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

let pie = document.getElementById("pie")
/**
 * Calculate and display the portion of net value.
 * allocated to each individual stock
 */
function updatePie() {
  pie.style = "background: green"
  let total = 0
  for (let i = 0; i < cost.length; i++) {
    total += cost[i] * assets[i]

  }
  total += cash
  total /= 100
  let moneyEnd = cash / total
  let appleEnd = moneyEnd + (assets[0] * cost[0]) / total
  let disneyEnd = appleEnd + (assets[1] * cost[1]) / total
  let teslaEnd = disneyEnd + (assets[2] * cost[2]) / total
  let intelEnd = teslaEnd + (assets[3] * cost[3]) / total
  let insuranceEnd = intelEnd + (assets[4] * cost[4]) / total
  let realestateEnd = insuranceEnd + (assets[5] * cost[5]) / total
  let technologyEnd = realestateEnd + (assets[6] * cost[6]) / total
  let treasuryEnd = technologyEnd + (assets[7] * cost[7]) / total
  let schwabEnd = treasuryEnd + (assets[8] * cost[8]) / total
  let vanguardEnd = schwabEnd + (assets[9] * cost[9]) / total
  let fidelityStart = vanguardEnd

  let style = `background: conic-gradient(#4a6951 0% ${moneyEnd}%, red ${moneyEnd}% ${appleEnd}%, blue ${appleEnd}% ${disneyEnd}%, black ${disneyEnd}% ${teslaEnd}%, #9ac6f5 ${teslaEnd}% ${intelEnd}%, #f277b9 ${intelEnd}% ${insuranceEnd}%, #dbdbaf ${insuranceEnd}% ${realestateEnd}%, yellow ${realestateEnd}% ${technologyEnd}%, #4bad9b ${technologyEnd}% ${treasuryEnd}%, gray ${treasuryEnd}% ${schwabEnd}%, #8f2446 ${schwabEnd}% ${vanguardEnd}%,  #1c8c22 ${fidelityStart}%);
  border-radius:50%;
  width: 160px;
  height: 160px;`

  pie.style = style
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

  dailyEvents()
  for (let i = 0; i < costarray.length; i++) {
    costarray[i].innerHTML = `Worth = $${cost[i].toFixed(2)}`
  }
  turns = 0
  return true;
}
function dailyEvents() {
  const events = [
    {
      title: "Market Crash",
      message: "Disney releases a new movie",
      effect: {
        marketchange: "negative",
        change: {
          1: -2.0
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
          6: -3.0

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
          2: -2.0
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
          8: 0.5
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
    fileCost: cost

  }
  if (fileID === -1) {
    //generate new ID
    fileID = Date.now()
  }
  allSaves[fileID] = data
  localStorage.setItem("saveFiles", JSON.stringify(allSaves))
  alert("Data saved!")
}
// let data=
//   [
//     {

//     }
//   ]

