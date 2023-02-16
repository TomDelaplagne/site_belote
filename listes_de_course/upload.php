<?php

class storage {
  public function constructor($location, $user, $lists) {
    $this->location = $location;
    $this->user = $user;
    $this->lists = $lists;
  }
}

$filecontent = new storage($location, $user, $content);

fwrite($location . '/' . $filecontent->user . '.txt', $filecontent->content);

echo $filecontent->content;
?>