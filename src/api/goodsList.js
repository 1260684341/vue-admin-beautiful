import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "Product/list",
    method: "post",
    data,
  });
}
