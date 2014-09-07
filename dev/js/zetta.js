/***
  Zettajs.org
  ----------------------
  author: 2014 Alan Languirand alanguirand@apigee.com
***/

$(function(){
   var mqbreak = 100;
  //TODO: inventory images in features and make sure dimensons are set for skrollr
  var skroll = null;
  
  //auto select npm install text on homepage
  $('.install input').on('click focus', function(){$(this).select();});
  
  //
  
  $('#mqtest').change(function(){
    //something else;
    if(mqbreak > 2){
      $('.example').each(function(){
        var src = $(this).find('img').attr('src');
        $(this).find('img').hide();
        $(this).css('background-image', 'url('+src+')');
      });
      
    }else {
       $('.example').each(function(){
        $(this).find('img').show();
        $(this).removeAttr('style');
       });
    }
    
  });
  
  $('.example').each(function(){
    var src = $(this).find('img').attr('src');
    $(this).find('img').hide();
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
  
  /*  
      Hijack Prism's line highlighter metrics and cast as a background image for z-index-free color layering
      The background image is specified in css as a linear gradient between two identical colors @0,0, height: 0; 
  */
  
  window.setTimeout(mqtest, 50);
  updateArrows();
  $(window).resize(function(){
      mqtest();
      updateArrows();
  }); //window resize
  
  function mqtest(){
    var mqlevel = $('#mqtest').css('z-index');
    if(mqlevel != mqbreak){
      mqbreak = mqlevel;
      $('#mqtest').val(mqlevel);
      $('#mqtest').trigger('change');
    } 
  }
  
  $('#mqtest').change(function(){
    //inspect the mqbreak variable to figure out what breakpoint you're at!
    if(mqbreak > 2){
      skroll = skrollr.init();
      
    }else {
      if(skroll !== null){
        skroll.destroy();
        skroll = null;
      } 
    }
  });
  
  function updateArrows(){
    //css media query breakpoints change the border color. Easier than doing math on the window, and keeps mq metrics where they belong!
    if($('.hilight').first().find('.arrow').css('border-left-color') != 'rgba(0, 0, 0, 0)'){
      $('.line-highlight').remove();
      Prism.highlightAll(false, function(){
          $('.line-highlight').each(function(){
            //sniff out the metrics we need
            var hl = {
              pre: $(this).parent().parent(), // we can do this b/c prism only works with a <code> inside a <pre>
              size: $(this).height(),
              half_size: $(this).height()/2,
              top: parseInt($(this).css('top')) -1
            };
            //add the <pre>'s padding-top to the offset for the image
            hl.padding_top = parseInt(hl.pre.css('padding-top'));
            hl.padding_left = parseInt(hl.pre.css('padding-left'));
            hl.offset = hl.top + hl.padding_top;

            //move default hidden bg image into position: 
            hl.pre.css('background-size', '100% ' + hl.size + 'px');
            hl.pre.css('background-position', '0 ' + hl.offset + 'px');

            //resize the css arrow
            hl.pre.find('.arrow')
              .css('border-top-width', hl.half_size + 'px')
              .css('border-bottom-width', hl.half_size + 'px')
              .css('margin-top', hl.top + 'px')
              .css('margin-left', (hl.pre.width() + hl.padding_left) + 'px');

            //un-hide the css arrow
            hl.pre.addClass('hilight');
          }); //.line-highlight .each
      }); //Prism.highlightAll
    }else {
      $('pre.arrow').removeAttr('style');
    }
  }
  
  
});