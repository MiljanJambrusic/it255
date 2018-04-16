$(document).ready(function(){
    $('#ucitaj').click(function(){
    	$.ajax({url: "https://jsonplaceholder.typicode.com/comments/", type: "GET", success: function(result){
        result.forEach((element, index) => {
            var htmlToTable = '<tr> <th scope="row"><button id="nesto" data-id="' + element.id + '">' + element.id +'</button></th> <td>' + element.postId +'</td> <td>' + element.id +'</td> <td>' + element.name +'</td> <td>' + element.email +'</td> <td>' + element.body +'</td> </tr>'
        	$('#vrednost').append(htmlToTable);
    	    })
    	}});
    });
    $(document).on('click', '#nesto', function(e) {
		console.log('$(this).attr("data-id")', $(this).attr("data-id"));
		$.ajax({url: "https://jsonplaceholder.typicode.com/comments/" + $(this).attr("data-id"), type: "GET", success: function(result){
			console.log(result);
        }});
	});
})