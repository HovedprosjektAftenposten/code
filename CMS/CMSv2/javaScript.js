$(document).ready(function(){
	$( ".datepicker" ).datepicker();

	fixSelectedBackground(); //DEPERCIATED BY TORSTEIN ;/

	$('#nu-timeline-cms-tlInfo').click(function(){
		$('#nu-timeline-cms-slide').slideToggle(100);	
	});    	
	
	var hidden = $('#nu-timeline-cms-hiddenInput').val();
	if(hidden == "OK") {
		$('#nu-timeline-cms-slide').show();
	}

	CKEDITOR.replace( 'articleText' );
		 
	editorPostOnBlur();
	inputPostOnBlur();
	
	tlInfoPostOnBlurInput();
	tlInfoPostOnBlurText();
});
	   
function editorPostOnBlur(){
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
		var date = $('input#nu-timeline-cms-TESTcontentDate').val();
		var time = $('input#tid').val();
		/* var text = $('textarea#text').val(); */
		var tlID = $('input#TESTtlID').val();
		var contentID = $('input#TESTcontentID').val();
		
		$.post('test.php', {overskrift: title, dato: date, tid: time, tlid: tlID, contentid: contentID});
	});
}

function tlInfoPostOnBlurInput(){
	$('#nu-timeline-cms-tlInfoForm input').blur(function(){
		var title = $('input#nu-timeline-cms-tlInfoFormTitle').val();
		var date = $('input#nu-timeline-cms-tlInfoFormDate').val();
		var tlID = $('input#nu-timeline-cms-tlInfoFormHiddenID').val();
		
		$.post('ajaxPOSTtlInfo.php', {title: title, date: date, tlID: tlID});
	});
}

function tlInfoPostOnBlurText(){
	$('#nu-timeline-cms-tlInfoForm textarea').blur(function(){
		var text = $('textarea#nu-timeline-cms-tlInfoFormText').val();
		alert(text);
		$.post('ajaxPOSTtlInfo.php', {text: text});	
	});
}