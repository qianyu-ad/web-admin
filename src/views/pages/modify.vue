<style scoped>
    .modify-cont{
        padding:10px 15px 70px;
    }
    .cl-name{
        font-size: 14px;
        line-height: 30px;
        font-weight: 700;
    }
    .cl-cont{
        margin-bottom: 10px;
    }
    .cl-ctrl{
        position: fixed;
        bottom:0;
        left: 180px;
        right: 0;
        z-index: 22;
        height:50px;
        background-color: #f0f0f0;
        text-align: center;
    }
    .cl-ctrl .ivu-btn{
        margin-top: 10px;
    }
    .col-3{
        float: left;
        width: 30%;
        margin-right: 5%;
    }
    .col-3:nth-child(3){
        margin-right: 0;
    }
    .cl{
        margin-bottom: 10px;
    }
    .cl-l{
        float: left;
        width:60px;
        line-height: 30px;
        font-size: 14px;
        text-align: right;
        font-weight: 700;
    }
    .cl-r{
        padding-left: 70px;
    }
    .ivu-radio-wrapper{
        margin-top:6px;
        margin-bottom: 6px;
    }
</style>
<<style>
    .ql-container{
        height: 480px !important;
    }
</style>
<template>
    <div class="bgf">
        <div class="w-title">
                编辑页面
                <Button v-if="$route.name=='pages_edit'" @click="back" class="back" size="small">返回</Button>
        </div>
        <div class="modify-cont">
            <div class="cl clearfix">
                <div class="cl-l">分类</div>
                <div class="cl-r">
                    <RadioGroup v-model="param.categoryId">
                        <Radio v-for="item in categoryList" :label='item.id'>{{ item.name }}</Radio>
                    </RadioGroup>
                </div>
            </div>
            <div class="cl clearfix">
                <div class="cl-l">SEO</div>
                <div class="cl-r">
                    <RadioGroup v-model="param.seoId">
                        <Radio v-for="item in seoList" :label='item.id'>{{ item.name }}</Radio>
                    </RadioGroup>
                </div>
            </div>

            <div class="cl clearfix">
                <div class="cl-l">标题</div>
                <div class="cl-r">
                    <Input v-model="param.title" placeholder="请输入标题" />
                </div>
            </div>

            <quill-editor v-model="param.content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
            </quill-editor>
            <div class="cl-ctrl">
                <Button type="primary" @click="submit">提交</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                param: {
                    categoryId: '',
                    seoId: '',
                    title: '',
                    content: ''
                },
                editorOption: {
                  // some quill options
                },
                categoryList: [],
                seoList: []
            }
        },
         created(){
            this.getCategory();
            this.getSeoList();

            if(this.$route.query.id) {
                this.param.id = this.$route.query.id;
                this.search();
            }
            
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {

        },
        methods: {
            // 查分类
            getCategory(){
                this.ajax({
                    type: 'get',
                    url: '/api/category',
                    data: this.dealObj(this.trim(this.srhParam)),
                    success: (response) => {
                        this.categoryList = response.list;


                    }
                })
            },

            // 查询SEO列表
            getSeoList(){
                this.ajax({
                    type: 'get',
                    url: '/api/seo',
                    data: this.dealObj(this.trim(this.srhParam)),
                    success: (response) => {
                        this.seoList = response.list;
                    }
                })
            },

            search(){
                this.ajax({
                    type: 'get',
                    url: '/api/articles',
                    data: {id: this.$route.query.id},
                    success: (response) => {
                        this.param.title = response.title;
                        this.param.content = response.content;
                        this.param.categoryId = response.categoryId;
                        this.param.seoId = response.seoId;
                    }
                })
            },
            
            onEditorBlur(quill) {
            },
            onEditorFocus(quill) {
            },
            onEditorReady(quill) {
            },
            onEditorChange({ quill, html, text }) {
            this.content = html
            },

            // 发布
            submit(){
                let param = this.trim(this.cloneObj(this.param));
                if(!param.categoryId || !param.title || !param.content){
                    this.$Message.error('请输入完整的信息');
                    return false;
                }
                this.ajax({
                    type: 'post',
                    url: '/api/articles',
                    data: this.param,
                    success: (response) => {
                        this.$Message.success('操作成功');
                        this.$router.push({
                            name: 'pages_list'
                        });
                    }
                })
            },
            // 返回
            back(){
                this.$router.push({
                    name: 'pages_list'
                }) 
            }
        },
       
    }
</script>