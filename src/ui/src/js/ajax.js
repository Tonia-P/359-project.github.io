import $ from 'jquery'


function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;

}


export function gettUser(data) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //$("#ajaxContent").html(createTableFromJSON(JSON.parse(xhr.responseText)));
            var json_vals = JSON.parse(xhr.responseText);
            return json_vals;
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("User not exists");
        }
    };
    //var data = $('#loginForm').serialize();
    xhr.open('GET', 'GetUser?'+data);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}


export function getAllUsers (){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //$("#ajaxContent").html(createTableFromJSON(JSON.parse(xhr.responseText)));
            var json_vals = JSON.parse(xhr.responseText);
            return json_vals;
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("User not exists");
        }
    };
    //var data = $('#loginForm').serialize();
    xhr.open('GET', 'GetUser?');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}


export function simpleFFS () {
    var urlEnd = 'http://localhost:8080/WebApplication1/SimpleServlet';
    var kappa = null;
    $.ajax({
        url: urlEnd,
        type: "GET",
        contentType: 'json',
        success: function (result) {
            kappa = result;
            $("#ajax").html("User not exists");
            console.log(" Kappa result: " + kappa);
            
        },
        error: function (result) {
            console.log(" Ajax result: " + result);
            return result;
        }
    });

    return kappa;
}


