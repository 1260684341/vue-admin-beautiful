import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/Ad/list",
    method: "post",
    data,
  });
}
