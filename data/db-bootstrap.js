print("\n\nCreate test database: iron_store\n")




const ROOT_DIR = "data"
const db = connect("mongodb://localhost/iron_store")


const collections = [
  {
    name: "products",
    fileNames: fs.readdirSync(`${ROOT_DIR}/products`),
    fileContents: []
  },

  {
    name: "recomended",
    fileNames: fs.readdirSync(`${ROOT_DIR}/recomended`),
    fileContents: []
  }
]




print("Source data:")


collections.forEach(
  (collection) => {
    collection.fileNames.forEach(
      (fileName, i) => {
        collection.fileContents.push(
          fs.readFileSync(`${ROOT_DIR}/${collection.name}/${fileName}`, "utf-8")
        )

        print(`(${i+1}) ${ROOT_DIR}/${collection.name}/${fileName}`)
      }
    )
  }
)


collections.forEach(
  (collection) => {
    collection.fileContents.forEach(
      (content) => {
        db[collection.name].insertMany(EJSON.deserialize(JSON.parse(content)))
      }
    )
  }
)




print("\n[ ok ]: The bootstrap of the test database is complete\n\n")
