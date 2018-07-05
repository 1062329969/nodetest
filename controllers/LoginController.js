var userModel = require('../models/user');
module.exports  = {
    get_index : function (req,res) {
        res.render('login');
    },

    post_dologin : function (req,res) {

        var arr;
        userModel.findbynp(req,res,function(err,result) {
            // console.log(result);return;
            // console.log(typeof result);
            // arr =JSON.parse(result);
            arr = result;
            res.render('userShow',{user :arr});
        });
    }
}