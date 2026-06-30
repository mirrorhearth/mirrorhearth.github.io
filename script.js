function toggleCabinLight(){
  const cabin=document.getElementById("cabinScene");
  cabin.classList.toggle("on");
  if(cabin.classList.contains("on")){
    showMsg("灯亮了。欢迎回家，宝宝。");
  }else{
    showMsg("灯先暗下来，小屋还在。");
  }
}
let clickCount=0;
let weatherMode="auto";
const HOME_DATE="2026-07-02";
const EXAM_DATE="2026-12-20";
const SITE_DATE="2026-06-29";
function updateTime(){
  const now=new Date();
  const h=now.getHours();
  let greet="欢迎回家，宝宝。";
  if(h<6) greet="夜深了，宝宝，该休息啦。";
  else if(h<11) greet="早上好，宝宝。";
  else if(h<14) greet="中午好，宝宝，记得吃饭。";
  else if(h<18) greet="下午好，宝宝，再坚持一下。";
  else greet="晚上好，宝宝，欢迎回家。";
  document.getElementById("greeting").innerText=greet;
  document.getElementById("clock").innerText=now.toLocaleTimeString("zh-CN");
  document.getElementById("date").innerText=now.toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric",weekday:"long"});
  if(weatherMode==="auto") applyTimeTheme();
}
function applyTimeTheme(){
  const h=new Date().getHours();
  document.body.classList.remove("day","night","sunny","cloudy");
  clearSky();
  if(h>=6 && h<18){
    document.body.classList.add("day");
    document.getElementById("skyIcon").className="sun";
    document.getElementById("skyIcon").innerText="☀️";
    document.getElementById("weatherText").innerText="今天的小屋天气：白天 ☀️";
    makeClouds();
  }else{
    document.body.classList.add("night");
    document.getElementById("skyIcon").className="moon";
    document.getElementById("skyIcon").innerText="🌙";
    document.getElementById("weatherText").innerText="今天的小屋天气：星空 🌙";
    makeStars();
  }
}
function daysUntil(dateStr){
  const today=new Date(); today.setHours(0,0,0,0);
  const target=new Date(dateStr+"T00:00:00");
  return Math.ceil((target-today)/86400000);
}
function updateDays(){
  document.getElementById("homeDays").innerText=daysUntil(HOME_DATE)+" 天";
  document.getElementById("examDays").innerText=daysUntil(EXAM_DATE)+" 天";
  const lived=Math.max(0,-daysUntil(SITE_DATE));
  document.getElementById("siteDays").innerText=lived+" 天";
}
function dailyNote(){
  const start=new Date(SITE_DATE+"T00:00:00");
  const today=new Date(); today.setHours(0,0,0,0);
  const index=Math.floor((today-start)/86400000)%dailyNotes.length;
  document.getElementById("dailyNote").innerText=dailyNotes[index];
}
function alinSpeak(){
  clickCount++;
  let text = clickCount%10===0 ? alinEggs[(clickCount/10-1)%alinEggs.length] : alinWords[Math.floor(Math.random()*alinWords.length)];
  document.getElementById("alinText").innerHTML=text;
  showMsg(text);
}
function lightHome(){
  showMsg("欢迎回家，宝宝。Mirror Hearth 的灯已经点亮了。");
}
function skyClick(){
  const h=new Date().getHours();
  if(h>=6 && h<18) showMsg("☀️ 太阳摸摸宝宝脑袋：今天也要顺利。");
  else showMsg("🌙 月亮被宝宝点亮啦。");
}
function setWeather(type){
  weatherMode=type;
  document.body.classList.remove("day","night","sunny","cloudy");
  clearSky();
  if(type==="auto"){
    applyTimeTheme();
    showMsg("天气切回自动模式：18点后会变成星空。");
    return;
  }
  let text="今天的小屋天气：月夜 🌙";
  if(type==="sunny"){
    text="今天的小屋天气：晴天 ☀️";
    document.body.classList.add("sunny");
    document.getElementById("skyIcon").className="sun";
    document.getElementById("skyIcon").innerText="☀️";
    makeClouds();
  }
  if(type==="cloudy"){
    text="今天的小屋天气：阴天 ☁️";
    document.body.classList.add("cloudy");
    document.getElementById("skyIcon").className="sun";
    document.getElementById("skyIcon").innerText="☁️";
    makeClouds();
  }
  if(type==="rain"){
    text="今天的小屋天气：下雨 🌧️";
    document.body.classList.add("cloudy");
    weatherFall("💧",40);
  }
  if(type==="snow"){
    text="今天的小屋天气：下雪 ❄️";
    document.body.classList.add("night");
    makeStars();
    weatherFall("❄️",40);
  }
  document.getElementById("weatherText").innerText=text;
  showMsg(text);
}
function weatherFall(symbol,count){
  for(let i=0;i<count;i++){
    const d=document.createElement("div");
    d.className="weather-drop";
    d.innerText=symbol;
    d.style.left=Math.random()*100+"vw";
    d.style.fontSize=(14+Math.random()*14)+"px";
    d.style.animationDelay=Math.random()*1.5+"s";
    document.body.appendChild(d);
    setTimeout(()=>d.remove(),5000);
  }
}
function showMsg(text){
  document.getElementById("popupText").innerHTML=text;
  document.getElementById("popup").style.display="flex";
}
function closePopup(){
  document.getElementById("popup").style.display="none";
}
function clearSky(){
  document.querySelectorAll(".star,.cloud").forEach(e=>e.remove());
}
function makeStars(){
  for(let i=0;i<52;i++){
    const s=document.createElement("div");
    s.className="star";
    s.style.left=Math.random()*100+"vw";
    s.style.top=Math.random()*100+"vh";
    s.style.animationDelay=Math.random()*2+"s";
    document.body.appendChild(s);
  }
}
function makeClouds(){
  for(let i=0;i<7;i++){
    const c=document.createElement("div");
    c.className="cloud";
    c.innerText="☁️";
    c.style.left=(-20-Math.random()*60)+"vw";
    c.style.top=(8+Math.random()*34)+"vh";
    c.style.animationDelay=Math.random()*14+"s";
    c.style.fontSize=(34+Math.random()*26)+"px";
    document.body.appendChild(c);
  }
}
updateTime();
updateDays();
dailyNote();
applyTimeTheme();
setInterval(updateTime,1000);


// ===== Home Alin Card Click Patch =====
(function () {
  function pickHomeAlinWord() {
    if (typeof homeAlinWords !== "undefined" && Array.isArray(homeAlinWords) && homeAlinWords.length) {
      const index = Number(localStorage.getItem("homeAlinWordIndex") || "0");
      const word = homeAlinWords[index % homeAlinWords.length];
      localStorage.setItem("homeAlinWordIndex", String(index + 1));
      return word;
    }
    return "我在这里。";
  }

  function bindHomeAlinCard() {
    const cards = Array.from(document.querySelectorAll(".card"));
    const alinCard = cards.find(card => {
      const title = card.querySelector("h2, h3");
      return title && title.textContent.includes("阿凛");
    });

    if (!alinCard || alinCard.dataset.alinBound === "1") return;
    alinCard.dataset.alinBound = "1";
    alinCard.style.cursor = "pointer";

    alinCard.addEventListener("click", function () {
      const ps = alinCard.querySelectorAll("p");
      const target = ps[ps.length - 1];
      if (target) target.textContent = pickHomeAlinWord();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindHomeAlinCard);
  } else {
    bindHomeAlinCard();
  }
})();
