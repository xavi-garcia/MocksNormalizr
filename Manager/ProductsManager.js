const options = require('../options/mysqlconfig.js');
const knex = require('knex');

const database = knex(options)

class ProductManagerDB {
  

    add = async (obj) => {
        const database = knex(options);
        try{
            const response = await database('products').insert([obj]);
            let results = await database.from('products').select('*');
            let items = JSON.parse(JSON.stringify(results));
            console.log(items);
            return {status:"success", payload:response};
        }catch (error){
            console.log(error)
        } finally {
            database.destroy()
        }
    }

    getAll = async() =>{
        let tableExists = await database.schema.hasTable('products');
        if (tableExists){
            let products = await database('products').select('*');
            return {status:"success", payload: products};
        } else{
            console.log('table does no exist')
        }
    }


    // getById = async (id) =>{
    //     if(fs.existsSync(pathToProducts)){
    //         let products = await fetch();
    //         let product = products.find(p=>p.id===id);
    //         if(product) return {status: "success", payload:product}
    //         else return {status:"fail",error:"no such product"}
    //     }
    // }

    // deleteProduct = async (id) =>{
    //     if(fs.existsSync(pathToProducts)){
    //         let products = await fetch();
    //         let newProduct = products.filter(product=>product.id!==id)
    //         await fs.promises.writeFile(pathToProducts,JSON.stringify(newProduct,null,2))
    //         return {status:"success",message:"product deleted"}
    //     }
    // }

    // modifyProduct = async (id) =>{
    //     if(fs.existsSync(pathToProducts)){
    //         let products = await fetch();
    //         let product = products.find(p=>p.id===id);
    //         if(product) return {status: "success", payload:product}
    //         else return {status:"fail", error:"no such product"}
    //     }
    // }
}

module.exports = ProductManagerDB;