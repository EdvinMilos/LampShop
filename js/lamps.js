
function getLamps() {
    $.ajax({
        url:'https://lameshop.azurewebsites.net/api/lamps',
        type:'GET',
        dataType:'json',
        success: function (lamps) {
            onGetLampsSuccess(lamps);
        },
       /* error:function (request, message, error) {
            handleException(request, message, error);
        }*/
    });
}

function onGetLampsSuccess(lamps) {
    if ($("#lampsTable tbody").length == 0){
        $("#lampsTable").append("<tbody></tbody>");
    }
    $("#lampsTable tbody").empty();
    $.each(lamps, function (index, lamp) {
        addLampRow(lamp);
    });
}

function addLampRow(lamp) {
    $("#LampsTable tbody").append(
        buildLampRow(lamp));
}

function buildLampRow(lamp) {
    var let =
        "<tr>" +
        "<td>"+ lamp.id +"</td>"+
        "<td>"+ lamp.Name +"</td>"+
        "<td>"+ lamp.Color +"</td>"+
        "<td>"+ lamp.Designer +"</td>"+
        "<td>"+ lamp.Price +"</td>"+
        "<td>"+ lamp.Qty +"</td>"+
        "<td>"+
            "<button type='button' "+
            "class='btn btn-info'" +
            "data-id='"+ lamp.id +"'>"+
        "<i class='fas fa-info-circle'></i>"+
        "</button>"+
        "</td>"+
        "<td>"+
        "<button type='button' "+
            "class='btn btn-danger'" +
        "data-id='" + lamp.id +"'>"+
        "<i class='fas fa-minus-circle'></i>"+
        "</button>"
        "</td>"+
            "</tr>";
    return let;
}

$('#lampTable').on('click', 'button', event => {
    getLamps(event.currentTarget);
});

$('#myFomr').on('submit', function (e) {
    e.preventDefault();
    var Name = $("#lampName").val();
    var Color = $("#lampColor").val();
    var Designer = $("#lampDesigner").val();
    var Price = $("#lampPrice").val();
    var Qty = $("#lampQty").val();

    $.ajax({
        url: "https://lameshop.azurewebsites.net/api/lamps",
        type: 'POST',
        data: JSON.stringify({
            "Name": Name,
            "Color": Color,
            "Designer": Designer,
            "Price": Price,
            "Qty": Qty}),
        processData: false,
        contentType: 'application/json',
        success: function (comments) {
            window.alert("Lamp Created");
        },
        error: function (request, massage, error) {
            handleException(request, massage, error);
        }
    });
});



