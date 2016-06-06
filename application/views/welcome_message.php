<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$public_url = "http://localhost:8888/aao-web/web/";
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Welcome to AAO</title>
        <link rel="stylesheet" type="text/css" href="<?php echo $public_url ?>css/bootstrap.min.css">
        <script src="<?php echo $public_url ?>js/libs/jquery-2.2.0.min.js"></script>
        <script src="<?php echo $public_url ?>js/libs/bootstrap.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <style>
            body{
                background-color: #f1f1f1;
                font-family: 'freightsans_pro', Arial, sans-serif;
                font-weight: normal;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                font-size: 18px;
                line-height: 1.42857;
            }
            .navbar{
                background-color: rgba(255, 255, 255, 0);
                border: 1px solid rgba(0, 0, 0, 0.05);
                font-size: 16px;
                font-weight: bold;
                position: fixed;
                top: 0;
                width: 100%;
                -webkit-transition: background-color 1s cubic-bezier(0.19, 1, 0.22, 1), top 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                transition: background-color 1s cubic-bezier(0.19, 1, 0.22, 1), top 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                -webkit-box-shadow: rgba(255, 255, 255, 0.6) 0 0 1px, rgba(0, 0, 0, 0.08) 0 -1px 0 0 inset;
                box-shadow: rgba(255, 255, 255, 0.6) 0 0 1px, rgba(0, 0, 0, 0.08) 0 -1px 0 0 inset;
            }
            .navbar a{
                color: #fff;
                -webkit-transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
                text-decoration: none;
            }

            .navbar a:hover{
                background-color: transparent !important;
                color: yellowgreen;
            }
            .navbar #logo{
                font-family: Florence, cursive;
                text-shadow: 1px 1px 0px #ededed, 4px 4px 0px rgba(0,0,0,0.15);
                font-size: 25px;
            }
            .navbar #logo a{
                color: yellowgreen;
            }
            #overview{
                height: 540px;
            }
            .slideshow .lifestyle-header {
                height: 100%;
            }
            #overview .lifestyle-header{
                background-image: url(https://d10ukqbetc2okm.cloudfront.net/mstatic/v2/images/home/lifestyle-10.jpg);
            }
            *, *:before, *:after {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }
            .slideshow .lifestyle-header .info {
                margin-top: 250px;
                text-align: center;
                color: #f1f1f1;
            }
            .slideshow .lifestyle-header .info a{
                color: yellowgreen;

                margin-right: 30px;
                font-weight: bold;
            }
            #explainer{
                font-family: 'freightsans_pro', Arial, sans-serif;
            }
        </style>
    </head>
    <body>
        <header class="navbar">
            <div class="container">
                <nav>
                    <ul class="nav navbar-nav main-nav">
                        <li id="logo"><a>AAO</a></li>

                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/what-is-mogl">How to AAO</a></li>
                        <li><a href="/s/all">For Businesses</a></li>
                        <li><a href="/business">Contact Us</a></li>
                    </ul>			
                </nav>
            </div>
        </header>
        <section style="height: 540px;" id="overview" class="page page-full active">
            <div style="max-width: 100%; height:100%;">
                <div class="slideshow" style="height:100%;">
                    <section class="lifestyle-header" style="background-image: url(https://d10ukqbetc2okm.cloudfront.net/mstatic/v2/images/home/lifestyle-10.jpg)">
                        <div class="container">
                            <div class="row">
                                <div class="info col-md-12">
                                    <h1 class="h1 centered">Get paid cash to eat and drink</h1>
                                    <div class="ctas centered">
                                        <a href="/signup/step1" class="btn-mogl--green">Download iOS App</a>
                                        <a href="/signup/step1" class="btn-mogl--green">Download Android App</a> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        <div id="explainer" class="container">
            <!-- Example row of columns -->
            <div class="row">
                <div class="col-md-4">
                    <h2>Find & Explore</h2>
                    <p>Check our apps to find your favorite restaurant near you and explore offers real-time.</p>
                </div>
                <div class="col-md-4">
                    <h2>Enjoy your meal</h2>
                    <p>Eat, drink and be merry then simply pay with your card or by cash to instantly earn rewards.</p>
                </div>
                <div class="col-md-4">
                    <h2>Receive rewards</h2>
                    <p>It's easy to use - give your phone to the cashier and accept your rewards. Once you ear rewards you can use them anywhere in our network.</p>
                </div>
            </div>

            <hr>

            <footer>
                <p style="float: right;">© 2015 AAO, Inc.</p>
            </footer>
        </div>
    </body>
</html>