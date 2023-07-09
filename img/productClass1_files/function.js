
// json object 排列
//........................................
// data.sort(byDESC("Name"));

  var byDESC = function (name, minor) {
        return function (o, p) {
            var a, b;
            if (typeof o === 'object' && typeof p === 'object' && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : o;
                }
                if (typeof a === typeof b) {
                    return a > b ? -1 : 1;
                }
                return typeof a > typeof b ? -1 : 1;
            } else {
                throw {
                    name: 'Error',
                    message: 'Expected an object when sorting by ' + name
                };
            }
        }
    };

    var byASC = function (name, minor) {
        return function (o, p) {
            var a, b;
            if (typeof o === 'object' && typeof p === 'object' && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : o;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            } else {
                throw {
                    name: 'Error',
                    message: 'Expected an object when sorting by ' + name
                };
            }
        }
    };



// error_page
//........................................
// 顯示無此頁

// function error_page(){
//         $('section').remove();
//         $('nav').after(''+
//                 '<section class="error" >'+
//                     '<div class="main">'+
//                         '<div class="table">'+
//                             '<div class="cell">'+
//                                 '<div class="face">⊙﹏⊙</div>'+
//                                 '<div class="text-tw">404 好像沒有這頁</div>'+
//                                 '<div class="text-en">Page not found.</div>'+
//                                 '<a href="/"><buttons class="orange" style="margin-top: 30px;" >回首頁</buttons></a>'+
//                             '</div>'+
//                         '</div>'+
//                     '</div>'+
//                 '</section>'+
//             '');
// }

// json each 取得id的key
//........................................
// 使用這個可以取得該id的key（因受排序而隨時變動），並藉此來取得他的value

function idkey(json,id){

	var idkey=-1;

	$.each(json,function(key,val){

          if(val['id']==id){
          		// console.log(key);

          		idkey=key;
          }


	});

	return idkey;
}



// objectkey
// ................................................
// 使用這個可以取得該特定欄位的key（因受排序而隨時變動），並藉此來取得他的value
// var key=objectkey(dataArray['data'],'theid',theid);

function objectkey(data,thekey,thevalue){

        var objectkey='';
        $.each(data,function(key,val){

                if(val[thekey]==thevalue){
                        // console.log(key);

                        objectkey=key;
                }
        });


        return objectkey;
}

// objectval 透過特定欄位(thekey)的值(thevalue)，來取得欄位(targetkey)的值
//........................................
// ex: var productPhoto=objectval(productData,'id',5,'photo');
// ex: var productName=objectval(productData,'id',6,'name');


function objectval(json,thekey,thevalue,targetkey){


    var idkey='';


    $.each(json,function(key,val){


          if(val[thekey]==thevalue){
                // console.log(key);


                idkey=key;
          }




    });


    return json[idkey][targetkey];
}



// daydiff 時間差距幾天
//........................................
// ex: daydiff('2017-01-01', '2017-01-09');

function daydiff(first, second) {


	var first_mdy = first.split('-');
    var first_date= new Date(first_mdy[0], first_mdy[1], first_mdy[2]);

    var second_mdy = second.split('-');
    var second_date= new Date(second_mdy[0], second_mdy[1], second_mdy[2]);

    return Math.round((second_date-first_date)/(1000*60*60*24));
}


// lazyload
// <div class="lazyload" thescr="/images/aaa.jpg">
// var iflazyload=0;
//.........................................
function lazyload(){


    // if(browserIE==true){

    //         console.log('ie~');
    //         return false;
    // }
    



            $('<style>.lazyload,.lazyloaded{ -webkit-transition: background-image 1s ease-in-out; transition: background-image 1s ease-in-out; } .photoin{width: 100%; height: 100%; background-size: cover; background-position: center; position: absolute;}</style>').appendTo("head");
            var i=1;
            var newplacearray=[];
            let _i=0;
            //each
            $('.lazyload').each(function(){
                    var thesrc=$(this).attr('thesrc');
                    var type=$(this).attr('lazyload');
                    if(thesrc==undefined || thesrc==null ||thesrc=="" ){

                        return ;
                    }

                    var eacharray=[];
                      eacharray.push(thesrc);
                      eacharray.push(_i);
                      eacharray.push(type);
                      newplacearray.push(eacharray);
                      _i++;

                    $(this).addClass('lazyloaded');
                    $(this).removeClass('lazyload');
            }); 
            // console.log(newplacearray);
            if (_i-1>0) {
                getLoadingPercentage(newplacearray,0,_i-1);
            }


}


// getLoadingPercentage
//.........................................
function getLoadingPercentage(imgUrl,i,_i){
    Image.prototype.onChangeSize;
    Image.prototype.load = function(url){
        var _this = this;
        var req   = ((XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
        req.open('GET', url, true);
        req.responseType = 'arraybuffer';
        req.onload = function(e) {
            if (this.status===200) {
                if(req.response) {
                    var blob = new Blob([req.response]);
                    _this.src = window.URL.createObjectURL(blob);
                }
            } 
        }
        req.onprogress = function(e) {
          if(_this.onChangeSize) {
            _this.onChangeSize(e.loaded, e.total);
          }
        }
        req.send();
        
        
    }
    var img = new Image();
  
    img.onChangeSize = function(loaded, total) {
        var _l = parseInt((loaded / total) * 100);
    }
  
    img.onload = function() {
        var element = $('.lazyloaded[thesrc="'+imgUrl[i][0]+'"]');
        if (imgUrl[i][2]=="img") {
            element.attr('src',img.src);
        }else{
            element.css('background-image','url('+img.src+')');
        }
        element.removeAttr('thesrc');
      if (i<_i) {
        i++;
        getLoadingPercentage(imgUrl,i,_i);
      }
    }
    var req = new XMLHttpRequest();
    req.open('GET', imgUrl[i][0], false);
    req.send();
    if (req.status == 404) {
        if (i<_i) {
            i++;
            getLoadingPercentage(imgUrl,i,_i);
        }
    }else{
        img.load(imgUrl[i][0]);
        
    }
   
    
}
  





//換成縮圖
// photoThumb('upload/banner/BWAJXQMU250570.jpg')
function photoThumb(thesrc){

    if(thesrc==null){
                return thesrc;
    }

    var thesrc1=thesrc.split('.')[thesrc.split('.').length-1];
    var thesrc2=thesrc.split('.')[thesrc.split('.').length-2];

    thesrc=thesrc2+'_thumb.'+thesrc1;

    return thesrc;


}





//換成列表圖
// photoList('upload/banner/BWAJXQMU250570.jpg')
function photoList(thesrc){

    if(thesrc==null){
                return thesrc;
    }

    var thesrc1=thesrc.split('.')[thesrc.split('.').length-1];
    var thesrc2=thesrc.split('.')[thesrc.split('.').length-2];

    thesrc=thesrc2+'_list.'+thesrc1;

    return thesrc;


}
//換成小圖
// photoPetite('upload/banner/BWAJXQMU250570.jpg')
function photoPetite(thesrc){

    if(thesrc==null){
                return thesrc;
    }

    var thesrc1=thesrc.split('.')[thesrc.split('.').length-1];
    var thesrc2=thesrc.split('.')[thesrc.split('.').length-2];

    thesrc=thesrc2+'_petite.'+thesrc1;

    return thesrc;


}
//換成中圖
// photoMiddle('upload/banner/BWAJXQMU250570.jpg')
function photoMiddle(thesrc){

    if(thesrc==null){
                return thesrc;
    }

    var thesrc1=thesrc.split('.')[thesrc.split('.').length-1];
    var thesrc2=thesrc.split('.')[thesrc.split('.').length-2];

    thesrc=thesrc2+'_middle.'+thesrc1;

    return thesrc;


}
//imagefull
//.....................................................................

function imagefull(){

    // css
    $("<style type='text/css'>.imagefull{cursor:pointer;} .imagefullWrap{ position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 10000000; display:table; width: 100%; height:100%; } .imagefullWrap .cell { display:table-cell; vertical-align:middle; text-align:center; } .imagefullWrap .cell img{ max-width: 90vw; max-height: 90vh; } .imagefullWrap .cancel{ background-color: rgba(0%,0%,0%,0.5); width: 100%;cursor:pointer; height: 100%; position: absolute; top: 0px; left: 0px; z-index: -1; }.imagefullWrap .cross{     z-index: 1;background-color: rgba(0%,0%,0%,0.2);box-shadow: 0px 0px 2px 2px rgba(0%,0%,0%,0.2);position: absolute; right: 10px; top: 10px; border: #FFF 2px solid; width: 30px; height: 30px; line-height: 30px; font-size: 20px; border-radius: 30px; color: #FFF; cursor: pointer; }.imagefullWrap .thewrap{display: inline-block; position: relative;}.imagefullWrap .cross:hover{background-color: #FFF; color: #555;}</style>").appendTo("head");


    // 圖片preview 系列
    //.....................................................................
    $('body').on('click','.imagefull',function() {

            event.stopPropagation();
            var thissrc=$(this).attr('src');

            if($(this).attr('src')!=null){

                    imagefullDo(thissrc);
            }
            else{

                    var thisbgimage = $(this).css("background-image");
                    var thisbgimageUrl=thisbgimage.split(/"/)[1];

                    imagefullDo(thisbgimageUrl);
            }


            return;

            //已有圖片、已選圖
    
            
        
    

    });
    //圖片刪除
    $('body').on('click','.imagefullWrap .cancelDo',function() {


            event.stopPropagation();
            $('.imagefullWrap').remove();

    });


    //圖片滿版
    //..............................
    function imagefullDo(src){

            console.log(src);

            $('body').append('<div class="imagefullWrap"><div class="cell"><div class="thewrap"><div class="cross cancelDo">✕</div><img src="'+src+'"></div><div class="cancel cancelDo"><div></div></div>');
    }

}


function toconsole(page,type,id) {


    // window.open('https://pier2.org/console/','_blank');
    if (page=="") {
        window.open('https://pier2.org/console/','_blank');
    }
    if (type=="" || type=="list" || id=="") {
        window.open('https://pier2.org/console/main/index.php?type=list&page='+page,'_blank');
    }else{
        window.open('https://pier2.org/console/main/index.php?type=page&page='+page+"&id="+id+"&action=update",'_blank');
    }
}
// function toconsole(page="",type="",id="") {
//     if (page=="") {
//         window.open('https://pier2.org/console/','_blank');
//     }
//     if (type=="" || type=="list" || id=="") {
//         window.open('https://pier2.org/console/main/index.php?type=list&page='+page,'_blank');
//     }else{
//         window.open('https://pier2.org/console/main/index.php?type=page&page='+page+"&id="+id+"&action=update",'_blank');
//     }
// }