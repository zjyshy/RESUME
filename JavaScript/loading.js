
(function FIFE(){


  var view = document.getElementsByClassName('loading-site');

  var controller = {

    view:null,
    init:(view)=>{
      this.view = view;
      this.welcomeLoading();
    },

    welcomeLoading: ()=>{
      view.classList.add('loading-hide')
    }
  }

  controller.init(view);
    function welcomeLoading(){
  
      var loading = document.getElementsByClassName('loading-site');
      loading[0].classList.add('loading-hide');
  
    }


})()

