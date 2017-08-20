var config = {
    apiKey: 'AIzaSyD4tn_AXY6q-RfIqhD26HAxnsnTy5xlQo4',
    authDomain: 'lecturealer.firebaseapp.com',
    databaseURL: 'https://lecturealer.firebaseio.com',
    projectId: 'lecturealer',
    storageBucket: 'lecturealer.appspot.com',
    messagingSenderId: '99989017353'
};
firebase.initializeApp(config);


const messaging = firebase.messaging();
messaging.requestPermission()
.then(function() {
    console.log('Have permission');
    return messaging.getToken();
})
.then(function(token) {
    console.log(token);
    app.token = token;

})
.catch(function(err) {

    console.log('Error Occured.', err);
});


messaging.onMessage(function(payload) {
    console.log('onMessage: ', payload);
    alert(payload.notification.title + ' ' + payload.notification.body);
});

const serverURL = 'https://hufs-lecture-alert.yjdev.com';




var app = new Vue({
    el: '#app',
    data: {
        showModal: true,
        message: 'Hello Vue!',
        picked: '1',
        selected: '',
        lectures: [],
        selectedLecture: '',
        token: '',
        registeredLectures: [],
        lecture_info: '',
        lecture_subject: '',

    },
    methods: {
        resetSelected: function () {
            this.selected = ''
            this.selectedLecture = ''
        },
        register: function () {
            if (!this.selected.length) {
                alert('전공/교양을 선택해주세요.');
                return;
            }
            
            if (!this.selectedLecture){
                alert('강의를 선택해주세요.');
                return;
            }

            const body = {
                token: this.token,
                major: this.selected,
                course_number: this.selectedLecture,
                lecture_info: this.lecture_info,
                lecture_subject: this.lecture_subject
            }

            const headers = {
                'Content-Type': 'application/json'
            }

            this.$http.post(serverURL + '/register', body, headers).then(response => {
                this.registeredLectures = response.body;
                console.log(response.body);
                this.showModal = false;
                this.selectedLecture = '';
                this.lecture_info = '';
                this.lecture_subject = '';
            })
        },
        update_lecture_info: function(e) {
                if(e.target.options.selectedIndex > -1) {
                this.lecture_subject = e.target.options[e.target.options.selectedIndex].innerText.trim() + ' ';
                this.lecture_info = e.target.options[e.target.options.selectedIndex].attributes[0].nodeValue;
            }
        },
        cancel: function() {
            this.showModal = false;
            this.selectedLecture = '';
        },
        deleteLecture: function(course) {
            console.log(course);
            
            const body = {
                token: this.token,
                course_number: course
            }
            
            const headers = {
                'Content-Type': 'application/json'
            }

            
            this.$http.post( serverURL + '/remove', body, headers).then(response => {
                this.registeredLectures = response.body;
                console.log(response.body);
            });
        },
        hello: function() {
            console.log('Hello');
        },
        loadUser: function() {
            if (this.token === '')
                return;

            this.$http.get(serverURL + '/user?token=' + this.token).then(response => {
                console.log(response.bodyText);
                
                if (!response.bodyText)
                    return;
                // get body data
                this.registeredLectures = JSON.parse(response.bodyText);

            }, response => {
                // error callback
                console.log('Error!!')
            });
        }
    },
    watch: {
        selected: function () {
                this.$http.get(serverURL + '/lectures?id=' + this.selected ).then(response => {    
                // get body data
                this.lectures = JSON.parse(response.bodyText);
                


            }, response => {
                // error callback
                console.log('Error!!')
            });
        },
        token: function() {
            this.loadUser();
    }
    },
    updated () {
        $(this.$refs.select).selectpicker('refresh');

        var len = this.lectures.length;
        var elem = $('.lecturesss > .btn-group > .dropdown-menu.open > .dropdown-menu.inner');
        for(i=0; i<len; i++) {
            var lec = this.lectures[i]
            elem.find('[data-original-index='+(i+1)+']')
                .find('.text-muted')[0].innerText = lec.professor + ' 교수님 ' + lec.time
        }
	}
});
