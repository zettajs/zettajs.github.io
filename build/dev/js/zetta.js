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
  
  $('p img:only-child').each(function(){
    $(this).parent().addClass('image-only');
  });
  
  //Modal
  $('#modal .close b').click(function(){$('#modal').hide();});
  $('gallery img').addClass('zoom');
  
  $('img').on('click', '.zoom', function(){ console.log('working'); });
  
  $('img.fritzing, img.zoom').click(function(){
    $('#modal .main').css({
      'background-image': 'url(' + $(this).attr('src') + ')'
    });
    $('#modal .title').html($(this).attr('alt'));  
    $('#modal').show();
  });
  
  
  
});