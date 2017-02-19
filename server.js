//1.导包
const http=require('http');
const path=require('path');
const fs=require('fs');
const xtpl=require('xtpl');
const querystring=require('querystring');
//将导入的数据转换成js数组
const datas=require('./datas.json');


//2.创建服务
const server=http.createServer();

//3.接收请求  处理响应
server.on('request',(req,res)=>{

   const url=req.url;
   if(url==''||url.includes('index.html')){
      xtpl.renderFile(path.join(__dirname,'index.html'),{datas:datas},(err,content)=>{
           res.setHeader("Content-Type","text/html;charset=utf-8");
           res.end(content);
      })
   }else if(url.includes('site.css')){
      fs.readFile(path.join(__dirname,'statics/site.css'),(err,data)=>{
          res.setHeader("Content-Type","text/css;charset=utf-8");
          res.end(data);
      })
   }else if(url.includes('jquery.min.js')){
      fs.readFile(path.join(__dirname,'statics/jquery.min.js'),(err,data)=>{
         res.setHeader("Content-Type","text/javascript;charset=utf-8");
         res.end(data);
      })
   }else if(url.includes('mp3')){
      const basename=path.basename(url);
      let lastPath=path.join(__dirname,'statics/musics/'+basename);
      lastPath=querystring.unescape(lastPath);

      fs.readFile(lastPath,(err,data)=>{
         res.setHeader("Content-Type","audio/mpeg;charset=utf-8");
         res.end(data);
      })
   }
   
})

//4.开启服务器
server.listen(5566,'127.0.0.1',(err)=>{
    if(err){
        console.log(err);
    }
    console.log("服务器开启成功....")
})
