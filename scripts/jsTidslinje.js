// JavaScript Document
$(document).ready(function(){
	
	leggTilIndikatorer();
	knappeKlargjøring();
	scrolleLytter();
	
	//Sørger for at .headerWrapper får en fast høyde, 
	//slik at contentdivisjoner under flyter under stickyheader.
	var $headerHeight = $(".header").height();
	$('.headerWrapper').height($headerHeight);


});

//Lytter til scrollehjulet, og tar vekk ingresstekst om man scroller nedover. + visa versa
function scrolleLytter() {
	$(window).scroll(function () {
		var $timelineTop = $('.header').position().top;
		
		if ($(this).scrollTop() > 75) {
			$('#timelineIngress').slideUp(300);
		} else {
			$('#timelineIngress').slideDown(300);
		}
	});
}

function knappeKlargjøring(){
	$('.indikator').live("click",function(){
		$(this).siblings().removeClass("indikatorSelected");
		$(this).addClass("indikatorSelected");
		var $id = $(this).attr("id");
		$(window).scrollTo("." + $id, 300, {offset: -120});
	});
	

}

function leggTilIndikatorer(){
	var hendelse1 = new Date(2013,0,5);
	var hendelse2 = new Date(2013,0,7);
	var hendelse3 = new Date(2013,0,1);
	var hendelse4 = new Date(2013,0,2);
	var hendelse5 = new Date(2013,0,16);
	var hendelse6 = new Date(2013,0,10);
	
	var array = [hendelse1, hendelse2, hendelse3, hendelse4, hendelse5, hendelse6];
	/* Prøvde her å sortere datoene, uten hell. Kode fra stackoverflow
	var array = [new Date(2013,0,5), new Date(2013,0,7), new Date(2013,0,1), new Date(2013,0,2), new Date(2013,0,16), new Date(2013,0,10)]
	var test = array.sort(function(a,b){
		  a = new Date(a.date);
		  b = new Date(b.date);
		  return a<b?-1:a>b?1:0;
		});
	
	alert(test);
	*/
	
	var prevTime = new Date(2013,0,1,0,0);  // Jan 1, 2013
	var thisTime = new Date();              // I dag
	
		
	//Regner om differansen i dager
	var diff = thisTime.getTime() - prevTime.getTime();   // Finner differansen i millisekunder.
	var dager = diff / (1000*60*60*24);
	
	//Utregning av prosent av en dato i forhold til første og siste dato.
	var indikator1 = hendelse1.getTime() - prevTime.getTime();
	var ok = indikator1 / (1000*60*60*24); 
	var prosentUtregning = (ok / dager) * 100;
	
	var test;
	
	for (var i = 0; i < array.length; i++){
		
		var njeh = array[i].getTime() - prevTime.getTime();
		var bleh = njeh / (1000*60*60*24);
		var prosent = ((bleh / dager) * 100).toFixed(0);
		
		var datoFormatert = array[i].getDate().toString() + "-" + array[i].getMonth().toString() + "-" + array[i].getFullYear().toString();
		
		$("#indikatorWrapper").append("<div id='" + datoFormatert + "'class='indikator " + prosent + "'></div>");
		var cssProsent = prosent + "%";
		$("." + prosent + "").css({left: cssProsent });
		
	};
	
	$('.indikator:first').addClass("indikatorSelected");
}