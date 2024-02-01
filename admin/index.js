var arrPhoneAPI = [];
var addButton = document.getElementById("addPhone");
document.getElementById("add").onclick = function () {
  document.getElementById("UpdatePhone").style.display = "none";
  document.getElementById("addPhone").style.display = "inline";
};

function getDataInput() {
  var inputs = document.querySelectorAll(".form-group .form-control");
  var arrError = document.querySelectorAll(".form-group span.span-TB");
  var newPhone = new ListPhone();
  var isValid = true;
  for (var i = 0; i < inputs.length; i++) {
    console.log(inputs[i].id);
    switch (inputs[i].id) {
      case "name":
        isValid &=
          checkEmptyValue(inputs[i].value, arrError[i].id) &
          checkName(inputs[i].value, arrError[i].id);
        console.log(isValid);
        break;
      case "price":
        isValid &=
          checkEmptyValue(inputs[i].value, arrError[i].id) &
          checkPrice(inputs[i].value, arrError[i].id);
        console.log(isValid);
        break;
      case "screen":
        isValid &=
          checkEmptyValue(inputs[i].value, arrError[i].id) &
          checkPrice(inputs[i].value, arrError[i].id);
        console.log(isValid);
        break;
      case "blackcamera":
        isValid &=
          checkEmptyValue(inputs[i].value, arrError[i].id) &
          checkPrice(inputs[i].value, arrError[i].id);
        console.log(isValid);
        break;
      case "frontcamera":
        isValid &=
          checkEmptyValue(inputs[i].value, arrError[i].id) &
          checkPrice(inputs[i].value, arrError[i].id);
        console.log(isValid);
        break;
      case "img":
        isValid &= checkEmptyValue(inputs[i].value, arrError[i].id) & true;
        console.log(isValid);
        break;
      case "desc":
        isValid &= checkEmptyValue(inputs[i].value, arrError[i].id) & true;
        console.log(isValid);
        break;
      case "type":
        isValid &= checkEmptyValue(inputs[i].value, arrError[i].id) & true;
        console.log(isValid);
        break;
      default:
        break;
    }
    var id = inputs[i].id;
    newPhone[id] = inputs[i].value;
  }
  if (isValid) {
    console.log(newPhone);
    return newPhone;
  }
}
function reset() {
  var inputs = document.querySelectorAll(".form-group .form-control");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
addButton.onclick = function () {
  var newPhone = getDataInput();
  if (
    newPhone.name &&
    newPhone.price &&
    newPhone.screen &&
    newPhone.blackcamera &&
    newPhone.frontcamera &&
    newPhone.img &&
    newPhone.desc &&
    newPhone.type
  ) {
    axios({
      method: "POST",
      url: "https://6597f7c2668d248edf23d046.mockapi.io/product",
      data: newPhone,
    })
      .then(function (response) {
        getDataAPI();
        hienThiDuLieu(arrPhoneAPI);
        reset();
        $("#exampleModal").modal("toggle");
        //   $('#button').submit(function(e) {
        //     e.preventDefault();
        //     $('#IDModal').modal('toggle');
        //     return false;
        // });
      })
      .catch(function (err) {
        console.log("err add Data", err);
      });
  } else {
    alert("nhập lại thông tin");
  }
};

function getDataAPI() {
  axios({
    method: "GET",
    url: "https://6597f7c2668d248edf23d046.mockapi.io/product",
  })
    .then(function (response) {
      arrPhoneAPI = response.data;
      hienThiDuLieu(arrPhoneAPI);
    })
    .catch(function (err) {
      console.log("err getData", err);
    });
}

function hienThiDuLieu(data) {
  console.log(data, "data hientidulieu");
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var newPhone = new ListPhone();
    newPhone = data[i];
    content += `

    <tr>
      <td>${newPhone.id}</td>
      <td>${newPhone.name}</td>
      <td>${newPhone.price}</td>
      <td>${newPhone.screen}</td>
      <td>${newPhone.type}</td>
      <td>
        <button onclick="DeletePhone(${newPhone.id})" class="btn btn-danger">Delete</button>
        <button id="edit" onclick="EditPhone(${newPhone.id})" data-toggle="modal" data-target="#exampleModal" class="btn btn-warning ml-3">Edit</button>
        
      </td>
    </tr>
    `;
  }

  var tableListPhone = document.getElementById("tableListPhone");
  if (tableListPhone) {
    tableListPhone.innerHTML = content;
  } else {
    console.log("Phần tử không tồn tại.");
  }
}
function DeletePhone(id) {
  axios({
    method: "DELETE",
    url: `https://6597f7c2668d248edf23d046.mockapi.io/product/${id}`,
  })
    .then(function (response) {
      getDataAPI();
      hienThiDuLieu(arrPhoneAPI);
    })
    .catch(function (err) {
      console.log("err Delete Data", err);
    });
}
var idPhone;
function EditPhone(id) {
  idPhone = null;
  var phoneIndex = null;
  for (var i = 0; i < arrPhoneAPI.length; i++) {
    var newPhone = arrPhoneAPI[i];
    if (newPhone.id == id) {
      phoneIndex = newPhone;
    }
  }
  var inputs = document.querySelectorAll(".form-group .form-control");
  for (var i = 0; i < inputs.length; i++) {
    var htmlDom = inputs[i];
    var ID = htmlDom.id;
    htmlDom.value = phoneIndex[ID];
  }
  document.getElementById("UpdatePhone").style.display = "inline";
  document.getElementById("addPhone").style.display = "none";
  return (idPhone = id);
}
document.getElementById("UpdatePhone").onclick = function () {
  var newPhone = getDataInput();
  if (
    newPhone.name &&
    newPhone.price &&
    newPhone.screen &&
    newPhone.blackcamera &&
    newPhone.frontcamera &&
    newPhone.img &&
    newPhone.desc &&
    newPhone.type
  ) {
    axios({
      method: "PUT",
      url: `https://6597f7c2668d248edf23d046.mockapi.io/product/${idPhone}`,
      data: newPhone,
    })
      .then(function (response) {
        getDataAPI();
        hienThiDuLieu(arrPhoneAPI);
        reset();
        console.log(idPhone, "idphone sau khi update");
        console.log(
          `URL: https://6597f7c2668d248edf23d046.mockapi.io/product/${idPhone}`
        );
        $("#exampleModal").modal("toggle");
      })
      .catch(function (err) {
        console.log("err Edit Data", err);
        console.log(
          `URL: https://6597f7c2668d248edf23d046.mockapi.io/product/${idPhone}`
        );
      });
  } else {
    alert("nhập lại thông tin");
  }
};
getDataAPI();

document.getElementById("search").onclick = searchByName;
function searchByName() {
  var searchInput = document.getElementById("searchInput").value.toLowerCase();
  if (searchInput.trim() != "") {
    var filteredArr = arrPhoneAPI.filter(function (item) {
      return item.name.toLowerCase().includes(searchInput);
    });
    var content = "";
    for (var i = 0; i < filteredArr.length; i++) {
      console.log(filteredArr[i]);
      content += `
      <tr>
        <td>${filteredArr[i].id}</td>
        <td>${filteredArr[i].name}</td>
        <td>${filteredArr[i].price}</td>
        <td>${filteredArr[i].screen}</td>
        <td>${filteredArr[i].type}</td>
      </tr>
      `;
    }
    document.getElementById("tableListPhone").innerHTML = content;
  } else {
    alert("Vui lòng nhập nội dung tìm kiếm");
  }
}

document.getElementById("tc").onclick = sortTC;
document.getElementById("ct").onclick = sortCT;

function sortCT(order) {
  arrPhoneAPI.sort(function (a, b) {
    return order === "asc" ? a.price - b.price : b.price - a.price;
  });

  hienThiDuLieu(arrPhoneAPI);
}
function sortTC(order) {
  arrPhoneAPI.sort(function (a, b) {
    return a.price - b.price;
  });
  if (order === "desc") {
    arrPhoneAPI.reverse();
  }
  hienThiDuLieu(arrPhoneAPI);
}
