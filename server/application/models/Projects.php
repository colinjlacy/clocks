<?php

// The Projects Model

class Projects extends CI_Model {

    var $id         		= '';
    var $parent     		= '';
	var $title				= '';
	var $hourly_rate		= '';
	var $time_spent			= '';
	var $time_budgetted		= '';
	var $owner				= '';
	var $access				= '';

	function __construct()
	{
		// Call the Model constructor
		parent::__construct();
	}

}

    /* End of file projects.php */
    /* Location: ./server/application/models/projects.php */