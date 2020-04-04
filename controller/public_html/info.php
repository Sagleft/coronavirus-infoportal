<?php
	session_start();
	require_once __DIR__ . "/../vendor/autoload.php";

	$handler = new \App\Controller\Handler();

	$route = $handler->data_filter($_GET['route']);
	$accept_routes = [
		'symptoms', 'vroutes', 'prevention'
	];
	if(!in_array($route, $accept_routes)) {
		$handler->user->redirect('/');
	}

	$handler->render([
		'tag'   => 'info',
		'route' => $route,
		'title' => 'Информация',
		'user'  => $handler->user->data
	]);
