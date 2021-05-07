
////UPLOAD IMAGES
let deletedImages=[];
let curentImageVideoFileIndex = 1;
let num = 0;
let imagesArray= [];
let firebaseImgArray = [];
let firebaseLogoImg = [];

"use strict";
function previewImages() {
    if (window.File && window.FileList && window.FileReader) {
        var files = event.target.files; //files uploaded 
        files2 = Array.from(files)
        //files2.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

        files = files2
        
        var output = $(".preview-images-zone");
        var imlist="";
        
    
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var flag=0;
            for(var j=0; j < deletedImages.length; j++){
                if ( deletedImages[j] == file.name ){
                    deletedImages.splice(j, 1); j--;
                }
            }
            if (file.type.match('image') ){
              flag=1;
              var picReader = new FileReader();
              
              picReader.onload = (function(theFile){
                  var fileName = theFile.name;
                     return function(e){
                        var picFile = e.target;
                        var html =  '<div class="inline-display preview-image preview-show-' + num + '">' +
                              '<div class="image-cancel" onclick="imgccl(this)" data-number="'+ num +'" data-filename="' + fileName + '" data-no="' + num + '"><i class="bi bi-trash"></i></div>' +
                              '<div class="image-zone"><img class="image-source" id="pro-img-' + num + '" src="' + picFile.result + '"></div>' +
                              // '<div class="tools-edit-image"><a href="javascript:void(0)" data-no="' + num + '" class="btn btn-light btn-edit-image">edit</a></div>' +
                              '</div>';

                        output.append(html);
                        num = num + 1;
                        document.getElementById("imshow").innerHTML = '<img class="analyse-image" data-number="'+ num +'" src="'+ picFile.result +'">';
                        let imageSource = document.getElementById("imshow").innerHTML;
                        let imagesWrap = imageSource.split("&lt;&gt;");
                        let imageSrConverted = JSON.stringify(imagesWrap);

                        imagesArray.push(imagesWrap);
                       
                    }
                   
                    
        
                })(file)
                picReader.readAsDataURL(file);
                firebaseImgArray.push(file);
            }
            if (file.type.match('video')){
                var picReader = new FileReader();
  
                picReader.onload = (function(theFile){
                    var fileName = theFile.name;
                    return function(e){
                        var picFile = e.target;
                        var html =  '<div class="inline-display preview-image preview-show-' + num + '">' +
                                '<div class="image-cancel" onclick="imgccl(this)" data-filename="' + fileName + '#t=1" data-no="' + num + '"><i class="bi bi-trash"></i></div>' +
                                '<div class="image-zone"><video class="image-source" width="80" height="80" controls id="pro-img-' + num + '" src="' + picFile.result + '"></video></div>' +
                                // '<div class="tools-edit-image"><a href="javascript:void(0)" data-no="' + num + '" class="btn btn-light btn-edit-image">edit</a></div>' +
                                '</div>';
  
                    output.append(html);
                    num = num + 1;
                    document.getElementById("imshow").innerHTML = '<video controls class="analyse-image" data-number="'+ num +'" src="+ picFile.result +"></video>';
                    let videoSource = document.getElementById("imshow").innerHTML;
                    let videoWrap = videoSource.split("&lt;&gt;");
                    let videoSrcConverted = JSON.stringify(videoWrap);
                    imagesArray.push(videoWrap);
                    
                  };
                })(file); 
  
                picReader.readAsDataURL(file);
                firebaseImgArray.push(file);
            }  
        }
        curentImageVideoFileIndex++;
        
    }


}

document.querySelector('#file-input1').addEventListener("change", previewImages);

////LOGO UPLOAD /////

function uploadImageVideos(){
    $('#pro-image-' + curentImageVideoFileIndex).click();
}
//function uploadLogoImage(){
//   $("#logo-image").click();
//}
  
function imgccl(inp){
    let no = $(inp).data('no');
    let filename = $(inp).data("filename");
    let imagesArrayIndex = $(inp).data("number");
    let arrayIndex = JSON.stringify(imagesArrayIndex);
    
    delete imagesArray[no];
    delete firebaseImgArray[no];
    
    $(".preview-image.preview-show-"+no).remove();
    if ( no == "logo" ){
       document.getElementById("logo-image").value = null;
       firebaseLogoImg.pop();
    }else{
        deletedImages.push(filename);
        //document.getElementById("deleted_images").value = deletedImages;
    }
}
  


document.getElementById('logo-image').addEventListener('change', readLogoImage, false);
function readLogoImage(){
    if (window.File && window.FileList && window.FileReader) {
        var file = event.target.files[0];
        var output = $(".preview-logo-zone");
        if (file.type.match('image/png')) {
            var picReader = new FileReader();
            picReader.addEventListener('load', function (event) {
                var picFile = event.target;
                var html =  '<div class="preview-image preview-show-logo">' +
                            '<div class="image-cancel" onclick="imgccl(this)" data-number="'+ num +'" data-no="logo"><i class="bi bi-trash"></i></div>' +
                            '<div class="image-zone"><img id="pro-img-logo' + '" src="' + picFile.result + '"></div>' +
                            '</div>';
                output.html(html);
            });
            picReader.readAsDataURL(file);
            firebaseLogoImg.push(file);
            console.log(firebaseLogoImg);
        }
    }
}

//// analyse function///

function analyseText(){
    const tp = document.getElementsByName('video');
    var nodeArray = [].slice.call(tp);
    var lic=[];
    for (var i=0; i<nodeArray.length; i++){
        if (nodeArray[i]["checked"]==true){
            lic.push(nodeArray[i]["defaultValue"]);
        }
    } 
    analyseImgArray = imagesArray.filter(function(element) {
        return element != null;
    });
    let textInd = $("input[type='radio'][name='video']:checked").val();
    let dataImg = $('input[name="video"]:checked').attr("data-img");
    let minImagesReq = JSON.parse(dataImg);
    
    
    let textIndexes = JSON.parse("["+textInd+"]");

    let tableArea="";
    tableArea += "<table>";        
    var cnt =0;
    var cnt2 =0;

    if(analyseImgArray.length < minImagesReq){
        document.getElementById("notenoughImg").style.display= "inline" ;
    }else{
        document.getElementById("notenoughImg").style.display= "none" ;
        for  (var j = 0; j < textIndexes.length; j++) {
            if (textIndexes[j]===-1)
            {
                tableArea += "<tr><th width=\"25%\"></th><th width=\"70%\"><input type=\"text\" class=\"form-control analys-input mt-2\" placeholder=\"Add your text here\" name=\"phrase[]\" ></th></tr>";
                cnt2+=1;
            }
            else{
                break;
            }
        }
        for  (var j = cnt2; j < textIndexes.length; j++) {
            tableArea += "<tr>"
            if ((j-cnt2) in analyseImgArray){
                tableArea= tableArea+"<th width=\"25%\">"  + analyseImgArray[j-cnt2] +   "</th>";//"<img src="+ imagesArray[j] + " width=\"20%\">" +   "</th>";
    
            }
            else{
                tableArea= tableArea+"<th width=\"25%\"></th>"
            }
            tableArea+="<th width=\"70%\">";
            if (textIndexes[j]!=-2){//-2:there is image, no text; -1: no image, there is text in design
                for  (var x = cnt2; x < textIndexes.length; x++) {
                    if ((textIndexes[x]-1)===(j-cnt2)){
                        tableArea += '<input type="text" class="form-control analys-input mt-2" placeholder="Add your text here" name="phrase[]">';
                        cnt +=1;
                    }
                }
            }
            else{
                cnt +=1;
            }
            tableArea+="</th>";
            tableArea += "</tr>";
          
        }
                            
        if (analyseImgArray.length>cnt){
            for (var x=cnt;x< analyseImgArray.length;x++){
                tableArea = tableArea + "<tr><th width=\"25%\">" + analyseImgArray[x] + "</th><th width=\"70%\"></th></tr>";
            }
        }
        tableArea += "<tr><th width=\"25%\"></th><th width=\"70%\">";
        for (var x=0;x<textIndexes.length-cnt-cnt2;x++){
            tableArea += '<input type="text" class="form-control analys-input mt-2" placeholder="Add your text here" name="phrase[]">'
        }
        tableArea += "</th></tr>";
    
        tableArea += "</table>";
        document.getElementById("phrases").innerHTML = tableArea;
    }
}

