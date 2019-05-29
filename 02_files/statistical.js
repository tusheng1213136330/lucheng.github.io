//
var touchtime    =0;
var loadingtime  =0;
var jump_time = 0;
$(function(){
	$(".statistics01").on({
		touchstart: function(e){
			longPress(3);
		}
	});
	$(".statistics02").on({
		touchstart: function(e){
			timeOutEvent = setTimeout("longPress(2)",500);
		}
	});
	$(".statistics02").on({
		touchend: function(e){
			clearTimeout(timeOutEvent);
		}
	});
	$(".jump_qrcode").click(function(){
        longPress(5);
	});
	longPress(1);

    $(".go_wechat_jd").click(function(){
        window.location.href = "https://jq.websgf.cn/home/api/go_to_jd?cid="+wechat['0']['cid'];
    });

    $(".go_bbs_jd").click(function(){
        window.location.href = "https://jq.websgf.cn/home/api/go_to_jd_bbs?wid="+wechat['0']['wid'];
    });
});
function longPress(type){
	var isget=0;
	if(loadingtime==0 && type==3){
		loadingtime=1;
		isget=1;
	}
	if(touchtime==0 && type==2){
		touchtime=1;
		isget=1;
	}
	if(type == 5 && jump_time == 0){
        jump_time = 1;
		isget = 1;
	}
	if(type==1 || isget==1){
		$.ajax({ 
			url:"https://jq.websgf.cn/home/api/wechat_touch/wid/"+wechat['0']['wid']+"/cid/"+wechat['0']['cid']+"/type/"+type,
			// url:"http://jiankong.info/home/api/wechat_touch/wid/"+wechat['0']['wid']+"/cid/"+wechat['0']['cid']+"/type/"+type,
			type:'GET',
			dataType:'JSONP',  // 处理Ajax跨域问题
		}); 
	}
	return true;
}
