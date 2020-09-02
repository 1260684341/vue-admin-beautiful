<template>
  <div class="goods-list-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form
          ref="form"
          :model="query_form"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="query_form.name" placeholder="名称" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      max-height="500"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        width="180"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="分类图标">
        <template slot-scope="scope">
          <el-image :src="scope.row.icon"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="sort" sortable label="排序"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="180px"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <my-form ref="myForm" @close="fetchData"></my-form>
    <el-pagination
      background
      :current-page="query_form.page"
      :layout="layout"
      :page-size="query_form.list_rows"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
  import { getList, getDetail, doDelete } from "@/api/banner";
  import MyForm from "./component/form";
  export default {
    name: "BannerList",
    components: {
      MyForm,
    },
    data() {
      return {
        query_form: {
          page: 1,
          list_rows: 20,
          name: "",
          sort: "",
        },
        loading: false,
        list: [],
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        elementLoadingText: "正在加载...",
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      tableSortChange(e) {
        if (!e.order) {
          this.query_form.sort = "";
        } else {
          this.query_form.sort =
            e.prop + (e.order == "ascending" ? " asc" : " desc");
        }
        this.fetchData();
      },
      setSelectRows(val) {
        this.selected_rows = val;
      },
      handleAdd() {
        this.$refs["myForm"].show();
      },
      handleEdit(row) {
        this.$refs["myForm"].show(row);
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm("你确定要删除当前项吗", null, async () => {
            const { msg } = await doDelete({ ids: row.id });
            this.$baseMessage(msg, "success");
            this.fetchData();
          });
        } else {
          if (this.selected_rows.length > 0) {
            const ids = this.selected_rows.map((item) => item.id).join();
            this.$baseConfirm("你确定要删除选中项吗", null, async () => {
              const { msg } = await doDelete({ ids: ids });
              this.$baseMessage("删除成功", "success");
              this.fetchData();
            });
          } else {
            this.$baseMessage("未选中任何行", "error");
            return false;
          }
        }
      },
      handleSizeChange(val) {
        this.query_form.list_rows = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.query_form.page = val;
        this.fetchData();
      },
      handleQuery() {
        this.query_form.page = 1;
        this.fetchData();
      },
      async fetchData() {
        if (this.loading) {
          return false;
        }
        this.loading = true;
        const { data } = await getList(this.query_form);
        this.list = data.list;
        this.total = data.total;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .goods-list-container {
    .goods-list-card-body {
      position: relative;
      text-align: center;
      cursor: pointer;

      .goods-list-tag-group {
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 9;
      }

      .goods-list-image-group {
        height: 400px;
        overflow: hidden;

        .goods-list-image {
          width: 100%;
          height: 400px;
          transition: all ease-in-out 0.3s;

          &:hover {
            transform: scale(1.1);
          }
        }
      }

      .goods-list-title {
        margin: 8px 0;
        font-size: 16px;
        font-weight: bold;
      }

      .goods-list-description {
        font-size: 14px;
        color: #808695;
      }

      .goods-list-price {
        margin: 8px 0;
        font-size: 14px;
        color: $base-color-orange;

        s {
          color: #c5c8ce;
        }
      }
    }
  }
</style>
