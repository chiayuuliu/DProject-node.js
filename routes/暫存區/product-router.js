const express = require('express');
const Product = require('./../models/Product');
const router = express.Router();


// 讀取單筆
router.get('/:id', async (req, res) => {
    // req.params.id
    // 設定回應的格式
    const output = {
        success: false,
        date:null,
    }
    output.date = await Product.findOne(req.params.id)
    if(output.date){
        output.success = true;
    }
    res.json(output)
})