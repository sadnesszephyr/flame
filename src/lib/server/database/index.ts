import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { DATABASE_URL } from '$env/static/private'

const client = postgres(DATABASE_URL, { prepare: false })
const database = drizzle(client, { schema })

export default database
