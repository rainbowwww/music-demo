var http =require('http')
var fs =require('fs')
var url = require('url')
var qiniu = require('qiniu')
var port =process.env.PORT||8888;

// if(!port){
//     console.log('��ָ���˿ںźò�����\nnode server.js 8888 ����������')
//     process.exit(1)
//   }
var server = http.createServer(function(request,response){
    var temp = url.parse(request.url,true)
    var path = temp.pathname  
    var query = temp.query
    var method = request.method

// ����һ���ָ���

    if(path==='/uptoken'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.setHeader('Access-Control-Allow-Origin', '*')
        response.removeHeader('Date')

        var config = fs.readFileSync('./qiniu-key.json')
        config = JSON.parse(config)

        let {accessKey, secretKey} = config;
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        var options = {
            scope: 'music-demo',
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken=putPolicy.uploadToken(mac);
        response.write(`
     {
         "uptoken": "${uploadToken}"
     }
     `)
        response.end()
    }else{
    response.statusCode = 404
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write('�Ҳ�����Ӧ��·��������Ҫ�����޸�inex.js')
    response.end();
}


//������������治Ҫ�� 
console.log(method+''+request.url)

})

server.listen(port)
console.log('���� ' + port + ' �ɹ�\n�����ڿ���ת��720��Ȼ���õ緹�Ҵ� http://localhost:' + port)