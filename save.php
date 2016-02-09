<?php

if (isset($_POST['elements'])) {
	$f = fopen('data.json', 'w');
	fputs($f, $_POST['elements']);
	fclose($f);
}