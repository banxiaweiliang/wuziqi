window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');

var huaqipan=function(){
  ctx.clearRect(0,0,600,600)
  for(var i=0;i<15;i++){
    ctx.beginPath();
    ctx.moveTo(20.5,20.5+i*40);
    ctx.lineTo(580,20.5+i*40);
    var lingrad=ctx.createLinearGradient(20,i*40+20.5,580,i*40+20.5);
    lingrad.addColorStop(0.5, 'red');
    lingrad.addColorStop(1, 'blue');
    ctx.strokeStyle=lingrad;


    ctx.stroke();


  }
  for(var j=0;j<15;j++){
    ctx.beginPath();
    ctx.moveTo(40*j+20.5,20.5);
    ctx.lineTo(40*j+20.5,580);
    var lingrad=ctx.createLinearGradient(20,i*40+20.5,580,i*40+20.5);
    lingrad.addColorStop(0.5, 'red');
    lingrad.addColorStop(1, 'blue');
    ctx.strokeStyle=lingrad;


    ctx.stroke();

  }
  ctx.beginPath();
    // ctx.arc(140,140,3,0,Math.PI*2);
    // ctx.moveTo(460,140);
    // ctx.arc(460,140,3,0,Math.PI*2);
    // ctx.moveTo(140,460);
    //  ctx.arc(140,460,3,0,Math.PI*2);
    // ctx.moveTo(460,460);
    // ctx.arc(460,460,3,0,Math.PI*2);
    ctx.moveTo(300,300);
    ctx.arc(300,300,3,0,Math.PI*2);
    ctx.fill();


     var z=[140,460];//棋盘星点数据位置
     for(var i=0;i<z.length;i++){
      for(var j=0;j<z.length;j++){
       ctx.beginPath();
       ctx.arc(z[i],z[j],3,0,Math.PI*2);
       ctx.fill();
     }
   }
}
huaqipan();


 // var lingrad=ctx.createLinearGradient(20,300,580,300);
 // lingrad.addColorStop(0,'red');
 // lingrad.addColorStop(0.2,'orange');
 // lingrad.addColorStop(0.4,'yellow');
 // lingrad.addColorStop(0.6,'green');
 // lingrad.addColorStop(0.8,'blue');
 // lingrad.addColorStop(1,'purple');

// ctx.lineWidth=6;
// ctx.lineCap='round';
// ctx.strokeStyle=lingrad;
// ctx.fillStyle=lingrad;

  // ctx.fillRect(0,0,300,200)
  //  ctx.beginPath();
  // ctx.moveTo(20,300);
  // ctx.lineTo(580,300);
  // ctx.stroke();

  var white='white';
  var luozi2=function(x,y,color){
    var zx=40*x+20.5;
    var zy=40*y+20.5;
    var black=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
    black.addColorStop(0.1,'#555');
    black.addColorStop(1,'black');
    var white=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
    white.addColorStop(0.1,'#fff');
    white.addColorStop(1,'#ddd');
    ctx.fillStyle=color?black:white;
    ctx.beginPath();
    ctx.arc(zx,zy,18,0,Math.PI*2);
    ctx.fill();
  }
  var qizi={};
  kaiguan=localStorage.x?false:true;
  var qiziimg=document.querySelector('#sucai');
  var luozi=function(x,y,color){
   var zx=40*x+2.5;
   var zy=40*y+2.5;
   if(color){
    ctx.drawImage(qiziimg,0,0,141,141,zx,zy,36,36);
  }else{
    ctx.drawImage(qiziimg,141,0,141,141,zx,zy,36,36)
  }
}

canvas.onclick = function (e) {
    var zx = 40*x + 20.5;
    var zy = 40*y + 20.5;
    var x =  Math.round( (e.offsetX-20.5)/40 ); 
    var y =  Math.round( (e.offsetY-20.5)/40 ); 
    if( qizi[x+'_'+y] ){return;}
    luozi(x,y,kaiguan);
    qizi[x + '_'+ y] = kaiguan?'black':'white';

    if(kaiguan){
      if( panduan(x,y,'black') ){
        alert('黑棋赢');
        if(confirm('是否再来一局')){
          localStorage.clear();
          qizi = {};
          huaqipan();
          kaiguan = true;
          return;
        }else{
          canvas.onclick  = null;
        }
      }
    }else{
      if( panduan(x,y,'white') ){
        alert('白棋赢');
        if(confirm('是否再来一局')){
          localStorage.clear();
          qizi = {};
          huaqipan();
          kaiguan = true;
          return;
        }else{
          canvas.onclick = null;
        }
      }
    }
    kaiguan = !kaiguan;
    localStorage.data = JSON.stringify(qizi);
    if(!kaiguan){
      localStorage.x = 1;
    }else{
      localStorage.removeItem('x');
    }
  }

var xy2id = function(x,y){
  return x + '_' + y;
}
var panduan = function(x,y,color){
  var shuju = filter(color);
  var tx,ty,hang = 1;shu = 1; zuoxie= 1;youxie = 1;
  tx=x;ty=y;while( shuju[ xy2id( tx-1,ty ) ]){tx--;hang++};
  tx=x;ty=y;while( shuju[ xy2id( tx+1,ty ) ]){tx++;hang++};
  if(hang >= 5){return true};
  tx=x;ty=y;while( shuju[ xy2id( tx,ty-1 ) ]){ty--;shu++};
  tx=x;ty=y;while( shuju[ xy2id( tx,ty+1 ) ]){ty++;shu++};
  if(shu >= 5){return true};
  tx=x;ty=y;while( shuju[ xy2id( tx+1,ty-1 ) ]){tx++;ty--;zuoxie++};
  tx=x;ty=y;while( shuju[ xy2id( tx-1,ty+1 ) ]){tx--;ty++;zuoxie++};
  if(zuoxie >= 5){return true};
  tx=x;ty=y;while( shuju[ xy2id( tx-1,ty-1 ) ]){tx--;ty--;youxie++};
  tx=x;ty=y;while( shuju[ xy2id( tx+1,ty+1 ) ]){tx++;ty++;youxie++};
  if(youxie >= 5){return true};
}
var filter = function(color) {
  var r = {};
  for(var i in qizi){
    if(qizi[i]  == color){
      r[i] = qizi[i];
    }
  }
  return r;
}




//如果本地存储中有棋盘数据，读取这些数据并回执到页面中
if(localStorage.data){
	qizi=JSON.parse(localStorage.data);
	for(var i in qizi){
		var x=i.split('_')[0];
		var y=i.split('_')[1];
		luozi(x,y, (qizi[i]=='black')?true:false);
	}
}
// chongkai.onclick=function(e){
//   e.stopPropagation();
// }


//重新开始
chongkai.onclick=function(){
	localStorage.clear();
	location.reload();
	
}
//悔棋

huiqi.onclick=function(){
        huaqipan();
        var colorarr=[];
        var zuobiaoarr=[];
        data=JSON.parse(localStorage.data);
        if(JSON.stringify(data)==0){
            huiqi.onclick=null;
            return;
        }
        for(var i in data){
            zuobiaoarr.push(i);
            colorarr.push(data[i]);   
        }
        colorarr.pop();
        zuobiaoarr.pop();
        for(var i=0;i<colorarr.length;i++){
            var x=zuobiaoarr[i].split("_")[0];
            var y=zuobiaoarr[i].split("_")[1];
            luozi(x,y,(colorarr[i]=='black')?true:false);
            if(((colorarr[i]=='black')?true:false)){
               localStorage.x="1";
            }else{
                localStorage.removeItem("x");
            } 
        }



//更新localStorage
        data={};
        for(var i=0;i<zuobiaoarr.length;i++){
            var x=zuobiaoarr[i].split("_")[0];
            var y=zuobiaoarr[i].split("_")[1];
            data[x+'_'+y]=colorarr[i];
        }
        localStorage.data=JSON.stringify(data);
        location.reload();
    }
//json.stringify
//json.parse


}