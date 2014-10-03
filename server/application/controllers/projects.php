<?php

class Projects extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		// load the auth lib for user authentication functions
		$this->load->library('ion_auth');

		// load the Projects data model
		$this->load->model('Stored_projects');
	}

	private function match_user_to_project($owner)
	{
		// get the user, make sure they're legit
		$user = $this->ion_auth->get_user_id();

		if ($user == $owner) {
			return true;
		}
		return false;
	}

	public function load($id)
    {
		// compare the ID sent by Angular to the ID stored in the Session
		if ($id = $this->ion_auth->get_user_id())
		{
			// pull the stored_projects
			$data = $this->Stored_projects->get_projects($id);

			echo json_encode($data);
		}
		else
		{
			$error = array(
				"error"		=>	"mismatched_login_id",
				"message"	=>	"I smell trickery."
			);
			echo json_encode($error);
		}
    }

	public function insert()
	{
		// get data from the passed JSON object
		$post_data = json_decode(file_get_contents("php://input"), true);

		// check the client-side project owner to the logged-in user
		if($this->match_user_to_project($post_data['owner']))
		{
			// run the insert_project method
			$id = $this->Stored_projects->insert_project($post_data);

			// once data has been inserted, return the view content to the people
			echo $id;
		}
		else
		{
			$error = array(
				"error"		=>	"mismatched_login_id",
				"message"	=>	"You do not have access to this account."
			);
			echo json_encode($error);
		}
	}

	public function retrieve($id)
	{
		// pull the stored_project
		$data = $this->Stored_projects->retrieve_project($id);

		if($this->match_user_to_project($data->owner))
		{
			// echo the data Angular (notice I'm not passing it to a view - need it in assoc array form)
			echo json_encode($data);
		}
		else
		{
			$error = array(
				"error"		=>	"project_ownership",
				"message"	=>	"You do not have access to this project."
			);
			echo json_encode($error);
		}
	}

	public function update()
	{
		// get data from the passed JSON object
		$post_data = json_decode(file_get_contents("php://input"), true);

		// check the client-side project owner to the logged-in user
		if($this->match_user_to_project($post_data['owner']))
		{
			// run the insert_project method
			$this->Stored_projects->update_project($post_data);

			// let the people know
			echo "success";
		}
		else
		{
			$error = array(
				"error"		=>	"project_ownership",
				"message"	=>	"You do not have access to this project."
			);
			echo json_encode($error);
		}
	}

	public function delete()
	{
		// get data from the passed JSON object
		$post_data = json_decode(file_get_contents("php://input"), true);

		// check the client-side project owner to the logged-in user
		if($this->match_user_to_project($post_data['owner']))
		{
			// run the delete_project method
			$data = $this->Stored_projects->delete_project($post_data);

			if ($data)
			{
				echo "Success";
			}
			else
			{
				echo "Failure!";
			}
		}
		else {
			$error = array(
				"error"		=>	"project_ownership",
				"message"	=>	"You do not have access to this project."
			);
			echo json_encode($error);
		}
	}
}

/* End of file stored_projects.php */
/* Location: ./server/application/controllers/stored_projects.php */