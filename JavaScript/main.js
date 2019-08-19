(function FIFE(){
 
 //同时监听多个onload事件
  
 
  var addFunctionOnWindowLoad = function(callback){
    if(window.addEventListener){
        window.addEventListener('load',callback,false);
    }else{
        window.attachEvent('onload',callback);
    }
}


addFunctionOnWindowLoad(main);

  function main(){




    topBar = document.getElementsByClassName("topNavBar");
    
    
    welcomeLoading();
    topBarRool();
    topBarButton();
    topBarClickJump();
  }




  function welcomeLoading(){

    var loading = document.getElementsByClassName("loading-site");
    loading[0].classList.add("loading-hide");


  }


  function topBarRool(){

    window.onscroll =function(eve){

      if(window.scrollY>30){

        

        topBar[0].classList.add("sticky");

      }else{

        if(document.getElementsByClassName("sticky")){
          topBar[0].classList.remove("sticky");
        }
        
        
      }

    }

  }






  

  function topBarButton(){

    var topBarB = document.getElementsByClassName("topBarButton");
    for(let i = 0;i <topBarB.length;i++){

      topBarB[i].onmouseenter = function(event){

        event.target.childNodes[0].classList.add("active");     
        //target是操作的元素event.target
        //currentTarget是监听的元素event.currenttarget
        if(event.target.childNodes[2])event.target.childNodes[2].classList.add("active");      

      }
      topBarB[i].onmouseleave = function(){

        event.target.childNodes[0].classList.remove("active");    
        if(event.target.childNodes[2])event.target.childNodes[2].classList.remove("active");  
      }
    }
  }


function topBarClickJump(){

  //querySelectorAll返回与指定的选择器组匹配的文档中的元素列表 (使用深度优先的先序遍历文档的节点)。返回的对象是 NodeList 。

  var topBarA = document.querySelectorAll(".topBarButton>a");

  for(let i = 0;i<topBarA.length;i++){

    topBarA[i].onclick =function(event){
      //event.preventDefault()可以阻止a的默认动作

      event.preventDefault();


      var a = event.currentTarget;
      var href = a.getAttribute("href");
      console.log(href);
      if(href != "#")var tar = document.querySelectorAll(href)[0];
      console.log(tar);

      //offsetTop可以获取元素距离整个页面顶端的距离
      var top = tar.offsetTop;
      
      window.scrollTo(0,top-80);
      //这里如果直接使用a.gref会得到类似于http://127.0.0.1:8080/#skillforJump 的内容。
      //使用getAttribute就可以获得href里面的内容
      console.log(a.href,a,a.getAttribute("href"));




      

    }
  }
}



})()