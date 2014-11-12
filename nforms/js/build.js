jQuery(document).ready(function () {


  jQuery('body').on('click','.nform_li', function()
  {

    var id = this.id.split('_');
    jQuery('.nform_li').removeClass('nform_li_before');
    jQuery(this).addClass('nform_li_before');
    jQuery('.nform_edit_div').stop().slideUp();
    if(jQuery('#edit_'+id[1]).css('display')!='block')
    {

      jQuery('#edit_'+id[1]).slideDown();

    }

  });

  jQuery('body').on('click','.min-btn', function()
  {

    // Minimize Field Options
    jQuery('.nform_edit_div').stop().slideUp();
    
    // Remove Focus on Minimize
    jQuery('.nform_li_before').each(function(){
      jQuery(this).removeClass('nform_li_before');
    });

  });


  // Save Form Every 30 Seconds
  setInterval(save_nform, 30000);
  setInterval(function(){add_sliders(1);},1000);


  jQuery('.btn-toggle').click(function(){
    if (jQuery(this).hasClass('active'))
    {
      jQuery(this).removeClass('active');
    }
    else 
    {
      jQuery(this).addClass('active');
    }
  });

  jQuery('body').on('mouseover', '#well .accordion-toggle', function() {
    var id = jQuery(this).attr('id').substring(4,3);
    jQuery('#fe'+id).addClass('fehover');
  });
  jQuery('body').on('mouseout', '#well .accordion-toggle', function() {
    var id = jQuery(this).attr('id').substring(4,3);
    jQuery('#fe'+id).removeClass('fehover');
  });

  jQuery('body').on('mouseover', '#well .accordion-body.collapse', function() {
    var id = jQuery(this).attr('id').substring(8,11);
    jQuery('#fe'+id).addClass('fehover');
  });
  jQuery('body').on('mouseout', '#well .accordion-body.collapse', function() {
    var id = jQuery(this).attr('id').substring(8,11);
    jQuery('#fe'+id).removeClass('fehover');
  });





 }); // End of Document Ready


