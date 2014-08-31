<?php

// The Projects Model

class Stored_projects extends CI_Model {

    var $id         		= '';
    var $parent     		= '';
	var $title				= '';
	var $hourly_rate		= '';
	var $time_spent			= '';
	var $time_budgeted		= '';
	var $owner				= '';
	var $access				= '';

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

		// run the insert script
		$this->db->insert('projects', $this);
	}

}

    /* End of file stored_projects.php */
    /* Location: ./server/application/models/stored_projects.php */