import { Db, MongoClient } from "mongodb"




var dbInstance: Db | null = null



async function connect(host: string, port: string, name: string): Promise<void> {
  let url: string = `mongodb://${host}:${port}/${name}`

  try {
    if ( dbInstance ) {
      return
    }

    const client: MongoClient = new MongoClient(url)
    await client.connect()

    dbInstance = client.db(name)

  } catch ( err ) {
    console.error(err)
  }
}


function get(): Db {
  if ( !dbInstance ) {
    throw new Error("DB not connected")
  }

  return dbInstance
}



export { connect, get }
