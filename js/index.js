$( document ).ready(function(){
    $("#title-text").text("Aluno")
    $.ajax({
        url: "https://frozen-river-66200.herokuapp.com/students/",
        success: function(results){
            $("#body-row").empty()
            $("#header-row").empty()
            keys = Object.keys(results[0])
            keys.forEach(function(key){
                $("#header-row").append("<th scope='col'>"+ key +"</th>")
            });
            results.forEach(function(result){
                $("#body-row").append("<tr>")
                keys.forEach(function(key){
                    $("#body-row").append("<td>"+ result[key] +"</td>")
                });
                $("#body-row").append("</tr>")
            })
            // debugger
            $("#div1").html(result);
        }
    });
})

$("#alunoId").click(function() {
    $("#title-text").text("Aluno")
    $.ajax({
        url: "https://frozen-river-66200.herokuapp.com/students/",
        success: function(results){
            $("#body-row").empty()
            $("#header-row").empty()
            keys = Object.keys(results[0])
            keys.forEach(function(key){
                $("#header-row").append("<th scope='col'>"+ key +"</th>")
            });
            results.forEach(function(result){
                $("#body-row").append("<tr>")
                keys.forEach(function(key){
                    $("#body-row").append("<td>"+ result[key] +"</td>")
                });
                $("#body-row").append("</tr>")
            })
            // debugger
            $("#div1").html(result);
        }
    });
});

$("#avaliacaoId").click(function() {
    $("#title-text").text("Avaliação")
    $.ajax({
        url: "https://frozen-river-66200.herokuapp.com/appraisals/",
        success: function(results){
            $("#body-row").empty()
            $("#header-row").empty()
            keys = Object.keys(results[0])
            keys.forEach(function(key){
                $("#header-row").append("<th scope='col'>"+ key +"</th>")
            });
            results.forEach(function(result){
                $("#body-row").append("<tr>")
                keys.forEach(function(key){
                    $("#body-row").append("<td>"+ result[key] +"</td>")
                });
                $("#body-row").append("</tr>")
            })
            // debugger
            $("#div1").html(result);
        }
    });
});