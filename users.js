class Users {
    constructor() {
        this.users = {};
        this.tokens = [];
        this.majors = {cache: [], count: {}};
        this.lectures = {cache: [], count: {}};
    }

    addUser(user) {

        let u = this.users[user.token];
        const course_number = user.course_number;

        if (!this.lectures.cache.includes(course_number)) {
            this.lectures.cache.push(course_number);
            this.lectures.count[course_number] = 1;
        } else {
            this.lectures.count[course_number] += 1;
        }

        if (!this.majors.cache.includes(user.major)) {
            this.majors.cache.push(user.major);
            this.majors.count[user.major] = 1;
        } else {
            this.majors.count[user.major] += 1;            
        }

        // 이미 있는 유저라면
        if ( u ) { 
            // 이미 있는 강의라면
            if (u['course_numbers'].includes(course_number) ) {
                return;
            }
                
            u['course_numbers'].push(course_number);

            u['lecture_infos'].push({
                course_number,
                major: user.major,
                lecture_subject: user.lecture_subject,
                lecture_info: user.lecture_info,
            })
            
            return;
        }
        
        this.tokens.push(user.token);
        this.users[user.token] = { 
            course_numbers: [course_number],
            lecture_infos: [{
                course_number,
                major: user.major,                
                lecture_subject: user.lecture_subject,
                lecture_info: user.lecture_info
            }],
            sentLecture: {}
        }

    }

    removeCourse(token, course_number) {
        let target = this.users[token];

        if (target) {

            // 강의 캐시 지우기
            this.lectures.count[course_number] -= 1;
            if (this.lectures.count[course_number] === 0) {
                this.lectures.cache = this.lectures.cache.filter(j => j !== course_number);
            }

            // 전공 캐시 지우기
            const major = target.lecture_infos.filter(j => j.course_number === course_number)[0].major;
            this.majors.count[major] -= 1;
            if (this.majors.count[major] === 0) {
                this.majors.cache = this.majors.cache.filter(j => j !== major);
            }

            target.course_numbers = target.course_numbers.filter(j => j !== course_number);

            console.log('shosho');
            console.log(target.lecture_infos);

            target.lecture_infos = target.lecture_infos.filter(j => j.course_number !== course_number);
            target.sentLecture[course_number] = false;
        }
    }

    getUser(token) {
        if (this.users[token]) {
            return this.users[token].lecture_infos;
        }
    }

    getUserList() {
        return this.users;
    }

    hasUser(token) {
        return this.tokens.includes(token);
    }

}

module.exports = {Users};