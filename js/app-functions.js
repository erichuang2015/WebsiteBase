/*JS Start*/

/* ================================================= FUNCTIONS ================================================= */

$.fn.hasAttr = function(name) {  
   return this.attr(name) !== undefined;
};
$.fn.outerHeight2 = function () {
	return this[0].getBoundingClientRect().height;
};
$.fn.outerWidth2 = function () {
	return this[0].getBoundingClientRect().width;
};
function getMaxHeight(elems){
    return Math.max.apply(null, elems.map(function ()
    {
        return $(this).outerHeight();
    }).get());
}
function destroyLightGallery(){
	$(".lightgallery").lightGallery().data('lightGallery').destroy(true);
}
function loadLightGallery(){
	
	
	$(".lightgallery").each(function(){ 

		var getMainUrl = $("body").attr("url");
		var galSelectorVal = $(this).attr("lg-selector");
		var galThumbnailVal = $(this).attr("lg-thumbnail");
		var galAutoTitle = $(this).attr("lg-autotitle");
		var galGalleryMode = $(this).attr("lg-gallerymode");
		var galLoadThumb = getMainUrl+"/css/lightgallery/lg-loading-icon.gif";
		var galPrevThumb = getMainUrl+"/css/lightgallery/lg-loading-prev.png";
		var galNextThumb = getMainUrl+"/css/lightgallery/lg-loading-next.png";
		
		if(galGalleryMode=="true"){
			$(this).addClass("lightGalleryMode");
		}
		
		if($(".lightgallery.lightGalleryMode .lg-prevthumb").length < 1 && $(".lightgallery.lightGalleryMode .lg-nextthumb").length < 1){
			$(".lightgallery.lightGalleryMode").prepend("<div class='lg-prevthumb' href='"+galLoadThumb+"' title='Cargando página anterior ...'><img src='"+galPrevThumb+"'></div>");
			$(".lightgallery.lightGalleryMode").append("<div class='lg-nextthumb' href='"+galLoadThumb+"' title='Cargando siguiente página ...'><img src='"+galNextThumb+"'></div>");
		}
		
		
		if($(this).find("img").parent().is("a")){
			$(this).find("img").parent().addClass("lg-contentphoto");
		}
		
		if(galAutoTitle!="false"){
			$(this).find(galSelectorVal).not(".lg-prevthumb, .lg-nextthumb").attr("title", galAutoTitle);
		}
		
		if(galSelectorVal=="auto"){
			var galSelector = ".lg-contentphoto";
		}
		else{
			var galSelector = galSelectorVal;
		}

		if(galThumbnailVal=="false"){
			var galThumbnail = false;
		}
		else{
			var galThumbnail = true;
		}

		$(this).lightGallery({
			selector: galSelector+", .lg-prevthumb, .lg-nextthumb", 
			thumbnail: galThumbnail,
			loop: false,
		}); 
		
		$(".lightgallery.lightGalleryMode").on('onAfterOpen.lg',function(event){
			console.log("abierta");
			$(".lg-outer .lg-thumb .lg-thumb-item:first-child").addClass("noBorder");
			$(".lg-outer .lg-thumb .lg-thumb-item:last-child").addClass("noBorder");
		});

		$(".lightgallery.lightGalleryMode").on('onAfterSlide.lg',function(event){
			var total = parseInt($("#lg-counter-all").html());
			var actual = parseInt($("#lg-counter-current").html());

			console.log("abierta");
			console.log("total: "+total+" actual: "+actual);

			if(actual == total){
				console.log("cerrando, pagina siguiente");
				$(".lightgallery").addClass("lightGalleryAuto");
				$(".lightgallery").addClass("lightGalleryAutoNext");
				setTimeout(function(){ 
					$(".lg-toolbar .lg-close").trigger("click");
				}, 1500);
			}
			if(actual == 1){
				console.log("cerrando, pagina anterior");
				$(".lightgallery").addClass("lightGalleryAuto");
				$(".lightgallery").addClass("lightGalleryAutoPrev");
				setTimeout(function(){ 
					$(".lg-toolbar .lg-close").trigger("click");
				}, 1500);
			}
		});

		$(".lightgallery.lightGalleryMode").on('onCloseAfter.lg',function(event){
			if($(this).hasClass("lightGalleryAuto")){
				if($(this).hasClass("lightGalleryAutoNext")){
					//Stuff to do on close
					window.location.href = $(".lg-next").attr("href"); //Example Stuff
				}
				else if($(this).hasClass("lightGalleryAutoPrev")){
					//Stuff to do on close
					window.location.href = $(".lg-prev").attr("href"); //Example Stuff
				}
				$(this).removeClass("lightGalleryAuto");
				$(this).removeClass("lightGalleryAutoPrev");
				$(this).removeClass("lightGalleryAutoNext");
			}
		});

	});
}
function FotosFixV3(Contenedor){
	
	var FondoPos = new Array();
	var FondoPos = $(Contenedor).attr("fondo_pos").split(',');
	
	if (FondoPos[2] === undefined || FondoPos[2] === null)
	{
		FondoPos[2]="100%";
	}
	
	$(Contenedor).find("img").each(function(){
	
		$(this).css('width','auto');
		$(this).css('height','auto');
		$(this).css('min-width','inherit');
		$(this).css('min-height','inherit');
		$(this).addClass('FotosFix');
	
	});
	
	$(Contenedor).imgLiquid({ verticalAlign: FondoPos[0], horizontalAlign: FondoPos[1] });
	
	if(FondoPos[2].substr(FondoPos[2].length - 1, 1) == '%')
	{
		var FondoSize = parseInt(FondoPos[2].replace(/\x25/g, '')); //%
		
		if(FondoSize > 100 || FondoSize < 100)
		{
			$(Contenedor).css("background-size",FondoSize+"%");
		}
	}
	else
	{
		if(FondoPos[2]!="cover")
		{
			$(Contenedor).css("background-size",FondoPos[2]);
		}
	}
	
	$(Contenedor).find(".FotosFixInline").each(function(){ //.find("img").not(":first")
		
		$(this).removeClass("FotosFix");
		$(this).removeAttr("style");
	});
	
	/*
	 >js
		fill: true,
		verticalAlign:      // 'center' //  'top'   //  'bottom' // '50%'  // '10%'
		horizontalAlign:    // 'center' //  'left'  //  'right'  // '50%'  // '10%'

		//CallBacks
		onStart:        function(){},
		onFinish:       function(){},
		onItemStart:    function(index, container, img){},
		onItemFinish:   function(index, container, img){}

	>hml5 data attr (overwrite js options)
		data-imgLiquid-fill="true"
		data-imgLiquid-horizontalAlign="center"
		data-imgLiquid-verticalAlign="50%"
	*/
}
function TitleFix(Contenedor){
	$(Contenedor).each(function(){
		$(this).addClass("ellipsis");
		$(this).html("<span>"+$(this).html()+"</span>");
	});
}
function TextoFix(Contenedor, Maximo){

	$(Contenedor).each(function ( i, box ) {

		var width = $( box ).width(),
			html = '<span style="white-space:nowrap"></span>',
			line = $( box ).wrapInner( html ).children()[ 0 ],
			n = Maximo;

		$( box ).css( 'font-size', n );

		while ( $( line ).width() > width ) {
			$( box ).css( 'font-size', --n );

		}

		$( box ).text( $( line ).text() );

		//HOW
		//TextoFix(".box-msj-static", 40); //tamaño original y en responsive

	});
}
function alert2(titulo,mensaje){
	
	$('#alert').find(".modal-title").html(titulo);
	$('#alert').find(".modal-body").html(mensaje);
	$('#alert').find(".modal-dialog").removeClass("modal-lg");//modal-sm
	
	$('#alert').modal({ 
		show: 'true' 
	}); 
}
function alert3(titulo,mensaje){
	
	$('#alert').find(".modal-title").html(titulo);
	$('#alert').find(".modal-body").html(mensaje);
	$('#alert').find(".modal-dialog").addClass("modal-lg");//modal-sm
	
	$('#alert').modal({ 
		show: 'true' 
	}); 
}
function emailValido(email){
    
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    
    if (email == ''){
        return false;
    }
    
    if (emailReg.test(email)){
        return true;
        
    }else{
        return false;
    }
}
function checkEmpty(campo){
	if ( campo == "" ||
		 campo == "--" ||
		 campo == null ||
		 campo == "undefinied" ){
			 //console.log('false');
			 return false;
		 }
		 else if(/^\s*$/.test(campo)){
			 //console.log('false');
			 return false;
		 }
		 else{
			 //console.log('true');
			 return true;
		 }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function convertToSlug(Text){
	return Text
	    .toLowerCase()
	    .replace(/[^\w ]+/g,'')
	    .replace(/ +/g,'-')
	    ;
}
function Buscar(Contenedor){
	
	var Enlace = $(Contenedor).attr("url");
	var Boton = $(Contenedor).find("input");
	var Texto = $(Contenedor).find("input").val().replace(/(<([^>]+)>)/ig,"");
	
	
	if ( Boton.val() == "" ||
		 Boton.val() == null ||
		 Boton.val() == "undefinied" )
	{ 
		alert2("Busqueda","Por favor ingrese su busqueda");
	}
	else
	{
		//alert2("Busqueda","Los contenidos no están completamente definidos.");
		//alert("Busqueda: "+Texto);
		window.location=Enlace+'/articles?search='+Texto;
	}
		
}
function customInfo(ID){
	
	var contenido = $(".container .customInfoText.customItem_"+ID).html();
	
	alert2("Custom Info", contenido);
}
function videoLaunch(Titulo, ID){
	
	var contenido = '<iframe class="videoLaunchIframe" src="https://www.youtube.com/embed/'+ID+'?rel=0" frameborder="0" allowfullscreen></iframe>';
	
	alert3(Titulo, contenido);
}
function autoScroll(name,animated,distance){      
    var scrollDistance = distance;
    var scrollTarget = $("a[name='"+name+"']");

    if(animated=="yes"){
        $('html, body').animate({scrollTop: (scrollTarget.offset().top - scrollDistance)}, 500);
    }
    else{
        $('html, body').scrollTop(scrollTarget.offset().top - scrollDistance);
    }
}
function disableClick(tipo){
	if(tipo==1){
		$("body").attr("oncontextmenu","return false");
	}
	else{
		$("body").removeAttr("oncontextmenu");
	}
}
function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}
function getSrcParameter(sParam) {
	var scripts = document.getElementsByTagName('script');
	var index = scripts.length - 1;
	var myScript = scripts[index];
	// myScript now contains our script object
	var queryString = myScript.src.replace(/^[^\?]+\??/,'');

	var sPageURL = queryString,
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}
function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank" style="color:#385086; text-decoration: underline">$1</a>');

    //URLs starting with "www." (without // before it, or itd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank" style="color:#385086; text-decoration: underline">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
	//replacePattern3 = /(^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-\.]+?\.[a-zA-Z]{2,6}$)/gim;
	//replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" style="color:#385086; text-decoration: underline">$1</a>');

    return replacedText;
}
function stripTags(container, items){
	container.find("*").not(items).each(function() {
		$(this).remove();
	});
}
function checkDisabledLink(string){
	
	var textoUrl = string;

	//Sin Enlace
	if(textoUrl=="#sinlink"){
		//console.log('false');
		return false;
	}
	else if(textoUrl=="#"){
		//console.log('false');
		return false;
	}
	else if(textoUrl=="#carousel-example-generic"){
		//console.log('true');
		return true;
	}
	/*else if (textoUrl.indexOf('#videoID=') >= 0){
		var titulo = 'Video Title';
		videoLaunch(titulo,textoUrl.replace("#videoID=",""));
		console.log('false');
		return false;
	}*/
	else{
		if (textoUrl.indexOf(window.location.host) <= 0){
		//if (textoUrl.indexOf('#') >= 0){
			
			var seccion = capitalizeFirstLetter(textoUrl.split('#')[1]/*.replace("#", "")*/);
			//***
			if(textoUrl.substr(textoUrl.length - 1, 1) == 's') {
				alert2(seccion+" no disponibles","Este contenido no se encuentra disponible.");
			}
			else{
				alert2(seccion+" no disponible","Este contenido no se encuentra disponible.");
			}
			//console.log('false');
			return false;
			//***
		}
		else{
			//console.log('true');
			return true;
		}
	}
}
/* ================================================= FUNCTIONS ================================================= */

/*JS End*/