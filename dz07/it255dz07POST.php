<?php
	$niz = $_POST['br'];
	echo "Elementi niza su: ";
		foreach($niz as $element){
		echo  $element. ", ";
	}
	echo "<br>";
	function najveciBroj($niz){
		echo "Najveći element niza je: ".max($niz)."<br>";
	}

	function najmanjiBroj($niz){
		echo "Najmanji element niza je: ".min($niz)."<br>";
	}

	function srednjaVrednost($niz){
		$rez = 0;
		foreach($niz as $element){
			$rez+=$element;
		}
		$rez = $rez/count($niz);
		echo "Srednja vrednost niza je: ".$rez."<br>";
	}
	najveciBroj($niz);
	najmanjiBroj($niz);
	srednjaVrednost($niz);
	
?>