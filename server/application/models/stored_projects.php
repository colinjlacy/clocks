<?php

// The Projects Model

class Stored_projects extends CI_Model {

    var $parent;
	var $title;
	var $hourly_rate;
	var $time_spent = 0;
	var $time_budgeted;
	var $owner;
	var $access;

	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}
	function insert_project()
	{
		// get data from the passed JSON object
		$post_data = json_decode(file_get_contents("php://input"), true);

		// ratchet out that data to the local variables
		$this->title = $post_data['title'];
		$this->owner = 1;
		$this->hourly_rate = $post_data['hourly_rate'];
		$this->time_spent = $post_data['time_spent'];
		$this->time_budgeted = $post_data['time_budgeted'];

		// run the insert script
		$this->db->insert('projects', $this);
	}

	function get_projects()
	{
		$query = $this->db->get('projects');
		return $query->result();
	}

}

    /* End of file stored_projects.php */
    /* Location: ./server/application/models/stored_projects.php */