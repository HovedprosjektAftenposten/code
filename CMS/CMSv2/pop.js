$(document).ready(function(){
//open popup
	$("#pop").click(function(){
		$("#fade").css("height", $(document).height());
		$("#fade").fadeIn(200);
		$("#popWindow").fadeIn(200);
		positionPopup();
	});
 
//close popup
	$("#close").click(function(){
		$("#fade").fadeOut(200);
		$("#popWindow").fadeOut(200);
	});
});
 
//position the popup at the center of the page
function positionPopup(){
	if(!$("#popWindow").is(':visible')){
		return;
		}
	$("#popWindow").css({
		left: ($(window).width() - $('#popWindow').width()) / 2,
		top: ($(window).width() - $('#popWindow').width()) / 2,
		position:'absolute'
	});
}
 
//maintain the popup at center of the page when browser resized
$(window).bind('resize',positionPopup);
