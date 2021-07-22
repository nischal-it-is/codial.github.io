module.exports.home=function(req,res){
    return res.end('<h1> COntroller running');
}
module.exports.action=function(req,res){
    return res.end('<h1>action </h1>');
}