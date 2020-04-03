<?php
	session_start();
	require_once __DIR__ . "/../vendor/autoload.php";

	$handler = new \App\Controller\Handler();

	$handler->render([
		'tag'   => 'home',
		'title' => '',
		'user'  => $handler->user->data,
		'info'  => [
			'today' => date('m.d.y'),
			'stats' => $handler->logic->getTimeseriesCyprus()
		]
	]);
