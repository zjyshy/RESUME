// let addFunctionOnWindowLoad = function (callback) {
//   if (window.addEventListener) {
//     window.addEventListener("load", callback, false);
//   } else {
//     window.attachEvent("onload", callback);
//   }
// };

// addFunctionOnWindowLoad(main);

const html = document.querySelector("#html");
const style = document.querySelector("#style");
const taiji = document.querySelector("#taiji");
let string = `
  /*
  *大家好我叫施振兴，我是个前端新人~*
  *我今天来展现一下我的前端基本功!*
  *我今天要用css来画一个太极*
  */
  .content {
    border:1px solid #000;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    position: relative;
  
    
    /*下面就是阴阳调和的时候啦*/
    background: linear-gradient(90deg, rgba(255,255,255,0.7707457983193278) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);
  }
  /*然后太极生两仪~*/
  .content::before,.content::after {
    content:'';
    position:absolute;
    height:100px;
    width:100px;
    
    border-radius: 50%;
    
    left:50%;
    transform: translateX(-50%);
   
  
  }
  .content::before{
    top:0;
    background-color: #000;
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%);
  }
  .content::after {

    bottom:0;
    background-color: #fff;
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 27%, rgba(255,255,255,1) 100%);
    
  }
  /*太极不会旋转的话还算什么太极！*/
@keyframes rotateTaiji {
  0%{
    transform: rotate(0turn);
  }
  100%{
    transform: rotate(1turn);
  }
}
.content {
  animation: 2s rotateTaiji linear infinite;
}
  `;

let str = "";
let sym = 0;
const scrollH = document.documentElement.scrollHeight;
function write() {
  setTimeout(() => {
    if (string[sym] === "\n") {
      str += "<br>";
    } else if (string[sym] === " ") {
      str += "&nbsp";
    } else {
      str += string[sym];
    }
    html.innerHTML = str;
    style.innerHTML = string.slice(0, sym);
    if (scrollH < document.documentElement.scrollHeight) {
      window.scrollTo(0, 9999);
      html.scrollTo(0, 9999);
    }
    if (sym < string.length - 1) {
      sym++;
      write();
    }
  }, 0);
}
write();
