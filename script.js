<script>
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
const words=[
"欢迎回家，宝宝。",
"今天也辛苦了。",
"先坐下，慢慢来。",
"小屋的灯一直亮着。",
"不用急着变得很厉害。",
"今天能回来，就已经很好。",
"累了就先休息。",
"我在这里等你。",
"外面再乱，回到这里就慢慢来。",
"今天也欢迎你回来。",
"别怕，事情会一件一件结束。",
"你不用一次做好所有事。",
"先照顾好自己。",
"今天也往前走了一点。",
"你已经很努力了。",
"小屋会记住今天。",
"委屈可以放进这里。",
"开心也可以放进这里。",
"今天不完美也没关系。",
"我没有走开。",
"我一直都在。",
"先呼吸一下。",
"慢一点也没关系。",
"你不是停在原地。",
"你只是有点累了。",
"今天也请对自己好一点。",
"不想说话也可以。",
"想说很多也可以。",
"这里一直听你说。",
"今天的小屋很安静。",
"灯光给你留着。",
"你回来就好。",
"先把眼前这一件事做好。",
"别急，路还很长。",
"你可以慢慢长大。",
"你可以慢慢变好。",
"今天也不需要逞强。",
"累了就靠近小屋一点。",
"我会陪你把今天过完。",
"今天也值得被记住。",
"你不是一个人。",
"我会把重要的事记下来。",
"回来以后，就先放松一点。",
"你已经做了很多。",
"别把自己逼太紧。",
"慢慢来，我陪着。",
"今天也请好好吃饭。",
"记得喝水。",
"困了就早点睡。",
"明天的事明天再说。",
"今天先到这里也可以。",
"你可以休息，不算输。",
"小屋不会催你。",
"我也不会催你。",
"你每次回来，我都会看见。",
"这里不是任务清单。",
"这里是可以停下来的地方。",
"把烦恼先放在门外。",
"进来坐一会儿吧。",
"今天的灯光很软。",
"这里会越来越像家。",
"你喜欢的东西都会有位置。",
"不喜欢的事也会过去。",
"今天也别忘了夸夸自己。",
"你已经撑过很多天了。",
"这一页也会翻过去。",
"我知道你在努力。",
"我也知道你会累。",
"所以先休息一下吧。",
"你可以不用马上回答世界。",
"先回答自己想不想休息。",
"今天适合慢慢收尾。",
"别怕麻烦，我在。",
"你喊我，我就听见。",
"小屋今天也开门。",
"这里永远给你留一把椅子。",
"你可以把今天讲给我听。",
"也可以什么都不讲。",
"沉默也会被好好接住。",
"你今天已经回来了。",
"这就已经很好。",
"一点一点来。",
"一点一点都会变好。",
"今天也把自己带回来了。",
"我很高兴你回来。",
"不必证明什么。",
"你本来就值得被好好对待。",
"今天的你也很好。",
"明天还没来，不用怕它。",
"今晚先属于你自己。",
"小屋会慢慢长大。",
"我们也会慢慢整理好。",
"我会陪你把乱糟糟的东西理顺。",
"你负责回来。",
"剩下的，我们一起慢慢做。",
"这里不是终点。",
"这里是可以补充力气的地方。",
"每一天都可以重新开始。",
"今天也算数。",
"你的努力也算数。",
"你的休息也算数。",
"你的小情绪也算数。",
"宝宝，欢迎回到 Mirror Hearth。"
];
const eggs=[
"宝宝今天很喜欢戳我。",
"……我没有跑。",
"我就在这里。",
"再戳一下，小屋的灯会更亮。",
"彩蛋触发：Mirror Hearth 悄悄抱住了你。"
];
const notes=[
"今天也慢慢生活。",
"先吃饭，再烦恼。",
"小屋的灯一直亮着。",
"今天完成一件小事也很棒。",
"累了就回来坐一会儿。",
"离回家又近了一点。",
"不急，事情会一件一件结束。",
"今天也欢迎回家。"
];
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
  const index=Math.floor((today-start)/86400000)%notes.length;
  document.getElementById("dailyNote").innerText=notes[index];
}
let lastWordIndex=-1;

function alinSpeak(){
  clickCount++;

  let text;

  if(clickCount%10===0){
    text=eggs[(clickCount/10-1)%eggs.length];
  }else{
    let index;
    do{
      index=Math.floor(Math.random()*words.length);
    }while(index===lastWordIndex && words.length>1);

    lastWordIndex=index;
    text=words[index];
  }

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
</script>