$(document).ready(function(){
	
	fixSelectedBackground();
	
	$.ajaxSetup({
		async: false,
	});
	//IE8 fix ?
	$.support.cors = true;
	
	fixSelectedBackground(); //DEPRECIATED BY TORSTEIN ;/
	
	$('#nu-timeline-cms-tlInfo').click(function(){
		$('.tlOpenCloseArrow').toggleClass('tlDroppedDown');	
		$('.nu-timeline-cms-slide').slideToggle(100);
		
	});
	
	$('#nu-timeline-cms-contentMediaPicture').click(function(){	
		$('#nu-timeline-cms-slideContentPicture').slideToggle(100);
	});
	$('#nu-timeline-cms-contentMediaVideo').click(function(){	
		$('#nu-timeline-cms-slideContentVideo').slideToggle(100);
	}); 
	$('#nu-timeline-cms-contentMediaMap').click(function(){	
		$('#nu-timeline-cms-slideContentMap').show();
		googleMaps();
		/* google.maps.event.trigger(map, "resize"); */
		
	}); 	
	
	var hidden = $('#nu-timeline-cms-hiddenInput').val();
	if(hidden == "OK") {
		$('#nu-timeline-cms-slide').show();
	}
	
	$('#ddStatus').click(function(){
		$('ul li > ul').slideToggle(100);		
		$('.arrow').toggleClass('droppedDown');	
	});
	
	
	
	showCategories();
	deleteCategory();
	tlInfoPostOnBlurInput();
	tlInfoPostOnBlurText();
	setColorPicker();
	categoryUpdateOnBlur();
		 
	addCategories();
	addImportant();
		 
	editorPostOnBlur();
	inputPostOnBlur();
	updateDate();
	deleteArticles();
	saveMapCoords();
	getMapData();
	
	saveArticleCategory();
	
// IN PROGRESS
	$(document).on("click",'div[title="Zoom in"]',function(){
	      zoomz++;
    });
	
	$(document).on("click",'div[title="Zoom out"]',function(){
	      zoomz--;
	      console.log(zoomz);
    });
//	
});


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

		$.post('ajaxPOSTtlInfo.php', {title: title, tlID: tlID});
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
		
		$.post('ajaxPOSTtlInfo.php', {text: text, tlID: tlID});
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
		
		$.post('ajaxPOSTtlInfo.php', {category: category, tlID: tlID});
		var field = "Kategori";
		var farge = "green";
		
		var full = $('#editFormHiddenCategory').val();
		fetchTimeDate();
		showCategories();
		
		
		if(!full){
			var farge = "green";
			statusMessage(field, farge);
		}else{
			$('#nu-timeline-cms-statusMessage').fadeIn();
			$('#nu-timeline-cms-statusMessage').html('<p style="color: red; text-align: center">Kan ikke overstige 6 kategorier</p>');
			$('#nu-timeline-cms-statusMessage').fadeOut(3000);
		}
		fetchTimeDate();
		showCategories();
		
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
        ['black', 'rgb(10,10,10)', 'blanchedalmond',
        'rgb(255, 128, 0)', 'hsv 100 70 50'],
        ['red', 'yellow', 'green', 'blue', 'violet']
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
		$.post('test.php', {text: text, contentid: contentID});
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
		$.post('test.php', {overskrift: title, tlid: tlID, contentid: contentID});
		var field = "Tittel";
		var farge = "green";
		
		fetchTimeDate();
		statusMessage(field, farge);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormContentTime').blur(function(){
		var time = $('#nu-timeline-cms-editFormContentTime').val();
		$.post('test.php', {tid: time, tlid: tlID, contentid: contentID});
		var field = "Tid";
		var farge = "green";
		
		fetchTimeDate();
		statusMessage(field, farge);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormContentPic').blur(function(){
		var picPath = $('#nu-timeline-cms-editFormContentPic').val();
		$.post('test.php', {purl: picPath, tlid: tlID, contentid: contentID});
		var field = "Bilde";
		var farge = "green";
		
		fetchTimeDate();
		statusMessage(field, farge);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormCustomTimeDate').blur(function(){
		var custom = $('#nu-timeline-cms-editFormCustomTimeDate').val();
		$.post('test.php', {custom: custom, tlid: tlID, contentid: contentID});
		var field = "Egendefinert";
		var farge = "green";
		
		fetchTimeDate();
		statusMessage(field, farge);
		updateArticles();
		});
}

function updateDate(){
	$( ".datepicker" ).datepicker({
		onSelect: function(){
			datepickerDate = $(this).val();
			var contentID = $('input#editFormHiddenContentID').val();
			
			$.post('test.php', {dato: datepickerDate, contentid: contentID});
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
	$.get('whatever.php'+id, function(data){
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
		$('#nu-timeline-cms-statusMessage').fadeIn();
		$('#nu-timeline-cms-statusMessage').html('<p style="color: '+farge+'; text-align: center">'+field+' er slettet</p>');
		$('#nu-timeline-cms-statusMessage').fadeOut(3000);
	}else if(farge == "green"){
		$('#nu-timeline-cms-statusMessage').fadeIn();
		$('#nu-timeline-cms-statusMessage').html('<p style="color: '+farge+'; text-align: center">'+field+' er oppdatert</p>');
		$('#nu-timeline-cms-statusMessage').fadeOut(3000);
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

function googleMaps() {
	var myLatLng = new google.maps.LatLng(lats,longs);
  var mapOptions = {
  	center: myLatLng,
    /* center: new google.maps.LatLng(59.9138688, 10.752245399999993), */
    zoom: parseInt(zoomz),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  window.map = new google.maps.Map(document.getElementById('nu-timeline-cms-googleMapAPI'),
    mapOptions);
    

  var input = /** @type {HTMLInputElement} */(document.getElementById('nu-timeline-cms-mapSearchTextField'));
  var autocomplete = new google.maps.places.Autocomplete(input);
  

  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
  	
    infowindow.close();
    marker.setVisible(false);
    input.className = '';
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
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    getLatLong();
    

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
    
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    google.maps.event.addDomListener(radioButton, 'click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);
  
  
  
  
}

//google.maps.event.addDomListener(window, 'load', initialize);

function getLatLong(){


	var address = $('#nu-timeline-cms-mapSearchTextField').val();
    var geo = new google.maps.Geocoder;

    geo.geocode({'address':address},function(results, status){
      if (status == google.maps.GeocoderStatus.OK) {
        window.latitude = results[0].geometry.location.lat();
        window.longitude = results[0].geometry.location.lng();
        window.zoom = map.getZoom();
        
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }

    });
    
 }
 
function saveMapCoords() {
	$('#nu-timeline-cms-saveMapButton').click(function(){
		var coords = latitude+","+longitude+","+zoom;
		var contentid = $('#editFormHiddenContentID').val();
		alert(coords);
		$.post('ajaxGoogleMaps.php', {coords: coords, contentid: contentid});
	});
}

function getMapData() {
	var id = window.location.search;
	$.get('ajaxGoogleMaps.php'+id, function(data){
		window.mapDataFromDb = data;
		var array = mapDataFromDb.split(",");
		window.lats = array[0];
		window.longs = array[1];
		window.zoomz = array[2];
		
	});
	
}