const express = require('express');
const Product = require('./../models/Product');

const router = express.Router();

// 有設定baseURL是/product, 所以/ =對應到/product
// 列表
router.get('/', async(req,res)=>{    
        res.json(await Product.findAll(req.query));
})


// 讀取單筆
router.get('/:id', async (req, res) => {
    const output = {
        success: false,
        data:null,
    }
    output.data = await Product.findOne(req.params.id)
    if(output.data){
        output.success = true;
    }
    res.json(output)
})




module.exports = router