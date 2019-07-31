<template lang="html">
    <el-row>
        <el-col :span="24">
            <el-form ref="articleCreate" :model="article" :rules="createRules" v-loading="listLoading">
                <el-row style="margin-top:20px">
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
                    <mavon-editor ref=md @imgAdd="$imgAdd" :ishljs = "true" v-model="article.content"/>
                </el-row>
                <el-form-item style="padding:20px 20px 0 0">
                    <el-button type="primary" style="float:right" size="small" @click="editArticle" :loading="load">{{btnText}}</el-button>
                    <el-button style="float:right;margin-right:10px" size="small" @click="cancle">返回</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import {getOneArticle,editArticle,getClassify,fileUpload} from '@/api/api'
    import hlj from 'highlight.js'
    import 'highlight.js/styles/atom-one-dark.css'
    // import NProgress from 'NProgress'

    export default {
        data() {
            return {
                article: {
                    id: '',
                    title: '',
                    classifyName: '',
                    content: ''
                    
                },
                classifyList: [],
                createRules: {
                    title: [{required: true, message: '请填写标题', trigger: 'blur'}],
                    content: [{required: true, message: '请输入内容', trigger: 'blur'}],
                    classifyName: [{
                        required: true,
                        message: '请选择分类',
                        trigger: 'change'
                    }]
                },
                load: false,
                btnText: '立即更新',
                listLoading: false
            }
        },
        computed: {
            markedToHtml() {
                marked.setOptions({
                    highlight: function(code) {
                        return hlj.highlightAuto(code).value;
                    }
                });
                return marked(this.article.content);
            }
        },
        methods: {
            editArticle() {
                var articleMap = {
                    id: this.article.id,
                    title: this.article.title,
                    classifyName: this.article.classifyName,
                    content: this.article.content
                }
                editArticle(articleMap).then(response => {
                    this.article.id = response.id
                    this.article.classifyName = response.classifyName
                    this.article.title = response.title
                    this.article.content = response.content
                    this.$message({
                        message: '修改成功',
                        type: 'success',
                        duration: 1000
                    })
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
            $imgAdd(pos, $file){
                // getFileUploadToken($file.name, $file.size).then(response => {
                    // console.log(response.message)
                    // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('file', $file);
                // formdata.append('uploadTokenUuid', response.message)
                console.log(formdata)
                fileUpload(formdata).then(response => {
                    console.log(response)
                    if(response.code !== 200) {
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
                   
                    this.$refs.md.$img2Url(pos, response.message);
                }).catch(error => {
                    this.$message({
                        message: '添加图片失败',
                        type: 'error',
                        duration: 1000
                    })
                    return;
                })
                // }).catch(error => {
                //     this.$message({
                //         message: '添加图片失败',
                //         type: 'error',
                //         duration: 1000
                //     })
                //     return;
                // })
                
            },
            initial() {
                this.listLoading = true
                setTimeout(() => {
                    this.listLoading = false
                    getOneArticle(this.$route.params.postId).then(response => {
                                this.article.id = response.id
                                this.article.classifyName = response.classifyName
                                this.article.title = response.title
                                this.article.content = response.content
                        })
                    getClassify().then(response => {
                                this.classifyList = response
                        })
                }, 500)
    
            },
            // 取消
            cancle() {
                this.$router.push({path: '/admin/articleList'});
            }
        },
        computed: {
        },
        mounted() {
            this.initial()
        }
    }
</script>
<style lang="css" >
</style>