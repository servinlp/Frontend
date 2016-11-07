var allFilters = document.querySelectorAll('header section > ul > li'),
    filterChild = document.querySelectorAll('header section > ul > li > ul li'),
    likes = document.querySelectorAll(".like"),
    orientation = document.querySelectorAll(".orientation button"),
    login = document.querySelectorAll(".login form button"),
    main = document.querySelector("main"),
    sort = document.querySelectorAll("header > p button li"),
    later = document.querySelectorAll(".later"),
    download = document.querySelectorAll(".download"),
    figure = document.querySelectorAll(".beroemd > figure")[0],
    man = document.querySelectorAll(".beroemd > figure img")[0],
    beroemdd = document.querySelectorAll(".beroemdd")[0],
    x;

if (allFilters[0]) {
  for (var i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", function(){
      this.classList.toggle("open");
    }, false);
  }

  for (var i = 0; i < filterChild.length; i++) {
    filterChild[i].addEventListener("click", function(event){
      event.stopPropagation();
      var input = this.querySelectorAll("input")[0],
      value = input.value;
      if (input.checked) {

      }
    }, true);
  }

  document.querySelectorAll("header p button")[0].addEventListener("click", function() {
    this.classList.toggle("open");
  });

  for (var i = 0; i < sort.length; i++) {
    sort[i].addEventListener("click", function(){
      document.querySelectorAll("header > p button > p")[0].innerHTML = this.querySelector("input").value;
    });
  }
}

if (document.querySelectorAll("header section")[0]) {
  document.querySelectorAll("header section > button")[0].addEventListener("click", function(){
    this.classList.toggle("open");
    this.parentNode.querySelector('ul').classList.toggle("open");
  });
}


if (likes[0]) {
  for (var i = 0; i < likes.length; i++) {
    likes[i].addEventListener("click", function() {
      var that = this,
          span = that.querySelector("span"),
          num = parseInt(span.innerHTML);

          num += 1;
          span.innerHTML = num;
      that.querySelector("svg").classList.add("big");
      setTimeout(function(){
        that.querySelector("svg").classList.remove("big");
      }, 300);
    });
  }
}

if (orientation[0]) {
  for (var i = 0; i < orientation.length; i++) {
    orientation[i].addEventListener("click", function(){
      if(!this.classList.contains("active")){
        orientation[0].classList.toggle("active");
        orientation[1].classList.toggle("active");
        main.classList.toggle("full")
      }
    });
  }
}

if (document.querySelector("main.login")) {
  for (var i = 0; i < login.length; i++) {
    login[i].addEventListener("click", function(event){
      event.preventDefault();
      var form = this.parentNode.parentNode,
      allForm = document.querySelectorAll(".login form"),
      index = Array.prototype.indexOf.call(form.parentNode.childNodes, form);
      form.style.display = "none";
      x = index == 1 ? allForm[1].style.display = "block" : allForm[0].style.display = "block";
    });
  }
}

function articleHeight(container) {
  var children = container.children,
      max = 0;
  for (var i = 0; i < children.length; i++) {
    max = Math.max(children[i].clientHeight, max);
  }

  for (var i = 0; i < children.length; i++) {
    children[i].style.height = max + "px";
  }
}

if (later[0]) {
  for (var i = 0; i < later.length; i++) {
    later[i].addEventListener("click", function(){
      this.classList.toggle("active");
    });
  }
  for (var i = 0; i < download.length; i++) {
    download[i].addEventListener("click", function(){
      this.classList.toggle("active");
      this.addEventListener("webkitAnimationEnd", function(){
        afterDownload(this);
      });
      this.addEventListener("AnimationEnd", function(){
        afterDownload(this);
      });
    });
  }

  randomPicture();
  man.addEventListener("webkitAnimationEnd", function(){
    figure.classList.remove("animate");
    randomPicture();
  });
  man.addEventListener("AnimationEnd", function(){
    figure.classList.remove("animate");
    randomPicture();
  });
}

function afterDownload(that){
  var p = that.querySelector("p");
  p.innerHTML = "Downloading...";
  that.classList.add("downloading");
  setTimeout(function(){
    p.innerHTML = "Open";
    that.classList.add("done");
  }, 2000);
}

function randomPicture(){
  var time = Math.round(Math.random() * 10000);
  setTimeout(function(){
    figure.classList.add("animate");
  }, time);
}


if (beroemdd) {
  var body = document.body,
  html = document.documentElement,
  HEIGHT = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ),
  windowHeight = window.innerHeight,
  activateAt = (HEIGHT - windowHeight) - 100,
  nth = 0,
  classes = ["second", "third"],
  figure = document.querySelectorAll("main > figure figure")[0];

  window.addEventListener("scroll", scroll);

  figure.addEventListener("webkitAnimationEnd", function(){
    main.classList.remove("animate");
    if (nth == 1) {
      main.classList.remove(classes[0])
    }
    nth += 1;

    HEIGHT = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    activateAt = (HEIGHT - windowHeight) - 100;
    window.scrollTo(0,0);
  });
}

function scroll(){
  if (((window.pageYOffset || html.scrollTop)  - (html.clientTop || 0)) > activateAt && nth < 2 && !main.classList.contains("animate")) {
    main.classList.add("animate");
    setTimeout(function(){
      main.classList.add(classes[nth]);
    }, 600);
  }
}
