<?php
$sourcePath = $_FILES['file']['tmp_name'];
$targetPath = "upload/".$_FILES['file']['name'];
if (move_uploaded_file($sourcePath,$targetPath)) {
	header('Content-Type: application/json');
	echo json_encode(array('url' => $targetPath));
}