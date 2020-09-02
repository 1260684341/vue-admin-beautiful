/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from "vue";
import { getUserInfo, getUserPrivileges, login, logout } from "@/api/user";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/accessToken";
import { resetRouter } from "@/router";
import { title, tokenName } from "@/config/settings";

const state = {
  accessToken: getAccessToken(),
  username: "",
  avatar: "",
  permissions: [],
};
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
  setUsername(state, username) {
    state.username = username;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};
const actions = {
  setPermissions({ commit }, permissions) {
    commit("setPermissions", permissions);
  },
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo);
    const accessToken = data[tokenName];
    if (accessToken) {
      commit("setAccessToken", accessToken);
      const hour = new Date().getHours();
      const thisTime =
        hour < 8
          ? "早上好"
          : hour <= 11
          ? "上午好"
          : hour <= 13
          ? "中午好"
          : hour < 18
          ? "下午好"
          : "晚上好";
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`);
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        "error"
      );
    }

    const obj_admin_user = data.obj_admin_user;
    if (obj_admin_user) {
      commit("setUsername", obj_admin_user.name);
      commit("setAvatar", obj_admin_user.header_img);
    }
  },
  async getUserPrivileges({ commit, state }) {
    const { data } = await getUserPrivileges();
    if (!data) {
      Vue.prototype.$baseMessage("获取权限失败，请重新登录...", "error");
      return false;
    }
    console.log(data);
    let { permissions } = data;
    if (permissions && Array.isArray(permissions)) {
      commit("setPermissions", permissions);
      return permissions;
    } else {
      Vue.prototype.$baseMessage("获取权限异常", "error");
      return false;
    }
  },
  async getUserInfo({ commit, state }) {
    const { data } = await getUserInfo(state.accessToken);
    if (!data) {
      Vue.prototype.$baseMessage("验证失败，请重新登录...", "error");
      return false;
    }
    let { permissions, username, avatar } = data;
    if (permissions && username && Array.isArray(permissions)) {
      commit("setPermissions", permissions);
      commit("setUsername", username);
      commit("setAvatar", avatar);
      return permissions;
    } else {
      Vue.prototype.$baseMessage("用户信息接口异常", "error");
      return false;
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken);
    await dispatch("resetAccessToken");
    await resetRouter();
  },
  resetAccessToken({ commit }) {
    commit("setPermissions", []);
    commit("setAccessToken", "");
    removeAccessToken();
  },
};
export default { state, getters, mutations, actions };
