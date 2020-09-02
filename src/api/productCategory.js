import request from "@/utils/request";
const controller = "ProductCategory";

export function getList(data) {
  return request({
    url: `/${controller}/list`,
    method: "post",
    data,
  });
}

export function getDetail(data) {
  return request({
    url: `/${controller}/detail`,
    method: "post",
    data,
  });
}

export function doAdd(data) {
  return request({
    url: `/${controller}/add`,
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: `/${controller}/edit`,
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: `/${controller}/delete`,
    method: "post",
    data,
  });
}
