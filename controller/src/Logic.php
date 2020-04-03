<?php
	namespace App\Controller;

	class Logic {
		public $user = null;
		protected $db  = null;

		public function __construct() {
			//
		}

		public function setdb($db) {
			$this->db = &$db;
		}

		public function setUser($user): void {
			$this->user = &$user;
		}

		public function getTimeseriesPath() {
			return __DIR__ . '/../../view/cache/timeseries.json';
		}

		public function getTimeseriesCyprus() {
			//TODO: check file exists
			$json = file_get_contents($this->getTimeseriesPath());
			//TODO: verify json
			return json_decode($json, true);
		}
	}
