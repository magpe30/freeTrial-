//CHANGING THEMES////////////////
var select = document.querySelector('select');
var html = document.querySelector('body');
var picture = document.getElementById('picures');
var banner = document.getElementsByClassName('banner');
//html.style.backgroundRepeat = "no-repeat";
html.style.backgroundSize = "";



select.addEventListener('change', backgrounds);

function backgrounds(){
    var choice = select.value;
    
    if(choice === 'christmas'){
        html.style.backgroundImage = "url('images/christmas_background.png')";
        document.getElementById('bannerPos').style.backgroundImage = "url('images/christmas.jpg')";
        document.querySelector("#headline-text").style.color = "#F7F7F7";
        document.querySelector("#headline-p").style.color = "#F7F7F7";
        document.querySelector(".themes-area").style.backgroundColor = "#7cbfb4";
           
    }
    if(choice === 'valentines'){
        html.style.backgroundImage = "url('images/valentine_background.png')";
        document.getElementById('bannerPos').style.backgroundImage = "url('images/valentine.png')";
        document.querySelector("#headline-text").style.color = "#F7F7F7";
        document.querySelector("#headline-p").style.color = "#F7F7F7";
        document.querySelector(".themes-area").style.backgroundColor = "#d6748b";
        
    }
    if(choice === 'newyears'){
        html.style.backgroundImage = "url('images/newyears_correct.png')";
        document.getElementById('bannerPos').style.backgroundImage = "url('images/newyear_header.png')";
        document.querySelector("#headline-text").style.color = "#F7F7F7";
        document.querySelector("#headline-p").style.color = "#F7F7F7";
        document.querySelector(".themes-area").style.backgroundColor = "#5e6dad";
        
    }
    if(choice === 'stpatrick'){
        html.style.backgroundImage = "url('images/patrick_correct.png')";
        document.getElementById('bannerPos').style.backgroundImage = "url('images/patrick_header.png')";
        document.querySelector("#headline-text").style.color = "#0E4F55";
        document.querySelector("#headline-p").style.color = "#0E4F55";
        document.querySelector(".themes-area").style.backgroundColor = "#0E4F55";
        
    }
    if(choice === 'easter'){
        html.style.backgroundImage = "url('images/easter_correct.png')";
        document.getElementById('bannerPos').style.backgroundImage = "url('images/easter_header.png')";
        document.querySelector(".themes-area").style.backgroundColor = "#aeb85c";
        document.querySelector("#headline-text").style.color = "#F8F9FC";
        document.querySelector("#headline-p").style.color = "#F8F9FC";
    }
    if(choice === 'themes'){
        html.style.backgroundColor = "white";
        html.style.backgroundImage = "";
        document.getElementById('bannerPos').style.backgroundColor = "#FFDBF4";
        document.getElementById('bannerPos').style.backgroundImage = ""
        document.querySelector('.themes-area').style.backgroundColor = "#953B70";
        document.querySelector("#headline-text").style.color = "#953B70";
        document.querySelector("#headline-p").style.color = "#953B70";
    }
}

/*var dict = {
    valentines: "2/14",
    stPatricks: "3/17",
    easter: "4/4",
    christmas: "12/25"
};
var currentTime = new Date();
var year = currentTime.getFullYear();
var dd = String(currentTime.getDate()).padStart(2, ‘0’);
var mm = String(currentTime.getMonth() + 1).padStart(2, ‘0’);
var today = mm + "/" + dd + "/" + year;
var nearestevent=“New Year”;
for (var temp in dict) {
    if (dict.hasOwnProperty(temp)){
      const date1 = new Date(today);
      const date2 = new Date(dict[temp]+"/"+year);
      const diffTime = date2 - date1;
      if (diffTime>0){
        nearestevent = temp;
        break;
      };
    };
};
console.log(nearestevent);*/ 