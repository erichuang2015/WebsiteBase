
var mainUrl="http://localhost/websitebase/standalone";var isHome;var isMobile;var isNavChrome;var isNavIE;var isNavIE6;var isNavIE7;var isNavIE8;var isMozilla;var isNavSafari;var isNavOpera;var isNavEdge;(function(){'use strict';if(navigator.userAgent.match(/IEMobile\/10\.0/)){var msViewportStyle=document.createElement('style');msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));document.querySelector('head').appendChild(msViewportStyle)}})();$.fn.hasAttr=function(name){return this.attr(name)!==undefined};$.fn.outerHeight2=function(){return this[0].getBoundingClientRect().height};$.fn.outerWidth2=function(){return this[0].getBoundingClientRect().width};$.fn.htmlClean=function(){this.contents().filter(function(){if(this.nodeType!==3){$(this).htmlClean();return false}else{this.textContent=$.trim(this.textContent);return!/\S/.test(this.nodeValue)}}).remove();return this};$.fn.validateForm=function(options){var settings=$.extend({noValidate:'',hasConfirm:false,customValidate:null,},options);$(this).submit(function(event){var formError=false;var formConfirmTitle='Form Confirm';var formConfirmText='Are you sure you want to send the previous info?';var formErrorTitle='Form Alert';var formErrorText={text:'Please fill the fields.',number:'Please type a valid number.',tel:'Please type a phone number.',pass:'Please fill your password.',email:'Please type a correct E-Mail.',search:'Please fill the search field.',checkbox:'Please check an option.',radio:'Please check one of the options.',textarea:'Please write a message.',select:'Please select an option.'};$(this).find('select').not(settings.noValidate).each(function(){if(!validateEmpty($(this).find("option:selected").attr("value"))){$(this).addClass("JSvalidateError");formError=formErrorText.select}else{$(this).removeClass("JSvalidateError")}});$(this).find('textarea').not(settings.noValidate).each(function(){if(!validateEmpty($.trim($(this).val()))){$(this).addClass("JSvalidateError");formError=formErrorText.textarea}else{$(this).removeClass("JSvalidateError")}});$(this).find('[data-group]').each(function(){var type=$(this).data('group');var item=$(this).find("input[type='"+type+"']");var check=false;for(var i=item.length-1;i>=0;i--){if(item.eq(i).is(":checked")){check=true}}if(!check){item.addClass("JSvalidateErrorCheck");item.parent('label').addClass("JSvalidateError");formError=formErrorText[type]}else{item.removeClass("JSvalidateErrorCheck");item.parent('label').removeClass("JSvalidateError")}});$(this).find('input').not(settings.noValidate).each(function(){switch($(this).attr("type")){case'text':if(!validateEmpty($(this).val())){$(this).addClass("JSvalidateError");formError=formErrorText.text}else{$(this).removeClass("JSvalidateError")}break;case'number':if(!validateEmpty($(this).val())||!validateNumber($(this).val())){$(this).addClass("JSvalidateError");formError=formErrorText.number}else{$(this).removeClass("JSvalidateError")}break;case'tel':if(!validateEmpty($(this).val())){$(this).addClass("JSvalidateError");formError=formErrorText.tel}else{$(this).removeClass("JSvalidateError")}break;case'email':if(!validateEmpty($(this).val())||!validateEmail($(this).val())){$(this).addClass("JSvalidateError");formError=formErrorText.email}else{$(this).removeClass("JSvalidateError")}break;case'password':if(!validateEmpty($(this).val())){$(this).addClass("JSvalidateError");formError=formErrorText.pass}else{$(this).removeClass("JSvalidateError")}break;case'search':if(!validateEmpty($(this).val())){$(this).addClass("JSvalidateError");formError=formErrorText.search}else{$(this).removeClass("JSvalidateError")}break;default:if(settings.customValidate!==null){var CVFunction=settings.customValidate[0];var CVInput=settings.customValidate[1];var CVMessage=settings.customValidate[2];if(!window[CVFunction]($(CVInput).val())){$(CVInput).addClass("JSvalidateError");formError=CVMessage}else{$(this).removeClass("JSvalidateError")}}else{$(this).removeClass("JSvalidateError")}}});if(formError!==false){showAlert(formErrorTitle,formError,'medium');event.preventDefault()}if(settings.hasConfirm&&formError===false){var formElement=$(this);event.preventDefault();bootbox.confirm({title:formConfirmTitle,message:formConfirmText,size:'medium',backdrop:true,callback:function(result){if(result){formElement.unbind("submit").submit();formElement.trigger('reset');formElement.find("input[type='checkbox']").prop('checked',false).parent().removeClass('active');formElement.find("input[type='radio']").prop('checked',false).parent().removeClass('active');formElement.validateForm({noValidate:settings.noValidate,hasConfirm:settings.hasConfirm,})}}}).on("shown.bs.modal",function(){$(".modal .modal-footer .btn:focus").blur()})}})};function validateEmail(field){var emailReg=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;if(!emailReg.test(field)){return false}else{return true}}function validateNumber(field){var numberReg=/^-?\d+(\.\d+)?$/;if(!numberReg.test(field)){return false}else{return true}}function validateEmpty(field){if(field===""||field===null||field===undefined){return false}else if(/^\s*$/.test(field)){return false}else{return true}}function toBoolean(value){var strValue=String(value).toLowerCase();strValue=((!isNaN(strValue)&&strValue!=='0')&&strValue!==''&&strValue!=='null'&&strValue!=='undefined')?'1':strValue;return strValue==='true'||strValue==='1'?true:false}function getMaxHeight(elems){return Math.max.apply(null,elems.map(function(){return $(this).outerHeight()}).get())}function responsiveCode(){var bodyWidth=document.body.clientWidth;var bodyHeight=$(window).height();var bodyOrientation=bodyWidth>bodyHeight?true:false;var bodyScreen={'small-phone':'320','medium-phone':'360',phone:'480',tablet:'768',desktop:'992',widescreen:'1200','full-hd':'1920'};if(bodyWidth){$("body").each(function(){var valignBody=bodyHeight;var valignContainer=$(".JSverticalAlign").outerHeight();if(valignBody>valignContainer){$(".JSverticalAlign").css({"margin-top":-Math.abs(valignContainer/2),"position":"absolute","top":"50%","width":$(".JSverticalAlign").parent().width(),"visibility":"visible"})}else{$(".JSverticalAlign").removeAttr("style")}});$(document).trigger("responsiveCode",[bodyWidth,bodyHeight,bodyOrientation,bodyScreen])}else{window.setTimeout(ResponsiveCode,30)}}$(window).bind("load",responsiveCode);$(window).bind("resize",responsiveCode);$(window).bind("orientationchange",responsiveCode);function destroyLightGallery(){$(".JSlightGallery").lightGallery().data('lightGallery').destroy(true)}function loadLightGallery(){$(".JSlightGallery").each(function(){var galSelectorVal=$(this).data("lg-item")==="auto"?"a":$(this).data("lg-item");var galThumbnailVal=$(this).data("lg-thumb");var galDownloadVal=$(this).data("lg-download");var galPrevGalText="Loading previous page ...";var galNextGalText="Loading next page ...";var galLoadThumb=mainUrl+"/resources/lightgallery/img/lg-loading-icon.gif";var galPrevThumb=mainUrl+"/resources/lightgallery/img/lg-loading-prev.png";var galNextThumb=mainUrl+"/resources/lightgallery/img/lg-loading-next.png";if(String($(this).data("lg-title"))!="false"){$(this).find(galSelectorVal).not(".lg-thumb-prev, .lg-thumb-next").attr("title",$(this).data("lg-title"))}if(toBoolean($(this).data("lg-gallery"))===true){$(this).addClass("JSlightGalleryMode")}if($(".lg-gallery-paginator").length>0){if($(".JSlightGallery.JSlightGalleryMode .lg-thumb-prev").length<1&&$(".JSlightGallery.JSlightGalleryMode .lg-thumb-next").length<1){$(".JSlightGallery.JSlightGalleryMode").prepend("<div class='lg-thumb-prev' href='"+galLoadThumb+"' title='"+galPrevGalText+"'><img src='"+galPrevThumb+"'></div>");$(".JSlightGallery.JSlightGalleryMode").append("<div class='lg-thumb-next' href='"+galLoadThumb+"' title='"+galNextGalText+"'><img src='"+galNextThumb+"'></div>")}}$(this).lightGallery({selector:galSelectorVal+", .lg-thumb-prev, .lg-thumb-next",thumbnail:toBoolean(galThumbnailVal),download:toBoolean(galDownloadVal),loop:false,});if($(".lg-gallery-paginator").length>0){$(".JSlightGallery.JSlightGalleryMode").on('onAfterOpen.lg',function(){$(".lg-outer .lg-thumb .lg-thumb-item:first-child").addClass("JSlightGalleryNoBorder");$(".lg-outer .lg-thumb .lg-thumb-item:last-child").addClass("JSlightGalleryNoBorder")});$(".JSlightGallery.JSlightGalleryMode").on('onAfterSlide.lg',function(){var total=parseInt($("#lg-counter-all").html());var current=parseInt($("#lg-counter-current").html());if(current===total){$(".JSlightGallery").addClass("lightGalleryAuto");$(".JSlightGallery").addClass("lightGalleryAutoNext");setTimeout(function(){$(".lg-toolbar .lg-close").trigger("click")},1500)}if(current===1){$(".JSlightGallery").addClass("lightGalleryAuto");$(".JSlightGallery").addClass("lightGalleryAutoPrev");setTimeout(function(){$(".lg-toolbar .lg-close").trigger("click")},1500)}});$(".JSlightGallery.JSlightGalleryMode").on('onCloseAfter.lg',function(){if($(this).hasClass("lightGalleryAuto")){if($(this).hasClass("lightGalleryAutoNext")){$(document).trigger("onNextPageChange.lg")}else if($(this).hasClass("lightGalleryAutoPrev")){$(document).trigger("onPrevPageChange.lg")}$(this).removeClass("lightGalleryAuto");$(this).removeClass("lightGalleryAutoPrev");$(this).removeClass("lightGalleryAutoNext")}})}})}function imageFill(container){var bgData=new Array();var bgVertical;var bgHorizontal;var bgFill;var bgFillSize;bgData=$(container).data('img-fill').split(',');if(bgData[0]===undefined||bgData[0]===null){bgData[0]='center'}if(bgData[1]===undefined||bgData[1]===null){bgData[1]='center'}if(bgData[2]===undefined||bgData[2]===null){bgData[2]='true'}bgVertical=bgData[0];bgHorizontal=bgData[1];bgFill=bgData[2].indexOf('%')>=0||bgData[2].indexOf('px')>=0||bgData[2]==='contain'?false:true;bgFillSize=bgData[2].indexOf('%')>=0||bgData[2].indexOf('px')>=0?parseInt(bgData[2].replace(/\x25|px/g,'')):false;$(container).imgLiquid({fill:bgFill,verticalAlign:bgVertical,horizontalAlign:bgHorizontal,});if(bgFillSize){if(bgFillSize>100||bgFillSize<100){$(container).css('background-size',bgData[2])}}}function onElementHeightChange(elm,callback){var lastHeight=$(elm).height(),newHeight;(function run(){newHeight=$(elm).height();if(lastHeight!==newHeight){callback()}lastHeight=newHeight;if(elm.onElementHeightChangeTimer){clearTimeout(elm.onElementHeightChangeTimer)}elm.onElementHeightChangeTimer=setTimeout(run,200)})()}function textCut(container){$(container).each(function(){$(this).html("<div><div>"+$(this).html()+"</div></div>")})}function textAutoSize(container,max){$(container).each(function(i,box){var width=$(box).width(),html='<span style="white-space:nowrap"></span>',line=$(box).wrapInner(html).children()[0],n=max;$(box).css('font-size',n);while($(line).width()>width){$(box).css('font-size',--n)}$(box).text($(line).text())})}function showAlert(title,text,size){if(typeof size===undefined||size===null){size='medium'}bootbox.alert({title:title,message:text,size:size,backdrop:true}).on("shown.bs.modal",function(){$(".modal .modal-footer .btn:focus").blur()})}function showContent(title,element,size){if(typeof size===undefined||size===null){size='medium'}bootbox.alert({title:title,message:$(element).html(),size:size,backdrop:true}).on("shown.bs.modal",function(){$(".modal .modal-footer .btn:focus").blur()})}function youTubeParser(url){var regExp=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;var match=url.match(regExp);return(match&&match[7].length==11)?match[7]:false}function vimeoParser(url){var regExp=/^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;var match=url.match(regExp);return match[5]}function videoLaunch(url,share,title,autoplay){var ID;var embedUrl;var embedShare;var embedShareTitle='Share Link';var embedShareText='The share link has been copied!';var embedAutoPlay='';if(typeof share===undefined||share===null){share=false}if(typeof title===undefined||title===null){title=null}if(typeof autoplay===undefined||autoplay===null){autoplay=false}if(url.indexOf('youtube')>=0){ID=youTubeParser(url);if(autoplay){embedAutoPlay='&autoplay=1'}embedUrl='https://www.youtube.com/embed/'+ID+'?rel=0'+embedAutoPlay;embedShare='https://youtu.be/'+ID}else if(url.indexOf('vimeo')>=0){ID=vimeoParser(url);if(autoplay){embedAutoPlay='?autoplay=1'}embedUrl='https://player.vimeo.com/video/'+ID+''+embedAutoPlay;embedShare='https://vimeo.com/'+ID}else if(url.indexOf('facebook')>=0){ID='';if(autoplay){embedAutoPlay='&autoplay=1'}embedUrl='https://www.facebook.com/plugins/video.php?href='+url+'&show_text=0'+embedAutoPlay;embedShare=url}else{ID=url;if(autoplay){embedAutoPlay='&autoplay=1'}embedUrl='https://www.youtube.com/embed/'+ID+'?rel=0'+embedAutoPlay;embedShare='https://youtu.be/'+ID}var content='<div class="JSvideoLaunchIframe embed-responsive embed-responsive-16by9">'+'	<iframe class="embed-responsive-item" src="'+embedUrl+'" frameborder="0" allowfullscreen></iframe>'+'</div>';if(share){content=content+'<a class="JSvideoLaunchURL" data-clipboard-action="copy" data-clipboard-target=".JSvideoLaunchCopy">'+'	<div class="JSvideoLaunchButton">'+embedShareTitle+' <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></div>'+'	<div class="JSvideoLaunchText">'+embedShare+'</div>'+'	<div class="JSvideoLaunchCopy">'+embedShare+'</div>'+'</a>'}bootbox.alert({title:title,message:content,size:'large',backdrop:true}).on("shown.bs.modal",function(){$(".modal .modal-footer .btn:focus").blur();if(url.indexOf('facebook')>=0){var videoLaunchIframeSRC=$(".JSvideoLaunchIframe iframe").attr("src");var videoLaunchIframeSRCwidth=$(".JSvideoLaunchIframe iframe").width();var videoLaunchIframeSRCheight=$(".JSvideoLaunchIframe iframe").height();$(".JSvideoLaunchIframe iframe").attr("src",videoLaunchIframeSRC+"&width="+videoLaunchIframeSRCwidth+"&height="+videoLaunchIframeSRCheight)}});$('.JSvideoLaunchText').tooltip({title:embedShareText,placement:'bottom',trigger:'manual',});var clipboard=new Clipboard('.JSvideoLaunchURL');clipboard.on('success',function(){$('.JSvideoLaunchText').tooltip('show')});clipboard.on('error',function(){$('.JSvideoLaunchURL').attr('target','blank');$('.JSvideoLaunchURL').attr('href',embedShare)})}function capitalizeFirstLetter(string){return string.charAt(0).toUpperCase()+string.slice(1)}function convertToSlug(Text){return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')}function autoScroll(selector,animated,distance){var scrollDistance=distance;var scrollTarget=$(selector);var scrollAnimated=animated==true?500:animated;if(scrollAnimated){$('html, body').animate({scrollTop:(scrollTarget.offset().top-scrollDistance)},scrollAnimated)}else{$('html, body').scrollTop(scrollTarget.offset().top-scrollDistance)}}function disableClick(enable){if(enable){$("body").attr("oncontextmenu","return false")}else{$("body").removeAttr("oncontextmenu")}}function getUrlParameter(sParam){var sPageURL=decodeURIComponent(window.location.search.substring(1)),sURLVariables=sPageURL.split('&'),sParameterName,i;for(i=0;i<sURLVariables.length;i++){sParameterName=sURLVariables[i].split('=');if(sParameterName[0]===sParam){return sParameterName[1]===undefined?true:sParameterName[1]}}}function getSrcParameter(sParam){var scripts=document.getElementsByTagName('script');var index=scripts.length-1;var myScript=scripts[index];var queryString=myScript.src.replace(/^[^\?]+\??/,'');var sPageURL=queryString,sURLVariables=sPageURL.split('&'),sParameterName,i;for(i=0;i<sURLVariables.length;i++){sParameterName=sURLVariables[i].split('=');if(sParameterName[0]===sParam){return sParameterName[1]===undefined?true:sParameterName[1]}}}function linkify(inputText){var replacedText,replacePattern1,replacePattern2,replacePattern3;replacePattern1=/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;replacedText=inputText.replace(replacePattern1,'<a href="$1" target="_blank">$1</a>');replacePattern2=/(^|[^\/])(www\.[\S]+(\b|$))/gim;replacedText=replacedText.replace(replacePattern2,'$1<a href="http://$2" target="_blank">$2</a>');replacePattern3=/(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;replacedText=replacedText.replace(replacePattern3,'<a href="mailto:$1">$1</a>');return replacedText}function stripTags(container,items){container.find("*").not(items).each(function(){$(this).remove()})}function checkDisabledLink(string){var textUrl=string;if(textUrl==="#"){return false}else if(textUrl.indexOf('#carousel')>=0){return true}else{if(textUrl.indexOf(window.location.host)<=0){var section=textUrl.split('#')[1].replace(/-/g,' ');showAlert(section,"This content is currently disabled.");return false}else{return true}}}function windowPopup(element){var leftPosition;var topPosition;var getUrl=$(element).data('win-url');var getSize=$(element).data('win-size').split('x');var getAlign=$(element).data('win-align').split(',');var getScroll=$(element).data('win-scroll');if(getAlign[0]==="right"){leftPosition=window.screen.width}else if(getAlign[0]==="left"){leftPosition=0}else{leftPosition=(window.screen.width/2)-((getSize[0]/2)+10)}if(getAlign[1]==="top"){topPosition=0}else if(getAlign[1]==="bottom"){topPosition=window.screen.height}else{topPosition=(window.screen.height/2)-((getSize[1]/2)+50)}window.open(getUrl,"WindowPopupJS","status=no,"+"width="+getSize[0]+","+"height="+getSize[1]+","+"resizable=yes,"+"left="+leftPosition+","+"top="+topPosition+","+"screenX="+leftPosition+","+"screenY="+topPosition+","+"toolbar=no,"+"menubar=no,"+"scrollbars="+getScroll+","+"location=no,"+"directories=no")}function mapLaunch(element){var mapContent;var mapTitle="Map Select";var mapText="Select one of options below";var mapIcon1=mainUrl+"/css/icons/maplaunch/google-maps.png";var mapIcon2=mainUrl+"/css/icons/maplaunch/waze.png";var mapCoords1=$(element).data('map-coords-1').split(',');var mapCoords2=$(element).data('map-coords-2').split(',');var mapAddress=$(element).data('map-address');var mapAddressUrl=encodeURI(mapAddress).replace(/%20/g,'+');var mapLaunchUrl1=isMobile?'http://maps.google.com/maps?q='+mapCoords1[0]+','+mapCoords1[1]+','+mapCoords1[2]+'z':'https://www.google.cl/maps/search/'+mapAddressUrl+'/@'+mapCoords1[0]+','+mapCoords1[1]+','+mapCoords1[2]+'z';var mapLaunchUrl2=isMobile?'waze://?ll='+mapCoords2[0]+','+mapCoords2[1]+'&navigate=yes':'https://www.waze.com/livemap?zoom='+mapCoords2[2]+'&lat='+mapCoords2[0]+'&lon='+mapCoords2[1];mapContent='<div class="JSmapLaunchInfo">'+'	<span class="label label-primary">'+mapText+'</span>'+'	<div class="JSmapLaunchIcons">'+'		<a href="'+mapLaunchUrl1+'" target="_blank">'+'			<img src="'+mapIcon1+'">'+'		</a>'+'		<a href="'+mapLaunchUrl2+'" target="_blank">'+'			<img src="'+mapIcon2+'">'+'		</a>'+'	</div>'+'	<div class="well">'+mapAddress+'</div>'+'</div>';showAlert(mapTitle,mapContent,'small')}$(document).ready(function(){responsiveCode();loadLightGallery();isHome=$('.isHome').length>0?true:false;isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|BB10|PlayBook|MeeGo/i.test(navigator.userAgent);isNavChrome=$.browser.name==='Chrome'&&$.browser.webkit===true?true:false;isNavIE=$.browser.name==='Microsoft Internet Explorer'&&$.browser.msie===true?true:false;isNavIE6=$.browser.name==='Microsoft Internet Explorer'&&$.browser.msie===true&&$.browser.version===6?true:false;isNavIE7=$.browser.name==='Microsoft Internet Explorer'&&$.browser.msie===true&&$.browser.version===7?true:false;isNavIE8=$.browser.name==='Microsoft Internet Explorer'&&$.browser.msie===true&&$.browser.version===8?true:false;isNavMozilla=$.browser.name==='Firefox'&&$.browser.mozilla===true?true:false;isNavSafari=$.browser.name==='Safari'&&$.browser.webkit===true?true:false;isNavOpera=$.browser.name==='Opera'&&$.browser.opera===true?true:false;isNavEdge=$.browser.name==='Microsoft Edge'?true:false;$('*[data-toggle="tooltip"]').tooltip();$('*[data-toggle="popover"]').popover();$('*[data-ride="carousel"]').swipe({swipe:function(event,direction,distance,duration,fingerCount,fingerData){if(direction==='right'){$(this).carousel('prev')}else if(direction==='left'){$(this).carousel('next')}},allowPageScroll:'vertical',});$('.JSdataTables').each(function(){$(this).DataTable({paging:toBoolean($(this).data('table-pages')),searching:toBoolean($(this).data('table-search')),info:toBoolean($(this).data('table-info')),ordering:toBoolean($(this).data('table-sort')),})});$('.JSimgFill').each(function(){imageFill($(this))});$(".JStextCut").each(function(){textCut($(this))});$(".JSrotate").each(function(){$(this).rotate({angle:$(this).data('rotate-angle')});$(this).css('visibility','visible')});$(document).on("click",".JSwindowPopup",function(){windowPopup($(this))});$(document).on("click",".JSmapLaunch",function(){mapLaunch($(this))});$(document).on("click","a[href*=#]",function(e){var source=$(this).attr("href");if(!(checkDisabledLink(source))){e.preventDefault()}})});$(window).bind("load",function(){});$(document).ready(function(){$(document).on('onNextPageChange.lg',function(event){window.location.href=$('.lg-next').attr('href')});$(document).on('onPrevPageChange.lg',function(event){window.location.href=$('.lg-prev').attr('href')});if(getUrlParameter('page')){autoScroll(".JSlightGallery",true,0)}$('.JSformExample').validateForm({noValidate:'#example-input-lastname',hasConfirm:true,customValidate:['validateCustom','#example-input-custom','Fill the custom field'],})});function validateCustom(field){if(field==='Custom'){return true}else{return false}}$(window).bind("load",function(){$(".JSloadProgressTest .progress-bar").css("width","100%");$(".JSloadProgressTest .progress-bar").attr("aria-valuenow","100")});$(document).on("responsiveCode",function(event,bodyWidth,bodyHeight,bodyOrientation,bodyScreen){$("body").attr("window-size",bodyWidth+"x"+bodyHeight);if(bodyWidth<bodyScreen.tablet){console.log('Tablet size and lower!')}if(bodyOrientation){$("body").attr("window-orientation","landscape")}else{$("body").attr("window-orientation","portrait")}});