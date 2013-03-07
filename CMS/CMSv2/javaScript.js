$(document).ready(function(){
	
	fixSelectedBackground(); //DEPRECIATED BY TORSTEIN ;/
	
	$('#nu-timeline-cms-tlInfo').click(function(){
		$('.tlOpenCloseArrow').toggleClass('tlDroppedDown');	
		$('#nu-timeline-cms-slide').slideToggle(100);
		
	});    	
	
	var hidden = $('#nu-timeline-cms-hiddenInput').val();
	if(hidden == "OK") {
		$('#nu-timeline-cms-slide').show();
	}

	tlInfoPostOnBlurInput();
	tlInfoPostOnBlurText();
		 
	editorPostOnBlur();
	inputPostOnBlur();
	updateDate();
	
});
	   
function editorPostOnBlur(){
	CKEDITOR.replace( 'articleText' );
	var editor = CKEDITOR.instances['text'];
   
	
	editor.on('blur', function() {
		var text = editor.getData();
		var contentID = $('input#TESTcontentID').val();
			
		editor.updateElement();
		$.post('test.php', {text: text, contentid: contentID});
		updateArticlesOnBlur();
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
		updateArticlesOnBlur();
	});
}

function updateDate(){
	$( ".datepicker" ).datepicker({
		onSelect: function(){
			datepickerDate = $(this).val();
			var contentID = $('input#TESTcontentID').val();
			
			$.post('test.php', {dato: datepickerDate, contentid: contentID});
			updateArticlesOnBlur();
		}
	});
}

function tlInfoPostOnBlurInput(){
	$('#nu-timeline-cms-tlInfoForm input').blur(function(){
		var title = $('input#nu-timeline-cms-tlInfoFormTitle').val();
		var tlID = $('input#nu-timeline-cms-tlInfoFormHiddenID').val();

		$.post('ajaxPOSTtlInfo.php', {title: title, tlID: tlID});
	});
}

function tlInfoPostOnBlurText(){
	$('#nu-timeline-cms-tlInfoForm textarea').blur(function(){
		var text = $('textarea#nu-timeline-cms-tlInfoFormText').val();
		var tlID = $('input#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxPOSTtlInfo.php', {text: text, tlID: tlID});
	});
}

function updateArticlesOnBlur(){
/* IN PROGRESS */
	$.get('whatever.php', function(data){
		$('#nu-timeline-cms-vNav').html(data);
	});
	
	
	
	
	
	/*
var cID = 
	
	html = "";
	html += "<div class='nu-timeline-cms-article article"
	. $row['content_ID'].
	html += "' onclick='hentArtikkelInnhold("
	.$row['tl_ID'].
	html += ","
	.$row['content_ID'].
	html += ")'>"
	html += "<div class='nu-timeline-cms-articleTitle'>"
	.$row['content_title'].
	html += "</div>"+"<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textInactive'>Draft</div>"+"<div class='nu-timeline-cms-articleDate'>"
	.$row['content_date'].
	html += "</div>"+"<div class='nu-timeline-cms-articleContent'>"
	.$trimContent.
	html += "</div>"+"</div>";	
*/
}




















