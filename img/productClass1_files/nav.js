var pos=0;

nowurl = location.href
  nowurlin = nowurl.replace('https://', '').replace('http://', '')
  nowurlin_array = nowurlin.split('/')

  localhost = nowurlin_array[0]
  url1 = nowurlin_array[1] //page
  url2 = nowurlin_array[2] //id
  url3 = nowurlin_array[3]
  url4 = nowurlin_array[4]

$(document).ready(function() {
  //網址
  //................................................................................................
  

  var bodypage=$('body').attr('page');


  device_body(1024);

  imagefull();
});


var nowYear=new Date().getFullYear();
var nowMonth=new Date().getMonth()+1;
var nowDate=new Date().getDate();

var nowHours=new Date().getHours();
var nowMinutes=new Date().getMinutes();
var nowSeconds=new Date().getSeconds();


// ie判斷
 if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    var browserIE=true;
  } else {
    var browserIE=false;
  }






//
if(nowMonth<10){
    nowMonthZero=0;
}
else{
    nowMonthZero='';
}

//
if(nowDate<10){
    nowDateZero=0;
}
else{
    nowDateZero='';
}

var nowDay=nowYear+'-'+nowMonthZero+nowMonth+'-'+nowDateZero+nowDate;   // 2020-3-20
var nowDaytime=nowYear+'-'+nowMonthZero+nowMonth+'-'+nowDateZero+nowDate+' '+nowHours+':'+nowMinutes+':'+nowSeconds;   // 2020-3-20 12:05:05
var console_setting=[];

var device;
var hash;





$(document).ready(function(){
//tooltip

  $('body').append('<tooltip style="display: none;">1</tooltip>');
  $('body').append('<style>tooltip{ background-color: #333; position: fixed; z-index: 1000; display: inline-block; border-radius: 5px; margin-top: 10px; margin-left:10px; color: #FFF; font-size: 12px; padding-left: 5px; line-height: 25px; padding-right: 5px; box-shadow: 0px 0px 10px 5px rgba(100%,100%,100%,0.5); }</style>');


  $(document).on('mousemove', function(e){
      $('tooltip').css({
         left:  e.clientX,
         top:   e.clientY
      });
  });


  $('body').on('mouseover','.tooltip',function(){
         $('tooltip').show().html($(this).attr('tooltip'));
  });
  $('body').on('mouseleave','.tooltip',function(){
         $('tooltip').hide().html($(this).attr('tooltip'));
  });






// lang_info
$('body').on('click', '.lang_info', function() {
        
      lang_info();


      
});


//top
$('body').on('click', '.topBtn', function() {
        
     $('html, body').animate({ scrollTop: 0 }, 300);


      
});


//sitemapWrap
$('body').on('click', '.footer_sitemapWrap .btn', function() {
        
     if($('.footer_sitemapWrap').hasClass('active')){
          $('.footer_sitemapWrap').removeClass('active');
     }
     else{
          $('.footer_sitemapWrap').addClass('active');
     }


      
});



  //menuBtn
  //...............................
  $('body').on('click', '.menuBtn', function() {
        
        // console.log(11); 

        if($('.m_header').hasClass('open')){

              $('.m_header').removeClass('open');
        }
        else{
            $('.m_header').addClass('open');
        }
  });


//nav_searchBtn
//...............................
$('body').on('click', '#nav_searchBtn', function() {
      
      location.href="/search/"+$('[name="site_search"]').val()+"/";

    
});
$('body').on('click', '#nav_m_searchBtn', function() {
      
      location.href="/search/"+$('[name="site_search_m"]').val()+"/";

    
});

//a
//...........................
$('body').on('click', 'a', function(e) {


    

    var thishref = $(this).attr('href')
    var thistarget = $(this).attr('target')


    //絕對
    if (thishref.indexOf('http') !== -1 || thistarget == '_blank') {
        
         window.open(thishref, '_blank');

    }
    //相對
    else {


        $('.loadingcover').fadeIn(300);
         setTimeout(function() {    
              location.href=thishref;
              
        }, 300);

    }




    return false;
  })




 // 觸碰
 //nav .pc_header .btnWrap li .sub_menu 
 //...............................
 $('body').on('mouseover', '.pc_header li', function() {
        $(this).addClass('hover');
  })
  $('body').on('mouseleave', '.pc_header li', function() {
        $(this).removeClass('hover');
  })


$('body').on('click', '.m_header li span', function() {
        

        if($(this).parent().hasClass('hover')){
          $(this).parent().removeClass('hover');
        }
        else{
          $(this).parent().addClass('hover');
        }
  })
 

      


  


  if(window.location.hash!=''){
      hash=window.location.hash.replace('#','');
}

//inpage
//內頁
  //...............................
  $('body').on('click', '.inpage .cancelit', function() {
        
    $('.inpage').fadeOut(100);

    // console.log('c');
});




// $(window).bind('keydown', function(e) { 
//  // e.preventDefault(); 

//          // console.log(1);

//          if(e.ctrlKey && e.keyCode === 'L'){ 
//          // e.preventDefault(); 

//                 console.log(1);
//          // custom trigger 
//            }
 
// });



      //ctrl + Alt + ~ 
      $(document).keydown(function(e){

                  
              if( e.which === 192 && e.ctrlKey && e.altKey ){

                    if (typeof pageConsole !== "undefined") { 

                          pageConsole();
                    }
                    else{
                            window.open('/console/','_blank');
                    }
              }



      });


});






//scroll
$(window).scroll(function () {
          

           scrollAct();

                

});



//load
$(document).ready(function(){

    setTimeout(function() {    

            $('.loadingcover').fadeOut(100);
     }, 2000);
    
});


$(window).load(function(){

    $('.loadingcover').fadeOut(100);
});




//announcement_read
//內頁
$(document).ready(function(){
  var announcement_day=$('.inpage[type="announcement"]').attr('announcement_day');

  //...............................
  $('body').on('click','.inpage .announcement_read', function() {
        
        $('.inpage').fadeOut(100);


        $.cookie('announcement_read',nowDaytime, {expires: 60});
  });


  if($.cookie('announcement_read')<announcement_day ){ // 發佈日比閱讀日大

      if($('.inpage[type="announcement"]').attr('publish')==1){ //已發布
          $('.inpage[type="announcement"]').show();
      }
      else{
          $('.inpage[type="announcement"]').remove();
      }
         
  }
  else if($.cookie('announcement_read')==undefined){  // 未閱讀
      if($('.inpage[type="announcement"]').attr('publish')==1){ //已發布
          $('.inpage[type="announcement"]').show();

          // console.log('a1');
      }
      else{
          $('.inpage[type="announcement"]').remove();

          // console.log('a2:'+$('[type="announcement"]').attr('publish'));
      }

      // console.log('a');
  }
});

//inpage
//內頁




function scrollAct(){
           pos = $(window).scrollTop();
               device= $('body').attr('device');
                    // console.log(pos);

                    //pc
                    if(device=='pc'){


                          if(pos>10){
                          $('body').addClass('scrolled');

                          $('.topBtn').show();
                        }
                        else{
                           $('body').removeClass('scrolled');

                           $('.topBtn').hide();
                        }
                      
                    }

                    //m
                    else{

                      // console.log(pos);

                      if($('html').attr('url1')=='shop'){
                              if(pos>130){
                                $('body').addClass('scrolled');

                               
                              }
                              else{
                                 $('body').removeClass('scrolled');

                              }
                      }

                      
                        
                    } 
}









//device
//.............................................
function device_body(mwidth){

    //start & resize
    $(document).ready(function(){

        device_body_do(mwidth);

        $( window ).resize(function() {
            
            device_body_do(mwidth);

        });


    });

    //do
    function device_body_do(mwidth){
        var winW = $(window).width();

        if(winW>mwidth){
            $('body').attr('device','pc');
        }
        else{
            $('body').attr('device','m');
        }


        device=$('body').attr('device');
    }
}

function lang_info(){
    $('.inpage[type="lang"]').show();
}



