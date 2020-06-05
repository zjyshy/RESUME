const btn1 = document.querySelector(".getCss");
const btn2 = document.querySelector(".getJS");
const btn3 = document.querySelector(".getHtml");
const btn4 = document.querySelector(".getXML");
const btn5 = document.querySelector(".getJSON");
const h1 = document.querySelector("h1");
const pageUp = document.querySelector(".pageUp");
const pageDown = document.querySelector(".pageDown");
const request = new XMLHttpRequest();
const ulP = document.querySelector(".page");
let n = 1;
console.log(btn2);
btn1.addEventListener("click", () => {
  request.open("GET", "style.css");
  request.addEventListener("load", function () {
    const style = document.createElement("style");
    style.innerHTML = request.response;
    document.head.appendChild(style);
  });

  request.send();
});

btn2.addEventListener("click", () => {
  request.open("GET", "main2.js");

  request.addEventListener("load", function () {
    const js = document.createElement("script");
    console.log(request);
    js.innerHTML = request.response;
    document.body.appendChild(js);
  });
  request.send();
});

btn3.addEventListener("click", () => {
  request.open("GET", "index2.html");
  request.onreadystatechange = function () {
    if (
      request.readyState === XMLHttpRequest.DONE &&
      request.status >= 200 &&
      request.status < 300
    ) {
      const div = document.createElement("div");
      div.innerHTML = request.response;
      document.body.appendChild(div);
    }
  };

  request.send();
});

btn4.addEventListener("click", () => {
  request.open("GET", "a.xml");
  request.onreadystatechange = () => {
    if (
      request.readyState === XMLHttpRequest.DONE &&
      request.status >= 200 &&
      request.status < 300
    ) {
      console.log(
        request.responseXML
          .getElementsByTagName("warning")[0]
          .textContent.trim()
      );
    }
  };
  request.send();
});
btn5.addEventListener("click", () => {
  request.open("GET", "data.json");

  request.onreadystatechange = () => {
    if (
      request.readyState === XMLHttpRequest.DONE &&
      request.status >= 200 &&
      request.status < 300
    ) {
      const obj = JSON.parse(request.response);

      h1.innerText = "Hello " + obj.name.toUpperCase();
    }
  };
  request.send();
});

pageUp.addEventListener("click", () => {
  if (n > 1) {
    request.open("GET", `./db/page${n - 1}.json`);

    request.onreadystatechange = () => {
      if (
        request.readyState === XMLHttpRequest.DONE &&
        request.status >= 200 &&
        request.status < 300
      ) {
        let arr = JSON.parse(request.response);

        let content = arr.map((ele) => {
          return `<li>我是${ele.id}号</li>`;
        });

        ulP.innerHTML = content.join("");

        n--;
      }
    };
    request.send();
  } else {
    alert("已经是第一页了（为省事用了alert）");
  }
});

pageDown.addEventListener("click", () => {
  request.open("GET", `./db/page${n + 1}.json`);

  request.onreadystatechange = () => {
    if (
      request.readyState === XMLHttpRequest.DONE &&
      request.status >= 200 &&
      request.status < 300
    ) {
      let arr = JSON.parse(request.response);

      let content = arr.map((ele) => {
        return `<li>我是${ele.id}号</li>`;
      });

      ulP.innerHTML = content.join("");
      n++;
    } else if (request.readyState === XMLHttpRequest.DONE) {
      alert("已经是最后一页了（为省事用了alert）");
    }
  };
  request.send();
});
