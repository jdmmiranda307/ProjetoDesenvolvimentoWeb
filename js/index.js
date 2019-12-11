const $content = $("#content")
var iniciarAluno = function(){
    if ($("#add-aluno").length == 0)
        $("#main-header").append("<button type='button' class='btn btn-success' style='align:right' id='add-aluno'>Adicionar Aluno</button>")
    startAlunoForm()
    $content.append(tableContent)
    $.ajax({
        url: "https://frozen-river-66200.herokuapp.com/students/",
        success: function(results){
            $("#body-row").empty()
            $("#header-row").empty()
            keys = Object.keys(results[0])
            keys.forEach(function(key){
                $("#header-row").append("<th scope='col'>"+ key +"</th>")
            });
            $("#header-row").append("<th scope='col'>Opções</th>")
            results.forEach(function(result){
                $("#body-row").append("<tr>")
                keys.forEach(function(key){
                    $("#body-row").append("<td>"+ result[key] +"</td>")
                });
                $("#body-row").append("<td colspan='2'><button type='button' class='btn btn-primary interact-button' id='edit-"+ result.id +"'>Editar</button>"+
                    "<button type='button' class='btn btn-danger interact-button' style='margin-left:5px' id='destroy-"+ result.id +"'>Excluir</button></td>")
                .data( "bar", { isManual: true } );
                $("#edit-"+result.id).data(result)
                $("#destroy-"+result.id).data(result)
                $("#body-row").append("</tr>")
            })
            interact()
        }
    });
}

$( document ).ready(function(){
    $("#title-text").text("Aluno")
    iniciarAluno()
})

$("#alunoId").click(function() {
    $("#title-text").text("Aluno")
    iniciarAluno()
});

var interact = function(){
    $(".interact-button").click(function(){
        id = ($(this)[0].id).split("-")
        if(id[0] == "edit"){
            startAluno($(this).data())
        }
        else{
            $.ajax({
              type: "DELETE",
              url: "https://frozen-river-66200.herokuapp.com/students/"+$(this).data().id+"/",
              success: function(){
                $content.empty()
                iniciarAluno()
              },
            });
        }
    })
}

$("#avaliacaoId").click(function() {
    $("#title-text").text("Avaliação")
    $content.append(tableContent)
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

var startAlunoForm =function(){ 
    $("#add-aluno").click(function(){
        startAluno({})
    });
}

var startAluno = function(data){
    $("#content").empty()
    $("#content").append(formAlunoContent)
    $("#add-aluno").remove()
    $("#main-header").append("<button type='button' class='btn btn-success' style='align:right' id='save-aluno'>Salvar</button>")
    if(!jQuery.isEmptyObject(data)){
        $("#name-field").val(data.name)
        $("#save-aluno").data("id", data.id)
        $("#save-aluno").click(function(){
            val = $("#name-field").val()
            data = {
                "name": val
            }
            $.ajax({
              type: "PATCH",
              url: "https://frozen-river-66200.herokuapp.com/students/"+$(this).data().id+"/",
              data: data,
              success: function(){
                $("#save-aluno").remove()
                $content.empty()
                iniciarAluno()
              },
              dataType: "json"
            });
        })
    }
    else{
        $("#save-aluno").click(function(){
            val = $("#name-field").val()
            data = {
                "name": val
            }
            $.ajax({
              type: "POST",
              url: "https://frozen-river-66200.herokuapp.com/students/",
              data: data,
              success: function(){
                $("#save-aluno").remove()
                $content.empty()
                iniciarAluno()
              },
              dataType: "json"
            });
        })
    }
}
