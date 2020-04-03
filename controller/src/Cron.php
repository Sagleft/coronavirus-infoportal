<?php
  namespace App\Controller;

  class Cron {
    public function updateTimeseries($json_path = '') {
      if($json_path == '') {
        exit('invalid json path specified');
      }
      $timeseries_url = 'https://pomber.github.io/covid19/timeseries.json';
      $json_new = \App\Model\Utilities::curl_get($timeseries_url);

      if(!\App\Model\Utilities::isJson($json_new)) {
        return;
      }
      $data = json_decode($json_new, true);
      if(!isset($data['Cyprus'])) {
        return;
      }
      file_put_contents($json_path, $json_new);
    }
  }
