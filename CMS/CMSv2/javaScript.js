$(document).ready(function(){

	fixSelectedBackground(); //DEPERCIATED BY TORSTEIN ;/

	$('#nu-timeline-cms-tlInfo').click(function(){
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
	});
}

function inputPostOnBlur(){
   $('#nu-timeline-cms-editForm input').blur(function(){
		var title = $('input#nu-timeline-cms-TESTcontentTitle').val();
		/* var date = $('input#nu-timeline-cms-TESTcontentDate').val(); */
		var time = $('input#tid').val();
		/* var text = $('textarea#text').val(); */
		var tlID = $('input#TESTtlID').val();
		var contentID = $('input#TESTcontentID').val();
		
		$.post('test.php', {overskrift: title, tid: time, tlid: tlID, contentid: contentID});
	});
}

function updateDate(){
	$( ".datepicker" ).datepicker({
		onSelect: function(){
			datepickerDate = $(this).val();
			var contentID = $('input#TESTcontentID').val();
			
			$.post('test.php', {dato: datepickerDate, contentid: contentID});
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