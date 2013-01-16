// JavaScript Document
$(document).ready(function(){
	
	
	
	leggTilIndikatorer();
	knappeKlargjøring();
	
	var $headerHeight = $(".header").height();
	$('.headerWrapper').height($headerHeight);
	
	$(window).scroll(function () {
		
			var $timelineTop = $('.header').position().top;
			
			if ($(this).scrollTop() > 50) {
				$('#timelineIngress').slideUp();
			} else {
				$('#timelineIngress').slideDown();
			}
	});
});

function knappeKlargjøring(){
	$('.indikator').live("click",function(){
		var $headerHeight = $(".header").height();
		var $id = $(this).attr("id");
		$(window).scrollTo("." + $id, 300, {offset: -$headerHeight});
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
		$("#indikatorWrapper").append("<div id='" + i + "'class='indikator " + prosent + "'></div>");
		var cssProsent = prosent + "%";
		$("." + prosent + "").css({left: cssProsent });
	};
}