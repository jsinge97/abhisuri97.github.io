jQuery(document).ready(function () {


  jQuery('#myModal').css('marginLeft',-jQuery('#myModal').width()/2);
  jQuery('#myModal').css('backgroundColor','none');

  jQuery('.ui-slider-range.ui-widget-header').css('width','0');
  jQuery('.form_ul').show();
  jQuery('.form_ul li').show();
  jQuery('.form_submit').show();
  jQuery('.form_ul .nform_res').hide();

  if(jQuery('.ref_link').html()=='')
  {
    jQuery('.ref_link').attr('href','');
  }

});

function increment_form(idd)
{

  var id = idd.split('_');

  jQuery.ajax({
    dataType: 'json',
    type: "POST",
    url: 'function.php',
    data: 'id='+id[0]+'&action=nform_increment',
    success: function (response) {
    }
  });
}


// Initialize the Sliders
function add_sliders(options)
{


  // File Upload JS Functions

  jQuery(function () {

    if (jQuery('.fileupload').length)
    {
      jQuery('.fileupload').fileupload({
        dataType: 'json',
        add: function (e, data) {
          var len = jQuery('.upload_ul li').length;
          jQuery("<li id='li_upload_"+len+"'><div class='file-upload-cover'><span class='progress progress-striped'><span class='bar' style='width: 0%'></span></span><span class='cover_fileupload'></span></div></li>").appendTo('.upload_ul');
          data.fname = jQuery('<span class="file_name"></span>')
          .appendTo('#li_upload_'+len+' .cover_fileupload')
          data.hidden = jQuery('<input type="hidden" name="files_file'+len+'">')
          .appendTo('#li_upload_'+len+' .cover_fileupload')
          data.submit();
        },
        done: function (e, data) {
          if (jQuery('.upload_hidden').val()==null)
          {
            jQuery('.upload_hidden').val(1);
          }
          else
          {
            jQuery('.upload_hidden').val(parseInt(jQuery('.upload_hidden').val())+1);
          }
          var len = jQuery('.upload_ul li').length-1;
          data.hidden.val(data.result.files[0].url);
          jQuery('<span class="name_bar">'+data.result.files[0].name+'</span>').appendTo('#li_upload_'+len+' .bar');
          jQuery('<i data-url="'+data.result.files[0].url+'" class="icon-trash" title="Delete"></i>').appendTo(data.fname).click(function(){

            jQuery.ajax({
              url: 'function.php',
              type: "POST",
              data: 'action=nform_delete_file&url='+encodeURIComponent(jQuery(this).attr('data-url')),
              success: function (response) {
                if (response=='Deleted')
                {
                  jQuery(data.fname).text('');
                  jQuery('<span style="color: red; font-weight: bold">Deleted</span>').appendTo(data.fname);
                  jQuery('.upload_hidden').val(parseInt(jQuery('.upload_hidden').val())-1);
                }
              },
              error: function (response) {
              }
            });

          });
          jQuery.each(data.result.files, function (index, file) {
          });
        },
        progressall: function (e, data) {
          var len = jQuery('.upload_ul li').length-1;
          var progress = parseInt(data.loaded / data.total * 100, 10);
          jQuery('#li_upload_'+len+' .progress .bar').css(
            'width',
            progress + '%'
            );
        }
      });    }

});





jQuery('.nform .fileupload').attr('data-url', 'file-upload/server/php/');

jQuery('.slider').each(function(){

  var id = this.id.split('_');

  if (!(id[3]))
  {
    id[3] = 0;
  }
  if (!(id[4]))
  {
    id[4] = 100;
  }

  if (options && jQuery("#"+this.id).hasClass('ui-slider'))
  {

    jQuery( "#"+this.id ).slider('option', {
      min: parseInt(id[3]),
      max: parseInt(id[4])
    });
  }
  else 
  {
    jQuery( "#"+this.id ).slider({
      min: parseInt(id[3]),
      max: parseInt(id[4]),
      range: 'min',
      value: 0,
      slide: function( event, ui ) 
      {
        jQuery( "#"+this.id+"_val" ).html( ui.value );
        jQuery( "#"+this.id+"_val2" ).val( ui.value );
      }
    });
  }

})


jQuery('.slider-range').each(function(){

  var id = this.id.split('_');

  if (!(id[3]))
  {
    id[3] = 0;
  }
  if (!(id[4]))
  {
    id[4] = 100;
  }

  if (options && jQuery("#"+this.id).hasClass('ui-slider'))
  {

    jQuery( "#"+this.id ).slider('option', {
      min: parseInt(id[3]),
      step: Math.max(parseInt(id[4])/100, 1),
      max: parseInt(id[4])
    });
  }
  else 
  {
    jQuery( "#"+this.id ).slider({
      min: parseInt(id[3]),
      step: Math.max(parseInt(id[4])/100, 1),
      max: parseInt(id[4]),
      range: true,
      values: [0, parseInt(id[4])*.3],
      slide: function( event, ui ) 
      {
        jQuery( "#"+this.id+"_val" ).html( ui.values[0]+' - '+ui.values[1] );
        jQuery( "#"+this.id+"_val2" ).val( ui.values[0]+', '+ui.values[1] );
      }
    });
  }

})


}



// Setup the Radios and CheckBoxes
function setupLabel() {

  if (jQuery('.label_check input').length) {
    jQuery('.label_check').each(function(){ 
      jQuery(this).removeClass('c_on');
    });
    jQuery('.label_check input:checked').each(function(){ 
      jQuery(this).parent('label').addClass('c_on');
    });                
  };
  if (jQuery('.label_radio input').length) {
    jQuery('.label_radio').each(function(){ 
      jQuery(this).removeClass('r_on');

    });
    jQuery('.label_radio input:checked').each(function(){ 
      jQuery(this).parent('label').addClass('r_on');
    });
  };
};

// Setup the DatePicker
function jq_functions()
{
 setupLabel();
}


jQuery.fn.mySerialize = function(id) 
{
  var returning = '';
  jQuery('#'+id+'.nform input[type=radio], #'+id+'.nform input[type=checkbox]').each(function()
  {
    var name = this.name;
    var radio_check = jQuery("input[name='"+name+"']");
    if( radio_check.filter(':checked').length == 0)
    {

      returning += '&'+name+'=';

    }         
  })
  return returning+"&";

};

// Submit the Form
function submit_nform(id)
{
  jQuery('#'+id+' .nform_res').fadeOut();
  jQuery('#'+id+' .nform_res').html('');
  jQuery('#'+id+'.nform .submit_button').button('loading');
  var fid = jQuery('#'+id+' .form_id').attr('val');
  var title = jQuery('#'+id+' .form_title').html();
  jQuery.ajax({
    dataType: 'json',
    type: "POST",
    url: 'function.php',
    data: 'id='+fid+'&action=nform_submit&'+jQuery('#'+id).mySerialize(id)+jQuery('#'+id).serialize()+'&title='+title,
    success: function (response) {

      jQuery('#'+id+'.nform .submit_button').button('reset');
      jQuery('#'+id+' .valid_show').css('display','none');


      if (response.sent=='false')
      {

        jQuery('#'+id+' .nform_res').html(response.msg);
        jQuery('#'+id+' .nform_res').removeClass('alert alert-success alert-error');
        jQuery('#'+id+' .nform_res').addClass('alert alert-error');
        jQuery('#'+id+' .nform_res').fadeIn();
      }
      else if (response.sent=='true') 
      {

        jQuery('#'+id+' .form_submit').slideUp();
        jQuery('#'+id+' .form_ul').fadeOut(function(){
          jQuery('#'+id+' .form_ul li').hide();
          jQuery('#'+id+' .form_ul').append('<div class="nform_res">'+response.msg+'</div>');
          jQuery('#'+id+' .nform_res').removeClass('alert alert-success alert-error');
        });
        jQuery('#'+id+' .form_ul').fadeIn();

        if (response.redirect && !(jQuery('.ff_c_t').length))
        {
         window.location.href=response.redirect;
       }


     };
     for (var key in response)
     {
      if (response.hasOwnProperty(key)) 
      {
        jQuery('#'+id+' .valid_show.'+key).css('display','inline');
        jQuery('#'+id+' .valid_show.'+key).css('margin-left','60px');
        jQuery('#'+id+' .valid_show.'+key).css('opacity','0');

        jQuery('#'+id+' .'+key).html(response[key]);
        jQuery('#'+id+'.one .'+key).animate({
          marginLeft:'17px',
          opacity: .9
        }, 400);
        jQuery('#'+id+'.two .'+key).animate({
          marginLeft:'-14px',
          opacity: .9
        }, 400);
        jQuery('#'+id+'.three .'+key).animate({
          marginLeft:'-34px',
          opacity: .9
        }, 400);
      }   
    }


  },
  error: function (response) 
  {
    jQuery('#'+id+'.nform .submit_button').button('reset');
    jQuery('#'+id+' .nform_res').html(response.msg);
    jQuery('#'+id+' .nform_res').removeClass('alert alert-success alert-error');
    jQuery('#'+id+' .nform_res').addClass('alert alert-error');
    jQuery('#'+id+' .nform_res').fadeIn();
  }
});

}


function update_date()
{

  var lang = jQuery('.datepickermdy').attr('lang');
  var dmy = jQuery('.datepickermdy').attr('format');

  if (lang==undefined)
  {
    if (dmy==undefined) {dmy='mm-dd-yyyy';}



      jQuery('.datepickermdy').datepicker(
      {
        'format': dmy,
        'language': lang,
        'autoclose': true
      });



  }

  else
  {
    jQuery.get("datepicker/js/locales/bootstrap-datepicker."+lang+".js", function(){



      jQuery('.datepickermdy').datepicker(
      {
        'format': dmy,
        'language': lang,
        'autoclose': true
      });


    });

  }


}

jQuery(document).ready(function () {


  // Call Sliders
  add_sliders();

  // Initialize DatePicker
  update_date();

  // Update DatePicker on Change in Config
  jQuery('body').on('change','.language_select',function(){

    var lang = jQuery('.datepickermdy').attr('lang');
    var dmy = jQuery('.datepickermdy').attr('format');

    jQuery.get("datepicker/js/locales/bootstrap-datepicker."+lang+".js", function(){

     jQuery('.datepickermdy').datepicker('remove');
     jQuery('.datepickermdy').datepicker(
     {
      'format': dmy,
      'language': lang,
      'autoclose': true
    });

   });

  })

  jQuery('.tool').tooltip({trigger: 'hover', placement: 'top'});

  jQuery('body').addClass('has-js');
  jQuery('.valid_show').css('display','none');
  jQuery('.nform_res').css('display','none');
  jQuery('.upload_ul').html('');

  jQuery('body').on("click",'.label_check, .label_radio' , function(){
    setupLabel();
  });
  jq_functions();

  // Reset Captcha
  jQuery('body').on('click', '.c_image', function () {
    jQuery(this).attr('src', jQuery(this).attr('src')+'_'+Math.random())
  });

  setInterval(function(){jq_functions();},1000);

});