let canvas = document.getElementById("testCanvas");
let ctx = canvas.getContext("2d")
let stockhistory = [100, -50, 150, 200, 250, -300, 300, 350, 400, 50, -20, 50]
let basePrice = 100
let maxPrice = Math.max(...stockhistory)
  let minPrice = Math.min(...stockhistory)

function drawBaseLine(ctx){
  let percentHeight = (basePrice-minPrice)/(maxPrice - minPrice)
  let baseheight = percentHeight* 50

  ctx.strokeStyle = "black"
  ctx.moveTo(0,50-baseheight)
  ctx.lineTo(280,50-baseheight)
  ctx.stroke()
}
drawBaseLine(ctx)
function plotPoints(ctx){
  let xposition = 0
  ctx.moveTo(xposition, 50-((100-minPrice)/(maxPrice - minPrice))*50)
  if(stockhistory[stockhistory.length - 1] > basePrice){
    ctx.strokeStyle = "green"
  } else {
    ctx.strokeStyle = "red"
  }
  for(price of stockhistory){
    // console.log(price)
    let percentHeight = (price-minPrice)/(maxPrice - minPrice)
    // console.log(percentHeight)
    let baseheight = percentHeight* 50
    ctx.lineTo(xposition, 50-baseheight)
    ctx.stroke()
    // ctx.fill("evenodd")
    xposition+= 280/(stockhistory.length - 1)
    console.log(price, xposition, 50-baseheight)
  }
}
plotPoints(ctx)
async function fetchData(url){
  try{
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
}catch{
  console.log("failedfetchdata")
}
}
fetchData("https://dog.ceo/api/breeds/image/random")