const express = require('express');

const server = express();



server.all('/', (req, res)=>{

res.send(`
<!DOCTYPE html>

<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.discordapp.com/avatars/737040516687986808/4fd2d04bcc85a19a4331e359bf93eb02.png?size=2048" rel="icon">

    <title>Sigma Bot</title>
<meta charset="UTF-8">
  <meta property="og:title" content="Sigma Bot">
	<meta property="og:type" content="website">
	<meta property="og:description" content="A simple moderation bot for your server with 24/7 uptime">
	<meta property="og:locale" content="fr_FR">
	<meta property="og:url" content="/discord">
	<meta property="og:site_name" content="Sigma Bot">
	<meta property="og:image" content="https://cdn.discordapp.com/avatars/737040516687986808/4fd2d04bcc85a19a4331e359bf93eb02.png?size=2048">
	<meta property="og:image:secure_url" content="https://cdn.discordapp.com/avatars/737040516687986808/4fd2d04bcc85a19a4331e359bf93eb02.png?size=2048">
  <meta name="theme-color" content="#00ffff">
    <meta name="apple-mobile-web-app-status-bar-style" content="#00ffff">
    <meta name="msapplication-navbutton-color" content="#00ffff">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="favicon.ico" type="image/x-icon"/>
</head>

<body>
	<div id="preloder">
		<div class="loader"></div>
	</div>

    <img id="userPhoto" src="https://cdn.discordapp.com/avatars/737040516687986808/4fd2d04bcc85a19a4331e359bf93eb02.png?size=2048" alt="User Photo">
    
    <a href="https://discord.com/oauth2/authorize?client_id=737040516687986808&permissions=1378046241911&scope=bot%20applications.commands" id="userName">@sigmabot</a>
<h1> Bot Online </h1>
    <!-- Javascript -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
</body>
<style>
@import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');
:root {
    --bgColor:#1C1C1C;
    --accentColor: #E6E6E6;
    --font: 'Karla', sans-serif;
}

body{
    background-color: var(--bgColor);
}

/*------------------
	Preloder
--------------------*/
#preloder {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 999999;
	background: #1C1C1C;
}
.loader {
	width: 50px;
	height: 50px;
	border: 4px solid #00ffff;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -13px;
	margin-left: -13px;
	border-radius: 60px;
	border-left-color: rgb(254, 255, 255);
	-webkit-box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
	        box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
	animation: loader 0.8s linear infinite;
	-webkit-animation: loader 0.8s linear infinite;
}
@keyframes loader {
	0% {
		-webkit-transform: rotate(0deg);
		        transform: rotate(0deg);
	}
	50% {
		-webkit-transform: rotate(180deg);
		        transform: rotate(180deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
		        transform: rotate(360deg);
	}
}
@-webkit-keyframes loader {
	0% {
		-webkit-transform: rotate(0deg);
	}
	50% {
		-webkit-transform: rotate(180deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

#userPhoto{
    width: 110px;
    height: 110px;
    display: block;
    margin: 35px auto 20px;
    border-radius: 50%;
}

#userName{
    color: #bbb;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    display: block;
    font-family: var(--font);
    width: 100%;
    text-align: center;
    text-decoration: none;
}

#links{
    max-width: 675px;
    width: auto;
    display: block;
    margin: 27px auto;
}
.link{
    display: block;
    background-color: var(--accentColor);
    color: var(--bgColor);
    font-family: var(--font);
    text-align: center;
    margin-bottom: 20px;
    padding: 17px;
    text-decoration: none;
    font-size: 1rem;
    transition: all .25s cubic-bezier(.08,.59,.29,.99);
    border: solid var(--accentColor) 2px;
}

.link:hover{
    background-color: var(--bgColor);
    color: var(--accentColor);
}

</style>

    <script>
    'use strict';

$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");
 });
 </script>
</html>
`)
   res.end();

})



function keepAlive(){

   server.listen(3000, ()=>{console.log("Server is online!")});

}



module.exports = keepAlive;