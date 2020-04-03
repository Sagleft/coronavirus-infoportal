<?php
  require_once __DIR__ . "/../vendor/autoload.php";

  $handler = new \App\Controller\Handler();
  require_once __DIR__ . "/../vendor/autoload.php";

  $handler = new \App\Controller\Handler();

  $cron = new \App\Controller\Cron();
  $cron->updateTimeseries($handler->logic->getTimeseriesPath());
