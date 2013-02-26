$(document).ready(function(){
//open popup
	$(".btn-danger").click(function(){
		$("#nu-timeline-cms-fade").css("height", $(document).height());
		$("#nu-timeline-cms-fade").fadeIn(200);
		$("#nu-timeline-cms-popWindow").fadeIn(200);
		positionPopup();
	});
 
//close popup
	$("#close").click(function(){
		$("#nu-timeline-cms-fade").fadeOut(200);
		$("#nu-timeline-cms-popWindow").fadeOut(200);
	});
});
 
//position the popup at the center of the page
function positionPopup(){
	if(!$("#nu-timeline-cms-popWindow").is(':visible')){
		return;
		}
	$("#nu-timeline-cms-popWindow").css({
		left: ($(window).width() - $('#nu-timeline-cms-popWindow').width()) / 2,
		top: ($(window).width() - $('#nu-timeline-cms-popWindow').width()) / 4,
		position:'absolute'
	});
}
 
//maintain the popup at center of the page when browser resized
$(window).bind('resize',positionPopup);
