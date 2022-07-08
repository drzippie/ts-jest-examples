import { Client } from 'pg'

export class TableList {
  client: Client
  connected = false
  constructor (
    public host: string,
    public user: string,
    public password: string,
    public database: string
  ) {
    const pgConfig = {
      user,
      database,
      password,
      host
    }
    this.client = new Client(pgConfig)
  }

  async getTables (): Promise<string[]> {
    if (!this.connected) {
      await this.client.connect()
      this.connected = true
    }
    const result = await this.client.query<{name: string}>('SELECT name FROM pg_catalog.pg_tables')
    return result.rows.map(row => row.name.toUpperCase())
  }
}
