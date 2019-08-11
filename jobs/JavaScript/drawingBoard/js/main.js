(function FIFE(){



  window.onload =function(){

    main();
  }

  function main(){
    
   

     target =  document.getElementById("canvas");
     ctx = getCanvas();

     penSzie = document.getElementsByClassName("penSize");
     penColor = document.getElementsByClassName("jscolor");
     penButton = document.getElementsByClassName("pen");
    
     rubberSize = document.getElementsByClassName("rubberSize");
     rubberButton = document.getElementsByClassName("rubber");

   
     viewSport = {

      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight,
   
    }


    canvasSize();
    tool();
    clearCanvas();
    
  downloadCavans();
  
  }


  function getCanvas(canvas){

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    return ctx;
}


  function tool(){
     
    
    var p="pen";
    var r = "rubber";
    var l = "line";

    var model = {a:p};//这里定义为对象是为了在传递参数的时候传的是指针而不是变量的值

   
    pen(model);
    rubber(model);
    line(model);

  
    
    
      var lineFlag = false;
      target.onmousedown = function(pos){
       
        var x = pos.clientX;
        var y = pos.clientY;
        if(model.a ==p){
         
          lineFlag = true;
          pen(model);

          ctx.beginPath();
          ctx.moveTo(x,y);
        
        }else if(model.a == r){
          lineFlag = true;
          ctx.clearRect(x,y,rubberSize[0].value*2,rubberSize[0].value*2);

        }else if(model.a = l){
          ctx.beginPath();
          ctx.moveTo(x,y);

        }
      }
      
      target.onmousemove = function(pos){
        if(lineFlag){

          var x = pos.clientX;
          var y = pos.clientY;
          if(model.a == p){

        
         
            ctx.lineTo(x,y);
            ctx.stroke();
         
          }else if(model.a == r){
            ctx.clearRect(x,y,rubberSize[0].value*2,rubberSize[0].value*2);

            }
          }
        }

      target.onmouseup = function(pos){

        lineFlag = false;
        
        
        if(model.a == l){
          var x = pos.clientX;
          var y = pos.clientY;
          ctx.lineTo(x,y);
          ctx.stroke();

        }
      }


  }
  
  function canvasSize(){

   

    target.width = viewSport.width;
    target.height =viewSport.height;
    


  }

  function pen(model){

    ctx.lineWidth = penSzie[0].value; 
    ctx.strokeStyle  = "#" + penColor[0].value;

   
    penButton[0].onclick = function(){

  
        model.a ="pen";
        penButton[0].setAttribute("class","icon pen orange") ;
        rubberButton[0].setAttribute("class","icon rubber") ;
    }

 
    
    




  }



  function rubber(model){

    rubberButton[0].onclick =function(){

      model.a = "rubber";
      rubberButton[0].setAttribute("class","icon rubber orange") ;
      penButton[0].setAttribute("class","icon pen") ;
    }

  
  }


  function clearCanvas(){

    var clearC = document.getElementsByClassName("clear");
    clearC[0].onclick = function(){

      ctx.clearRect(0,0,viewSport.width,viewSport.height)


    }

    

  }

 function downloadCavans(){

    
    var downloadButton = document.getElementsByClassName("save");


    downloadButton[0].onclick =function(){
      var downloadC = target.toDataURL("img/png");
      var downA = document.createElement("a");
      document.body.appendChild(downA);
      downA.href = downloadC;
      downA.download = "MyWork";
      downA.click();
  

    }


  }



  
function line(model){

  var lineButton = document.getElementsByClassName("line");
  lineButton[0].onclick = function(){


   model.a = "line";
  }

}



  
  




})()