import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDgSDuv49LLtPW1Xv_Qqhbl1CIonII-u1Y",
    authDomain: "fridgebook-f648a.firebaseapp.com",
    databaseURL: "https://fridgebook-f648a.firebaseio.com",
    projectId: "fridgebook-f648a",
    storageBucket: "fridgebook-f648a.appspot.com",
    messagingSenderId: "362363462038",
    appId: "1:362363462038:web:53e7c551868b99b32e3db7",
    measurementId: "G-ZYF3RHC7VN"
  };
firebase.initializeApp(config);

export function readItem(directory){

  return firebase.database().ref('/' + directory).once('value').then(function(snapshot){
    console.log("snapshot: " + snapshot.val())
})
}

export default firebase;