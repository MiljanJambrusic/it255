export class Person {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public age: number,
        public gender: string,
        public friends: any[] = []

    ) { }

}