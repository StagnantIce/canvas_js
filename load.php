<?php

if (file_exists('data.json')) {
	header('Content-Type: application/json');
	echo file_get_contents('data.json');
	exit();
}

echo '[]';