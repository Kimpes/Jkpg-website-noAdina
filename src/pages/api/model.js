import { Client } from 'pg';

class Model {
    constructor() {
        this.client = new Client({
            user: 'postgress',
            host: 'localhost',
            database: 'postgres',
            password: '1234',
            port: '5432'
        })
    }

    async init() {
        await this.client.connect();
    }
}

export default Model;