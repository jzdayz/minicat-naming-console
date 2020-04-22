var beforeThread = ""
var beforeTbody = ""

const tobody = document.querySelector("tbody")
var data = []
var one = {}
one.str1 = '1-1111'
one.str2 = '1-2222'
one.serviceName = 'test1'
data.push(one)

var one1 = {}
one1.str1 = '2-1111'
one1.str2 = '2-2222'
one1.serviceName = 'test2'
data.push(one1)

function fillService(sequence) {

    var res = ""

    for (let i = 0; i < sequence.length; i++) {
        var row = "<tr class=\"table-success\">"
        row += "<td onclick=jump('"+sequence[i].name+"')>" + sequence[i].name + "</td>"
        row += "<td onclick=jump('"+sequence[i].name+"')>" + Object.keys(sequence[i].instances).length + "</td>"
        row += "</tr>"
        res += row
    }

    return res

}

function fillInstance(sequence) {

    var res = ""

    for (let i = 0; i < sequence.length; i++) {
        var row = "<tr class=\"table-success\">"
        row += "<td>" + sequence[i].instanceName + "</td>"
        row += "<td>" + sequence[i].ipAndHost + "</td>"
        row += "</tr>"
        res += row
    }

    return res

}

var changeTheadBool = false

function jump(serviceName){
    // todo dosomething
    if(!changeTheadBool){
        changeThead();
        changeTbody(serviceName);
    }
}

// 填充
function changeTbody(serviceName){
    var data1 = { 
        instanceName : 'I1',
        ipAndHost : '10.1.1.11'
    }
    var data2 = { 
        instanceName : 'I2',
        ipAndHost : '10.1.1.22'
    }
    var thisData = {}
    if(serviceName === 'test1'){
        thisData = data1
    }else{
        thisData = data2
    }
    var dataArray = []
    dataArray.push(thisData)
    var tbody = fillInstance(dataArray)
    beforeTbody = tobody.innerHTML
    tobody.innerHTML = tbody
}



const html = document.querySelector("body")




function get(url,jsonHandler){
    return fetch(url).then(function (response) {
        if (response.ok) {
            response.json().then(function (json) {
                return json;
                // let jsonStr = JSON.stringify(json, null, 2)
                // html.append(jsonStr)
            }).then(jsonHandler)
        }
    });
}

const thead = document.querySelector("thead")


function changeThead(){

    var body = "<tr>"
    body+= "<th scope=\"col\">实例名</th>"
    body+= "<th scope=\"col\">IP&PORT</th>"
    body+= "</tr>"

    beforeThread = thead.innerHTML
    thead.innerHTML = body

    changeTheadBool = true
      
}

function gohead(){
    if(changeTheadBool){
        thead.innerHTML = beforeThread
        tobody.innerHTML = beforeTbody
        changeTheadBool = false
    }
}

// 请求后端数据
get("http://localhost:20202/list",function (json) {
    tobody.innerHTML = fillService(json.body)
})


