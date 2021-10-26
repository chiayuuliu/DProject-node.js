const { query } = require('./../modules/connect-mysql');
const db = require('./../modules/connect-mysql')

// const tableName = 'products'
const tableName = 'product_food'
const pkField = 'sid'


class Product {

    // 預設值是空物件, 設定defaultOb 到data
    constructor(defaultObj={}) {
        this.data = defaultObj;
    }
    // 讀取所有資料 + 篩選功能

    static async findAll(options={}){
        let op = {
            perPage: 6,
            page:1,
            category: null,
            orderBy:'',
            priceLow:0,
            priceHight:0,
            keyword:'',
            ...options
        }
        const output = {
            perPage: op.perPage,
            page:op.page,
            totalRows:0,
            totalPages:0,
            rows:[],
        }

        let where = ' WHERE 1 ';
        const t_sql = `SELECT COUNT(1) totalRows FROM ${tableName}`
        const [t_rs] = await db.query(t_sql)
        const totalRows = t_rs[0].totalRows

        if(totalRows>0){
            // 設定總比數
            output.totalRows = totalRows;
            // 設定總頁數
            output.totalPages = Math.ceil(totalRows/op.perPage);
            // 拿到所有資料
            const sql = `SELECT * FROM ${tableName} LIMIT ${(op.page-1)*(op.perPage)}, ${op.perPage}`;
            const [rs] = await db.query(sql)
            output.rows = rs;
        }
        return output;
    }

    // 讀取單筆資料
    static async findOne(pk=0){
        const sql = `SELECT * FROM ${tableName} WHERE ${pkField}=?`;
        const [rs] = await db.query(sql, [pk]); 
        if(rs && rs.length===1){
            // return rs[0]
            return new Product(rs[0])
        }
        return null;
    }
    toJSON(){
        return this.data;
    }
    toString(){
        return JSON.stringify(this.data, null, 4);
    }

}

module.exports = Product
