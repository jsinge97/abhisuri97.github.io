<?php     
error_reporting(0);


if (!isset($_SESSION)) {
	session_start();
}

if (!(isset($_SESSION['user_email'])))
{
	header( 'Location: login.php');
}


ini_set("log_errors", 1);
ini_set("error_log", "error.txt");
?>
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'> 
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.2/angular-sanitize.min.js"></script>


	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>


	<script src="https://www.google.com/jsapi"></script>

	<script src="js/js.js"></script>
	<script src="js/form_index.js"></script>
	<script src="datepicker/js/datepicker.js"></script>
	<script src="ui/js/jquery-ui-1.9.2.custom.min.js"></script>
	<script src="datatables/media/js/jquery.dataTables.min.js"></script>
	<script src="bootstrap/js/bootstrap.min.js"></script>


	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

	<link href="css/style.css" rel="stylesheet">

	<link href="css/boxes.css" rel="stylesheet">

	<link href="datepicker/css/datepicker.css" rel="stylesheet">

	<style>
.table th, .table td {
	line-height: 30px;
	font-size: 14px;
}

	</style>





	<?php

	if ($handle = opendir('forms/')) 
	{

		$i = 1;
		while (false !== ($entry = readdir($handle))) {

			if ((substr($entry, 0, 4)=='form'))
			{
				$temp = json_decode(file_get_contents('forms/'.$entry),1);
				if (isset($temp['details']['id']))
				{
				$row[$i] = $temp['details'];
			$i++;
				}
			}

		}

		closedir($handle);
	}




	if ($handle = opendir('submissions/')) 
	{

		$i = 1;
		$seen = 0;
		$unseen = 0;
		while (false !== ($entry = readdir($handle))) {

			if ((substr($entry, 0, 4)=='subm'))
			{
				$temp = json_decode(file_get_contents('submissions/'.$entry),1);
				$subs_row[$i]['content'] = $temp['content'];
				$subs_row[$i]['added'] = $temp['added'];
				$subs_row[$i]['form_id'] = $temp['form_id'];
				$subs_row[$i]['form_name'] = $temp['form_name'];
				$subs_row[$i]['seen'] = $temp['seen'];

				$tmp2 = explode('_', $entry);
				$tmp2 = explode('.', $tmp2[1]);
				$subs_row[$i]['id'] = $tmp2[0];
				if ($temp['seen']==null)
				{
					$unseen++;
				}
				else
				{
					$seen++;
				}

			$i++;
			}

		}

		closedir($handle);
	}

	?>

	<script>

	jQuery(document).ready(function () {

// Please ignore this
if ((document.domain=='ncrafts.net') || (document.domain=='www.ncrafts.net'))
{

	setTimeout(function() 
	{
		jQuery('#new_form_pop').trigger('click');
	},10);

}

});

	</script>

	
</head>

<body>

<a href='logout.php' class='logout'>logout</a>


	<div class="ffcover_add">

	<a class='docs_title' href='documentation.html' target='_blank'>documentation</a>

		<div class='charts'>
			<div id="title_div">	
				<h1>nForms</h1>
			</div>
			<div id="chart_div" class='chart_js'></div>
			<div id="chart_div2" class='chart_js'></div>
		</div>




		<form class="modal hide fade" id='new_form' action='javascript:submit_new_form();'>
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h3>Add Form</h3>
			</div>
			<div class="modal-body">

				<label class='label_radio' for='new_r1' >
					<input type='radio' id='new_r1' value='new' checked name='type_form'>New Form
				</label>
				<label class='label_radio' for='new_r2' >
					<input type='radio' id='new_r2' value='duplicate' name='type_form'>Duplicate form with ID
				</label>



				<select name='duplicate' style='height: 30px'>
					<?php 
					foreach ($row as $key => $data) 
					{
						?>
						<option value='<?php echo $data['id']; ?>'><?php echo "#$data[id] $data[name]"; ?></option>
						<?php 
					} 
					?>

					</select>


					<hr>

					<label for='form_name_1'>Name of Form</label>
					<input id='form_name_1' name='name' type="text" class="input-small" placeholder='My Contact Form' style='width: 220px'>

					<br><br>
					<label for='form_desc_1'>Description (optional)</label>
					<textarea id='form_desc_1' name='desc' style='width: 220px' rows='4'></textarea>
					<br><br>


				</div>
				<div class="modal-footer">
					<span class='response_ajax'></span>
					<a href="#" class="btn" data-dismiss="modal">Close</a>
					<button type="submit" id='submit_new_btn' class="btn btn-success"><i class='icon-plus icon-white'></i> Add Form</button>
				</div>
			</form>


			<?php 
			$saw['today'] = 0;
			$saw['month'] = 0;

			if ($subs_row)
			{
			foreach ($subs_row as $key => $row_temp1) 
			{

				$dt = date_parse($subs_row[$key]['added']);
				$date = date_parse(date('d M Y (H:m)'));

				if ($dt['month']==$date['month'] && $dt['day']==$date['day'] && $dt['year']==$date['year'])
				{
					$saw['today']++;
				}
				if ($dt['month']==$date['month'] && $dt['year']==$date['year'])
				{
					$saw['month']++;
				}
			} 
			}


			?>

			<div class='group_cover'>
				<h2 data-toggle='collapse' href='#subs_c' class='h2_acc' style='cursor: pointer'>Submissions 
					<span class='stat' style='margin-left: 40px'>
						<span class='unr_msg' id='unr_ind'><?php echo $unseen; ?>
						</span> unread&nbsp;&nbsp;
						<span class='tot_msg' id='tot_ind'><?php echo $seen+$unseen; ?>
						</span> total	
					</span>
					<span class='stat'>
						<span class='unr_msg'><?php echo $saw['today']; ?>
						</span> new today&nbsp;&nbsp;
						<span class='tot_msg'><?php echo $saw['month']; ?>
						</span> new this month
					</span>
					<a class='btn btn-success' id='export' style='margin-left: 30px'>
						Export Data to Excel
					</a>
				</h2>

				<div id='subs_c' class='collapse'>

					<table class='table-sub table table-hover' id='subs'>
						<thead>
							<tr>
								<td width="10%" title='Click to sort'>#</td>
								<td width="10%" title='Click to sort'>Read</td>
								<td width="15%" title='Click to sort'>Date</td>
								<td width="16%" title='Click to sort'>Original Form ID</td>
								<td width="25%" title='Click to sort'>Form Name</td>
								<td width="14%" title='Click to sort'>Message</td>
								<td width="10%" title='Click to sort'>Options</td>
							</tr>
						</thead>
						<tbody>
							<?php
							if ($subs_row)
							{
							foreach ($subs_row as $key => $row_temp) {
								$std= "style='padding: 4px 8px; margin: 0; vertical-align: top'";

								$new = json_decode($subs_row[$key]['content'],1);

								?>

								<tr id='sub_<?php echo $row_temp['id']; ?>' class='<?php if ($row_temp['seen']=='1') {echo 'row_shade';}?>'>
									<td style='text-align: center'><?php echo $key; ?></td>
									<td style='text-align: center' id='rd_<?php echo $row_temp['id']; ?>'><?php if($row_temp['seen']) {echo 'Read';} else {echo 'Unread';} ?></td>
									<td style='text-align: center'><?php echo $row_temp['added']; ?></td>
									<td style='text-align: center'><?php echo $row_temp['form_id']; ?></td>
									<td><?php echo $row_temp['form_name']; ?></td>

									<td style='text-align: center'>
										<button class='btn view_mess' id='upd_<?php echo $row_temp['id']; ?>' data-toggle='modal' data-target='#view_modal'>View</button>

									</td>
									<td style='text-align: center'>
										<i class='icon-trash view_mess' id='del_<?php echo $row_temp['id']; ?>' title='Delete message'></i>
										<i class='icon-envelope view_mess' id='read_<?php echo $row_temp['id']; ?>' title='Mark as unread'></i>
									</td>
								</tr>
								<?php }
								} ?>

							</tbody>
						</table>
					</div>
				</div>




				<div class='group_cover'>



					<h2 class='h2_acc' data-toggle='collapse' href='#existing_forms' style='cursor: pointer'>Existing Forms <a class='btn btn-success' id='new_form_pop' data-toggle='modal' href='#new_form'><i class='icon-plus icon-white'></i> Add Form</a>
					</h2>
					<div class='collapse' id='existing_forms'>
						<div class='subs_wrapper'>
							<table class='table table-hover' id='ext'>
								<thead>
									<tr>
										<th width='5%'>Id</th>
										<th width='23%'>Name of Form</th>
										<th>Description</th>
										<th width='17%'>Date Added</th>
										<th width='10%'>Delete</th>
									</tr>
								</thead>
								<tbody>
									<?php
									$i = 1;
									$to = sizeof($row);
									while ($i <= $to) {
										?>
										<tr id='<?php echo $row["$i"]["id"]; ?>'>
											<td class='row_click'><?php echo $row["$i"]["id"]; ?></td>
											<td class='row_click'><a href='builder.php?id=<?php echo $row["$i"]["id"]; ?>'><?php echo $row["$i"]["name"]; ?></a></td>
											<td class='row_click'><?php echo $row["$i"]["desc"]; ?></td>
											<td class='row_click'><?php echo $row["$i"]["added"]; ?></td>
											<td>
												<button class='delete-row btn btn-danger' data-loading-text='deleting...' data-complete-text="<i class='icon-ok icon-white'></i> Deleted" id='delete_<?php echo $row["$i"]["id"]; ?>'><i class='icon-remove icon-white'></i> Delete
												</button>
											</td>
										</tr>
										<?php 
										$i++;
									} ?>

									</tbody>
								</table>
							</div>
						</div>
					</div>


					<div class='group_cover'>
						<h2 data-toggle='collapse' href='#files_c' class='h2_acc' style='cursor: pointer'>File Manager 
							<span class='stat' style='margin-left: 40px'>
								<span class='unr_msg' id='unr_ind2'>
								</span> files&nbsp;&nbsp;
							</span>
						</h2>

						<div id='files_c' class='collapse'>
							<div class='subs_wrapper'>

								<table class='table-sub table table-hover' id='files_manager_table'>
									<thead>
										<tr>
											<td width="10%">#</td>
											<td width="20%">Name</td>
											<td width="10%">Size</td>
											<td width="45%">Url</td>
											<td width="15%">Delete</td>
										</tr>
									</thead>
									<tbody>
										<?php

					$dir = "file-upload/server/php/files/";

// Open a known directory, and proceed to read its contents
					if (is_dir($dir)) {
						if ($dh = opendir($dir)) {

							$i = 1;
							while (($file = readdir($dh)) !== false) {

								if ( filetype($dir . $file)=='file' && !($file=='.htaccess') )
								{

									$path = $dir.$file;

									?>


									<tr>
										<td><?php echo $i; ?></td>
										<td><?php echo $file; ?></td>
										<td><?php echo round((filesize($dir.$file)/1024),2); ?> KB</td>
										<td><a href='<?php echo $path; ?>' target='_blank'><?php echo $path; ?></a></td>
										<td><a class='btn btn-danger delete_from_manager' data-loading-text='deleting...' data-url='<?php echo $path; ?>' data-complete-text='<i class="icon-ok icon-white"></i> Deleted' id='del_fm_<?php echo $i; ?>'><i class='icon-remove icon-white'></i> Delete</a></td>
									</tr>


									<?php
								$i++;
								}

							}
							closedir($dh);
						}
					}


					?>

										</tbody>
									</table>
								</div>
							</div>
						</div>




					</div><!-- End of Cover -->
					<?php
					foreach ($subs_row as $key=>$row_temp4) {
						$std  = "style='padding: 4px 8px; margin: 0; vertical-align: top; width: 30%; display: inline-block'";
						$std2 = "style='padding: 4px 8px; margin: 0; vertical-align: top; width: 60%; display: inline-block'";

						$new = json_decode($row_temp4['content'],1);
						$att = 1;

					foreach ($new as $value)
					{
						if ( !(empty($value['type'])) && !($value['type']=='captcha') && !($value['label']=='files') && !($value['label']=='divider') )
						{
							if ( ($value['type']=='radio' || $value['type']=='check') && (empty($value['value'])) )
								{
									$mess[$key] .= "";
								}
							else
								{
									$mess[$key] .= "<li><span $std><strong>$value[label] </strong></span><span $std2>$value[value]</span></li>";
								}
						}
						else if ($value['label']=='files') 
						{
							$mess[$key] .= "<li><span $std><strong>Attachment($att) </strong></span><a href='$value[value]' target='_blank' $std2>$value[value]</a></li>";
							$att ++;
						}
						else if ($value['label']=='divider') 
						{
							$mess[$key] .= "<hr>$value[value]<hr>";
							$att ++;
						}

					}



						$i++;
						$message[$key] = 
						'<ul style="list-style: none">
						'.urldecode($mess[$key]).'
						</ul>';
						$row_temp4_id = $row_temp4['form_id'];
						$row_temp4_name = $row_temp4['form_name'];


						?>

						<span style='display: none' id='upd_name_<?php echo $row_temp4['id']; ?>'><?php echo "$row_temp4[form_name] (Form ID: $row_temp4[form_id])" ?></span>
						<span style='display: none' id='upd_text_<?php echo $row_temp4['id']; ?>'><p><?php echo $message[$key]; ?></p></span>


						<?php
					}
					?>




					<div class='hid modal hide fade' id='view_modal' aria-hidden="true">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
							<h3 class="myModalLabel"></h3>
						</div>
						<div class="modal-body">
							<p></p>
						</div>
						<div class="modal-footer">
							<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
						</div>
					</div>

				</body>

				</html>