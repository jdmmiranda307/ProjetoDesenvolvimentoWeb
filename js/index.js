const $content = $("#content")

$( document ).ready(function(){
    $("#title-text").text("Aluno")
    iniciarAluno()
})

var iniciarAluno = function(){
    if ($("#add-appraisal").length != 0)
        $("#add-appraisal").remove()
    if ($("#add-aluno").length == 0)
        $("#main-header").append("<button type='button' class='btn btn-success' style='align:right' id='add-aluno'>Adicionar Aluno</button>")
    $("#add-aluno").off().click(function(){
        startAluno({})
    });
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

$("#alunoId").off().click(function() {
    $("#title-text").text("Aluno")
    iniciarAluno()
});

var interact = function(){
    $(".interact-button").off().click(function(){
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

$("#avaliacaoId").off().click(function() {
    $("#title-text").text("Avaliação")
    $content.append(tableContent)
    if ($("#add-aluno").length != 0)
        $("#add-aluno").remove()
    if ($("#add-appraisal").length == 0)
        $("#main-header").append("<button type='button' class='btn btn-success' style='align:right' id='add-appraisal'>Adicionar Avaliação</button>")
    $("#add-appraisal").off().click(function(){
        startAvaliacao({})
    });
    $.ajax({
        url: "https://frozen-river-66200.herokuapp.com/appraisals/",
        success: function(results){
            $("#body-row").empty()
            $("#header-row").empty()
            keys = Object.keys(results[0])
            keys.splice(keys.indexOf('skin_folds'), 1);
            keys.splice(keys.indexOf('measures'), 1); 
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
        }
    });
});

var startAluno = function(data){
    $("#content").empty()
    $("#content").append(formAlunoContent)
    $("#add-aluno").remove()
    if ($("#save-aluno").length == 0)
        $("#main-header").append("<button type='button' class='btn btn-success' style='align:right' id='save-aluno'>Salvar</button>")
    if(!jQuery.isEmptyObject(data)){
        $("#name-field").val(data.name)
        $("#save-aluno").data("id", data.id)
        $("#save-aluno").off().click(function(){
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
        $("#save-aluno").off().click(function(){
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

var startAvaliacao = function(data){
    $("#content").empty()
    $("#content").append(formAppraisalContent)
    $("#add-aluno").remove()
    $.ajax({
        url: "https://frozen-river-66200.herokuapp.com/students/",
        success: function(results){

            results.forEach(function(result){
                opt = "<option value="+ result.id +">"+ result.name +"</option>"
                $("#aluno-select").append(opt)
            })

            if ($("#save-aluno").length == 0)
                $("#main-header").append("<button type='button' class='btn btn-success' style='align:right' id='save-appraisal'>Salvar</button>")

            if(!jQuery.isEmptyObject(data)){
                $("#name-field").val(data.name)
                $("#save-aluno").data("id", data.id)
                $("#save-aluno").off().click(function(){
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
                $("#save-appraisal").off().click(function(){
                    val = $("#name-field").val()
                    skin_folds = {
                        "biceps": $("#biceps-field").val(),
                        "triceps": $("#triceps-field").val(),
                        "abdominal": $("#abs-field").val(),
                        "axillary": $("#axilar-field").val(),
                        "suprailiac": $("#suprailiac-field").val(),
                        "subscapular": $("#subscapular-field").val(),
                        "chest": $("#peito-field").val(),
                        "thigh": $("#coxa-field").val(),
                        "medial_calf": $("#calf-field").val()
                    }
                    measures = {
                        "chest": $("#peitomeasure-field").val(),
                        "waist": $("#cintura-field").val(),
                        "abdomen": $("#abdomenmeasure-field").val(),
                        "hip": $("#quadril-field").val(),
                        "thigh": $("#coxameasure-field").val(),
                        "proximal_thigh": $("#coxa-pr-field").val(),
                        "calf": $("#pantu-field").val(),
                        "relaxed_arm": $("#relaxed-arm-field").val(),
                        "arm_contracted": $("#contracted-arm-field").val(),
                        "forearm": $("#forarm-field").val(),
                        "fist": $("#punho-field").val()
                    }
                    data = {
                        "date": "2019-12-11",
                        "student": $("aluno-select").val(),
                        "weight": $("#peso-field").val(),
                        "height": $("#altura-field").val(),
                        "body_fat": $("#percent-field").val(),
                        "skin_folds": skin_folds,
                        "measures": measures
                        
                    }
                    $.ajax({
                      type: "POST",
                      url: "https://frozen-river-66200.herokuapp.com/appraisals/",
                      data: data,
                      success: function(){
                        $("#save-appraisal").remove()
                        $content.empty()
                        iniciarAluno()
                      },
                      dataType: "json"
                    });
                })
            }
        }
    });
    
}
