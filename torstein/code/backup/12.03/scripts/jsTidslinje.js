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
                        "media_data":"http://aftenposten.no/embed?id=7127472&width=445&height=280"
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
    "content_date": "2013-01-15",
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
var map;
var maparray = [];
var markerarray = [];

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

	$headerHeight = $tlHeader.height();
	$tlHeaderWrapper.height($headerHeight + 25);
	$ingressHeight =  $tlHeaderIngress.height();
	
	//Foreløpig løsning for reponsivt design: Fixed-div 100%.
	var $headerWidth = $tlWrapper.width();
	$tlHeaderWrapper.width($headerWidth);

	
	resizeListener();
	scrollListener();

    //hentJSONTekst();
	hentDataPrototype();
	initButtons();
    makeBottomSpace();      //Makes some space on the bottom of timeline, so you can scroll to the last event */
	initSliders();
	initMaps();

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
  
$("a.grouped_elements").fancybox({
        'openEffect'    :   'elastic',
        'closeEffect' :   'elastic',
        'openSpeed'       :   300, 
        'closeSpeed'      :   300, 
        'nextEffect ':  'easeOutCubic',
        'overlayShow'   :   false});

});


function initMaps(){

	if (kart){	

		//Function for IE8, gets all nodes with specific classname within node. 
		//Copied from: http://stackoverflow.com/questions/7410949/javascript-document-getelementsbyclassname-compatibility-with-ie	
		function getElementsByClassName(node, classname) {
		    var a = [];
		    var re = new RegExp('(^| )'+classname+'( |$)');
		    var els = node.getElementsByTagName("*");
		    for(var i=0,j=els.length; i<j; i++)
		        if(re.test(els[i].className))a.push(els[i]);
		    return a;
		}

		maps = getElementsByClassName(document.body,'nu-timeline-map'); //Finding all classes with the specific classname, and puts 'em in array.
		
		for (var i = 0; i < maps.length; i++){
			
			var longitude = maps[i].getAttribute("data-map-longitude");
			var latitude = maps[i].getAttribute("data-map-latitude");
			var mapzoom = maps[i].getAttribute("data-map-zoom");
			var myLatlng = new google.maps.LatLng(longitude,latitude); //Possibly wrong order of latlng/lnglat

			maparray[i] = new google.maps.Map(maps[i], {		//Makes this map
			    zoom: parseInt(mapzoom),						//Zoom-level(author decides)
		      	center: myLatlng,								//Centers the map		
		     	mapTypeId: google.maps.MapTypeId.ROADMAP,		//Maybe make this custom from CMS
		     	scrollwheel: false								//Disabled scrollwheel for UX, avoiding the hoverscroll on map when document-scroll.
		    });

		    markerarray[i] = new google.maps.Marker({			//Adds a marker
		        position: myLatlng,
		        map: maparray[i]
		    });

		  
	    }//END-for
	}//END-if
}//END-func(renderMaps)
	
function hentDataPrototype(){
	
	$('.nu-timeline-hendelse-wrapper')
		.html("<img id='nu-timeline-loading' src='gfx/loading2.gif' alt='Laster tidslinje...' />"); //Sets a loading gif until timeline is appended
	
	var prototypeUrl = jsonPrototype; //Replace with real url
		
	var htmlTxt = "";		//This string will contain all the html to be rendered
	var datoArray = []; 	//This array will contain all the dates of the timeline
	var mapTeller = 0; 		//This int will count the number of maps to be shown in the timeline
	

	var url = 'http://www.svendsen-it.no/hovedprosjekt/htdocs/fetchToJson.php?id=1'; //The url to json
   
    $.support.cors = true;	//IE8 fix

    $.ajaxSetup({
        async: false
        /* cache:false MAYBE LATER? */
    });

	$.getJSON(url, function(jsonData){

		$.each(jsonPrototype, function(i,item){

			var content_id = item.content_ID;
			var table_id = item.tl_ID;
			var title = item.content_title;
			var time = item.content_time;
			var date = item.content_date;
			var content = item.content_content;
			var category = item.content_category;
			var mediaboolean = item.content_media;			//Does this item contain any media?
			var mediacontent = item.content_media_table;	//An array of all the media

            var mediaString = "";	//This string will contain ALL the html for the timeline's MEDIA.

            if (mediaboolean == "true"){

                var movieString = "";		//HTML-string for movieclip			
                var pictureString = "";		//HTML-string for pictures
                var mapString = "";			//HTML-string for map
                var firstPic = true;		//Since there can be multiple pics in a slider we need this to be true later.
                var boolPicture = false;	//*
                var boolVideo = false;		// We dont't know what kind of media is to come. So we expect there to be none so far. 
                var boolMap = false;		//*

                mediaString = "<div class='nu-timeline-hendelse-media'>";	//Adds a mediawrapper

                var tabString = "<ul class='nav nav-tabs'>";			 	//Since we have the different types of media in tabs, this will wrap the different navigation-tabs with ul.

                var tabContentWrapper = "<div class='tab-content'>";		//This string will wrap the media-content in the difference tabs.

               

                $.each(mediacontent, function(y,mediaitem){

                    if(mediaitem.media_type == "picture"){
                        boolPicture = true;		//We now know there is a picture
                        if(firstPic){                           
                            pictureString += "<div class='tab-pane' id='BildeTab-" + content_id + "'>";		//Creates the content-div of picture-tab
                            pictureString += "<div id='miniSlider' class='sliderWrapper'><div id='nu-timeline-slider-id-" + content_id + "' class='nu-timeline-slider'>"; //Creates divs for sliderwrapper and slider. Gives the slider an ID so we can hook later.
                            pictureString += "<ul class='nu-timeline-slides'>";		//Creates a ul that will contain all the pictures.
                            pictureString += "<li class='active'><div class='sliderContentWrapper'><img src='" + mediaitem.media_data + "' alt='"+ mediaitem.media_text +"' />"//Puts the picture to the list, and a wrapper that wraps the picture and text.
                            pictureString += "<div class='nu-timeline-slider-tekst'><p>"+ mediaitem.media_text + "</p></div></div></li>"; //Adds the text, and closes the tags so we are ready for next item.
						    firstPic = false;	//The first picture has now past. 
                        }else {                            
                            pictureString += "<li><div class='sliderContentWrapper'><img src='" + mediaitem.media_data + "' alt='"+ mediaitem.media_text  +"' />";
                            pictureString += "<div class='nu-timeline-slider-tekst'><p>"+ mediaitem.media_text + "</p></div></div></li>";	
                        }//END if
                    }                  
                    else if(mediaitem.media_type == "map"){
                        boolMap = true;		//We now know there is a map
                        kart = true;		//The map needs to render after DOM is ready, so this will happen if true later.
                        var data_splitted = mediaitem.media_data.split(",");	//Splits the mediaitemdata, the prefix is 3 values separeted with "," in this order: long,lat,zoom-level. 
                        mapString += "<div class='tab-pane ' id='KartTab-" + content_id + "'>";
						mapString += "<div class='nu-timeline-map' data-map-number='"+content_id+"' data-map-longitude='"+data_splitted[0]+"' data-map-latitude='"+data_splitted[1]+"' data-map-zoom='"+data_splitted[2]+"'></div>";
                        
                    }
                    else if(mediaitem.media_type == "video"){
                        boolVideo = true;	//We now know there is a video.
                        movieString = "<div class='tab-pane' id='FilmTab-" + content_id + "'><div id='embedPlayerHere'></div><script type='text/javascript' src='" + mediaitem.media_data + "'></script></div>"; 
                         
                    }//END if
                });
                
                if(boolMap){ 		 //If there is a map, create the map-tab                   	           
                    tabString += "<li class='pushTabsRight testeklasse'><a id='mapTab' href='#KartTab-" + content_id + "' tab-for-map='"+mapTeller+"'>Kart</a></li>";
                    mapString += "</div>"
                    mapTeller++;   
                }
                if(boolPicture){	//If there is pictures, create the picture-tab
                    tabString += "<li class='pushTabsRight'><a href='#BildeTab-"+ content_id +"'>Bilder</a></li>";
                    pictureString += "</ul></div>";
                    pictureString += "<a class='nu-timeline-slider-control left'  data-slide='prev'></a><a class='nu-timeline-slider-control right' data-slide='next'></a>";
                    pictureString += "<div class='nu-timeline-slider-fullscreen-btn'></div>";
                    pictureString += "</div></div>";
                 
                }
                if(boolVideo){		//If there is a video, create the videotab.
                    tabString += "<li class='pushTabsRight'><a href='#FilmTab-" + content_id + "'>Videosnutt</a></li>";
                 
                }
              
                tabContentWrapper += mapString;			//Appends the tab-content with map
                tabContentWrapper += pictureString;		//Appends the tab-content with picture
                tabContentWrapper += movieString;		//Appends the tab-content with movie 
                tabContentWrapper += "</div>";			//Closes the tab-content div.

                mediaString += tabString + "</ul>";				//Appends the tab-navigation to the main mediaString.
                mediaString += tabContentWrapper + "</div>";	//Appends the tab-content to the main mediaString and closes the whole mediaWrapper.	
                             
            }//END if(MEDIA=TRUE)
			
			var date_splittet_opp = date.split("-");
			var nytt_format_dato = "";
			
			//Må forandre formatet "mm-dd-yyyy" til "mm/dd/yyyy" for at IE8 skal godta syntaxen til et nytt Dateobjekt.
			for (var i = 0; i < date_splittet_opp.length; i++) {
				if(i == date_splittet_opp.length-1){
					
					nytt_format_dato += date_splittet_opp[i];
					break;
				}		
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
			htmlTxt += 	    	"<div class='nu-timeline-hendelse-story'>" + wrapTxt(title,"h2");
            htmlTxt +=          wrapTxt(content, "p");
			htmlTxt += "</div></div></div>";
			
		});
		
		$('.nu-timeline-hendelse-wrapper').html("<div id='fullscreenSlider'></div>" + htmlTxt); //Skriver ut strengen htmlTxt.
		leggTilIndikatorer(datoArray); //Funksjon med array som parameter.

	});
	
}//END func(hentDataPrototype)

    
 function initSliders(){

 		var $sliderWidth = $('.nu-timeline-hendelse-media').width();		//Finds the width of the media 	
		$('.tab-content .nu-timeline-slides li').width($sliderWidth);	//Gives li(sliderelements) the width of media
	
		//The snippet below is for coin-navigation
		/*$('ol.nu-timeline-slider-indikatorer li').click(function(){
			var whatSlider = $(this).attr('data-target');
			var slideToThis = $(this).attr("data-slide-to");		
			var newPosition = $(whatSlider + ' .nu-timeline-slides li').eq(slideToThis).position().left;
			//alert(-newPosition + " " + slideToThis);
			$(whatSlider + ' .nu-timeline-slides').animate({
				                    marginLeft: -($sliderWidth * slideToThis)
				             }, 200);
			
			$(whatSlider + ' ol.nu-timeline-slider-indikatorer li').eq(slideToThis).addClass('active').siblings().removeClass('active');
			$(whatSlider + ' ul.nu-timeline-slides li').eq(slideToThis).addClass('active').siblings().removeClass('active');

		});*/

		$('#miniSlider a.nu-timeline-slider-control').click(function(){
		
			var whatSlider = "#" + $(this).siblings('.nu-timeline-slider').attr("id");		//What slider to control
			var whatWay = $(this).attr('data-slide');										//Which direction should we slide
			var activeSlide = $(whatSlider + ' ul.nu-timeline-slides li.active').index();	//What slide is currently in view
			var lastSlide = $(whatSlider + ' ul.nu-timeline-slides li').last().index(); 	//What index the last slide have

			switch (whatWay){
				case "prev": 
							if(activeSlide == 0){	//If you click prev, and current active slide is the first. We want to go to the last picture of the slide.
								activeSlide = lastSlide;
							}else{					//If not we go to previous slide.
								activeSlide-=1;		
							}
							$(whatSlider + ' .nu-timeline-slides').animate({
				                    marginLeft: -($sliderWidth * activeSlide)
				             }, 'slow', 'easeOutCubic');

							//$(whatSlider + ' ol.nu-timeline-slider-indikatorer li').eq(activeSlide).addClass('active').siblings().removeClass('active');
							$(whatSlider + ' ul.nu-timeline-slides li').eq(activeSlide).addClass('active').siblings().removeClass('active');
							
							break;

				case "next": 
							if(activeSlide == lastSlide){ //If youre at last slide and clicks next, we want to go to the first slide again.
								activeSlide = 0;
							}else{						  //If not we go to next slide
								activeSlide+=1;
							}
							
							$(whatSlider + ' .nu-timeline-slides').animate({
				                    marginLeft: -($sliderWidth * activeSlide)
				             }, 'slow','easeOutCubic');
							
							//$(whatSlider + ' ol.nu-timeline-slider-indikatorer li').eq(activeSlide).addClass('active').siblings().removeClass('active');
							$(whatSlider + ' ul.nu-timeline-slides li').eq(activeSlide).addClass('active').siblings().removeClass('active');

							break;
				default: 
							break;
			}
		
		});

		$('#miniSlider .nu-timeline-slider-fullscreen-btn').click(function(){
			var sliderHtml = $(this).siblings('div').html();		//Copies the entire slider-div and put it in the #fullscreenslider div.
			
			$('#fullscreenSlider').html(sliderHtml +
										 "<a id='fullscreen-left-nav' class='fullscreen-nav nu-timeline-slider-control left'  data-slide='prev'></a>" + 
										 "<a class='fullscreen-nav nu-timeline-slider-control right' data-slide='next'></a>");
			
			$windowWidth = $(window).width();	//Width of the entire window			
			var activeSlide = $('#fullscreenSlider ul.nu-timeline-slides li.active').index(); //The active li-slide.	

 			$('#fullscreenSlider .nu-timeline-slides li').width($windowWidth);
 			$('#fullscreenSlider .nu-timeline-slides').css('margin-left',-$windowWidth * activeSlide);

			$('#fullscreenSlider').fadeIn();
		});


		
		$('#fullscreenSlider').click(function(e){ 
			var clickedClasses = e.target.className.split(" "); //The classes of the element clicked(May be the next/prev buttons)

			var $sliderWidth = $('#fullscreenSlider ul.nu-timeline-slides li.active').width();
			var activeSlide =  $('#fullscreenSlider ul.nu-timeline-slides li.active').index();	
			var lastSlide = $('#fullscreenSlider ul.nu-timeline-slides li').last().index();

			//Loops through the classes
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
			$('#fullscreenSlider').fadeOut();
		});

 }

function resizeListener() {
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

function scrollListener() {
    
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

            $('#nu-timeline-ingress').slideUp(300,'easeOutCubic',function() {
                $boolIngress = false;
            });

        } else {

            $tlHeader.css("position","relative");
            $('#nu-timeline-ingress').slideDown(300,'easeOutCubic', function() {
                $headerHeight = $tlHeader.height();
                $tlHeaderWrapper.height($headerHeight);
                $boolIngress = true;
                
          });
        }

    });
}//END func(scrollListener)

function initButtons(){
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