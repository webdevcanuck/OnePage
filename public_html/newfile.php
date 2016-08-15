<?PHP

global $counter;
$counter = 0;

function dater() {

    // Current time
    echo date('h:i:s') . "<br/>";

    // wait for 2 seconds
    usleep(2000000);

    // back!
    echo date('h:i:s') . "<br/>";
}

dater();

?>
