<?php
if ($handle = opendir('../submissions/')) 
{
	
	if (!isset($_SESSION)) {
	session_start();
}

if (!(isset($_SESSION['user_email'])))
{
	header( 'Location: login.php');
}


	$i = 1;

	// Loop through the submissions
	while (false !== ($entry = readdir($handle))) 
	{

		if ((substr($entry, 0, 4)=='subm'))
		{
			$temp = json_decode(file_get_contents('../submissions/'.$entry), 1);

			$i++;
		    $set_it[$i]=0;

			if ( $temp['seen']=='1' ) { $seen = 'Read'; } else { $seen = 'Unread'; }

			$new = json_decode($temp['content'],1);

			// Loop through the input fields within a submission
			foreach ($new as $skey=>$value)
			{
				$skey++;

				if ( !(empty($value['type'])) && !($value['type']=='captcha'))
				{
					$mess[$skey] = "$value[label]\t$value[value]";

					if (!($set_it[$i]))
					{
						$set_it[$i]=1;
						$line[$i*$skey] = "$i\t$seen\t$temp[added]\t$temp[form_id]\t$mess[$skey]";
					}
					else
					{
						$line[$i*$skey] = "\t\t\t\t$mess[$skey]";
					}

				}
			} // End of foreach (field loop)

			$i++;
		}

	} // End of While (submission loop)

	closedir($handle);
}


$header = 'Form Submission Data';


$sz = sizeof($line);
$a=0;
$data='';
foreach($line as $key=>$row)
{
	$data.="$row\n";
}

$data = "Submission #\tRead\tDate\tForm Id\tField\tUser Filled Data\n$data";

header("Content-type: application/x-msdownload");
header("Content-Disposition: attachment; filename=form_data.xls");
header("Pragma: no-cache");
header("Expires: 0");
print "$header\n$data";
?>