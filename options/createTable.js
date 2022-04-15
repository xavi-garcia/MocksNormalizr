const options = require('../options/mysqlconfig.js');
const knex = require('knex');

const database = knex(options)

const createTable = async () => {
    let tableExists = await database.schema.hasTable('products');
    if(tableExists){
        await database.schema.dropTable('products');
    }
    await database.schema.createTable("products", (table) =>{
        table.increments('id').nullable(false);
        table.title = table.string('title',30).nullable(false);
        table.price = table.float('price').nullable(false);
        table.thumbnail = table.string('thumbnail',500).nullable(false)
        })
        .then (()=>{
            console.log('table created')
        })
 }
 

createTable()

const createUserTable = async () => {
    let tableUsersExists = await database.schema.hasTable('users');
    if(tableUsersExists){
        await database.schema.dropTable('users');
    }
    await database.schema.createTable("messages", (table) => {
    table.string("user").nullable(false);
    table.string("message", 100).nullable(false);
  })
  .then(() => {
    console.log("user table created");
  })

}

createUserTable()