// Document ready
$(document).ready(function(){
	// Sets up ajax
	$.ajaxSetup({
		async: false,
	});
	//IE8 fix
	$.support.cors = true;
	
	// Checks if the timeline has information, and toggles the information slide if not
	var hidden = $('#nu-timeline-cms-hiddenInput').val();
	if(hidden == "OK") {
		$('.nu-timeline-cms-slide').show();
	}
	
	hoverEvents();
	fixSelectedBackground(); 
	sliderHandler();
	
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
	
	publishArticle();
	draftArticle();
	deleteArticle();
	
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
	
	fillCategories();
	
});

// Function for tooltips on hover
function hoverEvents(){
	$('.nu-timeline-cms-loggUt').hover(function(){
		$('.nu-timeline-cms-loggUt').tooltip('toggle');	
	});
	$('#nu-timeline-cms-home').hover(function(){
		$('#nu-timeline-cms-home').tooltip('toggle');	
	});
	$('#nu-timeline-cms-tlCodeBtn').hover(function(){
		$('#nu-timeline-cms-tlCodeBtn').tooltip('toggle');	
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
}

// Sliderfunctions START //
function sliderHandler(){
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
	});
	$('#ddStatus').click(function(){
		$('ul li > ul').slideToggle(100);		
		$('.arrow').toggleClass('droppedDown');	
	});	
}
// Sliderfunctions END //

// Timeline information START //
// Blur events for timeline info START //
function tlInfoPostOnBlurInput(){ // Updates title of the timeline when user leaves the inputfield
	$('#nu-timeline-cms-tlInfoFormTitle').blur(function(){
		var title = $('#nu-timeline-cms-tlInfoFormTitle').val();
		var tlID = $('#nu-timeline-cms-tlInfoFormHiddenID').val();

		$.post('ajaxPostTLInfo.php', {title: title, tlID: tlID});
		var field = "Tittel";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		fetchTimeDate();
		updateTimelineName();
	});
}

function tlInfoPostOnBlurText(){ // Updates ingress when user leaves the textarea
	$('#nu-timeline-cms-tlInfoForm textarea').blur(function(){
		var text = $('#nu-timeline-cms-tlInfoFormText').val();
		var tlID = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxPostTLInfo.php', {text: text, tlID: tlID});
		var field = "Ingress";
		var statusColor= "green";
		
		statusMessage(field, statusColor);
		fetchTimeDate();
	});
}
// Blur events for timeline info END //


function addCategories(){ // Adds categories
	$('#nu-timeline-cms-addCategoryBtn').click(function(){
		var category = $('#nu-timeline-cms-tlInfoFormCategoryInput').val();
		var tlID = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxPostTLInfo.php', {category: category, tlID: tlID});
		
		// Counts categories. If less than 6, print statusmessage that category have been added, else print that categories are full
		var categoryCount = $('#nu-timeline-cms-tlInfoListCategories').children().length;
		if(categoryCount < 6){
			var field = "Kategorier";
			var statusColor = "green";
			statusMessage(field, statusColor);
		}else{
			$('#nu-timeline-cms-errorYellow').fadeIn();
			$('#nu-timeline-cms-statusMessageYellow').html('<p style="text-align: center">Kan ikke overstige 6 kategorier</p>');
			$('#nu-timeline-cms-errorYellow').delay(1500).fadeOut();
		}
		
		fetchTimeDate();
		showCategories();
		setColorPicker();	
		fillCategories();
	});
}

function showCategories(){ // fetches the categories from db and adds them
	var id = window.location.search;
	$.get('ajaxCategories.php'+id, function(data){
		$('#nu-timeline-cms-showCategories').html(data);
	});
	
	$('.nu-timeline-cms-colorPicker').spectrum({
		showPaletteOnly: true,
		showPalette: true,
		color: '#00aeef',
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

function deleteCategory() {
	$('#categoryBtn1').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category1";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 1";
		var statusColor = "red";
		
		statusMessage(field, statusColor);
		showCategories();
		fillCategories();
	});
	$('#categoryBtn2').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category2";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 2";
		var statusColor = "red";
		
		statusMessage(field, statusColor);
		showCategories();
		fillCategories();
	});
	$('#categoryBtn3').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category3";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 3";
		var statusColor = "red";
		
		statusMessage(field, statusColor);
		showCategories();
		fillCategories();
	});
	$('#categoryBtn4').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category4";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 4";
		var statusColor = "red";
		
		statusMessage(field, statusColor);
		showCategories();
		fillCategories();
	});
	$('#categoryBtn5').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category5";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 5";
		var statusColor = "red";
		
		statusMessage(field, statusColor);
		showCategories();
		fillCategories();
	});
	$('#categoryBtn6').click(function() {
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var slett = "category6";
		
		$.post('ajaxUpdateCategory.php', {id: id, slett: slett});
		var field = "Kategori 6";
		var statusColor = "red";
		
		statusMessage(field, statusColor);
		showCategories();
		fillCategories();
	});
}

function setColorPicker() { // Sets the color on the colorpicker for categories
	$(document).on('change', '.color1', function(){
		var color = $('.color1').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat1";
		
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 1";
		var statusColor = "green";
		
		fillCategories();
	});
	$(document).on('change', '.color2', function(){
		var color = $('.color2').val();
		
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat2";
		
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 2";
		var statusColor = "green";
		
		fillCategories();
	});
	$(document).on('change', '.color3', function(){
		var color = $('.color3').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat3";
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 3";
		var statusColor = "green";
		
		fillCategories();
	});
	$(document).on('change', '.color4', function(){
		var color = $('.color4').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat4";
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 4";
		var statusColor = "green";
		
		fillCategories();
	});
	$(document).on('change', '.color5', function(){
		var color = $('.color5').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat5";
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 5";
		var statusColor = "green";
		
		fillCategories();
	});
	$(document).on('change', '.color6', function(){
		var color = $('.color6').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		var catnr = "cat6";
		
		$.post('ajaxUpdateCategory.php', {catnr: catnr, color: color, id: id});
		var field = "Farge 6";
		var statusColor = "green";
		
		fillCategories();
	});
	
}

function categoryUpdateOnBlur() { // Updates  category to db when user leaves the category field
	$(document).on('blur', '#nu-timeline-cms-tlInfoCategory1', function(){
		var category1 = $('#nu-timeline-cms-tlInfoCategory1').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category1: category1, id: id});
		var field = "Kategori 1";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		fillCategories();
	});
	$(document).on('blur', '#nu-timeline-cms-tlInfoCategory2', function(){
		var category2 = $('#nu-timeline-cms-tlInfoCategory2').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category2: category2, id: id});
		var field = "Kategori 2";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		fillCategories();
	});
	$(document).on('blur', '#nu-timeline-cms-tlInfoCategory3', function(){
		var category3 = $('#nu-timeline-cms-tlInfoCategory3').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category3: category3, id: id});
		var field = "Kategori 3";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		fillCategories();
	});
	$(document).on('blur', '#nu-timeline-cms-tlInfoCategory4', function(){
		var category4 = $('#nu-timeline-cms-tlInfoCategory4').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category4: category4, id: id});
		var field = "Kategori 4";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		fillCategories();
	});
	$(document).on('blur', '#nu-timeline-cms-tlInfoCategory5', function(){
		var category5 = $('#nu-timeline-cms-tlInfoCategory5').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category5: category5, id: id});
		var field = "Kategori 5";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		fillCategories();
	});
	$(document).on('blur', '#nu-timeline-cms-tlInfoCategory6', function(){
		var category6 = $('#nu-timeline-cms-tlInfoCategory6').val();
		var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxUpdateCategory.php', {category6: category6, id: id});
		var field = "Kategori 6";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		fillCategories();
	});
}

function fillCategories(){ // Fetches categories from db and adds them to the html
	var id = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
	var article = $('#editFormHiddenContentID').val();
	$.get('ajaxFillCategories.php', {article: article, id: id})
	.done(function(data){
		$('#nu-timeline-cms-editFormChooseCategory').html(data);
	});
}

function addImportant() { // Sets the article to important not when selected
	$('#nu-timeline-cms-editFormImportantArticle').change(function(){
		var id = window.location.search;
		var important = $(this).val();
		
		$.post('ajaxImportantArticle.php'+id, {important: important});
		var field = "Viktig hendelse";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		fetchTimeDate();
	});
} 
// Timeline information END //

  
// Content form START //
function getStatus(){ // Checks if the article is published, and sets css for the statusbutton
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

// Blur events for content edit form START // 
function editorPostOnBlur(){ // Updates database with contents from the texteditor
	CKEDITOR.replace( 'articleText' );
	var editor = CKEDITOR.instances['text'];
   
	
	editor.on('blur', function() {
		var text = editor.getData();
		var contentID = $('input#editFormHiddenContentID').val();
			
		editor.updateElement();
		$.post('ajaxEditFormInput.php', {text: text, contentid: contentID});
		var field = "Tekstfelt";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
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
		var statusColor = "green";
		
		fetchTimeDate();
		statusMessage(field, statusColor);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormContentTime').blur(function(){
		var time = $('#nu-timeline-cms-editFormContentTime').val();
		$.post('ajaxEditFormInput.php', {tid: time, tlid: tlID, contentid: contentID});
		var field = "Tid";
		var statusColor = "green";
		
		fetchTimeDate();
		statusMessage(field, statusColor);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormCustomTimeDate').blur(function(){
		var custom = $('#nu-timeline-cms-editFormCustomTimeDate').val();
		$.post('ajaxEditFormInput.php', {custom: custom, tlid: tlID, contentid: contentID});
		var field = "Egendefinert";
		var statusColor = "green";
		
		fetchTimeDate();
		statusMessage(field, statusColor);
		updateArticles();
		});
}
// Blur events for content edit form END // 

function updateDate(){ // Updates database with date when selected
	$( ".datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true,
		onSelect: function(){
			datepickerDate = $(this).val();
			var contentID = $('input#editFormHiddenContentID').val();
			
			$.post('ajaxEditFormInput.php', {dato: datepickerDate, contentid: contentID});
			var field = "Dato";
			var statusColor = "green";
			
			fetchTimeDate();
			statusMessage(field, statusColor);
			updateArticles();
		}
	});
}

function updateArticles(){ // Fetches updated articles from the database and displays them
	var id = window.location.search;
	$.get('ajaxGetArticles.php'+id, function(data){
		$('#nu-timeline-cms-articles').html(data);
	});
	fixSelectedBackground();
}	

function publishArticle(){ // Sets an article to published when the user clicks the button for publish
	$('.btn-success').click(function(){
		var id = window.location.search;
		var savePublish = 'ja';
		
		$.post('updateContent.php'+id, {savePublish: savePublish});
		var field = "Hendelse";
		var statusColor = "green";
	
		$('ul li > ul').hide();		
		$('.arrow').removeClass('droppedDown');	
				
		if($('#ddStatus').hasClass('btn-success')){
			$('#ddStatus').html('Publisert');
			$('<span class="arrow"></span>').appendTo('#ddStatus');
		}else if($('#ddStatus').hasClass('btn-primary')){
			$('#ddStatus').removeClass('btn-primary');			
			$('#ddStatus').html('Publisert');
			$('<span class="arrow"></span>').appendTo('#ddStatus');
			$('#ddStatus').toggleClass('btn-success');
		}
		
		fetchTimeDate();
		updateArticles();
		statusMessage(field, statusColor);
	});
}

function draftArticle(){ // Sets an article to draft when the user clicks the button for draft
	$('.btn-primary').click(function(){
		var id = window.location.search;
		var saveDraft = 'ja';
		
		$.post('updateContent.php'+id, {saveDraft: saveDraft});
		var field = "Hendelse";
		var statusColor = "green";
			
		$('ul li > ul').hide();		
		$('.arrow').removeClass('droppedDown');	
		
		if($('#ddStatus').hasClass('btn-primary')){
			$('#ddStatus').html('Kladd');
			$('<span class="arrow"></span>').appendTo('#ddStatus');
		}else if($('#ddStatus').hasClass('btn-success')){
			$('#ddStatus').removeClass('btn-success');		
			$('#ddStatus').html('Kladd');
			$('<span class="arrow"></span>').appendTo('#ddStatus');
			$('#ddStatus').toggleClass('btn-primary');
		}
		
		fetchTimeDate();
		updateArticles();
		statusMessage(field, statusColor);
	});
}
	
function deleteArticle(){ // Deletes an article when the user clicks the button for delete
	$('.btn-danger').click(function(){
		var deleteArticle = confirm('Vil du slette hendelsen?');
		var id = window.location.search;
		
		if(deleteArticle == true){
			var deleteContent = 'ja';
			$.post('updateContent.php'+id, {deleteContent: deleteContent});
			var field = "Hendelse";
			var statusColor = "red";
			
			statusMessage(field, statusColor);
			
			$('ul li > ul').hide();		
			$('.arrow').removeClass('droppedDown');	
			
		}else{
			var angre = 'nei';
			$.post('updateContent.php'+id, {goBack: angre});
		}
		fetchTimeDate();
		updateArticles();
	});
}

function updateTimelineName() { // Updates html for title of the timeline
	var id = window.location.search;
	$.get('ajaxTimelineName.php'+id, function(data){
		$('#nu-timeline-cms-menuText').html(data);
	});
	}

function fixSelectedBackground() { // Sets the background-color of the selected article
    var url = document.URL;
	var urlsplitted = url.split("article");
	var supersplitted = urlsplitted[urlsplitted.length -1].split("=");
	var superid = supersplitted[supersplitted.length - 1];	    	
	$(".article" + superid).css({"background-color":"gray","color":"white"});
}

function saveArticleCategory() { // Saves the articles selected category
	$('#nu-timeline-cms-editFormChooseCategory').change(function(){
		var id = window.location.search;
		var category = $(this).val();
		
		$.post('ajaxCategories.php'+id, {category: category});
		var field = "Kategori";
		var statusColor = "green";
		
		fetchTimeDate();
		statusMessage(field, statusColor);
	});
}
// Content form END //

function statusMessage(field, statusColor){ // Function for displaying statusmessage
	if(statusColor == "red"){
		$('#nu-timeline-cms-errorYellow').fadeIn();
		$('#nu-timeline-cms-statusMessageYellow').html('<p text-align: center">'+field+' er slettet!</p>');
		$('#nu-timeline-cms-errorYellow').delay(1500).fadeOut();
	}else if(statusColor == "green"){
		$('#nu-timeline-cms-errorGreen').fadeIn();
		$('#nu-timeline-cms-statusMessageGreen').html('<p text-align: center">'+field+' er oppdatert!</p>');
		$('#nu-timeline-cms-errorGreen').delay(1500).fadeOut();
	}
}

function fetchTimeDate() { // Function to format date
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



// Media functions START //
function getEscenicPictureID() { 
	var id = window.location.search;
	$.get('ajaxGetEscenicPicture.php'+id, function(data){
		$('#nu-timeline-cms-picturePreview').html(data);
		savePictureText();
	});
}


function getEscenicPictureURL(picEscenicID) { // Fetches picture from Escenic-API with Escenic picture ID
	$.ajax({
		type: "GET",
		url: "http://api.snd.no/news/publication/ap/searchContents/instance?contentId="+picEscenicID+"&contentType=image&callback=myFunc",
		dataType: "xml",
		success: function(xmlBildeAPI){
			var escenicPicUrl = $(xmlBildeAPI).find('link');
			var url = escenicPicUrl.attr('href');
			$('#nu-timeline-cms-hiddenEscenicLink').val(url);
		}
	});	
}

function deletePicture() { // Deletes selected image
	$(document).on("click", ".nu-timeline-cms-deletePicture", function() {
		var selectedID = $(this).attr("id");
		
		$.post("ajaxGetEscenicPicture.php", {selectedID: selectedID});
		getEscenicPictureID();
		
		var field = "Bilde";
		var statusColor = "red";
		
		statusMessage(field, statusColor);
	});
}

function findPictureSize() { // Gets sizes and cropversions of selected image, and displays a preview for the user to select
	$('#nu-timeline-cms-findPicSize').click(function(){
		$('#nu-timeline-cms-pictureSizePreview').show();
		$('#nu-timeline-cms-picturePreview').hide();
		var picID = $('#nu-timeline-cms-picEscenicID').val();
		getEscenicPictureURL(picID);
		var picture = $('#nu-timeline-cms-hiddenEscenicLink').val();
		
		showPictureSize(picture);
	});
}

function showPictureSize(picture) { // Displays selected images
	$.get('ajaxPictureSize.php?picture='+picture, function(data){
		$('#nu-timeline-cms-pictureSizePreview').html(data);
	});
}

function savePictureSize() { // Saves selected size and cropversion of image on click
	$(document).on("click",'.nu-timeline-cms-picSizePreview', function() {
		
		$('#nu-timeline-cms-picturePreview').show();
		$('#nu-timeline-cms-pictureSizePreview').hide();
		
	
		var cropVersion = $(this).children("label").attr("value");
		var picEscenicID = $('#nu-timeline-cms-picEscenicID').val();
		var hiddenURL = $('#nu-timeline-cms-hiddenEscenicLink').val();
		var article = $('#editFormHiddenContentID').val();
		
		$.post('ajaxGetEscenicPicture.php', {cropVersion: cropVersion, picEscenicID: picEscenicID, hiddenURL: hiddenURL, article: article});
		getEscenicPictureID();
		
		var field = "Bilde";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
	});
}

function savePictureText() { // Saves picture-text when user leaves the textarea
	$('.nu-timeline-cms-pictureTextArea').blur(function() {
		var mediaID = $(this).attr("mediaid");
		var pictureText = $('.nu-timeline-cms-pictureTextArea[mediaid='+mediaID+']').val();
		var article = $('#editFormHiddenContentID').val();
		
		
		$.post('ajaxPostPictureText.php', {pictureText: pictureText, article: article, mediaID: mediaID});
		
		var field = "Bildetekst";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
		
	})
}

function postEscenicVideoID() { // Saves selected video
	$('#nu-timeline-cms-saveVideoBtn').click(function() {
	
		window.vidEscenicID = $('#nu-timeline-cms-vidEscenicID').val();
		var article = $('#editFormHiddenContentID').val();
		
		$.post('ajaxGetEscenicVideo.php', {vidEscenicID: vidEscenicID, article: article});
		getEscenicVideoID();
		
		var field = "Video";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
	});
}

function getEscenicVideoID() { // Gets video from DB and embeds it
	var id = window.location.search;
	$.get('ajaxGetEscenicVideo.php'+id, function(data){
		$('#nu-timeline-cms-videoPreview').html(data);
	});
}

function deleteVideo() { // Deletes selected video
	$('#nu-timeline-cms-deleteVideoBtn').click(function() {
		var delVideo = "delete";
		var article = $('#editFormHiddenContentID').val();
		
		$.post("ajaxGetEscenicVideo.php", {delVideo: delVideo, article: article});
		getEscenicVideoID();
		
		var field = "Video";
		var statusColor = "red";
		
		statusMessage(field, statusColor);
	});
}

// Google map functions START //
function initializeMap(){ // Initializes the map 

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
			    map.setZoom(17);  
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

function geocodePosition(pos){ // Geocodes the position and returns formatted adress
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
	
function updateMarkerPosition(latLng) { // Returns coordinates
    document.getElementById('nu-timeline-cms-hiddenCoords').innerHTML = [
        latLng.lat(),
        latLng.lng()
    ].join(', ');
}

function updateMarkerAddress(str) { // Updates the field for closest adress
    document.getElementById('nu-timeline-cms-address').innerHTML = str;
}


 
function saveMapCoords() { // Saves the selected map and coordinates to db
	$('#nu-timeline-cms-saveMapButton').click(function(){
		
		var article = $('#editFormHiddenContentID').val();
		var hiddenCoords = $('#nu-timeline-cms-hiddenCoords').html();
		var array = hiddenCoords.split(", ");
		window.lats = array[0];
		window.longs = array[1];
		var zooms = map.getZoom();
		
		var coords = lats + "," + longs + "," + zooms; 
		
		$.post('ajaxGoogleMaps.php', {coords: coords, article: article});
		
		var field = "Kartposisjon";
		var statusColor = "green";
		
		statusMessage(field, statusColor);
	});
}

function getMapData() { // Gets mapdata from db
	var id = window.location.search;
	$.get('ajaxGoogleMaps.php'+id, function(data){
		window.mapDataFromDb = data;
		var array = mapDataFromDb.split(",");
		window.getLat = array[0];
		window.getLong = array[1];
		window.getZoom = array[2];
		
	});
	
}
// Google map functions END //
// Media functions END //


function getTimelineCode() { // Gives the user a link to publish in Escenic
	$('#nu-timeline-cms-tlCodeBtn').click(function(){
			var tlID = window.location.search.substring(4);
			var split = tlID.split('&');
			var newtlID = split[0];
		
			var popup = prompt("Kopier denne koden inn i Escenic:","<div class='nu-timeline-wrapper'></div><script type='text/javascript'>getTimeline("+newtlID+")</script>");
	});
}




