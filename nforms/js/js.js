function save_form(build, option, con, rec)
{
  jQuery('#save_form_btn').button('loading');
  var build = jQuery.toJSON(build);
  build = encodeURIComponent(build);
  var option = jQuery.toJSON(option);
  option = encodeURIComponent(option);
  var rec = jQuery.toJSON(rec);
  rec = encodeURIComponent(rec);
  var con = jQuery.toJSON(con);
  con = encodeURIComponent(con);
  var html = encodeURIComponent(jQuery('.html_here').html());
  var id = jQuery('.form_id').attr('val');
  jQuery.ajax({
    url: 'function.php',
    type: "POST",
    data: 'action=fluid_update&content='+html+'&build='+build+'&option='+option+'&con='+con+'&rec='+rec+'&id='+id,
    success: function (response) {
      jQuery('#save_form_btn').button('reset');
    },
    error: function (response) {
      jQuery('#save_form_btn').button('reset');
    }
  });

}


function add_sliders(options)
{

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

  });


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

  });


}



// Create a New Form
function submit_new_form()
{
  jQuery('.response_ajax').html('processing ...');
  jQuery.ajax({
    url: 'function.php',
    type: "POST",
    dataType: 'json',
    data: 'action=fluid_add&'+jQuery('#new_form').serialize(),
    success: function (response) {
      if (response.Added)
      {
      jQuery('.response_ajax').html('Added');
      window.location.href = 'builder.php?&id='+response.Added;
      }
      else if (response.Error)
      {
      jQuery('.response_ajax').html(response.Error);
      }
    },
    error: function (response) {
      jQuery('.response_ajax').html(response);
    }
  });

}

// Trigger a Click on 'SAVE' button
var save_nform = function save_nform()
{
  jQuery('#save_form_btn').trigger('click');
}





jQuery(document).ready(function () {



  // Delete File From File Manager

  jQuery('.delete_from_manager').click(function(){
    jQuery(this).button('loading');
    var id_this = this.id;
    jQuery.ajax({
      url: 'function.php',
      type: "POST",
      data: 'action=nform_delete_file&url='+encodeURIComponent(jQuery(this).attr('data-url')),
      success: function (response) {
        if (response=='Deleted')
        {
          jQuery('#'+id_this).removeClass('btn-danger');
          jQuery('#'+id_this).addClass('btn-success');
          jQuery('#'+id_this).button('complete');
        }
      },
      error: function (response) {
      }
    });
  });


  // Export Data to Excel
  jQuery('#export').click(function(){
    window.open('php/export.php','_blank');
  });


  // Update Submissions
  jQuery('.view_mess').click(function(){

    var id = jQuery(this).attr('id').split('_');
    var id2 = jQuery(this).attr('id');

    if (id[0]=='upd')
    {
      jQuery('#view_modal .modal-body').html(jQuery('#upd_text_'+id[1]).html());
      jQuery('#view_modal .myModalLabel').html(jQuery('#upd_name_'+id[1]).html());
      jQuery('#rd_'+id[1]).html('Read');
      jQuery(this).parent().parent().addClass('row_shade');
      jQuery.ajax({
        url: 'function.php',
        type: "POST",
        data: 'action=fluid_sub_upd&type=upd&id='+id[1],
        success: function (response) {
        },
        error: function (response) {
        }
      });
    }
    else if (id[0]=='del')
    {
      jQuery.ajax({
        url: 'function.php',
        type: "POST",
        data: 'action=fluid_sub_upd&type=del&id='+id[1],
        success: function (response) {
          if (response=='D')
          {
            jQuery('#'+id2).removeClass('icon-trash');
            jQuery('#'+id2).addClass('icon-ok');
          }
        },
        error: function (response) {
        }
      });
    }
    else if (id[0]=='read')
    {
      jQuery.ajax({
        url: 'function.php',
        type: "POST",
        data: 'action=fluid_sub_upd&type=read&id='+id[1],
        success: function (response) {
          if (response=='D')
          {
            jQuery('#rd_'+id[1]).html('Unread');
            jQuery('#'+id2).parent().parent().removeClass('row_shade');
          }
        },
        error: function (response) {
        }
      });
    }

  });

  // Set up DataTable
  if (jQuery('#subs').length)
  {
    jQuery('#subs').dataTable({
      "sPaginationType": "full_numbers"
    });
  }


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



  jQuery('.row_click').click(function() {
    var id = jQuery(this).parent('tr').attr('id');
    window.location.href = 'builder.php?id='+id;
  });


  jQuery('.delete-row').click(function() {
    if(jQuery(this).hasClass('btn-danger'))
    {
      var this_id = jQuery(this).attr('id');
      jQuery(this).button('loading');
      var id = jQuery(this).parent('td').parent('tr').attr('id');
      jQuery.ajax({
        url: 'function.php',
        type: "POST",
        data: 'action=fluid_del&id='+id,
        success: function (response) {
          if (response=='Deleted')
          {
            jQuery('#'+this_id).button('complete');
            jQuery('#'+this_id).removeClass('btn-danger');
            jQuery('#'+this_id).addClass('btn-success');
          }
        },
        error: function (response) {
          alert("There was an error.");
        }
      });
    }
  });



 }); // End of Document Ready





// declare a new module, and inject the $compileProvider
angular.module('compile', [], function($compileProvider) {


  // configure new 'compile' directive by passing a directive
  // factory function. The factory function injects the '$compile'
  $compileProvider.directive('compile', function($compile) {
    // directive factory creates a link function
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
           // watch the 'compile' expression for changes
           return scope.$eval(attrs.compile);
         },
         function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
        );
    };
  });
});




// Email Validation
function validateEmail(email) { 
  email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/i;
  if(!email_regex.test(email))
    { return false;  }
  else
    {return true;}
} 



 // Angular JS Function
 function bob_the_builder($scope)
 {

  J = new Object();
  J.B = window.jb;
  J.O = window.jo;
  J.R = window.jr;
  J.C = window.jc;


  var sortableEle;



  $scope.dragStart = function(e, ui) {
    ui.item.data('start', ui.item.index());
  }
  $scope.dragEnd = function(e, ui) {
    var start = ui.item.data('start'),
    end = ui.item.index();

    $scope.build.splice(end, 0, 
      $scope.build.splice(start, 1)[0]);

    $scope.$apply();
  }

  sortableEle = jQuery('.form_ul').sortable({
    placeholder: "li_placeholder",
    start: $scope.dragStart,
    update: $scope.dragEnd
  });
  sortableEle = jQuery('.form_ul').sortable({
    placeholder: "li_placeholder",
    start: $scope.dragStart,
    update: $scope.dragEnd
  });




  if (!(J.B))
  {
    $scope.build = [];
  }
  else 
  {
    $scope.build = jQuery.evalJSON(J.B);
  }

  $scope.build.le = $scope.build.length;

  var i = 0;
  $scope.build.captcha = 0;
  while (i<$scope.build.le)
  {
    if($scope.build[i].captcha==1)
    {
      $scope.build.captcha = 1;
    }
    i = i + 1;
  }

  var i = 0;
  $scope.build.upload = 0;
  while (i<$scope.build.le)
  {
    if($scope.build[i].upload==1)
    {
      $scope.build.upload = 1;
    }
    i = i + 1;
  }

  if (!(J.O))
  {
    $scope.option = [];
  }
  else 
  {
    $scope.option = jQuery.evalJSON(J.O);
  }

  if (!(J.R))
  {
    $scope.recipients = [];
  }
  else 
  {
    $scope.recipients = jQuery.evalJSON(J.R);
  }

  if (!(J.C))
  {
    $scope.con = [];
  }
  else 
  {
    $scope.con = jQuery.evalJSON(J.C);
  }



  if($scope.stext==undefined)
  {
    $scope.stext = 'Submit';
  }
  if($scope.form_title==undefined)
  {
    $scope.form_title = 'Form Title';
  }
  if($scope.ft_px==undefined)
  {
    $scope.ft_px = '32px';
  }
  if($scope.sfs==undefined)
  {
    $scope.sfs = '14px';
  }
  if($scope.lp==undefined)
  {
    $scope.lp = '0px';
  }
  if($scope.bp==undefined)
  {
    $scope.bp = '20px';
  }
  if($scope.tp==undefined)
  {
    $scope.tp = '20px';
  }
  if($scope.theme==undefined)
  {
    $scope.theme = 'none';
  }
  if($scope.spad1==undefined)
  {
    $scope.spad1 = '8px';
  }
  if($scope.spad2==undefined)
  {
    $scope.spad2 = '14px';
  }
  if($scope.spad2==undefined)
  {
    $scope.spad2 = '14px';
  }
  if($scope.themev==undefined)
  {
    $scope.themev = 'one';
  }
  if($scope.lfs==undefined)
  {
    $scope.lfs = '14px';
  }
  if($scope.slfs==undefined)
  {
    $scope.slfs = '11px';
  }
  if($scope.sbold==undefined)
  {
    $scope.sbold = 'normal';
  }
  if($scope.tbold==undefined)
  {
    $scope.tbold = 'normal';
  }
  if($scope.space==undefined)
  {
    $scope.space = '8px';
  }
  if($scope.sub_th==undefined)
  {
    $scope.sub_th = 'normal';
  }
  if($scope.error_email==undefined)
  {
    $scope.error_email = 'Incorrect email format';
  }
  if($scope.error_url==undefined)
  {
    $scope.error_url = 'Incorrect URL format';
  }
  if($scope.error_captcha==undefined)
  {
    $scope.error_captcha = 'Incorrect captcha';
  }
  if($scope.error_only_integers==undefined)
  {
    $scope.error_only_integers = 'Only integers';
  }
  if($scope.error_required==undefined)
  {
    $scope.error_required = 'This field is required';
  }
  if($scope.error_min==undefined)
  {
    $scope.error_min = 'At least {{min_chars}} characters required';
  }
  if($scope.error_max==undefined)
  {
    $scope.error_max = 'Maximum {{max_chars}} characters allowed';
  }
  if($scope.ruser==undefined)
  {
    $scope.ruser = 'nCrafts';
  }
  if($scope.fw==undefined)
  {
    $scope.fw = '600px';
  }


  if($scope.con.length==0)
  {
    $scope.con.push({
      stext:$scope.stext,
      form_title:$scope.form_title,
      ft_px:$scope.ft_px,
      sfs:$scope.sfs,
      lp:$scope.lp,
      bp:$scope.bp,
      tp:$scope.tp,
      spad1:$scope.spad1,
      spad2:$scope.spad2,
      themev:$scope.themev,
      lfs:$scope.lfs,
      sbold:$scope.sbold,
      tbold:$scope.tbold,
      space:$scope.space,
      sub_th:$scope.sub_th,
      error_email:$scope.error_email,
      error_url:$scope.error_url,
      error_captcha:$scope.error_captcha,
      error_only_integers:$scope.error_only_integers,
      error_required:$scope.error_required,
      error_min:$scope.error_min,
      error_max:$scope.error_max,
      ruser:$scope.ruser,
      theme:$scope.theme,
      fw:$scope.fw
    });
  }




  $scope.remRec = function ($index, series)
  {
    $scope.recipients.splice($index, 1);
  }
  $scope.addRec = function ()
  {
    if (validateEmail($scope.rec))
    {
      $scope.recipients.push({
        val:$scope.rec
      });
      $scope.rec = '';
    } else
    {
      alert('Invalid E-mail');
    }
  }


  $scope.remOpt = function ($index, series)
  {
    $scope.option[series].Drop.splice($index, 1);
  }
  $scope.addOpt = function (series)
  {
    $scope.option[series].Drop.push({
      val:"New Options",
      smin:"10",
      smax:"100"
    });
    setTimeout("add_sliders()", 300);
  }
  $scope.remEl = function($index) {

    if($scope.build[$index].captcha==1)
    {
      $scope.build.captcha = 0;
    }

    if($scope.build[$index].upload==1)
    {
      $scope.build.upload = 0;
    }

    $scope.build.splice($index, 1);
    $scope.build.le = $scope.build.length;
  }

$scope.save = function()
{
  save_form($scope.build, $scope.option, $scope.con, $scope.recipients);
}

$scope.addEl = function (type) {
  var inx = $scope.build.length;
  var inx2 = $scope.option.length;
  var inx = Math.max(inx,inx2);

  if (type=='text')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>enter your full name</span></span><span class='input_cover text_cover'><input type='text' ng-style='{width: el.wid}' name='{{el.cap1}}_"+type+"_{{el.valid}}_{{el.req}}_{{el.min}}_{{el.max}}_field{{$index}}'><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>One-line Text Input <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span><br><span class='sp3'><label>Validation: </label><select ng-model='el.valid'><option value=''></option><option value='alphabets'>Alphabets Only</option><option value='integers'>Integers Only</option><option value='alpha'>Alpha-numeric Only</option><option value='email'>Email</option><option value='url'>URL</option></select></span><span class='sp3'><label for='min{{$index}}'>Min Characters: </label><input id='min{{$index}}' type='text' ng-model='el.min'></span><span class='sp3'><label for='max{{$index}}'>Max Characters: </label><input id='max{{$index}}' type='text' ng-model='el.max'></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='email')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.ecap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.ecap2' ng-style='{fontSize: con[0].slfs, color: con[0].slfc }'></span></span><span class='input_cover text_cover'><span class='input-append'><input type='email' ng-style='{ width: el.wid2 }' name='{{el.ecap1}}_"+type+"_email_{{el.req}}___field{{$index}}_{{el.autoreply}}_{{el.replyto}}'><span class='add-on'><i class='icon-envelope'></i></span></span><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Email Input <span class='head_label'>{{el.ecap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.ecap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.ecap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid2'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><span class='sp1'><label class='label_check'><input type='checkbox' ng-model='el.replyto' ng-true-value='replyto'>Set this as 'Reply-To' Address<br><span style='color:#888'>by enabling this, when you receive an email notification, you can directly reply to this email address</span></label></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='url')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.urcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.urcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'></span></span><span class='input_cover text_cover'><span class='input-append'><input type='url' ng-style='{ width: el.wid2 }' name='{{el.urcap1}}_"+type+"__{{el.req}}___field{{$index}}'><span class='add-on'><i class='icon-home'></i></span></span><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>URL Input <span class='head_label'>{{el.urcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.urcap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.urcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid2'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='time')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.tcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.tcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'></span></span><span class='input_cover text_cover'><span class='input-append'><input type='time' ng-style='{ width: el.wid2 }' name='{{el.tcap1}}_"+type+"__{{el.req}}___field{{$index}}'><span class='add-on'><i class='icon-time'></i></span></span><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Time Input <span class='head_label'>{{el.tcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.tcap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.tcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid2'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='para')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.pcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.pcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>enter your full name</span></span><span class='input_cover text_cover'><textarea rows='3' ng-style='{ width: el.wid }' name='{{el.pcap1}}_"+type+"__{{el.req}}_{{el.min}}_{{el.max}}_field{{$index}}'></textarea><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Paragraph Text Input <span class='head_label'>{{el.pcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.pcap1'></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.pcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span><span class='sp3'><label for='min{{$index}}'>Min Characters: </label><input id='min{{$index}}' type='text' ng-model='el.min'></span><span class='sp3'><label for='max{{$index}}'>Max Characters: </label><input id='max{{$index}}' type='text' ng-model='el.max'></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='dropdown')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.dcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.dcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>select your country</span></span><span class='input_cover text_cover'><select ng-style='{ width: el.widdr }' name='{{el.dcap1}}_"+type+"__{{el.req}}___field{{$index}}'><option ng-repeat='opt in option["+inx+"].Drop'>{{opt.val}}</option></select><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Dropdown Box <span class='head_label'>{{el.dcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.dcap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.dcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.widdr' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'></span><span class='sp3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='check')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.ccap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.ccap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>you can select more than one!</span></span><span class='input_cover text_cover'><span class='box_cover {{el.lines}}'><label class='label_check' ng-style='{width: el.widcr, color: el.ocolor}' ng-repeat='opt in option["+inx+"].Drop' for='check"+inx+"{{$index}}'><input type='checkbox' class='label_check' value='{{opt.val}}' id='check"+inx+"{{$index}}' name='{{el.ccap1}}_"+type+"__{{el.req}}___field{{$parent.$index}}'>{{opt.val}}</label><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>CheckBox Group <span class='head_label'>{{el.ccap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.ccap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.ccap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.widcr' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px'  ng-model='opt.val'></span><span class='sp3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp2'><label class='label_radio'><input name='lines{{$index}}' type='radio' ng-model='el.lines' value='lines'>Separate Lines</label><label class='label_radio r_on'><input name='lines{{$index}}' type='radio' checked='checked' ng-model='el.lines'>Club Together</label></span><span class='sp3'><label for='ocolor{{$index}}'>Color: <input type='color' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='radio')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.rcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.rcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>select one</span></span><span class='input_cover text_cover'><span class='box_cover {{el.lines}}'><label class='label_radio' ng-style='{width: el.widcr, color: el.ocolor}' ng-repeat='opt in option["+inx+"].Drop' for='radio"+inx+"{{$index}}'><input type='radio' class='label_radio' value='{{opt.val}}' id='radio"+inx+"{{$index}}' name='{{el.rcap1}}_"+type+"__{{el.req}}___field{{$parent.$index}}'>{{opt.val}}</label><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Radio Group <span class='head_label'>{{el.rcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.rcap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.rcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.widcr' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'></span><span class='sp3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp2'><label class='label_radio'><input name='lines{{$index}}' type='radio' ng-model='el.lines' value='lines'>Separate Lines</label><label class='label_radio r_on'><input name='lines{{$index}}' type='radio' checked='checked' ng-model='el.lines'>Club Together</label></span><span class='sp3'><label for='ocolor{{$index}}'>Color: <input type='color' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='date')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.dtcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.dtcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>fix an appointment</span></span><span class='input_cover text_cover'><span class='input-append'><input type='text' ng-style='{ width: el.wid2 }' class='datepicker{{el.date}}' lang='{{el.lang}}' format='{{el.dmy}}' name='{{el.dtcap1}}_"+type+"_date_{{el.req}}___field{{$index}}'><span class='add-on'><i class='icon-calendar'></i></span></span><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>DatePicker <span class='head_label'>{{el.dtcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.dtcap1'></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.dtcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid2' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><br><span class='sp3'><label for='lang{{$index}}'>Lang: </label><select id='lang{{$index}}' class='language_select' ng-model='el.lang'><option>en</option><option>bg</option><option>ca</option><option>cs</option><option>da</option><option>de</option><option>el</option><option>es</option><option>fi</option><option>fr</option><option>he</option><option>hr</option><option>hu</option><option>id</option><option>is</option><option>it</option><option>ja</option><option>kr</option><option>lt</option><option>lv</option><option>ms</option><option>nb</option><option>nl</option><option>pl</option><option>pt</option><option>pt-BR</option><option>ro</option><option>rs</option><option>rs-latin</option><option>ru</option><option>sk</option><option>sl</option><option>sv</option><option>sw</option><option>th</option><option>tr</option><option>uk</option><option>zh-CN</option><option>zh-TW</option></select></span><span class='sp3'><label for='dmy{{$index}}'>Format: </label><select id='dmy{{$index}}' class='language_select' ng-model='el.dmy'><option>dd-mm-yyyy</option><option>mm-dd-yyyy</option></select></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='slider')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.slcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.slcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>you can select more than one!</span></span><span class='input_cover text_cover'><span class='box_cover {{el.lines}}'><div ng-repeat='opt in option["+inx+"].Drop'><span class='slider_txt'>{{opt.val}}</span><span id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_val' class='slider_val'>0</span><input type='hidden' id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_val2' name='{{el.slcap1}}-{{opt.val}}_"+type+"__{{el.req}}___field{{$parent.$index}}'><div class='slider' ng-style='{ width: el.wid }' id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}' slider='{{opt.sty}}'></div></div><span class='inst sld' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>CheckBox Group <span class='head_label'>{{el.slcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.slcap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.slcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><br><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 140px' ng-model='opt.val'>&nbsp;&nbsp;Min: <input class='del-inp' type='text' style='width: 50px' ng-model='opt.smin'>&nbsp;&nbsp;Max: <input class='del-inp' type='text' style='width: 50px' ng-model='opt.smax'><br></span><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='slider-range')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.slcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.slcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>you can select more than one!</span></span><span class='input_cover text_cover'><span class='box_cover {{el.lines}}'><div ng-repeat='opt in option["+inx+"].Drop'><span class='slider_txt'>{{opt.val}}</span><span id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_val' class='slider_val'></span><input type='hidden' id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_val2' name='{{el.slcap1}}-{{opt.val}}_"+type+"__{{el.req}}___field{{$parent.$index}}'><div class='slider-range' ng-style='{ width: el.wid }' id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}' slider='{{opt.sty}}'></div></div><span class='inst sld' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>CheckBox Group <span class='head_label'>{{el.slcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.slcap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.slcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><br><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 170px' ng-model='opt.val'>&nbsp;&nbsp; Min: <input class='del-inp' type='text' style='width: 70px' ng-model='opt.smin'>&nbsp;&nbsp; Max: <input class='del-inp' type='text' style='width: 70px' ng-model='opt.smax'><br></span><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='divider')
  {
    $scope.el_f = "<div class='divider' ng-style='{ borderTopWidth: el.divwid, borderTopColor: el.divcol, marginBottom: el.divspa, marginTop: el.divspa }' style='border-top-style: solid'><span class='div_text' ng-style='{ marginTop: el.divtop }'><span class='div_text2' ng-style='{ marginLeft: el.divlef, fontSize: el.divfs, color: el.divfc, fontFamily: el.family }'>{{el.divcap1}}</span></span></div><input type='hidden' name='divider_divider_divider' value='{{el.divcap1}}'>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Divider</span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span><hr><span class='sp3'><label for='pcpm{{$index}}'>Text: </label><input id='pcpm{{$index}}' type='text' ng-model='el.divcap1' ></span><span class='sp3'><label for='lef{{$index}}'>Left Position: </label><input id='lef{{$index}}' type='text' ng-model='el.divlef' ></span><span class='sp3'><label for='top{{$index}}'>Bottom Position: </label><input id='top{{$index}}' type='text' ng-model='el.divtop' ></span><hr><span class='sp3'><label for='col{{$index}}'>Divider Color: </label><input id='col{{$index}}' type='color' ng-model='el.divcol' ></span><span class='sp3'><label for='spa{{$index}}'>Divider Space: </label><input id='spa{{$index}}' type='text' ng-model='el.divspa' ><br></span><span class='sp3'><label for='wid{{$index}}'>Divider Thickness: </label><input id='wid{{$index}}' type='text' ng-model='el.divwid' ></span><hr><span class='sp3'><label for='fs{{$index}}'>Font Size: </label><input id='fs{{$index}}' type='text' ng-model='el.divfs' ></span><span class='sp3'><label for='fc{{$index}}'>Font Color: </label><input id='fc{{$index}}' type='color' ng-model='el.divfc' ></span><span class='sp3'><label for='family{{$index}}'>Font: </label><select id='family{{$index}}' ng-model='el.family' style='height: auto; padding: 5px'><option></option><option>Arial</option><option>Arial Black</option><option>Courier New</option><option>Times New Roman</option><option>Trebuchet MS</option><option>Verdana</option></select></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='custom')
  {
    $scope.el_f = "<span ng-style='{ marginBottom: el.divspa, marginTop: el.divspa, fontSize: el.divfs, color: el.divfc, fontFamily: el.family }' compile='el.divcap2' style='display: block; position: relative'></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Custom Text</span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1'><textarea id='pcpm{{$index}}' type='text' ng-model='el.divcap2' style='width: 100%' rows='4'></textarea></span><hr><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span><hr><span class='sp3'><label for='fs{{$index}}'>Font Size: </label><input id='fs{{$index}}' type='text' ng-model='el.divfs'></span><span class='sp3'><label for='fc{{$index}}'>Font Color: </label><input id='fc{{$index}}' type='color' ng-model='el.divfc'></span><span class='sp3'><label for='family{{$index}}'>Font Family: </label><select id='family{{$index}}' ng-model='el.family' style='height: auto; padding: 5px'><option></option><option>Arial</option><option>Arial Black</option><option>Courier New</option><option>Times New Roman</option><option>Trebuchet MS</option><option>Verdana</option></select></span><span class='sp3'><label for='spa{{$index}}'>Space: </label><input id='spa{{$index}}' type='text' ng-model='el.divspa'></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='upload')
  {
    if ($scope.build.upload==1)
    {
      alert('You cannot have more than one file upload field.');
      return false;
    }
    else 
    {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.ucap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.ucap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>enter your full name</span></span><span class='input_cover upload_input_cover text_cover'><span class='btn btn-success fileupload-cover'><i class='icon-arrow-up icon-white'></i> <span>{{el.uploadtext}}</span><input class='fileupload' type='file' ng-style='{width: el.wid}' data-url='fluid_forms/file-upload/server/php/' name='files[]'></span><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span><input type='hidden' class='upload_hidden' name='{{el.ucap1}}_"+type+"_file_{{el.req}}___field{{$index}}' value='0'><ul class='upload_ul'></ul></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>File Upload <span class='head_label'>{{el.ucap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.ucap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.ucap2'></span><span class='sp3'><label for='uploadtext{{$index}}'>Button: </label><input id='uploadtext{{$index}}' type='text' ng-model='el.uploadtext'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span></div>";
    $scope.captcha = 0;
    $scope.build.upload = 1;
    $scope.upload = 1;
  }
}
  if (type=='captcha')
  {
    if ($scope.build.captcha==1)
    {
      alert('You cannot have more than one captcha field.');
      return false;
    }
    else 
    {
      $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.ctcap1}}</span><span class='cap2 {{con[0].subl}}' ng-bind='el.ctcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>fix an appointment</span></span><span class='input_cover text_cover'><img ng-src='php/image.php?id="+jid+"&type={{el.cap_st}}_{{el.cap_stf}}' title='Click to refresh' class='c_image'><input type='text' style='width: 90px; margin-left: 15px' name='{{el.ctcap1}}_"+type+"_captcha_1___field{{$index}}'><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
      $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Captcha (Spam Guard) <span class='head_label'>{{el.ctcap1}}</span></span>";
      $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.ctcap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.ctcap2'></span><span class='sp1'><label>Style: </label><label class='label_radio' for='cap_st_{{$index}}_1'><input type='radio' id='cap_st_{{$index}}_1' ng-model='el.cap_st' value='one'>Simple</label><label class='label_radio' for='cap_st_{{$index}}_2'><input type='radio' id='cap_st_{{$index}}_2' ng-model='el.cap_st' value='two'>Lined</label><label class='label_radio' for='cap_st_{{$index}}_3'><input type='radio' id='cap_st_{{$index}}_3' ng-model='el.cap_st' value='three'>Grey</label></span><span class='sp1'><label>Font: </label><label class='label_radio' for='cap_stf_{{$index}}_1'><input type='radio' id='cap_stf_{{$index}}_1' ng-model='el.cap_stf' value='font'>Simple</label><label class='label_radio' for='cap_stf_{{$index}}_2'><input type='radio' id='cap_stf_{{$index}}_2' ng-model='el.cap_stf' value='font2'>Bold</label><label class='label_radio' for='cap_stf_{{$index}}_3'><input type='radio' id='cap_stf_{{$index}}_3' ng-model='el.cap_stf' value='font3'>Comic</label></span><hr><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div>";
      $scope.build.captcha = 1;
      $scope.captcha = 1;
      $scope.upload = 0;
    }
  }
  if (type=='pass')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.passcap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.passcap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>enter your full name</span></span><span class='input_cover text_cover'><input type='password' ng-style='{ width: el.wid }' name='{{el.passcap1}}_"+type+"_{{el.valid}}_{{el.req}}_{{el.min}}_{{el.max}}_field{{$index}}'><span class='inst' ng-style='{ fontSize: con[0].ifs, color: con[0].ifc }'>{{el.inst}}</span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Password Field <span class='head_label'>{{el.passcap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.passcap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.passcap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><br><span class='sp3'><label for='inline{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}' ng-model='el.inline' value=''><span class='layout_c1' style='width: 115px'></span><span class='layout_c1_text'>one column layout</span> </label></span><span class='sp3'><label for='inline2{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}' ng-model='el.inline' value='inline2'><span class='layout_c1' style='width: 53px'></span><span class='layout_c1' style='width: 53px; margin-left: 5px'></span><span class='layout_c1_text'>two column layout</span> </label></span><span class='sp3'><label for='inline3{{$index}}' class='label_radio' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}' ng-model='el.inline' value='inline3'><span class='layout_c1' style='width: 33px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1' style='width: 33px; margin-left: 5px'></span><span class='layout_c1_text'>three column layout</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp3'><label>Compulsory Field?</label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'>Yes </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'>No </label></span><br><span class='sp3'><label>Validation: </label><select ng-model='el.valid'><option value=''></option><option value='alphabets'>Alphabets Only</option><option value='integers'>Integers Only</option><option value='alpha'>Alpha-numeric Only</option><option value='email'>Email</option><option value='url'>URL</option></select></span><span class='sp3'><label for='min{{$index}}'>Min Characters: </label><input id='min{{$index}}' type='text' ng-model='el.min'></span><span class='sp3'><label for='max{{$index}}'>Max Characters: </label><input id='max{{$index}}' type='text' ng-model='el.max'></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }

  $scope.option.push(
  {
    Drop: [
    {"val": 'Option One', "smin": "10", "smax": "80"},  {"val": 'Option Two', "smin": "10", "smax": "80"}
    ]
  });
  $scope.build.push({
    el_f:$scope.el_f,
    el_b:$scope.el_b,
    el_b2:$scope.el_b2,
    captcha:$scope.captcha,
    upload:$scope.upload
  });

  setTimeout("add_sliders()", 100);
  setTimeout("update_date()", 100);



  var inx = $scope.build.length-1;
  if($scope.build[inx].cap1==undefined)
  {
    $scope.build[inx].cap1 = 'Name';
  }
  if($scope.build[inx].cap2==undefined)
  {
    $scope.build[inx].cap2 = 'full name here';
  }
  if($scope.build[inx].pcap1==undefined)
  {
    $scope.build[inx].pcap1 = 'Comments';
  }
  if($scope.build[inx].pcap2==undefined)
  {
    $scope.build[inx].pcap2 = 'further details';
  }
  if($scope.build[inx].dcap1==undefined)
  {
    $scope.build[inx].dcap1 = 'Country';
  }
  if($scope.build[inx].dcap2==undefined)
  {
    $scope.build[inx].dcap2 = 'select your country';
  }
  if($scope.build[inx].ccap1==undefined)
  {
    $scope.build[inx].ccap1 = 'Hobbies';
  }
  if($scope.build[inx].ccap2==undefined)
  {
    $scope.build[inx].ccap2 = 'select one or more';
  }
  if($scope.build[inx].cs==undefined)
  {
    $scope.build[inx].cs = 'fixed';
  }
  if($scope.build[inx].rcap1==undefined)
  {
    $scope.build[inx].rcap1 = 'Profession';
  }
  if($scope.build[inx].rcap2==undefined)
  {
    $scope.build[inx].rcap2 = 'select just one';
  }
  if($scope.build[inx].dtcap1==undefined)
  {
    $scope.build[inx].dtcap1 = 'Meet Us';
  }
  if($scope.build[inx].dtcap2==undefined)
  {
    $scope.build[inx].dtcap2 = 'when are you free?';
  }
  if($scope.build[inx].ecap1==undefined)
  {
    $scope.build[inx].ecap1 = 'Email';
  }
  if($scope.build[inx].ecap2==undefined)
  {
    $scope.build[inx].ecap2 = "can't leave this empty";
  }
  if($scope.build[inx].ucap1==undefined)
  {
    $scope.build[inx].ucap1 = 'Files';
  }
  if($scope.build[inx].ucap2==undefined)
  {
    $scope.build[inx].ucap2 = "upload stuff";
  }
  if($scope.build[inx].dtcap2==undefined)
  {
    $scope.build[inx].dtcap2 = 'when are you free?';
  }
  if($scope.build[inx].dtcap2==undefined)
  {
    $scope.build[inx].dtcap2 = 'when are you free?';
  }
  if($scope.build[inx].lines==undefined)
  {
    $scope.build[inx].lines = '';
  }
  if($scope.build[inx].dtcap2==undefined)
  {
    $scope.build[inx].dtcap2 = 'when are you free?';
  }
  if($scope.build[inx].wid==undefined)
  {
    $scope.build[inx].wid = '80%';
  }
  if($scope.build[inx].widcr==undefined)
  {
    $scope.build[inx].widcr = '';
  }
  if($scope.build[inx].wid2==undefined)
  {
    $scope.build[inx].wid2 = '74.6%';
  }
  if($scope.build[inx].widt==undefined)
  {
    $scope.build[inx].widt = '74.6%';
  }
  if($scope.build[inx].widdr==undefined)
  {
    $scope.build[inx].widdr = '83.5%';
  }
  if($scope.build[inx].date==undefined)
  {
    $scope.build[inx].date = 'mdy';
  }
  if($scope.build[inx].divwid==undefined)
  {
    $scope.build[inx].divwid = '1px';
  }
  if($scope.build[inx].divcap1==undefined)
  {
    $scope.build[inx].divcap1 = 'Group Name';
  }
  if($scope.build[inx].divtop==undefined)
  {
    $scope.build[inx].divtop = '-10px';
  }
  if($scope.build[inx].divlef==undefined)
  {
    $scope.build[inx].divlef = '50px';
  }
  if($scope.build[inx].divcol==undefined)
  {
    $scope.build[inx].divcol = '#CCC';
  }
  if($scope.build[inx].divfs==undefined)
  {
    $scope.build[inx].divfs = '14px';
  }
  if($scope.build[inx].divfc==undefined)
  {
    $scope.build[inx].divfc = '#666';
  }
  if($scope.build[inx].divspa==undefined)
  {
    $scope.build[inx].divspa = '20px';
  }
  if($scope.build[inx].divcap2==undefined)
  {
    $scope.build[inx].divcap2 = 'You can use this to write comments in the form.<br><em><strong>You can even use HTML!</strong></em>';
  }
  if($scope.build[inx].divlef2==undefined)
  {
    $scope.build[inx].divlef2 = '5px';
  }
  if($scope.build[inx].req==undefined)
  {
    $scope.build[inx].req = '0';
  }
  if($scope.build[inx].min==undefined)
  {
    $scope.build[inx].min = '0';
  }
  if($scope.build[inx].max==undefined)
  {
    $scope.build[inx].max = '60';
  }
  if($scope.build[inx].ctcap1==undefined)
  {
    $scope.build[inx].ctcap1 = 'Captcha';
  }
  if($scope.build[inx].ctcap2==undefined)
  {
    $scope.build[inx].ctcap2 = 'type the characters';
  }
  if($scope.build[inx].passcap1==undefined)
  {
    $scope.build[inx].passcap1 = 'Password';
  }
  if($scope.build[inx].passcap2==undefined)
  {
    $scope.build[inx].passcap2 = 'shhhh';
  }
  if($scope.build[inx].slcap1==undefined)
  {
    $scope.build[inx].slcap1 = 'Price';
  }
  if($scope.build[inx].slcap2==undefined)
  {
    $scope.build[inx].slcap2 = 'your budget';
  }
  if($scope.build[inx].urcap1==undefined)
  {
    $scope.build[inx].urcap1 = 'Website';
  }
  if($scope.build[inx].urcap2==undefined)
  {
    $scope.build[inx].urcap2 = 'your den';
  }
  if($scope.build[inx].tcap1==undefined)
  {
    $scope.build[inx].tcap1 = 'Appointment';
  }
  if($scope.build[inx].tcap2==undefined)
  {
    $scope.build[inx].tcap2 = 'subject to availability';
  }
  if($scope.build[inx].cap_st==undefined)
  {
    $scope.build[inx].cap_st = 'one';
  }
  if($scope.build[inx].cap_stf==undefined)
  {
    $scope.build[inx].cap_stf = 'font';
  }
  if($scope.build[inx].uploadtext==undefined)
  {
    $scope.build[inx].uploadtext = 'Upload File';
  }
  if($scope.build[inx].dmy==undefined)
  {
    $scope.build[inx].dmy = 'mm-dd-yyyy';
  }
  if($scope.build[inx].lang==undefined)
  {
    $scope.build[inx].lang = 'en';
  }
  if($scope.build[inx].inline==undefined)
  {
    $scope.build[inx].inline = '';
  }


  $scope.build.le = $scope.build.length;
};


}