import Vue from "vue";
import * as qiniu from "qiniu-js";
import request from "./request";

const controller = "upload";
const uploadType = ["category_icon"];
const config = {
  upprotocol: "http:",
  region: qiniu.region.z0,
};
/*
config.useCdnDomain: 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
config.disableStatisticsReport: 是否禁用日志报告，为布尔值，默认为 false。
config.uphost: 上传 host，类型为 string， 如果设定该参数则优先使用该参数作为上传地址，默认为 null。
config.region: 选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域。
config.retryCount: 上传自动重试次数（整体重试次数，而不是某个分片的重试次数）；默认 3 次（即上传失败后最多重试两次）。
config.concurrentRequestLimit: 分片上传的并发请求量，number，默认为 3；因为浏览器本身也会限制最大并发量，所以最大并发量与浏览器有关。
config.checkByMD5: 是否开启 MD5 校验，为布尔值；在断点续传时，开启 MD5 校验会将已上传的分片与当前分片进行 MD5 值比对，若不一致，则重传该分片，避免使用错误的分片。读取分片内容并计算 MD5 需要花费一定的时间，因此会稍微增加断点续传时的耗时，默认为 false，不开启。
config.forceDirect: 是否上传全部采用直传方式，为布尔值；为 true 时则上传方式全部为直传 form 方式，禁用断点续传，默认 false。
config.chunkSize: number，分片上传时每片的大小，必须为正整数，单位为 MB，且最大不能超过 1024，默认值 4。因为 chunk 数最大 10000，所以如果文件以你所设的 chunkSize 进行分片并且 chunk 数超过 10000，我们会把你所设的 chunkSize 扩大二倍，如果仍不符合则继续扩大，直到符合条件。
*/
async function getUpToken(data) {
  return request({
    url: `/${controller}/qiniuToken`,
    method: "post",
    data,
  });
}

async function upImage(file, fileName, type, putExtra, config) {
  let token = await getUpToken({
    type: uploadType[0],
  });
  const observable = qiniu.upload(file, key, token, putExtra, config);
  observable.subscribe({
    next(res) {
      console.log(res);
    },
    error(res) {
      console.log(res);
    },
    complete(res) {
      console.log(res);
    },
  });
}

async function getUpUrl() {
  /*let { data } = await getUpToken({
    type: uploadType[0],
  });*/
  let url = await qiniu.getUploadUrl(config).then((res) => {
    return res;
  });
  return url;
}

async function getToken() {
  let { data } = await getUpToken({
    type: uploadType[0],
  });
  return data.token;
}

export default { upImage, getUpUrl, getToken };
