$(document).ready(function(){
	
	/* fixSelectedBackground(); */ //DEPRECIATED BY TORSTEIN ;/
	
	$('#nu-timeline-cms-tlInfo').click(function(){
		$('.tlOpenCloseArrow').toggleClass('tlDroppedDown');	
		$('#nu-timeline-cms-slide').slideToggle(100);
		
	});    	
	
	var hidden = $('#nu-timeline-cms-hiddenInput').val();
	if(hidden == "OK") {
		$('#nu-timeline-cms-slide').show();
	}
	
	updateArticles();
	tlInfoPostOnBlurInput();
	tlInfoPostOnBlurText();
		 
	editorPostOnBlur();
	inputPostOnBlur();
	updateDate();
	deleteArticles();
});
	   
function editorPostOnBlur(){
	CKEDITOR.replace( 'articleText' );
	var editor = CKEDITOR.instances['text'];
   
	
	editor.on('blur', function() {
		var text = editor.getData();
		var contentID = $('input#TESTcontentID').val();
			
		editor.updateElement();
		$.post('test.php', {text: text, contentid: contentID});
		updateArticles();
	});
}

function inputPostOnBlur(){
   $('#nu-timeline-cms-editForm input').blur(function(){
		var title = $('input#nu-timeline-cms-TESTcontentTitle').val();
		var time = $('input#tid').val();
		var picPath = $('input#purl').val();
		var tlID = $('input#TESTtlID').val();
		var contentID = $('input#TESTcontentID').val();
		
		$.post('test.php', {overskrift: title, tid: time, purl: picPath, tlid: tlID, contentid: contentID});
		updateArticles();
	});
}

function updateDate(){
	$( ".datepicker" ).datepicker({
		onSelect: function(){
			datepickerDate = $(this).val();
			var contentID = $('input#TESTcontentID').val();
			
			$.post('test.php', {dato: datepickerDate, contentid: contentID});
			updateArticles();
		}
	});
}

function tlInfoPostOnBlurInput(){
	$('#nu-timeline-cms-tlInfoForm input').blur(function(){
		var title = $('input#nu-timeline-cms-tlInfoFormTitle').val();
		var tlID = $('input#nu-timeline-cms-tlInfoFormHiddenID').val();

		$.post('ajaxPOSTtlInfo.php', {title: title, tlID: tlID});
		updateArticles();
	});
}

function tlInfoPostOnBlurText(){
	$('#nu-timeline-cms-tlInfoForm textarea').blur(function(){
		var text = $('textarea#nu-timeline-cms-tlInfoFormText').val();
		var tlID = $('input#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxPOSTtlInfo.php', {text: text, tlID: tlID});
		updateArticles();
	});
}

function updateArticles(){
/* IN PROGRESS */
	var id = window.location.search;
	$.get('whatever.php'+id, function(data){
		$('#nu-timeline-cms-vNav').html(data);
	});
}	
	
function deleteArticles(){
	$('.btn-danger').click(function(){
		var deleteArticle = confirm('Vil du slette hendelsen?');
		var id = window.location.search;
		
		if(deleteArticle == true){
			var slett = 'ja';
			$.post('deleteContent.php'+id, {deleteContent: slett});
			updateArticles();
			
			$('ul li > ul').hide();		
			$('.arrow').removeClass('droppedDown');	
			
		}else{
			var angre = 'nei';
			$.post('deleteContent.php'+id, {goBack: angre});
		}
	});
}




















