<?php


function outputCSV($data) {
	$outputBuffer = fopen("php://output", 'w');
	foreach($data as $val) 
	{
		fputcsv($outputBuffer, $val);
	}
	fclose($outputBuffer);
}

if ($handle = opendir('../submissions/')) 
{

	$line[1][1] = "Submission";
	$line[1][2] = "Read";
	$line[1][3] = "Date";
	$line[1][4] = "Form Id";
	$line[1][5] = "Field";
	$line[1][6] = "User Input";
	$i = 2;

	// Loop through the submissions
	while (false !== ($entry = readdir($handle))) 
	{

		if ((substr($entry, 0, 4)=='subm'))
		{
			$temp = json_decode(file_get_contents('../submissions/'.$entry), 1);

			if ($temp['form_id']==$_GET['id'])
			{
				$set_it[$i]=0;

				if ( $temp['seen']=='1' ) { $seen = 'Read'; } else { $seen = 'Unread'; }

				$new = json_decode($temp['content'],1);

			// Loop through the input fields within a submission
				foreach ($new as $skey=>$value)
				{
					$skey++;

					if ( !(empty($value['type'])) && !($value['type']=='captcha'))
					{

						if (!($set_it[$i]))
						{
							$set_it[$i]=1;
							$line[$i*$skey][1] = $i-1;
							$line[$i*$skey][2] = "$seen";
							$line[$i*$skey][3] = "$temp[added]";
							$line[$i*$skey][4] = "$temp[form_id]";
							$line[$i*$skey][5] = "$value[label]";
							$line[$i*$skey][6] = "$value[value]";

						}
						else
						{
							$line[$i*$skey][1] = "";
							$line[$i*$skey][2] = "";
							$line[$i*$skey][3] = "";
							$line[$i*$skey][4] = "";
							$line[$i*$skey][5] = "$value[label]";
							$line[$i*$skey][6] = "$value[value]";

						}

					}
			} // End of foreach (field loop)

			$i++;			
		}


	}

	} // End of While (submission loop)

	closedir($handle);
}


$header = 'Form Submission Data';


echo '<pre>';
$data = outputCSV($line);
echo '</pre>';
print "$header\n$data";

die();


header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=file.csv");
header("Pragma: no-cache");
header("Expires: 0");

?>