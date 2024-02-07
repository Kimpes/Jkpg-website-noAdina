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

      if (rows.length == 0) {
        if (!store.type) {
          store.type = null;
        }
        console.log(`Inserting ${store.name}`);
        await this.client.query(`
          INSERT INTO public.stores (name, url, district, type)
          VALUES ($1, $2, $3, $4)
        `, [store.name, store.url, store.district, store.type]);
      }
    }
  }

  async getStoreById(id) {
    const { rows } = await this.client.query(`
      SELECT * FROM public.stores 
      WHERE id=$1
      `, [id]);
    
    return rows[0];
  }

  async getAllStores() {
    const { rows } = await this.client.query(`
      SELECT * FROM public.stores
      `)
    return rows
  }

  async editStore(store) {
    const { rows } = await this.client.query(`
      UPDATE public.stores 
      SET name = $1, url = $2, district = $3, type = $4 
      WHERE id = $5
      `, [store.name, store.url, store.district, store.type, store.id])
    return rows[0];
  }

  async deleteStore(id) {
    const { rows } = await this.client.query(`
      DELETE FROM public.stores WHERE id = $1
      `, [id])
    return;
  }

  async addStore(store) {
    const { rows } = await this.client.query(`
      INSERT INTO portfolio_entries (title, description, post_date, tag_1, tag_2, image_name) 
      VALUES ($1, $2, $3, $4)
      `, [store.name, store.url, store.district, store.type])
    return rows[0];
  }
}

export default Model;