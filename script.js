const copies = 
  document.getElementsByClassName("copy");
const sec1 = document.querySelector(".container")
const buttonBox = document.
  querySelector(".secButtons")
const wave = document.querySelector(".wave");
const wave1 = document.querySelector(".wave1");
var opened = false;
var colors = [
  "hsl(200 70% 50%)",
  "hsl(270 70% 50%)",
  "hsl(360 60% 60%)",
  "hsl(50 70% 50%)",
  "hsl(90 70% 40%)",
  "hsl(0 70% 50%)"]
const total = copies.length;

for(var i = 0; i<total; i++){
  var strokeDasharray = 7-(i) +"%";
  var strokeOffset = 7+((total-i-1)*7)+ "%";
  var animName = "stroke" + i;
  
  console.log(i, strokeDasharray,
  strokeOffset, total-i, copies[i].id)
  
  copies[i].style.stroke = colors[i%total]
  
  //CREATE STYLE
  var style = document.createElement("style")
  var finalClass = document.createElement("style")
  finalClass.innerHTML = 
  `.${animName} {
    stroke-dasharray: 7% calc(7% * 5);
    stroke-dashoffset: ${strokeOffset};
  }`
  document.body.append(finalClass);
  
  //CREATE KEYFRAME
  var keyframe = 
  `@keyframes ${animName} {
    to {
      stroke-dashoffset: ${strokeOffset};
      stroke-dasharray: 7% calc(7% * 5);
    }
  }`
  style.setAttribute("id", animName);
  
  //ADD KEYFRAME
  style.innerHTML = keyframe;
  document.body.append(style);
  
  updateValues(copies[i], animName);
}

function animateText(){
  console.log(copies[0].style.animation)
  for(var i = 0; i<total; i++){
    var animName = "stroke" + i;
    var style = window.getComputedStyle(copies[i]) 
    copies[i].style.animation = null;
    copies[i].classList.remove(animName);
    style.getPropertyValue("stroke-dashoffset")
    copies[i].style.animation = animName + " 2s";
  }
}

function updateValues(obj, animName) {
  obj.addEventListener("animationend",
  () => {
    obj.classList.add(animName);
    obj.style.animation = null;
  });
}

function wait(time){
  return new Promise(resolve => 
  setTimeout(resolve, time));
}
var nums = [4, 0, 1, 5]
var buttons = 
    document.getElementsByClassName("secButton");
for(var i = 0; i<buttons.length; i++){
  buttons[i].style.background = colors[nums[i]]
  setButtonClick(buttons[i]);
}
function setButtonClick(obj){
  obj.onclick = () =>
   animateButton(obj);
}
document.querySelector(".button").onclick = () => {
  animateText();
  if(!opened){
    open();
    return;
  }
  async () => {
    for(var i = 0; i<buttons.length; i++){
      animateButton(buttons[i]);
      await wait(500);
    }
  }
}
async function open(){
  
  await wait(1700)
  sec1.style.top = 0;
  wave.style.left = "-1306px"
  wave1.style.left = "-467px"
  await wait(1000);
  
  var scroll = buttonBox.scrollWidth
  var width = buttonBox.offsetWidth

  for(var i = 0; i<buttons.length; i++){
    buttons[i].style.visibility = "visible";
    animateButton(buttons[i]);
    console.log(buttons[i].offsetWidth)
    await wait(500);
    scroll = buttonBox.scrollWidth;
    if(scroll-width > 0){
      buttonBox.style.margin =
        `0px ${scroll-width+40}px`
    }
  }

  document.querySelector(":root").style.
      setProperty("--initial", "40px");
}
function animateButton(obj) {
  var style = window.getComputedStyle(obj) 
  obj.style.animation = null;
  style.getPropertyValue("animation");
  obj.style.animation = "bubble 1.2s";
  obj.classList.add("open");
}
