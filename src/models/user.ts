export class User {
    constructor(
        public id: string = '',
        public role_id: string = '',
        public name: string = '',
        public email: string = '',
        public password: string = '',
        public first_name: string = '',
        public last_name: string = '',
        public phone: string = '',
        public website: string = ''
    ) { }
}