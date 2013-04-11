// Variablene under brukes gjentatte ganger i scritpet.
var fokusHendelse = 0;
var $headerHeight = 0;

var norwegian_month=new Array();
	norwegian_month[0]="Januar";
	norwegian_month[1]="Februar";
	norwegian_month[2]="Mars";
	norwegian_month[3]="April";
	norwegian_month[4]="Mai";
	norwegian_month[5]="Juni";
	norwegian_month[6]="Juli";
	norwegian_month[7]="August";
	norwegian_month[8]="September";
	norwegian_month[9]="Oktober";
	norwegian_month[10]="November";
	norwegian_month[11]="Desember";

$(document).ready(function (){
	
	$headerHeight = $(".timeline-header").height();
	$('.timeline-headerWrapper').height($headerHeight);
				//Foreløpig løsning for reponsivt design: Fixed-div 100%.
	var $headerWidth = $(".wrapper").width();
	$('.timeline-headerWrapper').width($headerWidth);
	
	$("img.lazy").lazyload();
	//

	$(window).resize(function (){
			//Foreløpig løsning for reponsivt design: Fixed-div 100%.
			var $headerWidth = $(".wrapper").width();
			$('.timeline-headerWrapper').width($headerWidth);
			$headerHeight = $(".timeline-header").height();
			$('.timeline-headerWrapper').height($headerHeight);
			//
	});
	scrolleLytter();
	hentData();
	knappeKlargjøring();

	sjekkNav();
	//Sørger for at .headerWrapper får en fast høyde, 
	//slik at contentdivisjoner under flyter under stickyheader.
	
    /*fikser footer, slik at man kan navigere seg til siste hendelse uanz str */
	var $windowHeight = $(window).height();
	var lastHendelse = $('.hendelse:last').height();
	$('.timeline-bottom-pusher').height($windowHeight - lastHendelse);
	//
	
});
var points = 0;
function scrolleLytter() {
	
    //Lytter til scrollehjulet, og tar vekk ingresstekst om man scroller nedover. + visa versa
   
	$(window).scroll(function () {
        //var $timelineTop = $('.header').position().top; // Brukes ikke?
       $headerHeight = $(".timeline-header").height();
         //Med Waypoint(jquery plugin), ser koden hvilken hendelse som er i viewport og markerer tilsvarende indikator.    
          $('.hendelse').waypoint(function(direction) {
              
                fokusHendelse = $(".hendelse").index(this);    
                $(".indikator").eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");
          },{
                offset: $headerHeight + 10,
                horizontal: false
          });    
          sjekkNav();
		 
		if ($(this).scrollTop() > 75) {
			$('#timelineIngress').slideUp(260);
		} else {
			$('#timelineIngress').slideDown(260,function() {
               //funksjon etter slide inn her..
			   points++;
			   $headerHeight = $(".timeline-header").height();
				$('.timeline-headerWrapper').height($headerHeight);
			   
          });
                        
		}
	
	});
   
}

function knappeKlargjøring(){
	
 
	//Bruker .on("click", ".ind... ) istedenfor live() som ble fjernet i jquery v1.9. 
	$(document).on("click", ".indikator", function(){
		//Setter en egen css-klasse på valgt indikator
		//$(this).addClass("indikatorSelected").siblings().removeClass("indikatorSelected"); BRUKER HELLER WAYPOINT TIL Å STYRE SELECTED INDIKATOR
		
		//finner ut hvilken kindikator som er trykket på, og scroller til tilsvarende hendelse
		var $id = $(this).attr("id");
		$(window).scrollTo("." + $id, 300, {offset: -$headerHeight});
		
		//Justerer på hvilken hendelse som er i fokus.
		//fokusHendelse = ($(".indikator").index(this)); Må kanskje ha denne senere DONT DELETE
		
	});
	
	$("#timeline-prev").click(function(){
      
		if (fokusHendelse == 0){
             return false;
        }
        
		fokusHendelse--;
		$headerHeight = $(".timeline-header").height();
		//AAnimerer til forrige hendelse.. (Bruker animate istedenfor scrollTo pga .eq(), usikker på syntax med scrolLTo.)
		$('html, body').animate({
                    scrollTop: $(".hendelse").eq(fokusHendelse).offset().top - $headerHeight
                     }, 200);
		//Setter css .indikatorSelected på riktig indikator.			 
		//$('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");	
	});
	
	$("#timeline-next").click(function(){
		//Hvis fokushendelsen er siste hendelse, skal det ikke skje noe når man trykker next.
        if (fokusHendelse == $('.hendelse').length - 1){
            return false;   
        }
        $headerHeight = $(".timeline-header").height();
		fokusHendelse++;
		$('html, body').animate({
                   /* scrollTop: $(".hendelse").eq(fokusHendelse).offset().top - $headerHeight*/
				   scrollTop: $(".hendelse").eq(fokusHendelse).offset().top - $headerHeight 
                     }, 200);
					 
		//$('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");			
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



function hentData(){
	
	//Loading-gif før data blir skrevet ut til .hendelseWrapper.
	$('.hendelseWrapper').html("<img id='timeline-loading' src='gfx/loading2.gif' alt='Laster tidslinje...' />");
	
	var url = 'http://www.svendsen-it.no/hovedprosjekt/htdocs/testJson.php?tidslinje=1';
	
	$.support.cors = true
	$.ajaxSetup({
		async: false
		/* cache:false MAYBE LATER? */
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
			
			var date_splittet_opp = date.split("-");
			var nytt_format_dato = "";
			
			//Må forandre formatet "mm-dd-yyyy" til "mm/dd/yyyy" for at IE8 skal godta syntaxen til et nytt Dateobjekt.
			for (var i = 0; i < date_splittet_opp.length; i++) {
				nytt_format_dato += date_splittet_opp[i] + "/";
			}

			var hendelseDato = new Date(nytt_format_dato); //Lager Date-objekt av datoen.
			datoArray.push(hendelseDato); //Legger hver dato i en array
			
			//Lager en formatert dato som skal legges til som klassenavn til (this)div.hendelse. 
			//Indikatorne vil få denne datoen som ID i LeggTilindikatorer().
			// Klikker man på en indikator, vil siden scrolle til den div.hendelse som har samme klasse som indikator har som id.
			var datoFormatert = hendelseDato.getDate().toString() + "-" + hendelseDato.getMonth().toString() + "-" + hendelseDato.getFullYear().toString();
			
			htmlTxt += "<div class='hendelse " + datoFormatert + "'>";
			htmlTxt += 		"<div class='hendelseTid'>";
			htmlTxt += 			"<h2>" + hendelseDato.getDate().toString() + ". " + norwegian_month[hendelseDato.getMonth()] + " " + hendelseDato.getFullYear().toString() + "</h2>";
			htmlTxt += 		"</div>"
			htmlTxt += 		"<div class='hendelseInnhold'>"
			htmlTxt += 	    	"<h2>" + title + "</h2>";
			htmlTxt +=			"<img class='lazy' data-original='" + picPath + "' src='" + picPath + "' />";
            htmlTxt +=          wrapTxt(content, "p");
			htmlTxt += "</div></div><div class='clearFix'></div>";
			
		});
		
		$('.hendelseWrapper').html(htmlTxt); //Skriver ut strengen htmlTxt.
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
    
function sjekkNav(){
     if(fokusHendelse == 0){
        $('#timeline-prev').css("opacity","0.3");    
         $('#timeline-next').css("opacity","1");    
    }else if(fokusHendelse == $('.hendelse').length - 1){
        $('#timeline-prev').css("opacity","1");
        $('#timeline-next').css("opacity","0.3");
    }else {
         $('#timeline-prev, #timeline-next').css("opacity","1");
      
    }   
}
// Wrap-funksjon for å forenkle konstruksjon av HTML-string fra json
function wrapTxt(text, tag){
	return "<" + tag + ">" + text + "</" + tag + ">";	
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
    
 
    
    
    