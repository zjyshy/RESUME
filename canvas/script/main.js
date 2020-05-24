(function FIFE() {
  let addFunctionOnWindowLoad = function (callback) {
    if (window.addEventListener) {
      window.addEventListener("load", callback, false);
    } else {
      window.attachEvent("onload", callback);
    }
  };

  addFunctionOnWindowLoad(main);
  function main() {
    const canvas = document.getElementById("tutorial");
    const ctx = canvas.getContext("2d");

    drawingBoard(canvas, ctx);
    //  drawLine(canvas, ctx);
  }

  function drawingBoard(canvas, ctx) {
    //canvas样式
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    let painting = false;
    //****************
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    window.onresize = () => {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
      console.log(canvas.width);
    };

    var isTouchDevice = "ontouchstart" in document.documentElement;
    if (isTouchDevice) {
      canvas.ontouchstart = (e) => {
        console.log(1);
        ctx.beginPath();
        ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
      };

      canvas.ontouchmove = (e) => {
        let tocuhset = [e.touches[0].clientX, e.touches[0].clientY];
        drawLine(tocuhset, ctx);
      };
    }

    let last = [0, 0];
    canvas.onmousedown = (e) => {
      ctx.lineWidth = 5;
      ctx.beginPath();

      last = [e.clientX, e.clientY];
      painting = true;
    };
    canvas.onmousemove = (e) => {
      if (painting) {
        console.log(painting, last[0], last[1]);
        let clientSize = [e.clientX, e.clientY];
        drawLine(clientSize, ctx);
        last = [clientSize[0], clientSize[1]];
      }
    };
    canvas.onmouseup = () => {
      painting = false;
    };
  }

  function drawLine(lTo, ctx) {
    ctx.lineTo(lTo[0], lTo[1]);
    ctx.stroke();
  }
})();
