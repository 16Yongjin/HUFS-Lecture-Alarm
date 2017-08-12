class Users {
    constructor() {
        this.users = {};
        this.tokens = [];
        this.majors = [];
        this.course_numbers_cache = [];
    }

    addUser(user) {

        let u = this.users[user.token];
        const course_number = user.course_number;

        if (!this.course_numbers_cache.includes(course_number)) {
            this.course_numbers_cache.push(course_number);
        }

        if (!this.majors.includes(user.major)) {
            this.majors.push(user.major);
        }
        
        if ( u ) { // 이미 있는 유저라면
            if (u['course_numbers'].includes(course_number) ) {
                return;
            }
                
            u['course_numbers'].push(course_number);

            u['lecture_infos'].push({
                course_number,
                lecture_info: user.lecture_info
            })
            
            return;
        }
        
        this.tokens.push(user.token);
        this.users[user.token] = { 
            course_numbers: [course_number],
            lecture_infos: [{course_number,
                lecture_info: user.lecture_info}]
        }

    }

    removeCourse(token, course_number) {
        let target = this.users[token];

        if (target) {
            target.course_numbers = target.course_numbers.filter(j => j !== course_number);
            target.lecture_infos = target.lecture_infos.filter(j => j.course_number !== course_number);
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