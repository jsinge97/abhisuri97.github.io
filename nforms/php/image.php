<?php
if (!isset($_SESSION)) {
	session_start();
}

if (isset($_GET['type']))
{
	$type = explode('_',$_GET['type']);
}



$captcha_w = 110;
$captcha_h = 30;
$min_font_size = 12;
$max_font_size = 14;
$angle = 10;
$font_path = 'font.ttf';
if (isset($type[1]))
{
	$font_path = $type[1].'.ttf';
}


$arr = str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
shuffle($arr);
$arr = array_slice($arr, 0, 5);
$session_var = implode('', $arr);

if (isset($_GET['id']))
{
$_SESSION["security_number_$_GET[id]"] = $session_var;
}
else
{
$_SESSION["security_number"] = $session_var;
}

$img = imagecreate( $captcha_w, $captcha_h );

$black = imagecolorallocate($img,0,0,0);
$line_col = imagecolorallocate($img,230,230,230);
$bg_color = imagecolorallocatealpha($img, 0, 0, 0, 127);
$background = imagecolorallocate($img,245,245,245);


if (isset($type[0]) && $type[0]=='one')
{
	$background = imagecolorallocate($img,255,255,255);
}


if (isset($type[0]) && $type[0]=='three')
{
	$background = imagecolorallocate($img,245,245,245);
}

if (isset($type[0]) && $type[0]=='two')
{
	$background = imagecolorallocate($img,255,255,255);
}

imagefill( $img, 0, 0, $bg_color );	
imagesavealpha($img, TRUE);
imagefilledrectangle($img, 0, 0, 399, 29, $background);

if (isset($type[0]) && $type[0]=='two')
{
	$k = 0;
	while ($k<40)
	{
		imageline($img, 200, $k*3, 0, $k*3,$line_col);
		$k++;
	}
}



$a = 1;
$len = strlen($session_var);
$space = ($captcha_w-10)/$len;

while ($a<=$len)
{

	imagettftext(
		$img,
		rand(
			$min_font_size,
			$max_font_size
			),
		rand( -$angle , $angle ),
		rand( ($space*($a-1))+5, ($space*$a)-5 ),
		rand( 15, $captcha_h-10 ),
		$black,
		$font_path,
		substr($session_var,$a-1,1));

	$a++;

}

header("Cache-Control: no-cache, must-revalidate"); 
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");


header("Content-type:image/jpeg");
header("Content-Disposition:inline ; filename=secure.jpg");
imagepng($img,NULL,0);
?>