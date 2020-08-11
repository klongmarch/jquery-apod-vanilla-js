var apod = {
  //Injects the results of the API call into the DOM
  buildDOM: function(result) {
    document.getElementById("apodTitle").textContent = result.title;

    if(result.media_type === 'video') {
      document.getElementById("apodImg").style.display = "none";

      var videoElem = document.querySelector("#apodVideo > iframe");
      videoElem.src = result.url;
      videoElem.style.display = "";
    }else{
      document.querySelector("#apodVideo").style.display = "none";
      
      var imageElem = document.getElementById("apodImg");
      imageElem.src = result.url;
      imageElem.alt = result.title;
      imageElem.style.display = "";
    }

    document.getElementById("apodCopyright").textContent = "Copyright: " + result.copyright;
    document.getElementById("apodDate").textContent = "Date: " + result.date;
    document.getElementById("apodDesc").textContent = result.explanation;
  },

  //Executes an AJAX call to an API.
  getRequest: function() {
    let _this = this;
    // let date = "2013-06-06";

    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    var url = "https://api.nasa.gov/planetary/apod?api_key=NJgjtxDubyLCAKXTGAhjze7IguWwCs8Rl22O6Dil&date=" + date;
/*
    $.ajax({
        url: url
    }).done(function(result){
        _this.buildDOM(result);
    }).fail(function(result){
      console.log(result);
    });
*/

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var jsonObj = JSON.parse(this.responseText);

        if (this.status == 200) {
          _this.buildDOM(jsonObj);
          // console.log(jsonObj);
        } else {
          console.log(jsonObj);
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  },

  // Initialization method.
  init: function() {
    this.getRequest();
  },

  //Create a random date
  randomDate: function(start, end) {
    //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    //Format the date
    let d = date.getDate();
    let m = date.getMonth() + 1; //In JS months start at 0
    let y = date.getFullYear();

    //Change the month and day strings so that they match the documented format.
    if(m < 10){
      m = '0'+m
    }

    if(d < 10){
      d = '0'+d
    }

    return y + "-" + m + "-" + d;
  },
};

apod.init();

document.getElementById("btnRandApod")
    .addEventListener("click", ()=>{apod.getRequest();});
