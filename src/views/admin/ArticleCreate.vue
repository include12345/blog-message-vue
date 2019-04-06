<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form ref="articleCreate" :model="article" :rules="createRules">
        <el-row style="margin-top: 20px">
          <el-col :span="10" :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="title">
              <el-input v-model="article.title" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3">
            <el-form-item label="所属分类" label-width="90px" prop="classify">
              <el-select v-model="article.classifyName" placeholder="请选择分类">
                <el-option v-for="index in classifyList" :key="index" :label="index" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="article.content"/>
        </el-row>
        <el-form-item style="padding: 20px 20px 0 0">
          <el-button type="primary" style="float:right" size="small" @click="createArticle" :loading="load">{{btnText}}</el-button>
          <el-button style="float:right;margin-right: 10px" size="small" @click="cancle" :loading="load">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import {
    createArticle,
    getClassify,
    getFileUploadToken,
    fileUpload
  } from '@/api/api'
  import hlj from 'highlight.js'
  import 'highlight.js/styles/atom-one-dark.css'
  export default {
    data() {
      return {
        article: {
          classifyName: '', //文章所属分类
          title: '', //文章标题
          content: '' //文章内容
        },
        classifyList: [],
        createRules: {
          title: [{
            required: true,
            message: '请填写标题',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }],
          classify: [{
            required: true,
            message: '请选择分类',
            trigger: 'change'
          }]
        },
        load: false,
        btnText: '立即发布'
      }
    },
    methods: {
      createArticle() {
        var articleMap = {
          title: this.article.title,
          classifyName: this.article.classifyName,
          content: this.article.content
        }
        createArticle(articleMap).then(response => {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 1000
          })
          this.$router.push({
            path: '/admin/articleList'
          });
        }).catch(error => {
          reject(error)
          this.$message({
            message: '添加失败',
            type: 'error',
            duration: 1000
          })
        })
      },
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        getFileUploadToken($file.name, $file.size).then(response => {
                    console.log(response.message)
                    // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                formdata.append('uploadTokenUuid', response.message)
                console.log(formdata)
                fileUpload(formdata).then(response => {
                    console.log(response)
                    if(response.code !== 'OK') {
                        this.$message({
                        message: '上传图片失败',
                        type: 'error',
                        duration: 1000
                        })
                        return;
                    }
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    /**
                    * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                    * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                    * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                    */
                   
                    var url = "http://47.95.208.59:6010/api/alien/download/"+response.data.uuid+"/"+response.data.name
                    console.log(url)
                    this.$refs.md.$img2Url(pos, url);
                }).catch(error => {
                    this.$message({
                        message: '添加图片失败',
                        type: 'error',
                        duration: 1000
                    })
                    return;
                })
                }).catch(error => {
                    this.$message({
                        message: '添加图片失败',
                        type: 'error',
                        duration: 1000
                    })
                    return;
                })
      },
      // 取消
      cancle() {
        this.$router.push({
          path: '/admin/articleList'
        });
      }
    },
  
    computed: {
  
    },
    mounted() {
      getClassify().then(response => {
        this.classifyList = response
      })
    }
  }
</script>

<style lang="css">
  
</style>