// data3 = JSON.parse(data2)
function removeBtn(elementId) {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    // element.remove()
}
function addBtn(elementId, account) {
    document.getElementById(elementId).innerHTML += `<a class="btn btn-xs btn-primary text-white" id="btn-${account}" onclick="logs('${account}')">Info</a>`
    //hapus div kanan di tampilan
    var parent = document.getElementById('logs'),
    child = document.getElementById('card-'+account);
    parent.removeChild(child)
}

function logs(name) {
    removeBtn('btn-'+name)
    let html = `
    <div class="card" id="card-${name}">
        <div class="card-header">
            <h3 class="card-title">Account : ${name}</h3>
            <div class="card-tools">
            <button class="btn btn-tool" type="button" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
            <i class="fas fa-minus"></i></button>
            <button class="btn btn-tool" type="button" onclick="addBtn('td-${name}', '${name}')" title="Remove">
            <i class="fas fa-times"></i></button>
        </div>
    </div>
    <div class="card-body" id="isi-${name}">
    </div>
    `
    $('#logs').append(html)
}
document.addEventListener("DOMContentLoaded", function(event) {
    let socket = new WebSocket("ws://192.168.1.236:8765");

    socket.onopen = function (e) {
        console.log('okay we opened a connection');
    };

    socket.onmessage = function (e) {
        let datas = JSON.parse(e.data);
        let htmlId = document.getElementById('isi-'+datas.account)
            
        if(htmlId !== null){
            try {
                datas['data'].forEach(el => {
                    htmlId.innerHTML += `
                    <p class="logs">Date Trans : ${el.date_trans} <br/>
                    Descriptions : ${el.description} <br/>
                    Type Trans : ${el.type_trans} <br/>
                    Value Trans : ${el.value_trans} <br/>
                    Balance : ${el.balance}</p>
                    `
                });
            } catch (err) {
                console.log(err.message);
            }
        }
    };

    socket.onclose = function (e) {
        console.log('socket closed')
        if (e.wasClean) {
            console.log('clean close');
            console.log(e.code);
            console.log(e.reason);
        } else {
            console.log('conection died');
            console.log(e.code);
        }
    };
});