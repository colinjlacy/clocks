<?php

// The Projects Model

class Stored_projects extends CI_Model {

	var $id;
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
		return $this->db->insert_id();
	}

	function get_projects()
	{
		$query = $this->db->get('projects');
		return $query->result();
	}

	function retrieve_project($id)
	{
		return $this->db->get_where('projects', array('id' => $id), 1)->row();
	}

	function update_project()
	{
		// get data from the passed JSON object
		$post_data = json_decode(file_get_contents("php://input"), true);

		$time_spent = $post_data['seconds'];

		$this->db->where('id', $post_data['id']);
		$this->db->update('projects', array('time_spent' => $time_spent));
	}

	function delete_project()
	{
		// get data from the passed JSON object
		$post_data = json_decode(file_get_contents("php://input"), true);

		$this->db->delete('projects', array('id' => $post_data['id']));
	}

}

    /* End of file stored_projects.php */
    /* Location: ./server/application/models/stored_projects.php */