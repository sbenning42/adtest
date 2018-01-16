export class Status {
    constructor(
        public id: string,
        public name: string
    ) { }
}

export class Channel {
    constructor(
        public id: string = '',
        public name: string = '',
        public type: string = '',
        public logotype: string = '',
        public avatar: string = '',
        public valid: string = '',
        public commision: string = '',
        public description: string = '',
        public country_id: string = '',
        public website: string = '',
        public cgu: string = '',
        public status?: Status
    ) { }
}