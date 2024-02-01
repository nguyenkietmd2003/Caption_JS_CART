const apiURL = "https://6597f7c2668d248edf23d046.mockapi.io/product";

let getProductListApi = () => {
  return axios({
    url: apiURL,
    method: "GET",
  });
};
let productSerV = {
    getProductListApi,

};

export default productSerV;
