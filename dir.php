<?php $path = './Commentaires';
$files = array_diff(scandir($path), array('.', '..'));
foreach($files as $file) {
    echo $file, ',';
}
//print_r($files);
?>;