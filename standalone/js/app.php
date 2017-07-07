<?php

header('Content-type: text/javascript; charset: UTF-8');

echo '/*
 * App.php JavaScript File Parser
 * Version 1.0
 * © 2017 TriForce - Matías Silva
 * 
 * Site:     http://dev.gznetwork.com/websitebase
 * Issues:   https://github.com/triforcex/websitebase
 * 
 */';

require_once('../resources/php/minifier/minifier.php');

$jsLang = isset($_GET['lang']) ? $_GET['lang'] : 0; //0 = English, 1 = Spanish
$jsUrl = minifyGetURL('js');
$jsFiles = array(
			  $jsUrl.'/js/app-base.js',
			  $jsUrl.'/js/app-ready.js',
			  $jsUrl.'/js/app-load.js',
			  $jsUrl.'/js/app-responsive.js',
			);
$jsBuffer = '';
$jsMinify = true;

foreach($jsFiles as $jsFile){
	$jsBuffer .= file_get_contents($jsFile);
}

$jsVariables = array(
					//Screen
					'@screen-small-phone' 	=> '320', 
					'@screen-medium-phone' 	=> '360',
					'@screen-phone' 		=> '480',
					'@screen-tablet' 		=> '768',
					'@screen-desktop' 		=> '992',  
					'@screen-widescreen' 	=> '1200', 
					'@screen-full-hd' 		=> '1920', 
					//Global
					'@global-url' => $jsUrl,
					//Form Validation
					'@validate-title' 			=> $jsLang == 1 ? 'Alerta Formulario' :  'Form Alert', 
					'@validate-normal' 			=> $jsLang == 1 ? 'Por favor complete los campos.' : 'Please fill the fields.', 
					'@validate-number'	 		=> $jsLang == 1 ? 'Por favor escriba un número válido.' : 'Please type a valid number.', 
					'@validate-tel' 			=> $jsLang == 1 ? 'Por favor escriba un teléfono válido.' : 'Please type a phone number.', 
					'@validate-pass' 			=> $jsLang == 1 ? 'Por favor complete su clave.' : 'Please fill your password.', 
					'@validate-email' 			=> $jsLang == 1 ? 'Por favor escriba un E-Mail válido.' : 'Please type a correct E-Mail.',
					'@validate-search' 			=> $jsLang == 1 ? 'Por favor complete el campo de busqueda.' : 'Please fill the search field.', 
					'@validate-checkbox' 		=> $jsLang == 1 ? 'Por favor elija opciones.' : 'Please check an option.',
					'@validate-radio' 			=> $jsLang == 1 ? 'Por favor elija una de las opciones.' : 'Please check one of the options.',
					'@validate-textarea' 		=> $jsLang == 1 ? 'Por favor escriba un mensaje.' : 'Please write a message.',
					'@validate-select' 			=> $jsLang == 1 ? 'Por favor seleccione una opción.' : 'Please select an option.',
					'@validate-confirm-title' 	=> $jsLang == 1 ? 'Confirmar Formulario' : 'Form Confirm', 
					'@validate-confirm-text' 	=> $jsLang == 1 ? '¿Estas seguro de que deseas enviar el formulario?' : 'Are you sure you want to send the previous info?', 
					//Video launch
					'@videolaunch-title' 		=> $jsLang == 1 ? 'Compartir Enlace' : 'Share Link', 
					'@videolaunch-text' 		=> $jsLang == 1 ? '¡El enlace ha sido copiado!' : 'The share link has been copied!',
					//Map launch
					'@maplaunch-title' 			=> $jsLang == 1 ? 'Mapa Dirección' : 'Map Select',
					'@maplaunch-text' 			=> $jsLang == 1 ? 'Seleccione una de las opciones' : 'Select one of options below',
					//Check disabled
					'@disabled-text' 			=> $jsLang == 1 ? 'Este contenido esta deshabilitado por el momento.' : 'This content is currently disabled.',
					//Lightgallery
					'@lgtitle-prev' 			=> $jsLang == 1 ? 'Cargando página anterior ...' : 'Loading previous page ...',
					'@lgtitle-next' 			=> $jsLang == 1 ? 'Cargando siguiente página ...' : 'Loading next page ...',
				);

$jsKey = array_keys($jsVariables);
$jsBuffer = str_replace($jsKey, $jsVariables, $jsBuffer);

echo $jsMinify == true ? minifyJS($jsBuffer) : $jsBuffer;

?>