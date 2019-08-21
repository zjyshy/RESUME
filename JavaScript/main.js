(function FIFE(){
 
	//同时监听多个onload事件
  
 
	var addFunctionOnWindowLoad = function(callback){
		if(window.addEventListener){
			window.addEventListener('load',callback,false);
		}else{
			window.attachEvent('onload',callback);
		}
	};

	//tween.js效果库时间设置
	function animate(time) {
		requestAnimationFrame(animate);
		TWEEN.update(time);
	}

	addFunctionOnWindowLoad(main);

	function main(){


		const viewH = window.scrollY;
		const xTag = document.querySelectorAll('[data-x="xx"]'); 
		var topBar = document.getElementsByClassName('topNavBar');
    

		//由于对于起名学的造诣太浅，所以每个函数的作用会标注一下
		welcomeLoading();           //文档还没完全加载时的加载动画
		topBarButton();             //当鼠标移动到某个按钮上的动画效果
		topBarClickJump();          //点击按钮跳转到响应的标签
		RollAppear(viewH,xTag);     //滑动到相应高度时淡入的效果
		topBarRoll(viewH,xTag);     //当滑动到一定位置，相应的顶部导航栏的标签高亮
		topBarSticky(viewH,topBar); //滑动页面顶部导航栏变形
		topBarOnscr(topBar,xTag);   //需要使用鼠标滑动事件的集合，为了只监听一次，并且代码看起来清晰


	}


	requestAnimationFrame(animate);       //根据用户的设备动态的设置帧率




	function welcomeLoading(){

		var loading = document.getElementsByClassName('loading-site');
		loading[0].classList.add('loading-hide');

	}




	function topBarOnscr(topBar,xTag){
    
		//三个都有xx标记的大块
		window.onscroll =function(){

			var viewH = window.scrollY;
     
			RollAppear(viewH,xTag);
			topBarRoll(viewH,xTag);
			topBarSticky(viewH,topBar);

		};
	}

	function topBarSticky(viewH,topBar){
		if(viewH>30){

			topBar[0].classList.add('sticky');

		}else{

			if(document.getElementsByClassName('sticky')){
    
				topBar[0].classList.remove('sticky');

			}        
		}
	}

	function topBarRoll(viewH,xTag){
  
		var min = xTag[0];

		for(let i = 0; i<xTag.length-1;i++){

			var T2 = xTag[i+1];

			if(Math.abs(min.offsetTop-viewH)>Math.abs(T2.offsetTop-viewH)){
      
				min =T2;

			}
		}

		var hrefT = min.id;
		var ATag = document.querySelector('[href="#'+hrefT+'"]');

		for(let i =0;i<xTag.length;i++){
  
			document.querySelector('[href="#'+xTag[i].id+'"]').classList.remove('activeR');
  
		}

		ATag.classList.add('activeR');

	}

	function topBarButton(){

		var topBarB = document.getElementsByClassName('topBarButton');

		for(let i = 0;i <topBarB.length;i++){

			topBarB[i].onmouseenter = function(event){

				event.target.childNodes[0].classList.add('active');     
				//target是操作的元素event.target
				//currentTarget是监听的元素event.currenttarget

				if(event.target.childNodes[2]){
 
					event.target.childNodes[2].classList.add('active');      
 
				}
			};

			topBarB[i].onmouseleave = function(){

				event.target.childNodes[0].classList.remove('active');    
				if(event.target.childNodes[2]){
          
					event.target.childNodes[2].classList.remove('active');  
       
				} 
			};
		}
	}


	function topBarClickJump(){

		//querySelectorAll返回与指定的选择器组匹配的文档中的元素列表 (使用深度优先的先序遍历文档的节点)。返回的对象是 NodeList 。

		var topBarA = document.querySelectorAll('.topBarButton>a');

		for(let i = 0;i<topBarA.length;i++){

			topBarA[i].onclick =function(event){
     
				event.preventDefault(); //event.preventDefault()可以阻止a的默认动作

				var a = event.currentTarget;
				var href = a.getAttribute('href');//这里如果直接使用a.gref会得到类似于http://127.0.0.1:8080/#skillforJump 的内容。 
				if(href != '#'){

					var tar = document.querySelectorAll(href)[0]; 
					var top = tar.offsetTop; //offsetTop可以获取元素距离整个页面顶端的距离
					var targetTop = top - 80;
					var currentTop = window.scrollY;  

					//tween.js实现
					const coords = { y: currentTop }; // Start at (0, 0)
					const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
						.to({y: targetTop }, 1000) // Move to (300, 200) in 1 second.
						.easing(TWEEN.Easing.Elastic.InOut) // Use an easing function to make the animation smooth.
						.onUpdate(() => { // Called after tween.js updates 'coords'.
							// Move 'box' to the position described by 'coords' with a CSS translation.
							window.scrollTo(0,coords.y);

						})
						.start(); // Start the tween immediately.

				}      
			};
		}
	}

	function RollAppear(viewH,xTag){
		if(viewH >= 530){

			xTag[1].classList.add('appear');

		}
		if(viewH >=930){
			xTag[2].classList.add('appear'); 

		}

	}





})();