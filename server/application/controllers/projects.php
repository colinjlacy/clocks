<?php

class Projects extends CI_Controller {

    public function index()
    {
//        $this->load->view('welcome_message');
        $this->load->view('ajax_test');
    }

	public function insert()
	{
		// load the Projects data model
		$this->load->model('Stored_projects');

		// run the insert_project method
		$this->Stored_projects->insert_project();

		// once data has been inserted, return the view content to the people
		$this->load->view("ajax_test");
	}


}

/* End of file stored_projects.php */
/* Location: ./server/application/controllers/stored_projects.php */