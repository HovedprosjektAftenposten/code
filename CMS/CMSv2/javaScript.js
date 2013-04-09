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
		$('#nu-timeline-cms-slide').slideToggle(100);
		
	});    	
	
	var hidden = $('#nu-timeline-cms-hiddenInput').val();
	if(hidden == "OK") {
		$('#nu-timeline-cms-slide').show();
	}
	
	
	showCategories();
	tlInfoPostOnBlurInput();
	tlInfoPostOnBlurText();
		 
	addCategories();
	addImportant();
		 
	editorPostOnBlur();
	inputPostOnBlur();
	updateDate();
	deleteArticles();
	
	saveArticleCategory();
});

function tlInfoPostOnBlurInput(){
	$('#nu-timeline-cms-tlInfoFormTitle').blur(function(){
		var title = $('#nu-timeline-cms-tlInfoFormTitle').val();
		var tlID = $('#nu-timeline-cms-tlInfoFormHiddenID').val();

		$.post('ajaxPOSTtlInfo.php', {title: title, tlID: tlID});
		var field = "Tittel";
		
		statusMessage(field);
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
		
		statusMessage(field);
		fetchTimeDate();
	});
}

function addCategories(){
	$('#nu-timeline-cms-addCategoryBtn').click(function(){
		var category = $('#nu-timeline-cms-tlInfoFormCategoryInput').val();
		var tlID = $('#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxPOSTtlInfo.php', {category: category, tlID: tlID});
		var field = "Kategori";
		
		var full = $('#editFormHiddenCategory').val();
		fetchTimeDate();
		showCategories();
		
		
		if(!full){
		
			statusMessage(field);
		}else{
			$('#nu-timeline-cms-statusMessage').fadeIn();
			$('#nu-timeline-cms-statusMessage').html('<p style="color: red; text-align: center">Maks antall kategorier er nådd</p>');
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
		
		statusMessage(field);
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
		color: 'blanchedalmond',
		palette: [
        ['black', 'white', 'blanchedalmond',
        'rgb(255, 128, 0);', 'hsv 100 70 50'],
        ['red', 'yellow', 'green', 'blue', 'violet']
        ]
	});
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
		
		statusMessage(field);
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
		
		fetchTimeDate();
		statusMessage(field);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormContentTime').blur(function(){
		var time = $('#nu-timeline-cms-editFormContentTime').val();
		$.post('test.php', {tid: time, tlid: tlID, contentid: contentID});
		var field = "Tid";
		
		fetchTimeDate();
		statusMessage(field);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormContentPic').blur(function(){
		var picPath = $('#nu-timeline-cms-editFormContentPic').val();
		$.post('test.php', {purl: picPath, tlid: tlID, contentid: contentID});
		var field = "Bilde";
		
		fetchTimeDate();
		statusMessage(field);
		updateArticles();
		});
	$('#nu-timeline-cms-editFormCustomTimeDate').blur(function(){
		var custom = $('#nu-timeline-cms-editFormCustomTimeDate').val();
		$.post('test.php', {custom: custom, tlid: tlID, contentid: contentID});
		var field = "Egendefinert";
		
		fetchTimeDate();
		statusMessage(field);
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
			
			fetchTimeDate();
			statusMessage(field);
			updateArticles();
		}
	});
}

function updateArticles(){
	var id = window.location.search;
	$.get('whatever.php'+id, function(data){
		$('#nu-timeline-cms-vNav').html(data);
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
			
			$('#nu-timeline-cms-statusMessage').fadeIn();
			$('#nu-timeline-cms-statusMessage').html('<p style="color: red; text-align: center">Hendelse er slettet</p>');
			$('#nu-timeline-cms-statusMessage').fadeOut(3000);
			
			
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

function updateTimelineName(){
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
		
		fetchTimeDate();
		statusMessage(field);
	});
}

function statusMessage(field){
	$('#nu-timeline-cms-statusMessage').fadeIn();
	$('#nu-timeline-cms-statusMessage').html('<p style="color: green; text-align: center">'+field+' er oppdatert</p>');
	$('#nu-timeline-cms-statusMessage').fadeOut(3000);
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









