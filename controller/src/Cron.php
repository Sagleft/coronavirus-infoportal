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

      $arr_confirmed = [];
      $arr_death     = [];
      $arr_recovered = [];
      $dates = [];
      $max_days = 30;

      $cyprus_data = $data['Cyprus'];
      $index_from  = count($cyprus_data) - 1;
      if(count($cyprus_data) < $max_days) {
        $index_to = 0;
      } else {
        $index_to = count($cyprus_data) - $max_days;
      }

      for($i = $index_from; $i >= $index_to; $i--) {
        //if($i == $index_from) {
        //  $num_confirmed_last = $cyprus_data[$i]['confirmed'];
        //  $num_death_last     = $cyprus_data[$i]['deaths'];
        //  $num_recovered_last = $cyprus_data[$i]['recovered'];
        //}
        $arr_confirmed[] = $cyprus_data[$i]['confirmed'];
        $arr_death[]     = $cyprus_data[$i]['deaths'];
        $arr_recovered[] = $cyprus_data[$i]['recovered'];
        $dates[] = $cyprus_data[$i]['date'];
      }

      $num_confirmed = implode(',', array_reverse($arr_confirmed));
      $num_death = implode(',', array_reverse($arr_death));
      $num_recovered = implode(',', array_reverse($arr_recovered));

      $json_new = [
        'dates'          => $dates,
        'confirmed'      => $num_confirmed,
        //'confirmed_last' => $num_confirmed_last,
        'deaths'         => $num_death,
        //'deaths_last'    => $num_death_last,
        'recovered'      => $num_recovered,
        //'recovered_last' => $num_recovered_last
      ];

      file_put_contents($json_path, json_encode($json_new));
    }
  }
