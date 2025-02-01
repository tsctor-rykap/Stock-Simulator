let assets=[0,0,0,0,0,0,0,0,0,0,0]
let bonds=0
let funds=0
let stocks=0
let cost=[200, 95, 250, 25, 100, 40, 35, 100, 120, 140, 160]
let cash=5000000
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
const sliders=[appleSlider,disneySlider,teslaSlider,intelSlider,insuranceSlider,realestateSlider,technologySlider,treasurySlider,schwabSlider,vanguardSlider,fidelitySlider]
const sliderValues=[appleSliderValue,disneySliderValue,teslaSliderValue,intelSliderValue,insuranceSliderValue,realestateSliderValue,technologySliderValue,treasurySliderValue,schwabSliderValue,vanguardSliderValue,fidelitySliderValue]
const costarray=
[applecost,disneycost,teslacost,intelcost,insurancecost,realestatecost,technologycost,treasurycost,schwabcost,vanguardcost,fidelitycost]
let ownedArray = document.getElementsByClassName("sharesOwned");
let sharesValueArray = document.getElementsByClassName("sharesValue");
function updateSharesOwned(){
  for (let i=0; i<assets.length; i++){
    ownedArray[i].innerHTML = `Shares owned: ${assets[i]}`
    sharesValueArray[i].innerHTML = `Net vlaue: $${assets[i]* cost[i]}`
  }
}
// function updateSharesValue(){
//   for (let i=0; i<assets.length; i++){
    
//   }
// }
let pie = document.getElementById("pie")
function updatePie(){
  pie.style="background: green"
  let total = 0
  for(let i=0; i<cost.length; i++) {
    total+= cost[i]*assets[i]
    
  }
  total+=cash
  total/=100
  let moneyEnd=cash/total
  let appleEnd=moneyEnd+(assets[0]*cost[0])/total
  let disneyEnd=appleEnd+(assets[1]*cost[1])/total
  let teslaEnd=disneyEnd+(assets[2]*cost[2])/total
  let intelEnd=teslaEnd+(assets[3]*cost[3])/total
  let insuranceEnd=intelEnd+(assets[4]*cost[4])/total
  let realestateEnd=insuranceEnd+(assets[5]*cost[5])/total
  let technologyEnd=realestateEnd+(assets[6]*cost[6])/total
  let treasuryEnd=technologyEnd+(assets[7]*cost[7])/total
  let schwabEnd=treasuryEnd+(assets[8]*cost[8])/total
  let vanguardEnd=schwabEnd+(assets[9]*cost[9])/total
  let fidelityStart=vanguardEnd

  let style=`background: conic-gradient(#4a6951 0% ${moneyEnd}%, red ${moneyEnd}% ${appleEnd}%, blue ${appleEnd}% ${disneyEnd}%, black ${disneyEnd}% ${teslaEnd}%, #9ac6f5 ${teslaEnd}% ${intelEnd}%, #f277b9 ${intelEnd}% ${insuranceEnd}%, #dbdbaf ${insuranceEnd}% ${realestateEnd}%, yellow ${realestateEnd}% ${technologyEnd}%, #4bad9b ${technologyEnd}% ${treasuryEnd}%, gray ${treasuryEnd}% ${schwabEnd}%, #8f2446 ${schwabEnd}% ${vanguardEnd}%,  #1c8c22 ${fidelityStart}%);
  border-radius:50%`
  pie.style=style
}

console.log(pie.style);
function buy(stockid){
  if(cash>=sliders[stockid].value*cost[stockid]){
    console.log(appleSlider.value)
    assets[stockid]+=Number(sliders[stockid].value)
    console.log(assets)
    cash-=Number(sliders[stockid].value)*cost[stockid]
    updateCash()
    updatePie()
    updateSharesOwned();
  }
  else{
    alert("You can't buy stocks at this time")
  }
}
function sell(stockid){
  if(assets[stockid]>=sliders[stockid].value){
    
  console.log(appleSlider.value)
  assets[stockid]-=Number(sliders[stockid].value)
  console.log(assets)
  cash+=Number(sliders[stockid].value)*cost[stockid]
  updateCash()
    updatePie()
    updateSharesOwned();
}
    
  else{
    alert("You can't sell stocks at this time")
  }
}
function updateShare(stockid){
  sliderValues[stockid].innerHTML=sliders[stockid].value;
}
function updateCash(){
  let moneydisplay = document.getElementById("cash")
  moneydisplay.innerHTML=`Money: $${cash}`
  updateCost()
}
function updateCost(){
  for(let i=0; i<costarray.length; i++){
    change = Math.random()>=0.5? Math.random()*5:Math.random()*-5
    cost[i]+=Math.round(change)
  }
  for(let i=0; i<costarray.length; i++){
    costarray[i].innerHTML=`Worth = $${cost[i]}`
  }
}
document.addEventListener("DOMContentLoaded",()=>{
  updateCash()
  updateSharesOwned();
})

