<?php>
    $line = "";
    $line += $_POST['name'];
    $line += $_POST['phone-number'];
    $line += $_POST['input-yacht'];
    echo json_encode($line);
</php>