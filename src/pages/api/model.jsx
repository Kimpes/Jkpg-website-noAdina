import { Client } from 'pg';
const stores = require('@/pages/api/stores.json')

class Model {
  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      database: 'postgres',
      password: '1234',
      port: '5431'
    })
  }

  async init() {
    await this.client.connect();
  }

  async setupDatabase() {
    await this.client.query(`
    CREATE TABLE IF NOT EXISTS public.stores
    (
        id SERIAL,
        name text,
        url text,
        district text,
        type text,
        CONSTRAINT stores_pkey PRIMARY KEY (id)
    )`);

    await this.client.query(`
      ALTER TABLE IF EXISTS public.stores
          OWNER to postgres
    `);


    for (const store of stores) {
      const { rows } = await this.client.query(`
        SELECT * FROM stores WHERE name = $1
      `, [store.name]);

      if (rows.length === 0) {
        if (!store.type) {
          store.type = null;
        }
        console.log(`Inserting ${store.name}`);
        await this.client.query(`
          INSERT INTO stores (name, url, district, type)
          VALUES ($1, $2, $3, $4)
        `, [store.name, store.url, store.district, store.type]);
      }
    }
  }

  async getStoreById(query) {
    const { rows } = await this.client.query(`
      SELECT * FROM stores 
      WHERE id=$1
      `, [query]);
    
    return rows[0];
  }
}

export default Model;