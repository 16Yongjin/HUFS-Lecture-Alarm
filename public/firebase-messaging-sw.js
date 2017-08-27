importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js');

var config = {
    apiKey: 'AIzaSyD4tn_AXY6q-RfIqhD26HAxnsnTy5xlQo4',
    authDomain: 'lecturealer.firebaseapp.com',
    databaseURL: 'https://lecturealer.firebaseio.com',
    projectId: 'lecturealer',
    storageBucket: 'lecturealer.appspot.com',
    messagingSenderId: '99989017353'
};
firebase.initializeApp(config);

var messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {

    var title = 'Hello world!123';
    var options = {
        body: payload.data.status,
    };  
    return self.registration.showNotification(title, options);
})