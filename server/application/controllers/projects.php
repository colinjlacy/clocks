<?php

class Projects extends CI_Controller {

    public function load()
    {
		// load the Projects data model
		$this->load->model('Stored_projects');

		// pull the stored_projects
		$data = $this->Stored_projects->get_projects();

		// echo the data Angular (notice I'm not passing it to a view - need it in assoc array form)
		echo json_encode($data);
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

	public function retrieve($id)
	{
		// load the Projects data model
		$this->load->model('Stored_projects');

		// run the insert_project method
		$data = $this->Stored_projects->retrieve_project($id);

		// echo the data Angular (notice I'm not passing it to a view - need it in assoc array form)
		echo json_encode($data);
	}


}

/* End of file stored_projects.php */
/* Location: ./server/application/controllers/stored_projects.php */