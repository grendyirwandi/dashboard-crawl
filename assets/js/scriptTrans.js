document.addEventListener("DOMContentLoaded", function(event) {
    // async function getData(url = '') {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //       method: 'GET', // *GET, POST, PUT, DELETE, etc.
    //       mode: 'no-cors', // no-cors, *cors, same-origin
    //       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //       credentials: 'same-origin', // include, *same-origin, omit
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'apikey': "a8e21549R0f5aR406dR8654R8ea009b791af"
    //       },
    //       referrerPolicy: 'origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //     //   body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     return response.json(); // parses JSON response into native JavaScript objects
    // }
    // getData('http://192.168.1.52:9002/transfer/list')
    // .then(data => {
    //     console.log(data.json()); // JSON data parsed by `data.json()` call
    // });
    let parseData = JSON.parse(datas)
    $('#tmbahform').on("click", function() {
      let html = `
      <div class="row newform">
          <div class="col-md-3">
              <div class="form-group"><label>Dari Rekening</label>
                  <select class="form-control" name="udid" required>
                  ${parseData.map(elmt => `
                      <option value="${elmt.udid}">${elmt.username} - ${elmt.rekening}</option>
                    `).join('')}
                  </select>
              </div>
          </div>
          <div class="col-md-3">
              <div class="form-group"><label>Ke Rekening</label><input class="form-control" type="number" placeholder="Rekening" name="rekening" required></div>
          </div>
          <div class="col-md-3">
              <div class="form-group"><label>Nominal</label><input class="form-control" type="text" placeholder="Nominal - *10000" onkeyup="convRP(this)" name="nominal" required></div>
          </div>
      </div>
      `
      $(".transaction").append(html);
    })

    $('#kurangform').on("click", function() {
      $('.row .newform:last-child').remove();
    })
    
    
});

function convRP(indetifier) {
    var angka = $(indetifier).val()
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return $(indetifier).val(rupiah)
}

// const url = "http://192.168.1.236:9002/transfer/list";
// fetch(url, {
//   method: "GET",
//   mode : "no-cors",
//   credentials: 'include',
//   // withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//     "apikey": "35c1a9c2Rc4ceR4df0R9809R6faeac97e53c",
//     "Access-Control-Allow-Origin" : "*"
//   }
// })
//   // .then(resp => resp)
//   .then(function(data) {
//     console.log(typeof(data))
//     console.log(data);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });


