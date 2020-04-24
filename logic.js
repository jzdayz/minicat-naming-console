const host = "http://localhost:20202/"
const tbody = document.querySelector("tbody")
const html = document.querySelector("body")
const thead = document.querySelector("thead")
let beforeThread = "";
let beforeTbody = "";
let changeTheadBool = false;


function fillService(sequence) {

    let res = "";

    for (let i = 0; i < sequence.length; i++) {
        let row = "<tr class=\"table-success\">";
        row += "<td onclick=jump('"+sequence[i].name+"')>" + sequence[i].name + "</td>"
        row += "<td onclick=jump('"+sequence[i].name+"')>" + Object.keys(sequence[i].instances).length + "</td>"
        row += "</tr>"
        res += row
    }
    return res

}

function fillInstance(sequence) {

    console.log(sequence)
    let res = "";
    for (const instance in sequence) {
        let row = "<tr class=\"table-success\">";
        row += "<td>" + instance + "</td>"
        row += "<td>" + sequence[instance]["ip"]+":"+sequence[instance]["port"] + "</td>"
        row += "</tr>"
        res += row
    }
    return res

}

function jump(serviceName){
    if(!changeTheadBool){
        changeThead();
        changeTbody(serviceName);
    }
}

// 填充
function changeTbody(serviceName){
    get(host+"list?serviceName="+serviceName,function(json){
        console.log(JSON.stringify(json.body,null,2))
        const tbodyHtml = fillInstance(json.body.instances);
        beforeTbody = tbody.innerHTML
        tbody.innerHTML = tbodyHtml
    })
}

function get(url,jsonHandler){
    return fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (json) {
                return json;
            }).then(jsonHandler)
        }
    });
}
function changeThead(){

    let body = "<tr>";
    body+= "<th scope=\"col\">实例名</th>"
    body+= "<th scope=\"col\">IP&PORT</th>"
    body+= "</tr>"

    beforeThread = thead.innerHTML
    thead.innerHTML = body
    changeTheadBool = true
      
}

function backHead(){
    if(changeTheadBool){
        thead.innerHTML = beforeThread
        tbody.innerHTML = beforeTbody
        changeTheadBool = false
    }
}


// 请求后端数据
get(host+"all",function (json) {
    tbody.innerHTML = fillService(json.body)
})


