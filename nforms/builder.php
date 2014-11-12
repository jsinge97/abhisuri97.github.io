<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);

if (!isset($_SESSION)) {
	session_start();
}

if (!(isset($_SESSION['user_email'])))
{
	header( 'Location: login.php');
}




$id = $_GET['id'];

if (!(file_exists("forms/form_".$id.".txt")))
{
	echo "Form does not exist";
	exit;
}

$contents = file_get_contents("forms/form_".$id.".txt");
$contents = json_decode($contents, 1);
$build = $contents['build'];
$option = $contents['option'];
$con = $contents['con'];
$rec = $contents['recipients'];

?>

<script type="text/javascript">
window.jb = <?php echo "'$build'"; ?>;
window.jo = <?php echo "'$option'"; ?>;
window.jr = <?php echo "'$rec'"; ?>;
window.jc = <?php echo "'$con'"; ?>;
window.jid = <?php echo "$id"; ?>;
</script>

<?php

$conf = json_decode($con);

if (isset($conf[0]->cap_width))
{
	if ($conf[0]->cap_width=='relative') 
		{$cap_width2 = 'active';} else 
	{$cap_width = 'active';}

	if ($conf[0]->subl=='') 
		{$subl = 'active';} else 
	{$subl2 = 'active';}
}


$theme1 = '';
$theme2 = '';
$theme3 = '';
$theme4 = '';
$theme5 = '';
$theme6 = '';

if (isset($conf[0]->theme))
{
	if ($conf[0]->theme=='none') 
		{$theme1 = 'active';}

	if ($conf[0]->theme=='satin') 
		{$theme2 = 'active';}

	if ($conf[0]->theme=='jean') 
		{$theme3 = 'active';}

	if ($conf[0]->theme=='debut') 
		{$theme4 = 'active';}

	if ($conf[0]->theme=='carbon') 
		{$theme6 = 'active';}
}


if (isset($conf[0]->themev))
{
	if ($conf[0]->themev=='one') 
		{$themev1 = 'active';}

	else if ($conf[0]->themev=='two') 
		{$themev2 = 'active';}

	else if ($conf[0]->themev=='three') 
		{$themev3 = 'active';}

	else
		{$themev1 = 'active';}
}


if (isset($conf[0]->themef))
{
	if ($conf[0]->themef=='') 
		{$themef1 = 'active';}

	else if ($conf[0]->themef=='transparent') 
		{$themef2 = 'active';}

	else if ($conf[0]->themef=='curvy') 
		{$themef3 = 'active';}

	else
		{$themef1 = 'active';}
}



if (isset($conf[0]->label_line))
{
	if ($conf[0]->label_line=='label_line') 
		{$label_line2 = 'active';}

	else
		{$label_line1 = 'active';}
}



?>

<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'> 

	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.2/angular-sanitize.min.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

	<script src="js/jquery.json.js"></script>


	<script src="js/js.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>
	<script src="datepicker/js/bootstrap-datepicker.js"></script>
	<script src="js/form.js"></script>
	<script src="js/build.js"></script>
	<script src="ui/js/jquery-ui-1.10.0.custom.min.js"></script>
	<script src="js/angular-ui.js"></script>
	<script src="file-upload/js/jquery.fileupload.js"></script>
	<script src="file-upload/js/jquery.iframe-transport.js"></script>
	<script src="file-upload/js/vendor/jquery.ui.widget.js"></script>


	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
	<link href="datepicker/css/datepicker.css" rel="stylesheet">
	<link href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link href="css/boxes.css" rel="stylesheet">
	<link href="css/nform_style.css" rel="stylesheet">



</head>
<body>
<!--[if IE]>
<style>
.main_builder textarea, .main_builder input[type="text"], .main_builder input[type="password"], .main_builder input[type="date"], .main_builder input[type="month"], .main_builder input[type="week"], .main_builder input[type="number"], .main_builder input[type="email"], .main_builder input[type="url"], .main_builder input[type="search"], .main_builder input[type="tel"], .main_builder .uneditable-input
{
	min-height: 28px !important;
}
</style>
<![endif]-->

<div ng-app="compile" ng-controller="bob_the_builder" class="ffcover bootstrap">
	<a href='logout.php' class='logout'>logout</a>


	<table class='ff_c_t'>
		<tr>
			<td style='width: 580px'>
				<div class="main_builder">
					<div class='build_affix' data-spy="affix" data-offset-top="0"><!-- Start of affixed Part -->

						<div class='head_holder'>
							<a class='btn bg btn-primary' href='index.php'><i class='icon-chevron-left icon-white'></i> List of Forms</a>


							<button data-loading-text="saving.." class='btn bg btn-primary' ng-click='save()' id='save_form_btn' style='width: 102px'><i class='icon-folder-open icon-white'></i> Save </button>

							<button class="btn bg btn-primary btn-toggle" data-toggle="collapse" href="#collapseOne"><i class='icon-wrench icon-white'></i> Form Options
							</button>

							<button class="btn bg btn-primary btn-toggle" data-toggle="collapse"  href='#collapseTwo'><i class='icon-pencil icon-white'></i> Styling
							</button>

						</div>

						<div id="collapseOne" class="form_accordion accordion-body collapse" style='width: 506px'>
							<span class='options_label'><i class='icon-wrench'></i> Form Options</span>
							<div class="accordion-inner">



								<div class='accordion acl' id="accordion_fo">
									<div class="accordion-group">
										<div class="accordion-heading">
											<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion_fo" href="#form_options_one">
												1. Email Settings
											</a>
										</div>

										<div id="form_options_one" class="accordion-body collapse">
											<div class="accordion-inner l2">

												<div class='global_holder'>

													<label for='from_1'>"From" name: <input id='from_1' type='text' ng-model='con[0].from_name'></label><br>
													<label for='from_2'>"From" email: <input id='from_2' type='email' ng-model='con[0].from_email'></label><hr>

													<p class='head_gh'>When the form is submitted, the following people will get an email notification:</p>
													<ul class='rec_ul'>
														<li>
															<input type='text' ng-model='rec' style='width: 250px;'>
															<button class='btn btn-primary' ng-click='addRec()'><i class='icon-plus icon-white'></i> Add</button>
														</li>

														<li ng-repeat='name in recipients'>
															<button class='btn btn-danger btn-mini del-btn2' ng-click='remRec($index)'><i class='icon-remove icon-white'></i>
															</button>									
															<span compile='name.val' class='recipients'></span>
														</li>

													</ul>
												</div>
											</div>
										</div>
									</div>

									<div class="accordion-group">
										<div class="accordion-heading">
											<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion_fo" href="#form_options_two">
												2. How to Use the Form
											</a>
										</div>

										<div id="form_options_two" class="accordion-body collapse">
											<div class="accordion-inner l2">

												<div class='global_holder'>

													<p class='head_gh'>Enter the following PHP code on the top of your page.</p>
													<pre class='well well-small'>&lt;?php
														$file_path = &#039;../nforms/function.php&#039;;
														include($file_path);
														?&gt;
													</pre>
													<span class='description'>Please change the <strong>../nforms/function.php</strong> with the correct path of the function.php file, which is in the main nForms directory.</span>
													<hr>
													<p class='head_gh'>Enter the following PHP code at the place where you want the form.</p>
													<pre class='well well-small'>&lt;?php 
														nform(<?php echo $_GET['id']; ?>);
														?&gt;
													</pre>
												</div>
											</div>
										</div>
									</div>

									<div class="accordion-group">
										<div class="accordion-heading">
											<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion_fo" href="#form_options_three">
												3. Form Validation Text
											</a>
										</div>

										<div id="form_options_three" class="accordion-body collapse">
											<div class="accordion-inner l2">

												<div class='global_holder'>

													<label for='error_id_1' style='width: 30%; display: inline-block; text-align: right; margin-right: 5%'>Incorrect Email</label>
													<input type='text' id='error_id_1' style='width: 60%' ng-model='con[0].error_email'>
													<br>
													<label for='error_id_2' style='width: 30%; display: inline-block; text-align: right; margin-right: 5%'>Incorrect URL</label>
													<input type='text' id='error_id_2' style='width: 60%' ng-model='con[0].error_url'>
													<br>
													<label for='error_id_3' style='width: 30%; display: inline-block; text-align: right; margin-right: 5%'>Incorrect Captcha</label>
													<input type='text' id='error_id_3' style='width: 60%' ng-model='con[0].error_captcha'>
													<br>
													<label for='error_id_4' style='width: 30%; display: inline-block; text-align: right; margin-right: 5%'>Integers Only</label>
													<input type='text' id='error_id_4' style='width: 60%' ng-model='con[0].error_only_integers'>
													<br>
													<label for='error_id_5' style='width: 30%; display: inline-block; text-align: right; margin-right: 5%'>Compulsory Field</label>
													<input type='text' id='error_id_5' style='width: 60%' ng-model='con[0].error_required'>
													<br>
													<label for='error_id_6' style='width: 30%; display: inline-block; text-align: right; margin-right: 5%'>Min Characters</label>
													<input type='text' id='error_id_6' style='width: 60%' ng-model='con[0].error_min'>
													<br>
													<label for='error_id_7' style='width: 30%; display: inline-block; text-align: right; margin-right: 5%'>Max Characters</label>
													<input type='text' id='error_id_7' style='width: 60%' ng-model='con[0].error_max'>
													<br>

												</div>
											</div>
										</div>
									</div>



									<div class="accordion-group">
										<div class="accordion-heading">
											<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion_fo" href="#form_options_four">
												4. Form Submission
											</a>
										</div>

										<div id="form_options_four" class="accordion-body collapse">
											<div class="accordion-inner l2">

												<div class='global_holder'>

													<p class='head_gh'>Form successfully sent </p>
													<em style='font-size: 12px; color: #888; line-height: 17px;'> (you can use HTML here)</em><br>
													<textarea style='width:96%; margin: 0' rows='4' ng-model='con[0].success_msg'></textarea>

													<br><br>
													<p class='head_gh'>Form could not be sent </p>
													<em style='font-size: 12px; color: #888; line-height: 17px;'> (you can use HTML here)</em><Br>
													<textarea style='width:96%;  margin: 0' rows='4' ng-model='con[0].failed_msg'></textarea>
													<hr>
													<p class='head_gh'>Redirect URL </p>
													<em style='font-size: 12px; color: #888; line-height: 17px;'> (redirects the user in case of a successful form submission)</em>
													<input type='text' style='width: 96%' ng-model='con[0].redirect'>
													

												</div>
											</div>
										</div>
									</div>

									<div class="accordion-group">
										<div class="accordion-heading">
											<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion_fo" href="#form_options_five">
												5. Support nForms
											</a>
										</div>

										<div id="form_options_five" class="accordion-body collapse">
											<div class="accordion-inner l2">

												<div class='global_holder'>

													<p class='head_gh'>
														Display a referral link below your form
													</p>

													<br>
													<label style='display: inline-block; width: 120px'>Text</label>
													<input type='text' ng-model='con[0].rlink' placeholder='Powered by nForms'>
													<br>

													<label style='display: inline-block; width: 120px'>User-name</label>
													<input type='text' ng-model='con[0].ruser' placeholder='nCrafts'>
													<em style='font-size: 12px; color: #888; line-height: 17px;'> 
														<br>
														(Enter your marketplace user-name here. You will receive a 30% commission on the first deposit / purchase made by user who clicked on this link. Read more <a href='http://codecanyon.net/make_money/affiliate_program' target="_blank">here</a>.)</em>


													</div>
												</div>
											</div>
										</div>




									</div>





								</div>
							</div>

							<div id="collapseTwo" class="form_accordion accordion-body collapse">
								<span class='options_label'><i class='icon-pencil'></i> Styling</span>
								<div class="accordion-inner">

									<div class="accordion acl" id="accordion2">
										<div class="accordion-group">
											<div class="accordion-heading">
												<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href="#globalOne">
													1. Form Styles
												</a>
											</div>

											<div id="globalOne" class="accordion-body collapse">
												<div class="accordion-inner l2">
													<div class='global_holder'>
														<label for='form_wd' class='option_text'>Form Width</label>
														<input id='form_wd' type='text' ng-model='con[0].fw' style='width: 60px'>
														<span class='description' style='width: 200px'>Enter a value like 400px, 500px or 70%.<br> Or leave it blank.</span>
														<br>
														<label for='form_wd' class='option_text'>Rounded Corners</label>
														<input id='form_wd' type='text' ng-model='con[0].fr' style='width: 60px'>
														<span class='description' style='width: 200px'>Enter a value like 2px or 5px.<br> Or leave it blank.</span>
													</div>

													<div class='global_holder'>
														<span class='option_text'>Form Theme</span>
														<span class='btn-group capw' data-toggle='buttons-radio'>
															<button type='button' class='btn btn-primary <? echo $theme1; ?> tool' ng-click='con[0].theme="none"'>None</button>
															<button type='button' class='btn btn-primary <? echo $theme2; ?> tool' ng-click='con[0].theme="satin"'>Satin</button>
															<button type='button' class='btn btn-primary <? echo $theme3; ?> tool' ng-click='con[0].theme="jean"'>Jean</button>
															<button type='button' class='btn btn-primary <? echo $theme4; ?> tool' ng-click='con[0].theme="debut"'>Debut</button>
															<button type='button' class='btn btn-primary <? echo $theme6; ?> tool' ng-click='con[0].theme="carbon"'>Carbon</button>
														</span>
														<label for='form134' style='width: 140px; display: inline-block' class='option_text'>Font Style</label>
														<select id='form134' ng-model='con[0].formfamily' style='height: auto; padding: 5px'>
															<option></option>
															<option>Arial</option>
															<option>Arial Black</option>
															<option>Courier New</option>
															<option>Times New Roman</option>
															<option>Trebuchet MS</option>
															<option>Verdana</option>
														</select>											
													</div>



												</div>

											</div>
										</div>
										<div class="accordion-group">
											<div class="accordion-heading">
												<a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion2" href="#globalTwo">
													2. Input Fields
												</a>
											</div>
											<div id="globalTwo" class="accordion-body collapse">										
												<div class="accordion-inner l2">
													<div class='global_holder'>
														<label class='option_text' for='form_title_px'> Field Spacing </label>
														<input class='mr' type='text' id='form_space_px' ng-model='con[0].space' style='width: 48px'>
														<span class='description'>20px, 30px etc ...</span>
													</div>

													<div class='global_holder'>
														<label class='option_text' for='form_title_px'> Block-type Labels</label>
														<span class='btn-group capw' data-toggle='buttons-radio'>
															<button type='button' class='btn btn-primary <? echo $label_line1; ?> tool' ng-click='con[0].label_line=""'>No</button>
															<button type='button' class='btn btn-primary <? echo $label_line2; ?> tool' ng-click='con[0].label_line="label_line"'>Yes</button>
														</span>
														<span class='description'>Yes: input fields will appear below the labels, instead of next to them.</span>
													</div>


													<div class='global_holder'>
														<span class='option_text'>Validation Style</span>
														<span class='btn-group capw' data-toggle='buttons-radio'>
															<button type='button' class='btn btn-primary <? echo $themev1; ?> tool' ng-click='con[0].themev="one"'>Right</button>
															<button type='button' class='btn btn-primary <? echo $themev3; ?> tool' ng-click='con[0].themev="three"'>Top</button>
														</span>
													</div>


													<div class='global_holder'>
														<span class='option_text'>Input Fields Theme</span>
														<span class='btn-group capw' data-toggle='buttons-radio'>
															<button type='button' class='btn btn-primary <? echo $themef1; ?> tool' ng-click='con[0].themef=""'>None</button>
															<button type='button' class='btn btn-primary <? echo $themef2; ?> tool' ng-click='con[0].themef="transparent"'>Transparent</button>
															<button type='button' class='btn btn-primary <? echo $themef3; ?> tool' ng-click='con[0].themef="curvy"'>Curvy</button>
														</span>
													</div>




													<div class='global_holder'><span class='ot_head'>Main Label</span> 
														<span class='option_text'>
															Width of input labels</span>
															<span class='btn-group capw' data-toggle='buttons-radio'>
																<button type='button' class='btn btn-primary <? echo $cap_width; ?> tool' ng-click='con[0].cap_width=""'>Fixed</button>
																<button type='button' class='btn btn-primary <? echo $cap_width2; ?> tool' ng-click='con[0].cap_width="relative"'>Relative</button>
															</span><div class='brk'></div>


															<label for='lfs' class='option_text'>Font-size</label>
															<input type='text' id='lfs' ng-model='con[0].lfs' style='width: 80px'>
															<label for='lfc' class='option_text'>Font Color</label>
															<input type='color' id='lfc' ng-model='con[0].lfc' style='width: 40px'>
														</div>




														<div class='global_holder'><span class='ot_head'>Sub Label</span> 
															<span class='option_text'>Show sub-labels?</span>
															<span class='btn-group capw' data-toggle='buttons-radio'>
																<button type='button' class='btn btn-primary <? echo $subl; ?> tool' ng-click='con[0].subl=""'>Yes</button>
																<button type='button' class='btn <? echo $subl2; ?> btn-primary tool' ng-click='con[0].subl="subl"'>No</button>
															</span><div class='brk'></div>

															<label for='slfs' class='option_text'>Font-size</label>
															<input type='text' id='slfs' ng-model='con[0].slfs' style='width: 80px'>
															<label for='slfc' class='option_text'>&nbsp; &nbsp;Font Color</label>
															<input type='color' id='slfc' ng-model='con[0].slfc' style='width: 40px'>
														</div>

														<div class='global_holder'><span class='ot_head'>Instructions</span> 
															<label for='ifs' class='option_text'>Font-size</label>
															<input type='text' id='ifs' ng-model='con[0].ifs' style='width: 80px'>
															<label for='ifc' class='option_text'>&nbsp; &nbsp;Font Color</label>
															<input type='color' id='ifc' ng-model='con[0].ifc' style='width: 40px'>
														</div>

													</div>
												</div>
											</div>
										</div>

									</div>
								</div>



								<div class='choose_from_main'>
									<span class="choose_from btn-group">
										<button type="button" class="btn" ng-click="addEl('text')">One Line Text</button>
										<button type="button" class="btn" ng-click="addEl('para')">Multi Line Text</button>
										<button type="button" class="btn" ng-click="addEl('pass')">Password</button>
										<button type="button" class="btn" ng-click="addEl('dropdown')">Dropdown</button>
										<button type="button" class="btn" ng-click="addEl('date')">Date Input</button>
									</span>

									<span class='choose_from btn-group'>
										<a class="btn btn-info dropdown-toggle html5" data-toggle="dropdown" href="#" style='width: 48px'>
											HTML5 
										</a>
										<ul class="dropdown-menu html5d">
											<li><a ng-click="addEl('email')">E-mail</a></li>
											<li><a ng-click="addEl('url')">URL</a></li>
											<li><a ng-click="addEl('time')">Time</a></li>
										</ul>
									</span>

									<span class='choose_from btn-group'>
										<button type="button" class="btn" ng-click="addEl('check')">CheckBoxes</button>
										<button type="button" class="btn" ng-click="addEl('radio')">Multi-Choice</button>
										<button type="button" class="btn" ng-click="addEl('slider')" style='width: 50px'>Slider</button>
										<button type="button" class="btn" ng-click="addEl('slider-range')" style='width: 60px'>Range</button>
									</span>

									<span class='choose_from btn-group'>
										<button type="button" class="btn" ng-click="addEl('divider')">Divider</button>
										<button type="button" class="btn" ng-click="addEl('custom')">Custom</button>
										<button type="button" class="btn" ng-click="addEl('upload')" style='width: 40px'>File</button>
										<button type="button" class="btn" ng-click="addEl('captcha')">Captcha</button>
									</span>




								</div>
								<ul id='well' class='accordion' style='width: 506px'>


									<div style='position: relative; margin: 0' id='edit_title' class='nform_edit_div'>
										<li class='accordion-group'>
											<div class="accordion-heading">
												<div class="edit_head" href="#collapse_title" id='acc_title' data-parent='#well_accordion'>Form Title</div>
											</div>
											<div id="collapse_title" class="accordion-body">
												<div class="accordion-inner">
													<div class='opt_cl' style='padding-top: 12px; padding-left: 20px'>
														<label class='option_text' for='form_title_field' style='width: 150px; display: inline-block'>Form Title </label>
														<input class='mr' type='text' id='form_title_field' ng-model='con[0].form_title'>

														<br>

														<label class='option_text' for='form_title_px' style='width: 150px; display: inline-block'> Font Size </label>
														<input class='mr' type='text' id='form_title_px' ng-model='con[0].ft_px' style='width: 50px'>
														<br>

														<label for='title134' style='width: 150px; display: inline-block'>Font Style</label>
														<select id='title134' ng-model='con[0].tfamily' style='width: 150px; height: auto; padding: 5px'>
															<option></option>
															<option>Arial</option>
															<option>Arial Black</option>
															<option>Courier New</option>
															<option>Times New Roman</option>
															<option>Trebuchet MS</option>
															<option>Verdana</option>
														</select>&nbsp;&nbsp;&nbsp;


														<label class='label_radio' for='tbold_1'><input id='tbold_1' type='radio' ng-model='con[0].tbold' value='bold' name='tbold_if'>
															Bold</label>
															<label class='label_radio' for='tbold_2'><input id='tbold_2' type='radio' ng-model='con[0].tbold' value='normal' name='tbold_if'>
																Normal</label>

																<br>

																<label class='option_text' for='form_title_co' style='width: 150px; display: inline-block'> Font Color </label>
																<input class='mr' type='color' id='form_title_co' ng-model='con[0].ft_co' style='width: 60px'>

																<br>

																<label class='option_text' for='form_title_bg' style='width: 150px; display: inline-block'> Background Color </label>
																<input class='mr' type='color' id='form_title_bg' ng-model='con[0].ft_bg' style='width: 60px'>
																<span class='description' style='width: 230px'>Set the form theme to <strong>none</strong> before using this.</span>


															</div>

														</div>
													</div>
												</li>
											</div>



											<div ng-repeat="el in build" style='position: relative; margin: 0' id='edit_{{$index}}' class='nform_edit_div'>
												<li id='{{$index}}' class='accordion-group'>
													<div class="accordion-heading">

														<div class="edit_head" href="#collapse{{$index}}" compile="el.el_b" id='acc{{$index}}' data-parent='#well_accordion'></div>

														<button class='btn btn-danger min-btn' id='{{$index}}' title='Minimize'><i class='icon-minus icon-white'></i></button>

														<button class='btn btn-danger del-btn' id='{{$index}}' ng-click='remEl($index)' title='Delete Field'><i class='icon-remove icon-white'></i></button>
													</div>
													<div id="collapse{{$index}}" class="accordion-body">
														<div class="accordion-inner" compile="el.el_b2"></div>
													</div>
												</li>

											</div>

											<div style='position: relative; margin: 0' id='edit_submit' class='nform_edit_div'>
												<li class='accordion-group'>
													<div class="accordion-heading">
														<div class="edit_head" href="#collapse_sub" id='acc_sub' data-parent='#well_accordion'>Submit Button</div>
													</div>
													<div id="collapse_sub" class="accordion-body">
														<div class="accordion-inner">
															<div class='opt_cl' >
																<span class='sp3'>
																	<label for='sconfig9'>Text</label>
																	<input id='sconfig9' type='text' ng-model='con[0].stext'>
																</span>
																<span class='sp3'>
																	<label for='sconfig10'>Font Size</label>
																	<input id='sconfig10' type='text' ng-model='con[0].sfs'>
																</span>


																<span class='sp3' style='width: 145px'><label for='sbconfig9'>Color
																</label>
																<input id='sbconfig9' type='color' ng-model='con[0].sbfco'>
															</span>

															<span class='sp3'><label for='sconfig134'>Family
															</label>
															<select id='sconfig134' ng-model='con[0].sfamily' style='height: auto; padding: 5px'>
																<option></option>
																<option>Arial</option>
																<option>Arial Black</option>
																<option>Courier New</option>
																<option>Times New Roman</option>
																<option>Trebuchet MS</option>
																<option>Verdana</option>
															</select>
														</span>

														<span class='sp2' style='width: 215px'>
															<label>Font Weight:</label>
															<label class='label_radio' for='sbold_1'><input id='sbold_1' type='radio' ng-model='con[0].sbold' value='bold' name='sbold_if'>
																Bold</label>
																<label class='label_radio' for='sbold_2'><input id='sbold_2' type='radio' ng-model='con[0].sbold' value='normal' name='sbold_if'>
																	Normal</label>
																</span>


																<span class='sp3'>
																	<label for='sconfig1'>Padding Left & Right</label>
																	<input id='sconfig1' type='text' ng-model='con[0].spad2'>
																</span>
																<span class='sp3'>
																	<label for='sconfig2'>Padding Top & Bottom</label>
																	<input id='sconfig2' type='text' ng-model='con[0].spad1'>
																</span>
																<hr>

																<span class='sp3' style='width: 21.8%'><label for='sconfig3'>Left</label>
																	<input id='sconfig3' type='text' ng-model='con[0].lp'>
																</span>
																<span class='sp3' style='width: 21.8%'><label for='sconfig5'>Top</label>
																	<input id='sconfig5' type='text' ng-model='con[0].tp'></span>
																	<span class='sp3' style='width: 21.8%'><label for='sconfig6'>Bottom</label>
																		<input id='sconfig6' type='text' ng-model='con[0].bp'></span>

																		<span class='sp3' style='width: 21.8%'><label for='sconfig16'>Curve</label>
																			<input id='sconfig16' type='text' ng-model='con[0].curve'>
																		</span>

																		<hr>

																		<span class='sp2'>
																			<label>Style: </label><label class='label_radio'><input value='' type='radio' ng-model='con[0].sub_th'>Normal
																		</label>
																		<label class='label_radio'>
																			<input value='embossed-link' type='radio' ng-model='con[0].sub_th'>Raised</label>


																			<label class='label_radio'><input value='custom' type='radio' ng-model='con[0].sub_th'>Light
																			</label>
																		</span>

																		<span class='sp3' style='width: 145px'>

																			<label for='sconfig9'>Button Color</label>
																			<input id='sconfig9' type='color' ng-model='con[0].sco'>
																		</span>


																	</div>
																</div>
															</div>
														</li>
													</div>
												</ul>
											</div><!-- End of affixed Part -->
										</div><!-- End of Left Part -->
									</td><td>
									<div class="preview_form">





										<h3>
											Live Preview of Form <em style='font-size: 13px'>{{build.le}} elements</em>
										</h3>
										<h4>You can <strong>drag</strong> and <strong>drop</strong> the fields to change their order. Click to edit them.</h4>
										<div class='html_here'>
											<?php $rand = rand(); ?>
											<form class="nform bootstrap {{con[0].theme}} {{con[0].themev}} {{con[0].themef}} {{con[0].label_line}}" action='javascript:submit_nform(<?php echo $rand; ?>);' ng-style='{width: con[0].fw, borderRadius: con[0].fr, MozBorderRadius: con[0].fr, WebkitBorderRadius: con[0].fr, fontFamily: con[0].formfamily}' id='<?php echo $rand; ?>'>
												<input type='hidden' class='form_id' val='<?php echo $_GET['id']; ?>'>

												<div id='fe_title' class='nform_li form_title {{con[0].theme}}' ng-style='{fontSize: con[0].ft_px, borderTopLeftRadius: con[0].fr, MozBorderTopLeftRadius: con[0].fr, WebkitBorderTopLeftRadius: con[0].fr, borderTopRightRadius: con[0].fr, MozBorderTopRightRadius: con[0].fr, WebkitBorderTopRightRadius: con[0].fr, color: con[0].ft_co, backgroundColor: con[0].ft_bg, fontFamily: con[0].tfamily, fontWeight: con[0].tbold}'>{{con[0].form_title}}</div>


												<ul class='form_ul clearfix {{con[0].theme}}' id='form_ul'>
													<li ng-repeat="el in build" style='padding-bottom: {{con[0].space}}; padding-top: {{con[0].space}}' id='fe_{{$index}}' class='nform_li {{el.inline}}'>
														<div compile="el.el_f"></div>
													</li>
												</ul>
												<div id='fe_submit' class='nform_li form_submit' style='position: relative; display: block'>

													<button type='submit' class='submit_button nform_btn {{con[0].sub_th}}' ng-style='{background: con[0].sco, fontSize: con[0].sfs,  marginLeft: con[0].lp,  marginTop: con[0].tp,  marginBottom: con[0].bp,  marginRight: con[0].rp,  paddingTop: con[0].spad1,  paddingBottom: con[0].spad1,  paddingRight: con[0].spad2,  paddingLeft: con[0].spad2,  borderRadius: con[0].curve,  MozBorderRadius: con[0].curve,  WebkitBorderRadius: con[0].curve, fontFamily: con[0].sfamily, fontWeight: con[0].sbold, color: con[0].sbfco}' data-loading-text="Sending ...">{{con[0].stext}}</button>
													<br>
													<span style='text-align: center; display: block; margin-bottom: 10px'>
														<a class='ref_link' ng-href='http://codecanyon.net/item/nforms-form-builder-management/4302422?ref={{con[0].ruser}}' compile="con[0].rlink" target='_blank'></a>
													</span>

													<span class='nform_res'></span></div>
												</form>
											</div>
										</div><!-- End of Right Part -->
									</td></tr></table>
								</div><!-- End of Cover -->
							</body>

							</html>