/***
  Zettajs.org
  ----------------------
  author: 2014 Alan Languirand alanguirand@apigee.com
***/

hljs.initHighlightingOnLoad();

$(function(){
  
  //github style header linking in articles
  $('article').find('h1, h2, h3, h4, h5, h6').click(function(){
    window.location.hash = $(this).attr('id');
  });
  
  //auto select npm install text on homepage
  $('.install input').on('click focus', function(){$(this).select();});
  
  //Want autosizing images without javascript? Hey, at least js isn't doing any maths :)
  $('.example').each(function(){
    var src = $(this).find('img').attr('src');
    //$(this).find('img').hide();
    $(this).css('background-image', 'url('+src+')');
  });
  
  //just toggling classes for the mobile menu + button. css handles the animation
  $("#navToggle button").click(function(){
    if($(this).hasClass('open')){
      $(this).removeClass('open');
      $("#hero nav").addClass('closed');
    }
    else{
      $(this).addClass('open');
      $("#hero nav").removeClass('closed');
    }
  });
  
  
  
  
  
});