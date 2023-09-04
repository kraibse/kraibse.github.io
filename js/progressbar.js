$(window).on('scroll', function() {
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    var scrollTop = $(window).scrollTop();
    var progress = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    $('.progress-bar').css('width', progress + '%');
  });
  
  