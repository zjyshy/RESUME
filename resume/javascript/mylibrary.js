(function IIFE(){
  function MyLibrary(target) {


    //这里的target就是将传入各个方法的this进行预处理
    //因为可能是字符串或者是一个对象
    target = typeof target === 'string' ? document.querySelectorAll(target) : target;
  
    function sibling() {
  
      var chi = Array.prototype.slice.call(this[0].parentNode.children, 0);
      console.log(arguments[0])
      for (let i = 0; i < chi.length; i++) {
        if (arguments[0]) {
          return chi;
        } else {
          if (chi[i] === this[0]) {
            chi.splice(i, 1);
          }
        }
      }
      return chi;
    }
  
    function changeClass(model) {
      //不管this是啥类型，都将其转换成一个数组，长度=1this就是一个元素，>1this就是一个伪数组
        const thisContent = Array.prototype.slice.apply(this).length === 0 ? [this] : Array.prototype.slice.apply(this);
  
  
      //默认是添加模式
      //model为1就是添加模式
      //model为2就是删除模式 
  
      //将changeClass的除了model之外的参数进行处理，将其转化成数组
      const content = Array.prototype.slice.call(arguments, 1);
  
      //对处理后的this进行遍历，将每一个目标都进改写
      thisContent.forEach((tar) => {
        const tergetCon = Array.prototype.slice.apply(tar.classList);
  
        if (model === 1) {
  
          content.forEach((value) => {
              tar.classList.add(value);
  
            })
            /*
        for(let i=0;i<content.length;i++){
  
          value.classList.add(content[i]);
  
        }
  */
        } else if (model === 2) {
          content.forEach((value) => {
              tar.classList.remove(value)
            })
            /*
        for(let i =0; i<content.length;i++){
  
          value.classList.remove(content[i]);
  
        }        
  */
        } else {
          if (tergetCon.indexOf(content[0]) !== -1) {
  
            tar.classList.add(content[1]);
          }
          tar.classList.remove(content[0]);
  
  
        }
  
  
  
      })
  
    }
  
    function text() {
    const thisContent = Array.prototype.slice.apply(this).length === 0 ? [this] : Array.prototype.slice.apply(this);
  
      var textContent = [];
      if (arguments[0]) {
        textContent = thisContent.forEach((value) => {
  
          value.textContent = arguments[0];
        })
  
      } else {
        console.log(thisContent)
        thisContent.forEach((value,key) => {
         textContent[key] = value.textContent;
  
        })
  
        return textContent;
      }
    }
  
  
    function ajax(){
  
      var options = arguments[1]?arguments[1]:arguments[0];
      var url = arguments[1]?arguments[0]:options.url;
      var method = options.method;
      var httpRequest = windwo.XMLHttpRequest?new XMLHttpRequest():window.ActiveXObject;
      var async  = options.async?options.async:true;
      var data = options.data?JSON.parse(options.data):null; 
      var header = options.header;
      httpRequest.open(method,url,async);
      if(header){for(let key in header){
        httpRequest.setRequestHeader(key,header[key]);
      }}
      httpRequest.send(data);
      if(httpRequest.readyState === 4){
        if(httpRequest.status >=200&& httpRequest<=300){
          console.log("resopnse:"+httpRequest.response);
          console.log("responseText:"+httpRequest.responseText);
          console.log("content-type:"+httpRequest.getResponseHeader("Content-Type"));
        }
      }
  
  
    }
  
  
    return {
  
      changeClass: changeClass.bind(target),
      sibling: sibling.bind(target),
      text: text.bind(target),
      ajax:ajax
    }
  }
  
  
  window.$$ = MyLibrary;
  
return  $$;

})()
