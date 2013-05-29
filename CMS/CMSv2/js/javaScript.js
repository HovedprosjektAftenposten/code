$(document).ready(function(){
	
	$('.nu-timeline-cms-loggUt').hover(function(){
		$('.nu-timeline-cms-loggUt').tooltip('toggle');	
	});
	$('#nu-timeline-cms-home').hover(function(){
		$('#nu-timeline-cms-home').tooltip('toggle');	
	});
	$('#nu-timeline-cms-tlCodeBtn').hover(function(){
		$('#nu-timeline-cms-tlCodeBtn').tooltip('toggle');	
	});
	
	fixSelectedBackground();
	
	$.ajaxSetup({
		async: false,
	});
	//IE8 fix
	$.support.cors = true;
	
	fixSelectedBackground(); //DEPRECIATED BY TORSTEIN ;/
	
	$('#nu-timeline-cms-tlInfo').click(function(){		
		$('.nu-timeline-cms-slide').slideToggle(100);
		$('.nu-timeline-cms-tlOpenCloseArrow').toggleClass('tlDroppedDown');
	});
	
	$('#nu-timeline-cms-contentMediaPicture').click(function(){	
		$('#nu-timeline-cms-slideContentPicture').slideToggle(100);
		$('.nu-timeline-cms-contentMediaPictureOpenCloseArrow').toggleClass('contentMediaPictureDroppedDown');
		
	});
	$('#nu-timeline-cms-contentMediaVideo').click(function(){	
		$('#nu-timeline-cms-slideContentVideo').slideToggle(100);
		$('.nu-timeline-cms-contentMediaVideoOpenCloseArrow').toggleClass('contentMediaVideoDroppedDown');
	}); 
	$('#nu-timeline-cms-contentMediaMap').click(function(){	
		$('#nu-timeline-cms-slideContentMap').slideToggle(100);
		$('.nu-timeline-cms-contentMediaMapOpenCloseArrow').toggleClass('contentMediaMapDroppedDown');
			initializeMap();
/*
		google.maps.event.trigger(map, "resize");
		map.setCenter(marker.getPosition());
		map.setZoom(map.getZoom());	
*/
		
	}); 	
	
	var hidden = $('#nu-timeline-cms-hiddenInput').val();
	if(hidden == "OK") {
		$('.nu-timeline-cms-slide').show();
	}
	
	$('#ddStatus').click(function(){
		$('ul li > ul').slideToggle(100);		
		$('.arrow').toggleClass('droppedDown');	
	});
	
	$('#nu-timeline-cms-dateCoin').hover(function(){
		$('#nu-timeline-cms-dateCoin').tooltip('toggle');
	});
	$('#nu-timeline-cms-timeCoin').hover(function(){
		$('#nu-timeline-cms-timeCoin').tooltip('toggle');
	});
	$('#nu-timeline-cms-customCoin').hover(function(){
		$('#nu-timeline-cms-customCoin').tooltip('toggle');
	});
	$('#nu-timeline-cms-categoryCoin').hover(function(){
		$('#nu-timeline-cms-categoryCoin').tooltip('toggle');
	});
	$('#nu-timeline-cms-importantCoin').hover(function(){
		$('#nu-timeline-cms-importantCoin').tooltip('toggle');	
	});
	$('#nu-timeline-cms-tlCategoryCoin').hover(function(){
		$('#nu-timeline-cms-tlCategoryCoin').tooltip('toggle');	
	});
	
	
	
	getTimelineCode();
	showCategories();
	deleteCategory();
	tlInfoPostOnBlurInput();
	tlInfoPostOnBlurText();
	categoryUpdateOnBlur();
	setColorPicker();	 
	
	addCategories();
	addImportant();
		 
	editorPostOnBlur();
	inputPostOnBlur();
	updateDate();
	deleteArticles();
	saveMapCoords();
	getMapData();
	
	saveArticleCategory();
	
	findPictureSize();
	savePictureSize();
	getEscenicPictureID();
	
	deletePicture();
	
	getEscenicVideoID();
	postEscenicVideoID();
	deleteVideo();
	
	getStatus();

	
	
});

/*
function updatePublish(){
	$('#nu-timeline-cms-publishButton').click(function(){
		var id = window.location.search;
		var savePublish = 1;
		$.post('updateContent.php', {savePublish: savePublish , id: id});
	});
}

function updateDraft(){
	$('#nu-timeline-cms-draftButton').click(function(){
		var saveDraft = 1;
		$.post('updateContent.php', {saveDraft: saveDraft});
	});
}
*/

function getStatus(){
	if($('.nu-timeline-cms-textInactive').length > 0){
		$('#ddStatus').toggleClass('btn-primary');
		$('#ddStatus').html('Kladd');
		$('<span class="arrow"></span>').appendTo('#ddStatus');
	}else if($('.nu-timeline-cms-textActive').length > 0){
		$('#ddStatus').toggleClass('btn-success');
		$('#ddStatus').html('Publisert');
		$('<span class="arrow"></span>').appendTo('#ddStatus');
	}else{
		alert('Noe gikk galt! Prøv igjen.');
	}	
}

function updateSearch(){
	var id = window.location.search;
	$.get('getSearchResults.php'+id, function(data){
		$('#nu-timeline-cms-vNav').html(data);
	});		
}

function postSearch(){
	var id = window.location.search;
	$('#nu-timeline-cms-searchField').blur(function(){
		var query = $('#nu-timeline-cms-searchField').val();
	
		$.post('getSearchResults.php', {query: query, id: id});
		
		
	});
}

function tlInfoPostOnBlurInput(){
	$('#nu-timeline-cms-tlInfoFormTitle').blur(function(){
		var title = $('#nu-timeline-cms-tlInfoFormTitle').val();
		var tlID = $('#nu-timeline-cms-tlInfoFormHiddenID').val();

		$.post('ajaxPostTLInfo.php', {title: title, tlID: tlID});
		var field = "Tittel";
		var farge = "green";
		
		statusMessage(field, farge);
		fetchTimeDate();
		updateTimelineName();
	});
}

function tlInfoPostOnBlurText(){
	$('#nu-timeline-cms-tlInfoForm textarea').blur(function(){
		var text = $('#nu-timeline-cms-tlInfoFormText').val();
		var tlID = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxPostTLInfo.php', {text: text, tlID: tlID});
		var field = "Tekstfelt";
		var farge= "green";
		
		statusMessage(field, farge);
		fetchTimeDate();
	});
}

function addCategories(){
	$('#nu-timeline-cms-addCategoryBtn').click(function(){
		var category = $('#nu-timeline-cms-tlInfoFormCategoryInput').val();
		var tlID = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxPostTLInfo.php', {category: category, tlID: tlID});
		var field = "Kategori";
		var farge = "green";
		
		var full = $('#editFormHiddenCategory').val();
		fetchTimeDate();
		showCategories();
		
		
		if(!full){
			var farge = "green";
			statusMessage(field, farge);
		}else{
			$('#nu-timeline-cms-errorYellow').fadeIn();
			$('#nu-timeline-cms-statusMessageYellow').html('<p style="text-align: center">Kan ikke overstige 6 kategorier</p>');
			$('#nu-timeline-cms-errorYellow').delay(1500).fadeOut();
		}
		fetchTimeDate();
		showCategories();
		setColorPicker();	
		
	});
}

function addImportant() {
	$('#nu-timeline-cms-editFormImportantArticle').change(function(){
		var id = window.location.search;
		var important = $(this).val();
		
		$.post('ajaxImportantArticle.php'+id, {important: important});
		var field = "Viktig hendelse";
		var farge = "green";
		
		statusMessage(field, farge);
		fetchTimeDate();
	});
}  

function showCategories(){
	var id = window.location.search;
	$.get('ajaxCategories.php'+id, function(data){
		$('#nu-timeline-cms-showCategories').html(data);
	});
	
	$('.nu-timeline-cms-colorPicker').spectrum({
		showPaletteOnly: true,
		showPalette: true,
		color: '',
		palette: [
        ['#00aeef', '#8dc63f', '#5b57a6'],
        ['#f7941d', '#ed1c24', '#0072bc']
        ]
        
	});
	$('.color1').spectrum("set", $('#hiddenColor1').val());
	$('.color2').spectrum("set", $('#hiddenColor2').val());
	$('.color3').spectrum("set", $('#hiddenColor3').val());
	$('.color4').spectrum("set", $('#hiddenColor4').val());
	$('.color5').spectrum("set", $('#hiddenColor5').val());
	$('.color6').spectrum("set", $('#hiddenColor6').val());
	
	deleteCategory();
}
	   
function editorPostOnBlur(){
	CKEDITOR.replace( 'articleText' );
	var editor = CKEDITOR.instances['text'];
   
	
	editor.on('blur', function() {
		var text = editor.getData();
		var contentID = $('input#editFormHiddenContentID').val();
			
		editor.updateElement();
		$.post('ajaxEditFormInput.php', {text: text, contentid: contentID});
		var field = "Tekstfelt";
		var farge = "green";
		
		statusMessage(field, farge);
		fetchTimeDate();
		updateArticles();
	});
}

function inputPostOnBlur(){
	var tlID = $('#editFormHiddenTlID').val();
	var contentID = $('#editFormHiddenContentID').val();
	
	$('#nu-timeline-cms-editFormContentTitle').blur(function(){
		var title = $('#nu-timeline-cms-editFormContentTitle').val();
		$.post('ajaxEditFormInput.php', {overskrift: title, tlid: tlID, contentid: contentID});
		var field = "Tittel";
		var farge = "green";
		
		fetchTimeDate();
		statusMessage(field, farge);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormContentTime').blur(function(){
		var time = $('#nu-timeline-cms-editFormContentTime').val();
		$.post('ajaxEditFormInput.php', {tid: time, tlid: tlID, contentid: contentID});
		var field = "Tid";
		var farge = "green";
		
		fetchTimeDate();
		statusMessage(field, farge);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormCustomTimeDate').blur(function(){
		var custom = $('#nu-timeline-cms-editFormCustomTimeDate').val();
		$.post('ajaxEditFormInput.php', {custom: custom, tlid: tlID, contentid: contentID});
		var field = "Egendefinert";
		var farge = "green";
		
		fetchTimeDate();
		statusMessage(field, farge);
		updateArticles();
		});
}

function updateDate(){
	$( ".datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true,
		onSelect: function(){
			datepickerDate = $(this).val();
			var contentID = $('input#editFormHiddenContentID').val();
			
			$.post('ajaxEditFormInput.php', {dato: datepickerDate, contentid: contentID});
			var field = "Dato";
			var farge = "green";
			
			fetchTimeDate();
			statusMessage(field, farge);
			updateArticles();
		}
	});
}

function updateArticles(){
	var id = window.location.search;
	$.get('ajaxGetArticles.php'+id, function(data){
		$('#nu-timeline-cms-articles').html(data);
	});
	fixSelectedBackground();
}	
	
function deleteArticles(){
	$('.btn-danger').click(function(){
		var deleteArticle = confirm('Vil du slette hendelsen?');
		var id = window.location.search;
		
		if(deleteArticle == true){
			var slett = 'ja';
			$.post('deleteContent.php'+id, {deleteContent: slett});
			var field = "Hendelse";
			var farge = "red";
			
			statusMessage(field, farge);
			
			$('ul li > ul').hide();		
			$('.arrow').removeClass('droppedDown');	
			
		}else{
			var angre = 'nei';
			$.post('deleteContent.php'+id, {goBack: angre});
		}
		fetchTimeDate();
		updateArticles();
	});
}

function updateTimelineName() {
	var id = window.location.search;
	$.get('ajaxTimelineName.php'+id, function(data){
		$('#nu-timeline-cms-menuText').html(data);
	});
	}

function fixSelectedBackground() {
    var url = document.URL;
	var urlsplitted = url.split("article");
	var supersplitted = urlsplitted[urlsplitted.length -1].split("=");
	var superid = supersplitted[supersplitted.length - 1];	    	
	$(".article" + superid).css({"background-color":"gray","color":"white"});
}

function saveArticleCategory() {
	$('#nu-timeline-cms-editFormChooseCategory').change(function(){
		var id = window.location.search;
		var category = $(this).val();
		
		$.post('ajaxCategories.php'+id, {category: category});
		var field = "Kategori";
		var farge = "green";
		
		fetchTimeDate();
		statusMessage(field, farge);
	});
}

function statusMessage(field, farge){
	if(farge == "red"){
		$('#nu-timeline-cms-errorYellow').fadeIn();
		$('#nu-timeline-cms-statusMessageYellow').html('<p text-align: center">'+field+' er slettet</p>');
		$('#nu-timeline-cms-errorYellow').delay(1500).fadeOut();
	}else if(farge == "green"){
		$('#nu-timeline-cms-errorGreen').fadeIn();
		$('#nu-timeline-cms-statusMessageGreen').html('<p text-align: center">'+field+' er oppdatert</p>');
		$('#nu-timeline-cms-errorGreen').delay(1500).fadeOut();
	}
}

function fetchTimeDate() {
	var ids = window.location.search;
	var date = new Date();
	var day = date.getDate();
	if(day < 10){
		day = '0' + day;
	}
	var month = date.getMonth();
	month++;
	if(month < 10){
		month = '0' + month;
	}
	var year = date.getFullYear();
	
	var hour = date.getHours();
	if(hour < 10){
		hour = '0' + hour;
	}
	var minutes = date.getMinutes();
	if(minutes < 10){
		minutes = '0' + minutes;
	}
	var seconds = date.getSeconds();
	if(seconds < 10){
		seconds = '0' + seconds;
	}
	
	var dbDateTime = year + "-" + month + "-" + day + " " + hour+":"+minutes+":"+seconds;
	
	$.post('ajaxDate.php'+ids, {dateTime: dbDateTime, ids: ids});
}

function deleteCategory() {
	$('#categoryBtn1').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category1";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 1";
		var farge = "red";
		
		statusMessage(field, farge);
		showCategories();
	});
	$('#categoryBtn2').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category2";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 2";
		var farge = "red";
		
		statusMessage(field, farge);
		showCategories();
	});
	$('#categoryBtn3').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category3";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 3";
		var farge = "red";
		
		statusMessage(field, farge);
		showCategories();
	});
	$('#categoryBtn4').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category4";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 4";
		var farge = "red";
		
		statusMessage(field, farge);
		showCategories();
	});
	$('#categoryBtn5').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category5";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 5";
		var farge = "red";
		
		statusMessage(field, farge);
		showCategories();
	});
	$('#categoryBtn6').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category6";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 6";
		var farge = "red";
		
		statusMessage(field, farge);
		showCategories();
	});
}

function setColorPicker() {
	$('.color1').change(function(){
		var color = $('.color1').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat1";
		
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 1";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('.color2').change(function(){
		var color = $('.color2').val();
		
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat2";
		
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 2";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('.color3').change(function(){
		var color = $('.color3').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat3";
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 3";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('.color4').change(function(){
		var color = $('.color4').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat4";
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 4";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('.color5').change(function(){
		var color = $('.color5').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat5";
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 5";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('.color6').change(function(){
		var color = $('.color6').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat6";
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 6";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	
}

function categoryUpdateOnBlur() {
	$('#nu-timeline-cms-tlInfoCategory1').blur(function(){
		var category1 = $('#nu-timeline-cms-tlInfoCategory1').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category1: category1, id: id});
		var field = "Kategori 1";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('#nu-timeline-cms-tlInfoCategory2').blur(function(){
		var category2 = $('#nu-timeline-cms-tlInfoCategory2').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category2: category2, id: id});
		var field = "Kategori 2";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('#nu-timeline-cms-tlInfoCategory3').blur(function(){
		var category3 = $('#nu-timeline-cms-tlInfoCategory3').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category3: category3, id: id});
		var field = "Kategori 3";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('#nu-timeline-cms-tlInfoCategory4').blur(function(){
		var category4 = $('#nu-timeline-cms-tlInfoCategory4').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category4: category4, id: id});
		var field = "Kategori 4";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('#nu-timeline-cms-tlInfoCategory5').blur(function(){
		var category5 = $('#nu-timeline-cms-tlInfoCategory5').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category5: category5, id: id});
		var field = "Kategori 5";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	$('#nu-timeline-cms-tlInfoCategory6').blur(function(){
		var category6 = $('#nu-timeline-cms-tlInfoCategory6').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category6: category6, id: id});
		var field = "Kategori 6";
		var farge = "green";
		
		statusMessage(field, farge);
	});
	
}

function initializeMap(){

	var latLng = new google.maps.LatLng(getLat, getLong);
        var mapOptions = {
	        zoom: parseInt(getZoom),
	        center: latLng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        window.map = new google.maps.Map(document.getElementById('nu-timeline-cms-googleMapAPI'), mapOptions);
                
        var marker = new google.maps.Marker({
            position: latLng,
            title: 'Point A',
            map: map,
            draggable: true
        });

        // Update current position info.
        updateMarkerPosition(latLng);
        geocodePosition(latLng);
        
        var input = /** @type {HTMLInputElement} */(document.getElementById('nu-timeline-cms-mapSearchTextField'));
        var autocomplete = new google.maps.places.Autocomplete(input);
        
        var infowindow = new google.maps.InfoWindow();
        
        google.maps.event.addListener(marker, 'click', function() {
        	infowindow.setContent(infoWindowAdress);
	        infowindow.open(map, marker);
	    });
        
        // Add event listener for autocomplete
        google.maps.event.addListener(autocomplete, 'place_changed', function(){
	    	var place = autocomplete.getPlace();
	    	if (!place.geometry) {
            	// Inform the user that the place was not found and return.
		    	input.className = 'notfound';
		        return;
	        }
                
	        // If the place has a geometry, then present it on a map.
	        if (place.geometry.viewport) {
		    	map.fitBounds(place.geometry.viewport);
		    } else {
				map.setCenter(place.geometry.location);
			    map.setZoom(17);  // Why 17? Because it looks good.
			}			       
			    marker.setPosition(place.geometry.location);
			    marker.setVisible(true);
			    geocodePosition(marker.getPosition());
			    updateMarkerPosition(marker.getPosition());
			    infowindow.close();
        });
        
        // Add dragging event listeners.
        google.maps.event.addListener(marker, 'dragstart', function() {
            updateMarkerAddress('Flytter mark&oslash;r...');
            infowindow.close();
        });

        google.maps.event.addListener(marker, 'drag', function() {
            updateMarkerPosition(marker.getPosition());
        });

        google.maps.event.addListener(marker, 'dragend', function() {
            geocodePosition(marker.getPosition());
        });
                
}

function geocodePosition(pos){
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({
		latLng: pos
	}, function(responses){	
		if(responses && responses.length > 0) {
			window.infoWindowAdress = responses[0].formatted_address;
			updateMarkerAddress(responses[0].formatted_address);
		}else{
			updateMarkerAddress('Can not determine address');
		}
	});
}
	
function updateMarkerPosition(latLng) {
    document.getElementById('nu-timeline-cms-hiddenCoords').innerHTML = [
        latLng.lat(),
        latLng.lng()
    ].join(', ');
}

function updateMarkerAddress(str) {
    document.getElementById('nu-timeline-cms-address').innerHTML = str;
}


 
function saveMapCoords() {
	$('#nu-timeline-cms-saveMapButton').click(function(){
		
		var article = $('#editFormHiddenContentID').val();
		var test = $('#nu-timeline-cms-hiddenCoords').html();
		var array = test.split(", ");
		window.lats = array[0];
		window.longs = array[1];
		var zooms = map.getZoom();
		
		
		
		var coords = lats + "," + longs + "," + zooms; 
		
		/*
var test = $('#info').val();
		var coords = latLng.lat()+","+latLng.lng()+","+map.getZoom();
		var article = $('#editFormHiddenContentID').val();
*/
		
		$.post('ajaxGoogleMaps.php', {coords: coords, article: article});
		
		var field = "Kartposisjon";
		var farge = "green";
		
		statusMessage(field, farge);
	});
}

function getMapData() {
	var id = window.location.search;
	$.get('ajaxGoogleMaps.php'+id, function(data){
		window.mapDataFromDb = data;
		var array = mapDataFromDb.split(",");
		window.getLat = array[0];
		window.getLong = array[1];
		window.getZoom = array[2];
		
	});
	
}

/*
function postEscenicPictureID() {
	$('#nu-timeline-cms-savePictureBtn').click(function() {
	
		window.picEscenicID = $('#nu-timeline-cms-picEscenicID').val();
		getEscenicPictureURL(picEscenicID);
		var hiddenURL = $('#nu-timeline-cms-hiddenEscenicLink').val();
		var cropVersion = $('#nu-timeline-cms-cropVersion').val();
		var article = $('#editFormHiddenContentID').val();
		
		$.post('ajaxGetEscenicPicture.php', {picEscenicID: picEscenicID, hiddenURL: hiddenURL, article: article, cropVersion: cropVersion});
		getEscenicPictureID();
		
		var field = "Bilde";
		var farge = "green";
			
		statusMessage(field, farge);
	});
		
}
*/

function getEscenicPictureID() {
	var id = window.location.search;
	$.get('ajaxGetEscenicPicture.php'+id, function(data){
		$('#nu-timeline-cms-picturePreview').html(data);
		savePictureText();
	});
}


function getEscenicPictureURL(picEscenicID) {
	$.ajax({
		type: "GET",
		url: "http://api.snd.no/news/publication/ap/searchContents/instance?contentId="+picEscenicID+"&contentType=image&callback=myFunc",
		dataType: "xml",
		success: function(xmlBildeAPI){
			var test = $(xmlBildeAPI).find('link');
			var url = test.attr('href');
			$('#nu-timeline-cms-hiddenEscenicLink').val(url);
		}
	});	
}

function deletePicture() {
	$(document).on("click", "#nu-timeline-cms-picturePreview img", function() {
		var selectedID = $(this).attr("id");
		
		$.post("ajaxGetEscenicPicture.php", {selectedID: selectedID});
		getEscenicPictureID();
		
		var field = "Bilde";
		var farge = "red";
		
		statusMessage(field, farge);
	});
}

function postEscenicVideoID() {
	$('#nu-timeline-cms-saveVideoBtn').click(function() {
	
		window.vidEscenicID = $('#nu-timeline-cms-vidEscenicID').val();
		var article = $('#editFormHiddenContentID').val();
		
		$.post('ajaxGetEscenicVideo.php', {vidEscenicID: vidEscenicID, article: article});
		getEscenicVideoID();
		
		var field = "Video";
		var farge = "green";
		
		statusMessage(field, farge);
	});
}

function getEscenicVideoID() {
	var id = window.location.search;
	$.get('ajaxGetEscenicVideo.php'+id, function(data){
		$('#nu-timeline-cms-videoPreview').html(data);
	});
}

function deleteVideo() {
	$('#nu-timeline-cms-deleteVideoBtn').click(function() {
		var delVideo = "delete";
		var article = $('#editFormHiddenContentID').val();
		
		$.post("ajaxGetEscenicVideo.php", {delVideo: delVideo, article: article});
		getEscenicVideoID();
		
		var field = "Video";
		var farge = "red";
		
		statusMessage(field, farge);
	});
}

function findPictureSize() {
	$('#nu-timeline-cms-findPicSize').click(function(){
		$('#nu-timeline-cms-pictureSizePreview').show();
		$('#nu-timeline-cms-picturePreview').hide();
		var picID = $('#nu-timeline-cms-picEscenicID').val();
		getEscenicPictureURL(picID);
		var picture = $('#nu-timeline-cms-hiddenEscenicLink').val();
		
		showPictureSize(picture);
	});
}

function showPictureSize(picture) {
	$.get('ajaxPictureSize.php?picture='+picture, function(data){
		$('#nu-timeline-cms-pictureSizePreview').html(data);
	});
}

function savePictureSize() {
	$(document).on("click",'.nu-timeline-cms-picSizeTest', function() {
		
		$('#nu-timeline-cms-picturePreview').show();
		$('#nu-timeline-cms-pictureSizePreview').hide();
		
	
		var cropVersion = $(this).children("label").attr("value");
		var picEscenicID = $('#nu-timeline-cms-picEscenicID').val();
		var hiddenURL = $('#nu-timeline-cms-hiddenEscenicLink').val();
		var article = $('#editFormHiddenContentID').val();
		
		$.post('ajaxGetEscenicPicture.php', {cropVersion: cropVersion, picEscenicID: picEscenicID, hiddenURL: hiddenURL, article: article});
		getEscenicPictureID();
		
		var field = "Bilde";
		var farge = "green";
		
		statusMessage(field, farge);
	});
}

function getPictureSize() {
	var id = window.location.search;
	$.get('ajaxSavePictureSize.php', function(data){
		$('#nu-timeline-cms-picturePreview').html(data);
	});
}

function savePictureText() {
	$('.nu-timeline-cms-pictureTextArea').blur(function() {
		var mediaID = $(this).attr("mediaid");
		var pictureText = $('.nu-timeline-cms-pictureTextArea[mediaid='+mediaID+']').val();
		var article = $('#editFormHiddenContentID').val();
		
		
		$.post('ajaxPostPictureText.php', {pictureText: pictureText, article: article, mediaID: mediaID});
		
		var field = "Bildetekst";
		var farge = "green";
		
		statusMessage(field, farge);
		
	})
}

function getTimelineCode() {
	$('#nu-timeline-cms-tlCodeBtn').click(function(){
			var tlID = window.location.search.substring(4);
			var split = tlID.split('&');
			var newtlID = split[0];
		
		var popup = prompt("Kopier denne koden inn i Escenic:","<div class='nu-timeline-wrapper'></div><script type='text/javascript'>getTimeline("+newtlID+")</script>");
	});
}




