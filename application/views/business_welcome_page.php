<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//$public_url = "http://localhost:8888/aao-web/web/";
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Welcome to AAO</title>
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/main.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/custom-form.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/global.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/angular-chart.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/login.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="<?php //echo $public_url ?>css/simple-sidebar.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/jquery.timepicker.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/pikaday.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/fullcalendar.css" rel='stylesheet'>
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/fullcalendar.print.css" rel='stylesheet' media='print'>
        <script data-main="<?php echo $public_url ?>js/main.js" src="<?php echo $public_url ?>js/libs/require-2.1.22.js"></script>
        <script type="text/css" src="http://cdn.rawgit.com/jtblin/angular-chart.js/master/dist/angular-chart.css"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    <body>
        <div id="wrapper" class='toggled'>
            <div ui-view="header"></div>
            <div class="main-content" ui-view="content"></div>
        </div>
    </body>
</html>