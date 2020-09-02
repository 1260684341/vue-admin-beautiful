import request from "@/utils/request";

export function getProductList(data) {
  return request({
    url: "Product/list",
    method: "post",
    data,
  });
}
