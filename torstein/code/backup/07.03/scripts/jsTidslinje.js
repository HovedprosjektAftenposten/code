var jsonPrototype = [
  {
    "content_ID": "5",
    "tl_ID": "1",
    "content_time": "17:21:00",
    "content_date": "2012-12-23",
    "content_title": "Gruppe 21 er awesome",
    "content_content": "Donizzle shiznit auctizzle shiz. Phasellizzle funky fresh elit ut nibh pretium tincidunt. Uhuh ... yih! a erat. Vestibulizzle izzle uhuh ... yih! sed maurizzle i saw beyonces tizzles and my pizzle went crizzle tristique. Mah nizzle izzle phat sizzle amet eros shizznit porta. Yippiyo velizzle tortor, ultricizzle shiznit, hendrerizzle bow wow wow, adipiscing quis, hizzle. Shit velizzle sizzle, aliquam dang, pharetra dizzle, dictizzle bow wow wow, turpizzle. Donizzle shiznit auctizzle shiz. Phasellizzle funky fresh elit ut nibh pretium tincidunt. Uhuh ... yih! a erat. Vestibulizzle izzle uhuh ... yih! sed maurizzle i saw beyonces tizzles and my pizzle went crizzle tristique. Mah nizzle izzle phat sizzle amet eros shizznit porta. Yippiyo velizzle tortor, ultricizzle shiznit, hendrerizzle bow wow wow, adipiscing quis, hizzle. Shit velizzle sizzle, aliquam dang, pharetra dizzle, dictizzle bow wow wow, turpizzle.",
    "content_category": "test",
    "content_media": "true",
    "content_media_table":[{  
                        "media_type":"picture",
                        "media_text":"Donizzle shiznit auctizzle shiz. Phasellizzle funky fresh elit ut nibh pretium tincidunt. Uhuh ... yih!",
                        "media_data":"http://news.bbcimg.co.uk/media/images/63166000/jpg/_63166844_img004f.jpg"
                     },{
                        "media_type":"picture",
                        "media_text":"Bla2 bla2 bla2",
                        "media_data":"http:\/\/whateverblog.dallasnews.com\/files\/2012\/12\/Grumpy-Cat-MEME-01.jpg"
                     },{
                        "media_type":"map",
                        "media_text":"Great map",
                        "media_data":"59.91182,10.73427,16"
                     },{
                        "media_type":"video",
                        "media_text":"Great video",
                        "media_data":"data"
                     }]
  
   },{
    "content_ID": "6",
    "tl_ID": "1",
    "content_time": "17:21:00",
    "content_date": "2012-12-26",
    "content_title": "Gruppe 21 er awesome",
    "content_content": "Donizzle shiznit auctizzle shiz. Phasellizzle funky fresh elit ut nibh pretium tincidunt. Uhuh ... yih! a erat. Vestibulizzle izzle uhuh ... yih! sed maurizzle i saw beyonces tizzles and my pizzle went crizzle tristique. Mah nizzle izzle phat sizzle amet eros shizznit porta. Yippiyo velizzle tortor, ultricizzle shiznit, hendrerizzle bow wow wow, adipiscing quis, hizzle. Shit velizzle sizzle, aliquam dang, pharetra dizzle, dictizzle bow wow wow, turpizzle.",
    "content_category": "test",
    "content_media": "true",
    "content_media_table":[{  
                        "media_type":"picture",
                        "media_text":"Donizzle shiznit auctizzle shiz. Phasellizzle funky fresh elit ut nibh pretium tincidunt. Uhuh ... yih!",
                        "media_data":"http:\/\/www.acuteaday.com\/blog\/wp-content\/uploads\/2011\/09\/epic-horse-running.jpg"
                     },{
                        "media_type":"picture",
                        "media_text":"Bla2 bla2 bla2",
                        "media_data":"http:\/\/whateverblog.dallasnews.com\/files\/2012\/12\/Grumpy-Cat-MEME-01.jpg"
                     },{
                        "media_type":"map",
                        "media_text":"Great map",
                        "media_data":"39.69996,126.03771,16"
                     },{
                        "media_type":"picture",
                        "media_text":"Great video",
                        "media_data":"http://www.9ori.com/store/media/images/8ab579a656.jpg"
                     }]
  
   },{
    "content_ID": "7",
    "tl_ID": "1",
    "content_time": "17:21:00",
    "content_date": "2012-12-29",
    "content_title": "Kort hendelse",
    "content_content": "Donizzle shiznit auctizzle shiz. Phasellizzle funky fresh elit ut nibh pretium tincidunt. ",
    "content_category": "test",
    "content_media": "false",
    "content_media_table":[{
                     }]
  
   }];


//Script start

// Variablene under brukes gjentatte ganger i scritpet.

var fokusHendelse = 0;		//Representerer indexen av hendelsen leseren leser
var $headerHeight = 0;		//Headeren har dynamisk høyde, og vi trenger høyden flere ganger for å scrolle riktig ved event.
var $ingressHeight = 0;		//Brukes for å finne ut høyden på header uten ingress-tekst.
var $boolIngress = true;	//True = Ingressteksten er synlig.
var kart = false; 			//Er det et kart i tidslinjen? 

//Array for å få norske månedsnavn
var norwegian_month=new Array();
	norwegian_month[0]="januar";
	norwegian_month[1]="februar";
	norwegian_month[2]="mars";
	norwegian_month[3]="april";
	norwegian_month[4]="mai";
	norwegian_month[5]="juni";
	norwegian_month[6]="juli";
	norwegian_month[7]="august";
	norwegian_month[8]="september";
	norwegian_month[9]="oktober";
	norwegian_month[10]="november";
	norwegian_month[11]="desember";


//jQuery selectors som brukes gjentatte ganger.
var $tlWrapper = $(".nu-timeline-wrapper");
var $tlHeader = $("#nu-timeline-header");
var $tlHeaderWrapper = $('.nu-timeline-header-wrapper');
var $tlHeaderIngress = $('#nu-timeline-ingress');
var $tlHendelse = $('.nu-timeline-hendelse');



$(document).ready(function (){

	$.easing.def = "easeOutCubic";

	$headerHeight = $tlHeader.height();
	$tlHeaderWrapper.height($headerHeight + 25);
	$ingressHeight =  $tlHeaderIngress.height();
	
	//Foreløpig løsning for reponsivt design: Fixed-div 100%.
	var $headerWidth = $tlWrapper.width();
	$tlHeaderWrapper.width($headerWidth);

	
	windowResizeListener();
	scrolleLytter();
    //hentJSONTekst();
	hentDataPrototype();
	knappeKlargjøring();
    makeBottomSpace();      //Makes some space on the bottom of timeline, so you can scroll to the last event */
	startSliders();

	var map;
	var maparray = [];
	var markerarray = [];
	if (kart){	

				
						//Funksjon for IE8, for more visit: 
						//http://stackoverflow.com/questions/7410949/javascript-document-getelementsbyclassname-compatibility-with-ie
					
						function getElementsByClassName(node, classname) {
						    var a = [];
						    var re = new RegExp('(^| )'+classname+'( |$)');
						    var els = node.getElementsByTagName("*");
						    for(var i=0,j=els.length; i<j; i++)
						        if(re.test(els[i].className))a.push(els[i]);
						    return a;
						}//*FOR IE8

						maps = getElementsByClassName(document.body,'nu-timeline-map');
						
					
						for (var i = 0; i < maps.length; i++){
							
							var longitude = maps[i].getAttribute("data-map-longitude");
							var latitude = maps[i].getAttribute("data-map-latitude");
							var mapzoom = maps[i].getAttribute("data-map-zoom");
							//alert(hey);
							var myLatlng = new google.maps.LatLng(longitude,latitude); //Muligens feil rekkefølge her.. FIX IT!

							maparray[i] = new google.maps.Map(maps[i], {
							    zoom: parseInt(mapzoom),
						      center: myLatlng,
						      mapTypeId: google.maps.MapTypeId.ROADMAP,
						      scrollwheel: false
						    });

						    markerarray[i] = new google.maps.Marker({
						        position: myLatlng,
						        map: maparray[i]
						    });

						  
					    }

		}

     $('.nav-tabs a').click(function (e) {
          e.preventDefault();
          $(this).tab('show');

          //If the tab contains a map, we have to resize this map since it has been hidden.
          if ($(this).attr('id') == "mapTab"){
       		mapnumber = $(this).attr('tab-for-map');       				//Finding what map to resize
       	  	google.maps.event.trigger(maparray[mapnumber], 'resize');	//Resizing the map
       	  	maparray[mapnumber].setCenter(markerarray[mapnumber].getPosition());  		//Centers the map
       	 
       	  }
       	 
       	 
       	
     });

	//$("img.lazy").lazyload(); Måtte kommentere ut pga scrollingen fikk feil offset når bilder var inaktive.

    //Sets the most left tab active and the content that belongs(within media div of each timeline-item)
   $('.tab-content div:last-child, .nav-tabs li:last-child').addClass('active');
  
});




	
function hentDataPrototype(){
	//Loading-gif før data blir skrevet ut til .hendelseWrapper.
	$('.nu-timeline-hendelse-wrapper').html("<img id='nu-timeline-loading' src='gfx/loading2.gif' alt='Laster tidslinje...' />");
	
	var prototypeUrl = jsonPrototype;
		
		var htmlTxt = ""; //Gjør klar streng som skal inneholde HTML-text.
		var datoArray = []; //Gjør klar array som skal samle på datoene.
		var mapTeller = 0; //Teller antall maps
		
		$.each(jsonPrototype, function(i,item){
			var content_id = item.content_ID;
			var table_id = item.tl_ID;
			var title = item.content_title;
			var time = item.content_time;
			var date = item.content_date;
			var content = item.content_content;
			var category = item.content_category;

			var mediaboolean = item.content_media;
			var mediacontent = item.content_media_table;

            var mediaString = "";

            if (mediaboolean == "true"){

                var movieString = "";
                var pictureString = "";
                var mapString = "";
                var firstPic = true;

                var boolPicture = false;
                var boolVideo = false;
                var boolMap = false;

                mediaString = "<div class='nu-timeline-hendelse-media'>";

                var tabString = "<ul class='nav nav-tabs'>";

                var tabContentWrapper = "<div class='tab-content'>";

                var teller = 0;

                $.each(mediacontent, function(y,mediaitem){

                    if(mediaitem.media_type == "picture"){
                        boolPicture = true;
                        if(firstPic){                           
                            pictureString += "<div class='tab-pane' id='BildeTab-" + content_id + "'>";
                            pictureString += "<div id='miniSlider' class='sliderWrapper'><div id='nu-timeline-slider-id-" + content_id + "' class='nu-timeline-slider'>";
                            pictureString += "<ul class='nu-timeline-slides'>";

                            pictureString += "<li class='active'><div class='sliderContentWrapper'><img src='" + mediaitem.media_data + "' alt='"+ mediaitem.media_text +"' /><div class='nu-timeline-slider-tekst'><p>"+ mediaitem.media_text + "</p></div></div></li>"
						    firstPic = false;
                        }else {                            
                            pictureString += "<li><div class='sliderContentWrapper'><img src='" + mediaitem.media_data + "' alt='"+ mediaitem.media_text  +"' /><div class='nu-timeline-slider-tekst'><p>"+ mediaitem.media_text + "</p></div></div></li>";	
                        }
                        teller++;
           
                    }
                    else if(mediaitem.media_type == "map"){
                        boolMap = true;
                        kart = true;
                        var data_splitted = mediaitem.media_data.split(",");
                        mapString += "<div class='tab-pane ' id='KartTab-" + content_id + "'>";
						mapString += "<div class='nu-timeline-map' data-map-number='"+content_id+"' data-map-longitude='"+data_splitted[0]+"' data-map-latitude='"+data_splitted[1]+"' data-map-zoom='"+data_splitted[2]+"'></div>";
                        
                    }
                    else if(mediaitem.media_type == "video"){
                        boolVideo = true;
                        movieString = "<div class='tab-pane' id='FilmTab-" + content_id + "'><p>" + mediaitem.media_data + "</p>";
                         
                    }
                });
                
                if(boolMap){     
                	           
                    tabString += "<li class='pushTabsRight testeklasse'><a id='mapTab' href='#KartTab-" + content_id + "' tab-for-map='"+mapTeller+"'>Kart</a></li>";
                    mapString += "</div>"
                    mapTeller++;   
                }
                if(boolPicture){
                    tabString += "<li class='pushTabsRight'><a href='#BildeTab-"+ content_id +"'>Bilder</a></li>";
                    pictureString += "</ul></div>";
                    pictureString += "<a class='nu-timeline-slider-control left'  data-slide='prev'></a><a class='nu-timeline-slider-control right' data-slide='next'></a>";
                    pictureString += "<div class='nu-timeline-slider-fullscreen-btn'></div>";
                    pictureString += "</div></div>";
                 
                }
                if(boolVideo){
                    tabString += "<li class='pushTabsRight'><a href='#FilmTab-" + content_id + "'>Videosnutt</a></li>";
                    movieString += "</div>";
                }
                /*$('.tab-content > div:first').addClass('active');
              
                $('#myTab > li:first').children('li:first').addClass('active');*/
                tabContentWrapper += mapString;
                tabContentWrapper += pictureString;
                tabContentWrapper += movieString;
                tabContentWrapper += "</div>";

                mediaString += tabString + "</ul>";
                mediaString += tabContentWrapper + "</div>";
              
                	/*var sliderTeller = 0; 

function printMedia(mediatype, mediacontent){
	
	var mediaHtml = "";
	
	switch (mediatype)
	{
		case "pictures": 

						mediaHtml += "<div class='nu-timeline-hendelse-media'><div class='sliderWrapper'><div id='nu-timeline-slider-id-" + sliderTeller + "' class='nu-timeline-slider' >";
						

						//The indicators(coins)
						mediaHtml += "<ol class='nu-timeline-slider-indikatorer'>"
						var indikatorTeller = 0;
						for (var i = 0; i < mediacontent.length; i++){
							if(i == 0){
								mediaHtml += "<li data-target='#nu-timeline-slider-id-" + sliderTeller + "' data-slide-to='"+ indikatorTeller + "' class='active'> </li>";	
							}else{
								mediaHtml += "<li data-target='#nu-timeline-slider-id-" + sliderTeller + "' data-slide-to='"+ indikatorTeller + "'> </li>";	
							}
							indikatorTeller++;
						}
						mediaHtml += "</ol>";


						//The content of slideshow
						mediaHtml += "<ul class='nu-timeline-slides'>";
						for (var i = 0; i < mediacontent.length; i++){
							if(i == 0){
								mediaHtml += "<li class='active'><img src='" + mediacontent[i].data + "' alt='"+ mediacontent[i].title +"' /><p>"+ mediacontent[i].text + "</p></li>";	
							}else{
								mediaHtml += "<li><img src='" + mediacontent[i].data + "' alt='"+ mediacontent[i].title +"' /><p>"+ mediacontent[i].text + "</p></li>";	
							}
						}
						mediaHtml += "</ul>";

						//The prev/next buttons 
						


						//closing-tags for zhe parentz.
						mediaHtml += "</div>";
						mediaHtml += "<a class='nu-timeline-slider-control left'  data-slide='prev'></a>";
  						mediaHtml += "<a class='nu-timeline-slider-control right' data-slide='next'></a>";
						mediaHtml += "</div></div>";

						sliderTeller++;

						return mediaHtml;
					
		case "map": 
						kart= true;
						mediaHtml += "<div class='nu-timeline-hendelse-media'>";

						for (var i = 0; i < mediacontent.length; i++){
							var data_splitted = mediacontent[i].data.split(",");
							mediaHtml += "<div class='nu-timeline-map' data-map-longitude='"+data_splitted[0]+"' data-map-latitude='"+data_splitted[1]+"' data-map-zoom='"+data_splitted[2]+"'></div>";
						

						}
						mediaHtml += "</div>";

					


					
						//var mediacontent_splitted = mediacontent.data.split(",");
						
						


					    return mediaHtml;

		case "video": 
						mediaHtml += "<div class='nu-timeline-hendelse-media'><div id='embedPlayerHere'></div><script type='text/javascript' src='http://aftenposten.no/embed?id=7127472&width=480&height=270'></script></div>";
						return mediaHtml;
							break;
		
			default:   


							return "";


	}
}*/

               
            }
			//var mediaHtml = printMedia(mediatype, mediacontent);


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
			
			htmlTxt += "<div class='nu-timeline-hendelse " + datoFormatert + "'>";
			htmlTxt += 		"<div class='nu-timeline-hendelse-tid'>";
			htmlTxt += 			"<h2>" + hendelseDato.getDate().toString() + ". " + norwegian_month[hendelseDato.getMonth()] + " " + hendelseDato.getFullYear().toString() + "</h2>";
			htmlTxt += 		"</div>"
			htmlTxt += 		"<div class='nu-timeline-hendelse-innhold'>"
			htmlTxt += 			mediaString;
			htmlTxt += 	    	"<div class='nu-timeline-hendelse-story'><h2>" + title + "</h2>";
			htmlTxt +=			"";
            htmlTxt +=          wrapTxt(content, "p");
			htmlTxt += "</div></div></div>";
			
		});
		
		$('.nu-timeline-hendelse-wrapper').html("<div id='fullscreenSlider'></div>" + htmlTxt); //Skriver ut strengen htmlTxt.
		
		

		leggTilIndikatorer(datoArray); //Funksjon med array som parameter.


	
}
    
 function startSliders(){

 		$sliderWidth = $('.nu-timeline-hendelse-media').width();
 	
		$('.tab-content .nu-timeline-slides li').width($sliderWidth);

		
	
		$('ol.nu-timeline-slider-indikatorer li').click(function(){
			var whatSlider = $(this).attr('data-target');
			var slideToThis = $(this).attr("data-slide-to");		
			var newPosition = $(whatSlider + ' .nu-timeline-slides li').eq(slideToThis).position().left;
			//alert(-newPosition + " " + slideToThis);
			$(whatSlider + ' .nu-timeline-slides').animate({
				                    marginLeft: -($sliderWidth * slideToThis)
				             }, 200);
			
			$(whatSlider + ' ol.nu-timeline-slider-indikatorer li').eq(slideToThis).addClass('active').siblings().removeClass('active');
			$(whatSlider + ' ul.nu-timeline-slides li').eq(slideToThis).addClass('active').siblings().removeClass('active');

		});

		$('#miniSlider a.nu-timeline-slider-control').click(function(){
		
			var whatSlider = "#" + $(this).siblings('.nu-timeline-slider').attr("id");
			var whatWay = $(this).attr('data-slide');
			var activeSlide = $(whatSlider + ' ul.nu-timeline-slides li.active').index();	

			switch (whatWay){
				case "prev": 
							if(activeSlide == 0){
								activeSlide = $(whatSlider + ' ul.nu-timeline-slides li').last().index();
							}else{
								activeSlide-=1;
							}
							$(whatSlider + ' .nu-timeline-slides').animate({
				                    marginLeft: -($sliderWidth * activeSlide)
				             }, 'slow', 'easeOutCubic');

							$(whatSlider + ' ol.nu-timeline-slider-indikatorer li').eq(activeSlide).addClass('active').siblings().removeClass('active');
							$(whatSlider + ' ul.nu-timeline-slides li').eq(activeSlide).addClass('active').siblings().removeClass('active');
							
							break;

				case "next": 
							if(activeSlide == $(whatSlider + ' ul.nu-timeline-slides li').last().index()){
								activeSlide = 0;
							}else{
								activeSlide+=1;
							}
							
							$(whatSlider + ' .nu-timeline-slides').animate({
				                    marginLeft: -($sliderWidth * activeSlide)
				             }, 'slow','easeOutCubic');
							
							$(whatSlider + ' ol.nu-timeline-slider-indikatorer li').eq(activeSlide).addClass('active').siblings().removeClass('active');
							$(whatSlider + ' ul.nu-timeline-slides li').eq(activeSlide).addClass('active').siblings().removeClass('active');

							break;
				default: 
							break;
			}
		
		});

		$('.nu-timeline-slider-fullscreen-btn').click(function(){
			var sliderHtml = $(this).siblings('div').html();		//Copies the entire slider-div and put it in the #fullscreenslider div.
			
			
			$('#fullscreenSlider').html(sliderHtml + "<a id='fullscreen-left-nav' class='fullscreen-nav nu-timeline-slider-control left'  data-slide='prev'></a><a class='fullscreen-nav nu-timeline-slider-control right' data-slide='next'></a>");
			$windowWidth = $(window).width();

			var whatSlider = "#" + $(this).siblings('.nu-timeline-slider').attr("id");
			//var whatWay = $(this).attr('data-slide');
			var activeSlide = $('#fullscreenSlider ul.nu-timeline-slides li.active').index();	


 			$('#fullscreenSlider .nu-timeline-slides li').width($windowWidth);
 			$('#fullscreenSlider .nu-timeline-slides').css('margin-left',-$windowWidth * activeSlide);

			$('#fullscreenSlider').show();
		});


		
		$('#fullscreenSlider').click(function(e){
			var clickedClasses = e.target.className.split(" ");

			//var whatSlider = "#" + $(this).siblings('.nu-timeline-slider').attr("id");
			//var whatWay = $(this).attr('data-slide');
			
			var $sliderWidth = $('#fullscreenSlider ul.nu-timeline-slides li.active').width();
			var activeSlide =  $('#fullscreenSlider ul.nu-timeline-slides li.active').index();	
			var lastSlide = $('#fullscreenSlider ul.nu-timeline-slides li').last().index();

			for (var i = 0; i < clickedClasses.length; i++){
				if (clickedClasses[i] == 'left'){
					
					
					
					if(activeSlide == 0){
						activeSlide = lastSlide;
					}else{
						activeSlide-=1;
					}
					$('#fullscreenSlider .nu-timeline-slides').animate({
		                    marginLeft: -($sliderWidth * activeSlide)
		             }, 'slow', 'easeOutCubic');

					//$('#fullscreenSlider ol.nu-timeline-slider-indikatorer li').eq(activeSlide).addClass('active').siblings().removeClass('active');
					$('#fullscreenSlider ul.nu-timeline-slides li').eq(activeSlide).addClass('active').siblings().removeClass('active');
					
					return false;


				} else if (clickedClasses[i] == 'right'){
					
					if(activeSlide == lastSlide){
					
								activeSlide = 0;
							}else{
								activeSlide+=1;
							}
							
							$('#fullscreenSlider .nu-timeline-slides').animate({
				                    marginLeft: -($sliderWidth * activeSlide)
				             }, 'slow','easeOutCubic');
							

					
					//$('#fullscreenSlider ol.nu-timeline-slider-indikatorer li').eq(activeSlide).addClass('active').siblings().removeClass('active');
					$('#fullscreenSlider ul.nu-timeline-slides li').eq(activeSlide).addClass('active').siblings().removeClass('active');
					return false;
				}

			

			}
			$('#fullscreenSlider').hide();
		});

 }

































function windowResizeListener() {
    $(window).resize(function (){
            //Foreløpig løsning for reponsivt design: Fixed-div 100%.
            var $desiredHeaderWidth = $tlWrapper.width();
            $tlHeaderWrapper.width($desiredHeaderWidth);
            $tlHeader.width($desiredHeaderWidth);
            
            //Høyden på header
            //Sørger for at .headerWrapper får en fast høyde, 
            //slik at contentdivisjoner under flyter under stickyheader.
            $headerHeight = $tlHeader.height();
            $tlHeaderWrapper.height($headerHeight);
            
    });
}

function makeBottomSpace() {
    var $windowHeight = $(window).height();
    var lastHendelse = $('.nu-timeline-hendelse:last').height();
    $('.nu-timeline-bottom-pusher').height($windowHeight - lastHendelse); 
}

function scrolleLytter() {
    
    //Lytter til scrollehjulet, og tar vekk ingresstekst om man scroller nedover. + visa versa
    $(window).scroll(function () {
        var $tlHendelse = $('.nu-timeline-hendelse');
        //var $timelineTop = $('.header').position().top; // Brukes ikke?
        $headerHeight = $tlHeader.height();
         //Med Waypoint(jquery plugin), ser koden hvilken hendelse som er i viewport og markerer tilsvarende indikator.    
        $tlHendelse.waypoint(function(direction) {
            fokusHendelse = $tlHendelse.index(this);  
              
            $(".nu-timeline-indikator").eq(fokusHendelse).addClass("nu-timeline-indikator-selected").siblings().removeClass("nu-timeline-indikator-selected");
        },{
            offset: $headerHeight + 10,
            horizontal: false
        });  
            
        sjekkNav();

        var headerOffsetY = ($tlHeaderWrapper.offset().top);
        
        if ($(this).scrollTop() > headerOffsetY) {
            
            $tlHeader.css("position","fixed");

            $('#nu-timeline-ingress').slideUp(260,function() {
                $boolIngress = false;
            });

            

        } else {

            $tlHeader.css("position","relative");
            $('#nu-timeline-ingress').slideDown(260,function() {
                $headerHeight = $tlHeader.height();
                $tlHeaderWrapper.height($headerHeight);
                $boolIngress = true;
                
          });
        }

    });
}

function knappeKlargjøring(){
    //Bruker .on("click", ".ind... ) istedenfor live() som ble fjernet i jquery v1.9. 
    $(document).on("click", ".nu-timeline-indikator", function(){
        //finner ut hvilken kindikator som er trykket på, og scroller til tilsvarende hendelse
        var $id = $(this).attr("id");
        
        if ($boolIngress){
            $headerHeight = $tlHeader.height() - ($tlHeaderIngress.height());
            $(window).scrollTo("." + $id, 300, {offset: -$headerHeight});
        }else{
            $(window).scrollTo("." + $id, 300, {offset: -$headerHeight });
        }
        
    });
    
    $("#nu-timeline-prev").click(function(){
      var $tlHendelse = $('.nu-timeline-hendelse');
        if (fokusHendelse == 0){
             return false;
        }
        
        fokusHendelse--;
        $headerHeight = $tlHeader.height();
    
        //Animerer til forrige hendelse.. (Bruker animate istedenfor scrollTo pga .eq(), usikker på syntax med scrolLTo.)
        $('html, body').animate({
                    scrollTop: $tlHendelse.eq(fokusHendelse).offset().top - $headerHeight
                     }, 400, 'easeOutCubic');
        //Setter css .indikatorSelected på riktig indikator.             
        //$('.indikator').eq(fokusHendelse).addClass("indikatorSelected").siblings().removeClass("indikatorSelected");  
    });

    $("#nu-timeline-next").click(function($tlHendelse){
        //Hvis fokushendelsen er siste hendelse, skal det ikke skje noe når man trykker next.
        var $tlHendelse = $('.nu-timeline-hendelse');
        if (fokusHendelse == $tlHendelse.length - 1){
            
            return false;   
            
        }else if ($boolIngress){ // Hvis vi er på første hendelse trengs det litt ekstra scrolling pga scrolleLytter.. 
            
            $headerHeight = $tlHeader.height() - ($tlHeaderIngress.height() + 15);
            fokusHendelse++;
            
            $('html, body').animate({
                       scrollTop: $tlHendelse.eq(fokusHendelse).offset().top - $headerHeight
             }, 400, 'easeOutCubic');
             
        }else{
            $headerHeight = $tlHeader.height();
            fokusHendelse++;
            
            $('html, body').animate({
                       scrollTop: $tlHendelse.eq(fokusHendelse).offset().top - $headerHeight
             }, 400, 'easeOutCubic');
        }
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
        $("#nu-timeline-indikator-wrapper").append("<div id='" + datoFormatert + "'class='nu-timeline-indikator " + prosent + "'></div>");
        $("." + prosent + "").css({left: prosent + "%" });
    };
    
    //Setter .indikatorSeleected på første indikator.
    $('.nu-timeline-indikator:first').addClass("nu-timeline-indikator-selected"); //TRENGS VEL EGENTLIG IKKE?
}


function hentData(){
    //Loading-gif før data blir skrevet ut til .hendelseWrapper.
    $('.nu-timeline-hendelse-wrapper').html("<img id='nu-timeline-loading' src='gfx/loading2.gif' alt='Laster tidslinje...' />");
    
    var url = 'http://www.svendsen-it.no/hovedprosjekt/htdocs/testJson.php?tidslinje=1';
    var prototypeUrl = jsonPrototype;
    $.support.cors = true
    $.ajaxSetup({
        async: false
        /* cache:false MAYBE LATER? */
    });
    
    $.getJSON(prototypeUrl, function(jsonData){
        
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
            
            htmlTxt += "<div class='nu-timeline-hendelse " + datoFormatert + "'>";
            htmlTxt +=      "<div class='nu-timeline-hendelse-tid'>";
            htmlTxt +=          "<h2>" + hendelseDato.getDate().toString() + ". " + norwegian_month[hendelseDato.getMonth()] + " " + hendelseDato.getFullYear().toString() + "</h2>";
            htmlTxt +=      "</div>"
            htmlTxt +=      "<div class='nu-timeline-hendelse-innhold'>"
            htmlTxt +=          "<div class='nu-timeline-hendelse-media'><img src='"+picPath+"' alt /></div>";
            htmlTxt +=          "<div class='nu-timeline-hendelse-story'><h2>" + title + "</h2>";
            htmlTxt +=          "";
            htmlTxt +=          wrapTxt(content, "p");
            htmlTxt += "</div></div></div><div class='nu-timeline-clearFix'></div>";
            
        });
        
        $('.nu-timeline-hendelse-wrapper').html(htmlTxt); //Skriver ut strengen htmlTxt.

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
    $.getJSON('http://www.svendsen-it.no/hovedprosjekt/htdocs/fetchToJson.php?id=2', function(jsonData){
        var jsonString = JSON.stringify(jsonData);
                    
        $('.nu-timeline-hendelse-wrapper').html("<xmp>" + jsonString + "</xmp>");
    })
    .error(function(jsonStatus){
        alert(JSON.stringify(jsonStatus));
    });
}
    
function sjekkNav(){
    var $tlHendelse = $('.nu-timeline-hendelse');

     if(fokusHendelse == 0){
         $('#nu-timeline-prev').addClass('disabled');
        
    }else if(fokusHendelse == $tlHendelse.length - 1){
        $('#nu-timeline-next').addClass('disabled');
    }else {
         $('#nu-timeline-prev, #nu-timeline-next').removeClass('disabled');
      
    }   
}
// Wrap-funksjon for å forenkle konstruksjon av HTML-string fra json
function wrapTxt(text, tag){
    return "<" + tag + ">" + text + "</" + tag + ">";   
}