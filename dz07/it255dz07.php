<?php
	$x = $_GET['br1'];
	$y = $_GET['br2'];

	$operacija = $_GET['operacija'];

	function funkcijicaMalena($a, $b, $oc){


		if($oc=="sabiranje"){
			$c = $a+$b;
			echo "Zbir između broja ".$a. " i broja ".$b." je: ".$c;
		}
		else if($oc=="oduzimanje"){
			if($a>$b){
				$c = $a-$b;
				echo "Razlika između broja ".$a. " i broja ".$b." je: ".$c;
			}else{
				echo "Prvi broj je manji od drugog.Nema oduzimanja.";
			}
		}
		else if($oc=="mnozenje"){
			$c = $a*$b;
				echo "Mnozenje između broja ".$a. " i broja ".$b." je: ".$c;
		}else if($oc=="deljenje"){
			if($a>$b){
				$c = $a/$b;
				echo "Deljenje između broja ".$a. " i broja ".$b." je: ".$c;
			}else{
				echo "Prvi broj je manji od drugog.Nema deljenja.";
			}
		}else{
			echo "Operacija nije prepoznata.";
		}
	}

	funkcijicaMalena($x,$y,$operacija);
?>