<template>
  <el-dialog
    :title="title"
    :visible.sync="is_show"
    width="500px"
    @close="reloadData"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.trim="form.sort" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getList, doAdd, doEdit } from "@/api/productCategory";
  export default {
    name: "MyForm",
    data() {
      return {
        form: {
          name: "",
          author: "",
        },
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入名称" }],
          sort: [{ required: true, trigger: "blur", message: "请输入排序" }],
        },
        title: "",
        is_show: false,
        is_edit: false,
        lst_parent_category: [],
      };
    },
    created() {},
    methods: {
      show(row) {
        if (!row) {
          this.title = "添加";
          this.is_edit = false;
        } else {
          this.title = "编辑";
          this.is_edit = true;
          this.form = Object.assign({}, row);
        }
        this.is_show = true;
      },
      async getCategoryList() {
        this.lst_parent_category = await getList();
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.is_show = false;
        this.$emit("close");
      },
      reloadData() {
        this.$emit("close");
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            if (this.is_edit) {
              await doEdit(this.form);
            } else {
              await doAdd(this.form);
            }
            this.$baseMessage(this.title + "成功", "success");
            this.$refs["form"].resetFields();
            this.$emit("close");
            this.is_show = false;
            this.form = this.$options.data().form;
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
