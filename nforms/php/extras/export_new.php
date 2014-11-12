<?php

error_reporting(0);

header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=file.csv");
header("Pragma: no-cache");
header("Expires: 0");



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

	$i = 1;

	// Loop through the submissions
	while (false !== ($entry = readdir($handle))) 
	{

		if ((substr($entry, 0, 4)=='subm'))
		{
			$temp = json_decode(file_get_contents('../submissions/'.$entry), 1);

			if ($temp['form_id']==$_GET['id'])
			{

				$new = json_decode($temp['content'], 1);

				foreach ($new as $skey=>$value)
				{
					$skey++;

					if ( !(empty($value['type'])) && !($value['type']=='captcha'))
					{

						$line[$i*$skey][1] = "$value[label]";
						$line[$i*$skey][2] = "$value[value]";

						$label[$i][$skey] = urldecode($value['label']);


					}
			} // End of foreach (field loop)

			$i++;			
		}


	}

	} // End of While (submission loop)

	closedir($handle);
}

$a = 2;
$res = array($label[1]);
while ($a < $i)
{
	$res[0] = array_merge($res[0], $label[$a]);
	$a++;
}

$res[0] = array_unique($res[0]);

$res[0] = array_values($res[0]);



if ($handle = opendir('../submissions/')) 
{

	$i = 1;

	// Loop through the submissions
	while (false !== ($entry = readdir($handle))) 
	{

		if ((substr($entry, 0, 4)=='subm'))
		{
			$temp = json_decode(file_get_contents('../submissions/'.$entry), 1);

			if ($temp['form_id']==$_GET['id'])
			{

				$new = json_decode($temp['content'], 1);

				foreach ($new as $skey=>$value) // For Each Field in Submission X
				{
					if ( !(empty($value['type'])) && !($value['type']=='captcha'))
					{
						
						$des = 1;
						$found = true;
						while ($found == true)
						{
							if ($new[$skey]['label']==$new[$skey-$des]['label'] && !(empty($new[$skey-$des]['value'])))
							{
								$new[$skey]['value'] .= ', '.$new[$skey-$des]['value'];
								$found = true;
								array_splice($new[$skey-$des], 1);
								$des++;
							}
							else
							{
								$found = false;
							}
						}

						$value['label'] = urldecode($value['label']);


						foreach ($res[0] as $ky=>$rs) // For Each Stored Label
						{
							if ($rs==$value['label'])
							{

								$res[$i][$ky] = $new[$skey]['value'];

								$do = $ky;
								while ($do >= 0)
								{
									if (!($res[$i][$do])) 
									{
										$res[$i][$do] = '';
									}
									$do--;
								}

							}
						} // End of 'For Each Sorted Label'
					}
			    } // End of foreach (field loop)

			    ksort($res[$i]);

			    $i++;			
			}


		}

	} // End of While (submission loop)

	closedir($handle);
}





$header = 'Form Submission Data';

$data = outputCSV($res);



?>