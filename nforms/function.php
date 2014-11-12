<?php  
    /* 
    Plugin Name: nForms
    Author: nCrafts
    Author URI: http://nCrafts.net/
    */

error_reporting(0);
ini_set("log_errors", 1);
ini_set("error_log", "error.txt");

    if ( isset($_POST['action']) )
    {
        if (function_exists($_POST['action']))
        {
            $_POST['action']();
        }
    }


    if ( isset($_GET['action']) )
    {
        if (function_exists($_GET['action']))
        {
            $_GET['action']();
        }
    }


    if (!(isset($_SESSION))) {
        session_start();
    }

    if (isset($file_path))
    {
    nforms_register_scripts();
    }




function login()
{

if (!isset($_SESSION)) {
    session_start();
}

    if ($_POST['email']=='Email')
    {
        $_POST['email']='';
    }
    if ($_POST['password']=='Password')
    {
        $_POST['password']='';
    }


if ( empty($_POST['email']) || empty($_POST['password']) ) 
{ echo "Both the fields are required."; exit; }

require('users.php');

if ($_POST['email']==$user && $_POST['password']==$password)
{
     echo "Logged in";
     $_SESSION['user_email'] = $_POST['email'];
}
else
{
    echo "Incorrect User ID / Password";
}

}



    
    function nform_chart()
    {


        error_reporting(0);


        if ($handle = opendir('submissions/')) 
        {

            $i = 1;
            while (false !== ($entry = readdir($handle))) {

                if ((substr($entry, 0, 4)=='subm'))
                {
                    $temp = json_decode(file_get_contents('submissions/'.$entry),1);
                    $subs[$i]['form_id'] = $temp['form_id'];
                    $i++;
                }

            }

            closedir($handle);
        }



        foreach ($subs as $key => $value) 
        {
            $subs2["$value[form_id]"]++;
        }


        $i=0;
        foreach ($subs2 as $key => $value) 
        {


            if (file_exists("forms/form_$key.txt"))
            {
                $tmp = file_get_contents("forms/form_$key.txt");
                $tmp = json_decode($tmp, 1);
            }
            else
            {
                $tmp['details']['name'] = '(deleted)';
            }

            $temp2[$i]['times'] = $subs2[$key];
            $temp2[$i]['name'] = $tmp['details']['name'];
            $i++;
        }

        foreach ($temp2 as $key => $value) 
        {
            $temp = array();
            $temp[] = array('v' => (string) $value['name'], 'f' => null); 

            $temp[] = array('v' => (int) $value['times'], 'f' => null); 
            $rows[] = array('c' => $temp);
        }

        if ($rows)
        {
            echo '
            {
              "cols": 
              [
              {"id":"","label":"Form","pattern":"","type":"string"},
              {"id":"","label":"Instances","pattern":"","type":"number"}
              ],
              "rows": 
              '.stripslashes(json_encode($rows)).'
          }';
      }


      die();

  }

  function nform_chart2()
  {

    error_reporting(0);


    if ($handle = opendir('submissions/')) 
    {



        $i = 1;
        while (false !== ($entry = readdir($handle))) {

            if ((substr($entry, 0, 4)=='subm'))
            {
                $temp = json_decode(file_get_contents('submissions/'.$entry),1);
                $subs[$i]['form_id'] = $temp['form_id'];
                $subs[$i]['added'] = $temp['added'];
                $i++;
            }

        }

        closedir($handle);
    }


    $today = getdate();
    $tm = $today['mday'];
    $nos = 1;
    while ($nos<=$tm)
    {
        foreach ($subs as $key => $value) 
        {

            $date = date_parse($value['added']);
            if($date['day']==$nos)
            {
                $temp3[$nos]++;
            }
        }
        $nos++;
    }

    $dm = date('M');
    if (!(empty($temp3)))
    {

        if (sizeof($temp3)<5)
        {
            foreach ($temp3 as $key => $value) 
            {
                $temp = array();
                $temp[] = array('v' => (string) $dm.' '.$key, 'f' => null); 

                $temp[] = array('v' => (int) $value, 'f' => null); 
                $rows[] = array('c' => $temp);
            }
        }
        else
        {
            foreach ($temp3 as $key => $value) 
            {
                $temp = array();
                $temp[] = array('v' => (string) $key, 'f' => null); 

                $temp[] = array('v' => (int) $value, 'f' => null); 
                $rows[] = array('c' => $temp);
            }
        }
    }
    else

    {
        $rows=null;
    }

    if ($rows)
    {
        echo '
        {
          "cols": 
          [
          {"id":"","label":"Day","pattern":"","type":"string"},
          {"id":"","label":"Submissions","pattern":"","type":"number"}
          ],
          "rows": 
          '.stripslashes(json_encode($rows)).'
      }';
  }


  die();

}



function nform_delete_file()
{
    $url = $_POST['url'];
    $file_name = "file-upload/server/php/files/".basename(urldecode($url));
    $file_name2 = "file-upload/server/php/files/thumbnail/".basename(urldecode($url));

    if (is_file($file_name))
    {
        unlink($file_name);
        if (is_file($file_name2))
        {
            unlink($file_name2);
        }
        echo "Deleted";
    }
    else
    {
        echo "Not";
    }
    die();
}

function fluid_sub_upd()
{

    $id = $_POST['id'];
    $type = $_POST['type'];

    if ($type=='upd')
    {

        if (file_exists("submissions/submission_$id.txt"))
        {
            $data = file_get_contents("submissions/submission_$id.txt");
            $data = json_decode($data, 1);
            $data['seen'] = '1';
            if (file_put_contents("submissions/submission_$id.txt", json_encode($data)))
            {
                echo 'D';
            }
        }

    }
    else if ($type=='del')
    {
        if (file_exists("submissions/submission_$id.txt"))
        {
            if (unlink("submissions/submission_$id.txt"))
            {
                echo 'D';
            }
        }
    }
    else if ($type=='read')
    {
        if (file_exists("submissions/submission_$id.txt"))
        {
            $data = file_get_contents("submissions/submission_$id.txt");
            $data = json_decode($data, 1);
            $data['seen'] = null;
            if (file_put_contents("submissions/submission_$id.txt", json_encode($data)))
            {
                echo 'D';
            }
        }
    }


    die();


}

function nform_submit()
{
    global $errors;
    error_reporting(0);

    $conten = file_get_contents('php://input');
    $conten = explode('&', $conten);
    $nos = sizeof($conten);
    $title = $_POST['title'];
    global $id;
    $id = $_POST['id'];

    $i = 0;
    while ($i<$nos)
    {
        $cont = explode('=', $conten["$i"]);
        $content[$cont[0]]=$cont[1];
        $content_ex = explode('_',$cont[0]);
        if ( !($content_ex[0]=='id') && !($content_ex[0]=='action') )
        {
            $new[$i]['label'] = $content_ex[0];
            $new[$i]['value'] = urldecode($cont[1]);
            $new[$i]['type'] = $content_ex[1];
            $new[$i]['validation'] = $content_ex[2];
            $new[$i]['required'] = $content_ex[3];
            $new[$i]['min'] = $content_ex[4];
            $new[$i]['max'] = $content_ex[5];
            $new[$i]['tooltip'] = $content_ex[6];
            $new[$i]['custom'] = $content_ex[7];
            $new[$i]['custom2'] = $content_ex[8];
        }
        $i++;
    }

    // Get Form Options

    if (file_exists("forms/form_$id.txt"))
    {
    $qry = file_get_contents( "forms/form_$id.txt" );
    $qry = json_decode($qry, 1);


    $con = stripslashes($qry['con']);
    $rec = stripslashes($qry['recipients']);


    $con = json_decode($con, 1);
    $rec = json_decode($rec, 1);

    }



    // Run the Validation Functions
    $i = 0;
    while ($i<$nos)
    {

        nform_no_val($new[$i]['value'], $new[$i]['required'], $new[$i]['min'], $new[$i]['max'], $new[$i]['tooltip'], $con[0]);


       if ($new[$i]['custom2']=='replyto')
       {
        $replyto = $new[$i]['value'];
      }



        if (function_exists('nform_'.$new[$i]['validation']))
        {
            $fncall = 'nform_'.$new[$i]['validation'];
            $fncall($new[$i]['value'], $new[$i]['validation'], $new[$i]['required'], $new[$i]['min'], $new[$i]['max'], $new[$i]['tooltip'], $con[0]);
        }

        $i++;
    }
    if( sizeof($errors) )
    {
        $errors = json_encode($errors);
        echo $errors;
    }
    else
    {   


        $sender_name = $con[0]['from_name'];
        $sender_email = $con[0]['from_email'];

        $success_sent = 0;


    if ($replyto)
    {
        $headers = "From: $sender_name <$sender_email>\r\n".'Reply-To:'.$replyto."\r\n";
    }
    else
    {
        $headers = "From: $sender_name <$sender_email>\r\n".'Reply-To:'.$sender_email."\r\n";
    }


        $headers .= 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";


        $std= "style='padding: 4px 8px; margin: 0; vertical-align: top; background-color: #f2f2f2; margin-right: 7px'";
        $i=0;
        $att=1;

        while ($i<$nos)
        {
            if ( !(empty($new[$i]['type'])) && !($new[$i]['type']=='captcha') && !($new[$i]['label']=='files') && !($new[$i]['label']=='divider') && !($new[$i]['type']=='radio') && !($new[$i]['type']=='check') )
            {
                $mess .= "<div style='padding: 8px'><span ".$std."><strong>".$new[$i]['label']."</strong></span><span ".$std2.">".$new[$i]['value']."</span></div>";
            }
            else if ( $new[$i]['label']=='files' )
            {
                $mess .= "<div style='padding: 8px'><span ".$std."><strong>Attachment($att)</strong></span><span ".$std2.">".$new[$i]['value']."</span></div>";
                $att++;
            }
            else if ( $new[$i]['label']=='divider' )
            {
                $mess .= "<div style='padding: 8px; font-size: 18px; margin-top: 15px'>".$new[$i]['value']."</div>";
            }
            else if (  $new[$i]['type']=='radio' || $new[$i]['type']=='check'  )
            {
                if ( $new[$i]['value']==true )
                {
                $mess .= "<div style='padding: 8px'><span ".$std."><strong>".$new[$i]['label']."</strong></span><span ".$std2.">".$new[$i]['value']."</span></div>";
                }
            }

            $i++;
        }

        $message = 
        '<div style="padding: 8px; background-color: #eee; color: #555; font-size: 12px;">You have a new submission from nForms</div>
        <h1 style="margin-bottom: 20px; border-bottom: 1px solid #ddd; color: #666">'.$title.'</h1>
        '.urldecode($mess);
        $subject = "New Submission for '".$title."'";


        if (isset($rec))
        {
            foreach($rec as $send_to)
            {
               $to = $send_to['val'];
               if (mail($to,$subject,$message,$headers));
               {
                $success_sent++;
            }
        }
    }


    $new_json = json_encode($new);


    $date = date('d M Y (H:i)');

    $submission['content'] = $new_json;
    $submission['added'] = $date;
    $submission['form_id'] = $id;
    if (isset($qry))
    {
    $submission['form_name'] = $qry['details']['name'];
    }
    $submission['seen'] = NULL;

    $rand = uniqid(1);

    if (file_put_contents("submissions/submission_$rand.txt", json_encode($submission) ))
    {
        $rows_affected = true;
    }


    // Display Success Message if Form Submission Updated in DataBase
    if($rows_affected)
    {
        $error['sent']="true";
        $error['msg']="Message Sent";

        if ( (isset($con[0]['redirect'])) && !(empty($con[0]['redirect'])) )
        {
            $error['redirect']=$con[0]['redirect'];
        }


        if (isset($con[0]['success_msg']))
        {
            $error['msg']=$con[0]['success_msg'];
        }

        echo json_encode($error);
    }
    else
    {
        $error['sent']="false";  
        $error['msg']="The message could not be sent";

        if (isset($con[0]['failed_msg']))
        {
            $error['msg']=$con[0]['failed_msg'];
        }

        echo json_encode($error);

    }

}
die();
}

function nform_email($value, $valid, $req, $min, $max, $tool, $con)
{
    global $errors;
    $a=0;

    if ( (!(empty($value))) && !(filter_var($value, FILTER_VALIDATE_EMAIL)) )
    {
        if (isset($con['error_email']))
        {
            $errors[$tool][$a] = $con['error_email'];
        }
        else
        {
            $errors[$tool][$a] = 'Incorrect email format.';
        }
        $a++;
    }

}
function nform_url($value, $valid, $req, $min, $max, $tool, $con)
{
    global $errors;
    $a=0;

    if ( (!(empty($value))) && !(filter_var($value, FILTER_VALIDATE_URL)) )
    {

        if (isset($con['error_url']))
        {
            $errors[$tool][$a] = $con['error_url'];
        }
        else
        {
            $errors[$tool][$a] = 'Incorrect URL format.';
        }
        $a++;
    }

}
function nform_captcha($value, $valid, $req, $min, $max, $tool, $con)
{
    global $errors;
    global $id;
    $a=0;

    if (!isset($_SESSION)) {
        session_start();
    }

    if (isset($_SESSION["security_number_$id"]))
    {


        if (!isset($_SESSION)) {
            session_start();
        }


        if ( !($_SESSION["security_number_$id"]==$value) )
        {

            if (isset($con['error_captcha']))
            {
                $errors[$tool][$a] = $con['error_captcha'];
            }
            else
            {
                $errors[$tool][$a] = "Incorrect Captcha";
            }
            $a++;
        }
    }
    else
    {


        if (!isset($_SESSION)) {
            session_start();
        }


        if ( !($_SESSION["security_number"]==$value) )
        {

            if (isset($con["error_captcha"]))
            {
                $errors[$tool][$a] = $con["error_captcha"];
            }
            else
            {
                $errors[$tool][$a] = "Incorrect Captcha";
            }
            $a++;
        }

    }


}
function nform_integers($value, $valid, $req, $min, $max, $tool, $con)
{
    global $errors;
    $a=0;

    if ( (!(empty($value))) && !(filter_var($value, FILTER_VALIDATE_INT)) )
    {
        if (isset($con['error_only_integers']))
        {
            $errors[$tool][$a] = $con['error_only_integers'];
        }
        else
        {
            $errors[$tool][$a] = 'Only integers allowed';
        }
        $a++;
    }

}

function nform_no_val($value, $req, $min, $max, $tool, $con)
{
    global $errors;
    $a=0;

    if ( ($req==1) && empty($value) )
    {
        if (isset($con['error_required']))
        {
            $errors[$tool][$a] = $con['error_required'];
        }
        else
        {
            $errors[$tool][$a] = 'This field is required';
        }
        $a++;
    }
    if ( (!(empty($min))) && (!(empty($value))) && (strlen($value)<$min) )
    {
        if (isset($con['error_min']))
        {
            if (strpbrk($con['error_min'],'{{min_chars}}'))
            {
                $con['error_min'] = explode("{{min_chars}}", $con['error_min'] );
                $errors[$tool][$a] = $con['error_min'][0].$min.$con['error_min'][1];
            }
            else
            {
                $errors[$tool][$a] = $con['error_min'];
            }
        }
        else
        {
            $errors[$tool][$a] = 'At least '.$min.' characers required.';
        }
        $a++;
    }
    if ( (!(empty($max))) && (!(empty($value))) && (strlen($value)>$max) )
    {
        if (isset($con['error_max']))
        {
            if (strpbrk($con['error_max'],'{{max_chars}}'))
            {
                $con['error_max'] = explode("{{max_chars}}", $con['error_max'] );
                $errors[$tool][$a] = $con['error_max'][0].$max.$con['error_max'][1];
            }
            else
            {
                $errors[$tool][$a] = $con['error_max'];
            }
        }
        else
        {
            $errors[$tool][$a] = 'At most '.$max.' characers allowed.';
        }
        $a++;
    }

}

function nform_alphabets($value, $valid, $req, $min, $max, $tool, $con)
{
    global $errors;
    $a=0;

    if ( (!(empty($value))) && !(ctype_alpha($value)) )
    {

        $errors[$tool][$a] = 'Only alphabets allowed.';
        $a++;
    }

}

function nform_alpha($value, $valid, $req, $min, $max, $tool, $con)
{
    global $errors;
    $a=0;

    if ( (!(empty($value))) && !(ctype_alnum($value)) )
    {

        $errors[$tool][$a] = 'Only alphabets and numbers allowed.';
        $a++;
    }

}

function fluid_update() {

    if (!(isset($_POST['id'])))
    {
        die();
    }

    $file = 'forms/form_'.$_POST['id'].'.txt';

    if (!(file_exists($file)))
    {
        echo 'error';
        die();
    }
    $nform = file_get_contents($file);

    $nform = json_decode($nform, 1);
    
    if (get_magic_quotes_gpc()) {

    $nform['html'] = $_POST['content'];
    $nform['build'] = $_POST['build'];
    $nform['option'] = $_POST['option'];
    $nform['con'] = $_POST['con'];
    $nform['recipients'] = $_POST['rec'];

    }
    else {

    $nform['html'] = addslashes($_POST['content']);
    $nform['build'] = addslashes($_POST['build']);
    $nform['option'] = addslashes($_POST['option']);
    $nform['con'] = addslashes($_POST['con']);
    $nform['recipients'] = addslashes($_POST['rec']);

    }


    if (!(isset($nform['details'])))
    {
        echo 'Error. No Details.';
        die();
    }

    $nform = json_encode($nform);

    if (file_put_contents($file, $nform))
    {
    echo "Put";
    }


    die();
}


function fluid_add() {

    error_reporting(0);


    if (get_magic_quotes_gpc()) {

        $nform['details']['name'] = $_POST['name'];
        $nform['details']['desc'] = $_POST['desc'];

    }
    else
    {
        $nform['details']['name'] = addslashes($_POST['name']);
        $nform['details']['desc'] = addslashes($_POST['desc']);

    }
    $nform['build'] = '[]';
    $nform['option'] = '[]';
    $nform['con'] = '[]';
    $nform['recipients'] = '[]';
    $nform['html'] = '';

    $i=1;
    $val=false;
    while ($val==false)
    {

        if ( file_exists('forms/form_'.$i.'.txt') && is_readable('forms/form_'.$i.'.txt'))
        {
            $val = false;
            $i++;
        }
        else
        {
            $val = true;
            $nform['details']['id'] = $i;
        }
    }



    if (empty($_POST['name']))
    {
        $result2['Error'] = 'Name is required';
        echo json_encode($result2);
        die();
    }
    if (strlen($_POST['name'])<2)
    {
        $result2['Error'] = 'Name is too short';
        echo json_encode($result2);
        die();
    }
    if (strlen($_POST['name'])>90)
    {
        $result2['Error'] = 'Name is too long';
        echo json_encode($result2);
        die();
    }
    if (strlen($_POST['desc'])>500)
    {
        $result2['Error'] = 'Description is too long';
        echo json_encode($result2);
        die();
    }
    if ( (!(empty($_POST['desc']))) && strlen($_POST['desc'])<3)
    {
        $result2['Error'] = 'Description is too short';
        echo json_encode($result2);
        die();
    }

    $nform['details']['added'] = date('d M Y (H:i)');

    if ($_POST['type_form']=='duplicate')
    {
        if (file_exists("forms/form_$_POST[duplicate].txt"))
        {
            $temp = file_get_contents("forms/form_$_POST[duplicate].txt");
            $temp = json_decode($temp, 1);

            $temp['details']['id']=$nform['details']['id'];
            $temp['details']['name']=$_POST['name'];
            $temp['details']['desc']=$_POST['desc'];

            $id2 = $nform['details']['id'];
            if (file_put_contents("forms/form_$id2.txt", json_encode($temp)))
            {
            $result['Added']=$nform['details']['id'];
            echo json_encode($result);
            }
        }
    }

    else
    {
        $file = 'forms/form_'.$nform['details']['id'].'.txt';
        file_put_contents($file, json_encode($nform));
        $result['Added']=$nform['details']['id'];
        echo json_encode($result);
    }

}
function fluid_del() {
    global $wpdb;
    $id = $_POST['id'];

    if (file_exists("forms/form_$id.txt"))
    {
        if (unlink("forms/form_$id.txt"))
        {
            echo 'Deleted';
        }
    }

    die();
}


// nForms Usage

function nforms_register_scripts () {

}


function nform( $id, $pop = 0, $pop_text = 'Click Here', $class_text = '' )
{



    global $file_path;
    ?>


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js">
    </script>
    <Script>
    jQuery.noConflict();
    </Script>

    <?php
    $script['2'] = dirname(__FILE__).'/datepicker/js/bootstrap-datepicker.js';
    $script['4'] = dirname(__FILE__).'/js/form.js';
    $script['5'] = dirname(__FILE__).'/ui/js/jquery-ui-1.10.0.custom.min.js';
    $script['6'] = dirname(__FILE__).'/file-upload/js/jquery.fileupload.js';
    $script['7'] = dirname(__FILE__).'/file-upload/js/jquery.iframe-transport.js';
    $script['8'] = dirname(__FILE__).'/file-upload/js/vendor/jquery.ui.widget.js';
    $script['9'] = dirname(__FILE__).'/file-upload/js/jquery.iframe-transport.js';
    $script['3'] = dirname(__FILE__).'/bootstrap/js/bootstrap.min.js';

    foreach ($script as $key=>$value)
    {
        $test = file_get_contents($value);
        $test = str_replace("function.php", $file_path, $test);

        $file_path2 = str_replace("function.php", '', $file_path);

        $replaced = $file_path2."datepicker/js/locales";
        $test = str_replace("datepicker/js/locales", $replaced, $test);

        $replaced = $file_path2."bootstrap/img";
        $test = str_replace("bootstrap/img", $replaced, $test);


        $replaced = $file_path2.'file-upload/server';

        $test = str_replace("file-upload/server", $replaced, $test);

        echo "<script type='text/javascript'>$test</script>";
    }


    ?>
    <link href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" rel="stylesheet">

    <?php
    $style['2'] = dirname(__FILE__)."/css/bootstrap.progress.css";
    $style['3'] = dirname(__FILE__)."/css/nform_style.css";
    $style['4'] = dirname(__FILE__)."/css/boxes.css";
    $style['5'] = dirname(__FILE__)."/datepicker/css/datepicker.css";
    $style['1'] = dirname(__FILE__)."/css/bootstrap.css";

    foreach ($style as $key=>$value)
    {
        $test = file_get_contents($value);

        $file_path2 = str_replace("function.php", '', $file_path);
        
        $replaced = "url('".$file_path2;
        $test = str_replace("url('../", $replaced, $test);

        $replaced = 'url("'.$file_path2;
        $test = str_replace('url("../', $replaced, $test);
       
        $replaced = "url(".$file_path2;
        $test = str_replace("url(../", $replaced, $test);
        echo "<style>$test</style>";
    }







    if (file_exists(dirname(__FILE__)."/forms/form_$id.txt"))
    {
        $data = file_get_contents(dirname(__FILE__)."/forms/form_$id.txt");
        $data = json_decode($data, 1);
        $html = stripslashes($data['html']);

        $file_path = str_replace("function.php", 'php/image.php', $file_path);
        $html = str_replace("php/image.php", $file_path, $html);

        $replaced = $file_path2.'file-upload/server';

        $html = str_replace("file-upload/server", $replaced, $html);
    }
    else
    {
        echo 'Could not retrieve the form file.';
        return false;
    }


    
    if ($pop)
    {
        $temp= '
        <a href="#myModal" role="button" data-toggle="modal" id="'.$id.'_a" onClick="javascript:increment_form(this.id)" class="'.$class_text.' bootstrap"">'.$pop_text.'</a>

        <!-- Modal -->
        <div id="myModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none">
        <button type="button" class="close modal_close" data-dismiss="modal" aria-hidden="true">×</button>
        <div>
        '.$html.'
        </div>
        </div>';

        echo stripslashes($temp);


    }
    else 
    {

        
        echo stripslashes($html);
        
    }

}



?>