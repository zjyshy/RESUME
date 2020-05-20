

function MyCarousel(){

  function ordinary(){

    const $ordinary = $('#ordinary')
    const $OW = $('#OWrapper');
    const $BL = $('#buttonList');

    let n = 0;//时钟运行时的button按钮
    let flag = 0;//用来记录到底有几张图，可以用来设置wrapper的宽度
    
    for(let i=0; i<arguments[0].length;i++){
      flag = i;      
      
      $OW.append('<div class = "ordinaryContent">')
      
      $('.ordinaryContent').eq(i).append('<img src = img/'+arguments[0][i]+'>');
      $BL.append('<button>第'+(i+1)+'张</button>') 
      if(i===0){

        $('button').eq(0).addClass('active');//默认视口中图片对应的按钮高亮
      
      }

      $('button').eq(i).on('click',function(){
        //高亮按钮，以及去之前高亮的按钮
        $('.active').eq(0).removeClass('active');
        $('button').eq(i).addClass('active');
        
        //将wrapper的偏移量调整（调整视口显示的图片）
        $OW.css({transform: 'translate('+(i*-contentWidth)+'px, 0px)'});
      });
    }

    //对于图片宽高进行设置，这些参数都是可选的。
    const MCOSet = arguments[1]?arguments[1]:null;
    const contentWidth =  MCOSet.width?MCOSet.width:Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const contentHeight = MCOSet.height?MCOSet.height:Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    var timeset= MCOSet.time?MCOSet.time:1500;
    let timer = setTime(timeset); 
    
    $('.ordinaryContent').width(contentWidth);
    $('img').width(contentWidth);
   
    
    $OW.width((flag+1)*contentWidth+"px");//根据不同的图片数动态的设置wrapper的长度
    $ordinary.width(contentWidth);
    $('img').height(contentHeight);
    $('.ordinaryContent').height(contentHeight);

    function setTime(timeset){

        
      return setInterval(function (){

        n++;
        $('button').eq(n%(flag+1)).trigger('click');
  
      },timeset);
  
    }

    $ordinary.on('mouseenter',function(){
      
      clearInterval(timer);

    })
    $ordinary.on('mouseleave',function(){

      timer = setTime(timeset);
    
    })
  }

function seamless(){


  const $SC = $('#seamless');
  const $SCWrapper = $('#seamlessWrapper');
  const content = arguments[0];
  const $SBL = $('#seamlessButtonList')


  const MCSSet = arguments[1]?arguments[1]:null;
  const W=MCSSet.width?MCSSet.width:Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const H= MCSSet.height?MCSSet.height:Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  

  const $leftJump = $('#seaLeftJump');
  const $rightJump = $('#SeaRightJump');

  const timeset= MCSSet.time?MCSSet.time:1500;

  for(let i = 0;i<(content.length+2);i++){
    if(i === 0){
      
      $SCWrapper.append('<div class ="seamlessContent"></div>');
      $('.seamlessContent').eq(i).append('<img class = "seamlessImg" alt = '+content[(content.length-1)]+' src = img/'+content[(content.length-1)]+'>')
    }else if(i === (content.length+1)){

      $SCWrapper.append('<div class ="seamlessContent"></div>');
      $('.seamlessContent').eq(i).append('<img class = "seamlessImg"  alt = '+content[0]+' src = img/'+content[0]+'>')
    }else{

      $SCWrapper.append('<div class ="seamlessContent"></div>');
      $('.seamlessContent').eq(i).append('<img  class = "seamlessImg"  alt = '+content[i-1]+' src = img/'+content[i-1]+'>')
    }


  }
(function setSize(){

  $('.seamlessContent').width(W);
  $SC.width(W);
  $SC.height(H);
  $('.seamlessImg').width(W);
  $('.seamlessImg').height(H);
  $('.seamlessContent').height(H);
  $SCWrapper.height(H);
  $SCWrapper.width(W*(content.length+2))
  
})();


function defaultLocation(){

  $SCWrapper.css({left:-W+'px'})

}

defaultLocation.call();



function myNumber(target){
var a = '';
  for(let i = 0;i<target.length;i++){
    if(!isNaN(Number(target[i]))){      
      a = a+target[i];  
  }
}
return Number(a);
}




var flag = 0;//十分重要的一个标志
//通过它可以记录当前的点击位置

function myAnimation(tar,myclick,that){
  //tar决定了这是点击左边按钮还是右边按钮的动画
  //myclick是click事件所触发的函数
  //that里面保存了一个不变的this
  var leftNow = myNumber( $SCWrapper.css('left'));
  const NUM = 40;   //设置移动次数
  var eve = W/NUM;  //每次移动的距离
  var n = 1;        //控制移动次数

  
  //true是左，false是右  
  eve = tar?eve:-eve;
  leftNow = tar?leftNow-10:leftNow+10;

  var heihei = setInterval(() => {
    $SCWrapper.css({left:eve*n-leftNow+'px'});
    n++;

    if(n === NUM){
      window.clearInterval(heihei);
    $(that).on('click',myclick);
    }
  
  }, 12);
}

$leftJump.on('click',function myclick(){
  var that = this;
  $(this).off('click');
  flag--;
  if(flag === -1){
    $SCWrapper.css({left:-W*(content.length+1)+'px'})
    flag = 4;
  }
  myAnimation(true,myclick,that);
})

$rightJump.on('click',function myclick(){
  
  var that = this;
  $(this).off('click');
  flag++;

  if(flag === content.length){
    $SCWrapper.css({left:0})
    flag = 0;

  }

  myAnimation(false,myclick,that)

})





var timer = time();
function time(){

  return   setInterval(() => {
      
    $rightJump.trigger('click');

    }, timeset);

}

$SC.on('mouseenter',()=>{

  clearInterval(timer);
  

})

$SC.on('mouseleave',()=>{

  timer = time();
})
 

}



return {

  ordinary:ordinary,
  seamless:seamless

}
}
window.ms = MyCarousel;

//下面是apple轮播的数据
var ordinaryLibrary = ['info.jpg','iphone.jpg','macbook.jpg','imac.jpg'];
var MyCarouselOSet = {

  width:920,
  height:400,
  time:3000,

}

 


//上面是apple轮播


//

  var seamlessLibrary =['info.jpg','iphone.jpg','macbook.jpg','imac.jpg']
  var MyCarouselSSet = {

    width:920,
    height:400,
    time:3000

  }


//

window.onload = function(){
  
  ms().ordinary(ordinaryLibrary,MyCarouselOSet);
  ms().seamless(seamlessLibrary,MyCarouselSSet);

}

