function checkEmptyValue(value, errorId) {
  if (value) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(errorId).innerHTML = "Vui Lòng Không Bỏ Trống";
    return false;
  }
}

function checkName(value, errorId) {
  var regex = /^[^\s]{1,10}$/;
  if (regex.test(value)) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(errorId).innerHTML =
      "Tên dưới 10 kí tự và không khoảng trắng";
    return false;
  }
}

function checkPrice(value, errorId) {
  var regex = /^[0-9]+$/;
  if (regex.test(value)) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(errorId).innerHTML = "Chỉ nhập số";
    return false;
  }
}
function checkPrice(value, errorId) {
  var regex = /^[0-9]+$/;
  if (regex.test(value)) {
    document.getElementById(errorId).innerHTML = "";
    return true;
  } else {
    document.getElementById(errorId).innerHTML = "Chỉ nhập số";
    return false;
  }
}

function check(url) {
  return fetch(url, {
    method: "HEAD",
  })
    .then((response) => {
      if (response.ok) {
        console.log("URL tồn tại.");
        return true;
      } else {
        console.log("URL không tồn tại.");
        return false;
      }
    })
    .catch((error) => {
      console.error("Lỗi:", error);
      return false; // Trả về false nếu có lỗi xảy ra
    });
}

function checkURL(value, errorId) {
  check(value).then((isValid) => {
    if (isValid) {
      document.getElementById(errorId).innerHTML = "";
    } else {
      document.getElementById(errorId).innerHTML =
        "Đường link URL không tồn tại.";
    }
  });
}
