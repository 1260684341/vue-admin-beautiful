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
      <el-form-item label="上级分类" prop="parent_id">
        <el-select v-model="form.parent_id" placeholder="上级分类">
          <el-option
            v-for="item in lst_parent_category"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类图标" prop="icon">
        <el-upload
          ref="upload"
          class="upload-content"
          name="file"
          :action="up_url"
          :data="up_data"
          :limit="1"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          accept="image/png, image/jpeg"
          list-type="picture-card"
          :close-on-click-modal="false"
        >
          <i slot="trigger" class="el-icon-plus"></i>
          <el-dialog
            title="查看大图"
            append-to-body
            :visible.sync="dialogVisible"
          >
            <div style="padding-bottom: 20px !important">
              <img width="100%" :src="form.icon" alt="" />
            </div>
          </el-dialog>
        </el-upload>
        <el-button type="primary" @click="handleUpload({ key: 'icon' })">
          上传图标
        </el-button>
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
  import qiniu from "../../../../utils/qiniu";
  export default {
    name: "MyForm",
    components: {},
    data() {
      return {
        form: {
          name: "",
          icon: "",
          sort: 0,
          parent_id: "",
        },
        rules: {
          name: [{ required: true, trigger: "blur", message: "请输入名称" }],
          sort: [{ required: true, trigger: "blur", message: "请输入排序" }],
        },
        title: "",
        is_show: false,
        is_edit: false,
        lst_parent_category: [],
        up_url: "",
        up_data: {},
        dialogVisible: false,
      };
    },
    created() {
      this.getCategoryList();
      this.initUploadAction();
    },
    methods: {
      async initUploadAction() {
        this.up_url = await qiniu.getUpUrl();
        this.up_data = {
          token: await qiniu.getToken(),
        };
      },
      handleUpload(data) {
        this.$refs["vabUpload"].handleShow(data);
      },
      handlePreview(file) {
        this.form.icon = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response, file, fileList) {
        this.form.icon = response.key;
        console.log(response);
        console.log(file);
        console.log(fileList);
      },
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
        const { data } = await getList();
        this.lst_parent_category = data.list;
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
