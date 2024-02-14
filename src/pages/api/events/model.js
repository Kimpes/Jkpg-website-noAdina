import { Client } from "pg";
const events = require("@/pages/api/events/events.json");

class Model {
  constructor() {
    this.client = new Client({
      user: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      database: "postgres",
      password: "1234",
      port: "5431",
    });
  }

  async init() {
    await this.client.connect();
  }

  async setupDatabase() {
    await this.client.query(`
    CREATE TABLE IF NOT EXISTS public.events
    (
        id SERIAL,
        title text,
        description text,
        location text,
        type text,
        date date,
        CONSTRAINT events_pkey PRIMARY KEY (id)
    )`);

    await this.client.query(`
      ALTER TABLE IF EXISTS public.events
          OWNER to postgres
    `);

    for (const event of events) {
      const { rows } = await this.client.query(
        `
        SELECT * FROM events WHERE title = $1
      `,
        [event.title]
      );

      if (rows.length == 0) {
        if (!event.date) {
          event.date = null;
        }
        console.log(`Inserting ${event.title}`);
        await this.client.query(
          `
          INSERT INTO public.events (title, description, location, type, date)
          VALUES ($1, $2, $3, $4, $5)
        `,
          [event.title, event.description, event.location, event.type, event.date]
        );
      }
    }
  }

  async getEventById(id) {
    const { rows } = await this.client.query(
      `
      SELECT * FROM public.events 
      WHERE id=$1
      `,
      [id]
    );

    return rows[0];
  }

  async getAllEvents() {
    const { rows } = await this.client.query(`
      SELECT * FROM public.events
      `);
    return rows;
  }

  async editEvent(eventObject) {
    const event = eventObject;
    const { rows } = await this.client.query(
      `
      UPDATE public.event 
      SET title = $1, description = $2, location = $3, type = $4, date = $5
      WHERE id = $6
      `,
      [event.title, event.description, event.location, event.type, event.date, event.id]
    );
    return;
  }

  async deleteEvent(id) {
    const { rows } = await this.client.query(
      `
      DELETE FROM public.events WHERE id = $1
      `,
      [id]
    );
    return;
  }

  async addEvent(eventObject) {
    const event = eventObject;
    const { rows } = await this.client.query(
      `
      INSERT INTO public.events (title, description, location, type, date) 
      VALUES ($1, $2, $3, $4, $5)
      `,
      [event.title, event.description, event.location, event.type, event.date]
    );
    return;
  }
}

export default Model;
