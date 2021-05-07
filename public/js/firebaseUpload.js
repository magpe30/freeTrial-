

/////FIREBASE CONFIGURATION /////
var firebaseConfig = {
    apiKey: "AIzaSyAEURQqdgj8DoQnbBRPFByjaqpDfmnp-Q8",
    authDomain: "visionogy-1babf.firebaseapp.com",
    databaseURL: "https://visionogy-1babf-default-rtdb.firebaseio.com",
    projectId: "visionogy-1babf",
    storageBucket: "visionogy-1babf.appspot.com",
    messagingSenderId: "941772301660",
    appId: "1:941772301660:web:d0b589426e7167f56a8d99",
    measurementId: "G-E3RZPLBRPB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var imgArrayFirebase = [];
var logoArrayFirebase = []; 


  /*

/// OLEK
/*const data = {imgArrayFirebase, logoArrayFirebase, templateID, musicTitle}
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}*/


function uploadImagePromise(imageFile, index) {
    return firebase.storage().ref('imagesAndVideos/' + imageFile.name).put(imageFile)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        let imgLink = url.split('/')[7];
        let transformLink = imgLink.slice(18);
        let finishedImgsLink = transformLink.replace("&", "%26");

        imgArrayFirebase[index] = finishedImgsLink
        console.log("imgs uploaded successfully"); 
    })
    .catch((error) => {
      console.log('One failed:', imageFile.name, error.message)
    });
}

function uploadLogoPromise(imageFile, index) {
    return firebase.storage().ref('imagesAndVideos/' + imageFile.name).put(imageFile)
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        let logoLink = url.split('/')[7];
        let transformLogoLink = logoLink.slice(18);
        let finishedImgsLink = transformLogoLink.replace("&", "%26");
        logoArrayFirebase.push(finishedImgsLink);
        console.log("logo uploaded successfully"); 
    })
    .catch((error) => {
      console.log('One failed:', imageFile.name, error.message)
    });
  }

async function fetchDataFirebase(){
    var sortedArray = firebaseImgArray.filter(function(element) {
        return element != null;
    });
    
    for(let i = 0; i < sortedArray.length; i++)
    {
        imgArrayFirebase.push(undefined)
    }

    Promise.all(
        [
        Promise.all(sortedArray.map( (item, index) => uploadImagePromise(item, index) )),
        Promise.all(firebaseLogoImg.map( (item) => uploadLogoPromise(item) ))
        ]
    ).then(() => {
        console.log(imgArrayFirebase);
        console.log(logoArrayFirebase);
        console.log('All success')
        
        var templateID  = $('input[name=video]:checked').attr('id');
        var musicTitle  = $('input[name=songs]:checked').val();
        const data = {imgArrayFirebase, logoArrayFirebase, templateID, musicTitle}
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch('/postApi', options).then(()=>{
            console.log("start executing");
            window.location.href = '/createdtemplate' 
            
        })
    })
}


/*async function fetchDataFirebase(){
    var sortedArray = firebaseImgArray.filter(function(element) {
        return element != null;
    });

    
    await sortedArray.forEach(file => {
        var imageName = file.name;
        var storageRef  = firebase.storage().ref('imagesAndVideos/' + imageName);
        var uploadTask = storageRef.put(file);
        console.log(file.name)
        uploadTask
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            let imgLink = url.split('/')[7];
            let transformLink = imgLink.slice(18);
            let finishedImgsLink = transformLink.replace("&", "%26");
 
            imgArrayFirebase.push(finishedImgsLink);
            console.log("imgs uploaded successfully");
 
        })
        
    });
    await firebaseLogoImg.forEach(file => {
        var imageLogoName = file.name;
         var storageRef = firebase.storage().ref('imagesAndVideos/' + imageLogoName);
         var uploadLogo = storageRef.put(file);
 
        uploadLogo
        .then(snapshot => snapshot.ref.getDownloadURL())
         .then(url => {
            let logoLink = url.split('/')[7];
            let transformLogoLink = logoLink.slice(18);
            let finishedImgsLink = transformLogoLink.replace("&", "%26");
            logoArrayFirebase.push(finishedImgsLink);
            console.log("logo uploaded");
        })
    });
    await fetch('/dataApi', options)
    .then(()=>{
        console.log("task completed");
    })
}*/

////UPLOADING PICTURES TO FIREBASE 
//function firebaseUpload(){

//    fetchDataFirebase()
    
//    .then(() => {
//        console.log(imgArrayFirebase, logoArrayFirebase);
//        const data = {imgArrayFirebase, logoArrayFirebase, templateID, musicTitle}
//        const options = {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(data)
//        }
//        fetch('/dataApi', options)
//       console.log("task completed");
//    })
     
//}

