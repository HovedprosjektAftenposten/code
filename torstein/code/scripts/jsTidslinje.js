// JavaScript Document
var fokusHendelse = 0;

$(document).ready(function (){
	
	hentData();
	knappeKlargjøring();
	scrolleLytter();
	
	//Sørger for at .headerWrapper får en fast høyde, 
	//slik at contentdivisjoner under flyter under stickyheader.
	var $headerHeight = $(".header").height();
	$('.headerWrapper').height($headerHeight);
	
	$('.hendelse:first').addClass("hendelse-in-focus");
	
	$('#txtTest').click(function () {
       

    });
});

//Lytter til scrollehjulet, og tar vekk ingresstekst om man scroller nedover. + visa versa
function scrolleLytter() {
	

    
	$(window).scroll(function () {
		var $timelineTop = $('.header').position().top; // Brukes ikke?
		
        /*if ($('.hendelse:in-viewport').offset().top > 0){
            alert("sad");
                fokusHendelse = $(this).eq();
                $('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");
        }*/
    
        
      $('.hendelse').waypoint(function(direction) {
          //$body.toggleClass(this.id + '-visible', direction === 'left');
            fokusHendelse = $(".hendelse").index(this);    
            $(".indikator").eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");
    }, {
              offset: '120px',
              horizontal: false
        });    
        
       // fokusHendelse = $('.hendelse:in-viewport').index();
        //$('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");
        //$('#txtTest').html(hei);
        
		if ($(this).scrollTop() > 75) {
			$('#timelineIngress').slideUp(300);
		} else {
			$('#timelineIngress').slideDown(300);
		}
		
        
     
		//Dette skal jobbes videre på Torsdag...--_ Tenkte her å finne ut om hendelse var 120px fra toppen, og derfra bytte fokushendelse til neste hendelse.
		//if ($('.hendelse').eq(fokusHendelse).position().top < 110){
			//$('#txtTest').html($('.hendelse').eq(fokusHendelse).offset().top);
			//$('.hendelse').eq(fokusHendelse).css("background","red");
			//$('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");
			//fokusHendelse++;
			
		//}
		
	});
}

function knappeKlargjøring(){
	
	//Denne variabelen brukes til å holde styr på hvilken hendelse som er i fokus. 
	
	
       /* $(document).on("appear", ".hendelse", eq(fokusHendelse).appear(function () {
            $('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");
        });*/
    

            
        
	//Bruker .on("click", ".ind... ) istedenfor live() som ble fjernet i jquery v1.9. 
	$(document).on("click", ".indikator", function(){
		//Setter en egen css-klasse på valgt indikator
		$(this).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");
		
		//finner ut hvilken kindikator som er trykket på, og scroller til tilsvarende hendelse
		var $id = $(this).attr("id");
		$(window).scrollTo("." + $id, 300, {offset: -120});
		
		//Justerer på hvilken hendelse som er i fokus.
		fokusHendelse = ($(".indikator").index(this));
		
	});
	
	$("#timeline-prev").click(function(){
		
		fokusHendelse--;
		
		//AAnimerer til forrige hendelse.. (Bruker animate istedenfor scrollTo pga .eq(), usikker på syntax med scrolLTo.)
		$('html, body').animate({
                    scrollTop: $(".hendelse").eq(fokusHendelse).offset().top - 120
                     }, 200);
		//Setter css .indikatorSelected på riktig indikator.			 
		$('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");	
	});
	
	$("#timeline-next").click(function(){
		
		fokusHendelse++;
		$('html, body').animate({
                    scrollTop: $(".hendelse").eq(fokusHendelse).offset().top - 120
                     }, 200);
					 
		$('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");			
	});
	
	
}

function leggTilIndikatorer(datoArray){
	
	var thisTime = new Date(0,0,0); //En dato som garantert er før første hendelse i tidslinjen.
	var prevTime = new Date(); //Dagens dato
	
	for (var i = 0; i < datoArray.length; i++){
		
		//Finner første dato i hendelseforløp.
		if(datoArray[i].getTime() < prevTime.getTime()){
			prevTime = datoArray[i];
		};
		//Finner siste dato i hendelseforløp.
		if(datoArray[i].getTime() > thisTime.getTime()){
			thisTime = datoArray[i];
		};
	}
		
	//Regner om differansen til første og siste dato i dager
	var dager = (thisTime.getTime() - prevTime.getTime()) / (1000*60*60*24);
	
	for (var i = 0; i < datoArray.length; i++){
		
	    //Finner millisekunder fra dato(this) til første hendelsesdato.
		var tidsaspekt_milli = datoArray[i].getTime() - prevTime.getTime();
		
		//Gjør om fra millisekunder til dager.
		var tidsaspekt_dager = (tidsaspekt_milli / (1000*60*60*24));
		
		//Finner prosenten til dato(this) i forhold til hele tidsaspektet.
		var prosent = ((tidsaspekt_dager / dager) * 100).toFixed(0);
		
		//Formaterer Datoen til format: dd-mm-yyyy
		var datoFormatert = datoArray[i].getDate().toString() + "-" + datoArray[i].getMonth().toString() + "-" + datoArray[i].getFullYear().toString();
		
		//Appenderer #indikatorWrapper med indikatordiv som får en venstremargin med riktig prosent i forhold til tidsaspektet.
		$("#indikatorWrapper").append("<div id='" + datoFormatert + "'class='indikator " + prosent + "'></div>");
		$("." + prosent + "").css({left: prosent + "%" });
		
	};
	
	//Setter .indikatorSeleected på første indikator.
	$('.indikator:first').addClass("indikatorSelected");
}

function hentData2(){ //BRUKES TIL TESTING AV SKUMLE KODESNUTTER
	$.ajax({
			url: 'http://www.svendsen-it.no/hovedprosjekt/htdocs/testJson.php?tidslinje=1',
			datatype: 'json',
			success: function(jsonData){
			//	alert("yay");
				alert(JSON.stringify(jsonData));
				alert(jsonData);
				//var jsonData = $.parseJSON(JSON.stringify(data));
				var hei = JSON.stringify(jsonData);
				var htmlTxt = ""; //Gjør klar streng som skal inneholde HTML-text.
				var datoArray = []; //Gjør klar array som skal samle på datoene.
		
				$.each(jsonData, function(i,item){
					alert("YES EACH");
					var content_id = item.content_ID;
					var table_id = item.tl_ID;
					var title = item.content_title;
					var time = item.content_time;
					var date = item.content_date;
					var content = item.content_content;
					var category = item.content_category;
					var mapLat = item.content_mapLat;
					var mapLng = item.content_mapLng;
					var zoomLvl = item.content_zoomLvl;
					var picId = item.pic_ID;
					var picPath = item.pic_path;
					
					var hendelseDato = new Date(date); //Lager Date-objekt av datoen.
					
					datoArray.push(hendelseDato); //Legger hver dato i en array
					
					//Lager en formatert dato som skal legges til som klassenavn til (this)div.hendelse. 
					//Indikatorne vil få denne datoen som ID i LeggTilindikatorer().
					// Klikker man på en indikator, vil siden scrolle til den div.hendelse som har samme klasse som indikator har som id.
					var datoFormatert = hendelseDato.getDate().toString() + "-" + hendelseDato.getMonth().toString() + "-" + hendelseDato.getFullYear().toString();
					
					htmlTxt += "<div class='hendelse " + datoFormatert + "'>";
					htmlTxt += 		"<div class='hendelseTid'";
					htmlTxt += 			"<p>" + hendelseDato.toDateString() + "</p>";
					htmlTxt += 		"</div>"
					htmlTxt += 		"<div class='hendelseInnhold'>"
					htmlTxt += 	    	"<h2>" + title + "</h2>";
					htmlTxt +=			"<img src='" + picPath + "' />";
					htmlTxt += "</div></div><div class='clearFix'></div>";
					
					
				});
		
				$('.hendelseWrapper').append(htmlTxt); //Skriver ut strengen htmlTxt.
					leggTilIndikatorer(datoArray); //Funksjon med array som parameter.
				
				
			},
			error: function(data){
				alert("bu");
			},
			complete: function(data){
				alert("complete");	
			}
		});
	
}

function hentData(){
	var url = 'http://www.svendsen-it.no/hovedprosjekt/htdocs/testJson.php?tidslinje=1';
	
	$.ajaxSetup({
		async: false
	});
	
	$.getJSON(url, function(jsonData){
		
		var htmlTxt = ""; //Gjør klar streng som skal inneholde HTML-text.
		var datoArray = []; //Gjør klar array som skal samle på datoene.
		
		$.each(jsonData, function(i,item){
			
			var content_id = item.content_ID;
			var table_id = item.tl_ID;
			var title = item.content_title;
			var time = item.content_time;
			var date = item.content_date;
			var content = item.content_content;
			var category = item.content_category;
			var mapLat = item.content_mapLat;
			var mapLng = item.content_mapLng;
			var zoomLvl = item.content_zoomLvl;
			var picId = item.pic_ID;
			var picPath = item.pic_path;
			
			var hendelseDato = new Date(date); //Lager Date-objekt av datoen.
			
			datoArray.push(hendelseDato); //Legger hver dato i en array
			
			//Lager en formatert dato som skal legges til som klassenavn til (this)div.hendelse. 
			//Indikatorne vil få denne datoen som ID i LeggTilindikatorer().
			// Klikker man på en indikator, vil siden scrolle til den div.hendelse som har samme klasse som indikator har som id.
			var datoFormatert = hendelseDato.getDate().toString() + "-" + hendelseDato.getMonth().toString() + "-" + hendelseDato.getFullYear().toString();
			
			htmlTxt += "<div class='hendelse " + datoFormatert + "'>";
			htmlTxt += 		"<div class='hendelseTid'";
			htmlTxt += 			"<p>" + hendelseDato.toDateString() + "</p>";
			htmlTxt += 		"</div>"
			htmlTxt += 		"<div class='hendelseInnhold'>"
			htmlTxt += 	    	"<h2>" + title + "</h2>";
			htmlTxt +=			"<img src='" + picPath + "' />";
			htmlTxt += "</div></div><div class='clearFix'></div>";
			
		});
		
		$('.hendelseWrapper').append(htmlTxt); //Skriver ut strengen htmlTxt.
		leggTilIndikatorer(datoArray); //Funksjon med array som parameter.
	})
	.complete (function(jsonStatus){
		//?
	})
	.error (function(jsonStatus){
		alert(":(");
	});
	
}

// Henter data fra json, omgjør det til en lesbar string og legger den til #sectData
function hentJSONTekst(){
	$.getJSON(urlString, function(jsonData){
		var jsonString = JSON.stringify(jsonData);
					
		$('.wrapper').html("<xmp>" + jsonString + "</xmp>");
	})
	.error(function(jsonStatus){
		alert(JSON.stringify(jsonStatus));
	});
}

// Wrap-funksjon for å forenkle konstruksjon av HTML-string fra json
function wrapTxt(text, tag){
	return "<" + tag + ">" + text + "</" + tag + ">";	
}
	