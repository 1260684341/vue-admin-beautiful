import request from "@/utils/request";

const controller = "ProductCategory";

export function getList(data) {
  return request({
    url: `/${controller}/list`,
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/table/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/table/doDelete",
    method: "post",
    data,
  });
}
