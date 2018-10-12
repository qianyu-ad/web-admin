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
        width:100px;
        line-height: 30px;
        font-size: 14px;
        text-align: right;
        font-weight: 700;
    }
    .cl-r{
        padding-left: 110px;
    }
    .ivu-radio-wrapper{
        margin-top:6px;
        margin-bottom: 6px;
    }
    .um-editor{
        width: 100%;
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
                <div class="cl-l">标题</div>
                <div class="cl-r">
                    <Input v-model="param.title" placeholder="请输入标题" />
                </div>
            </div>
            <div class="cl clearfix">
                <div class="cl-l">keywords</div>
                <div class="cl-r">
                    <Input v-model="param.keywords" placeholder="请输入keywords" />
                </div>
            </div>
            <div class="cl clearfix">
                <div class="cl-l">description</div>
                <div class="cl-r">
                    <Input v-model="param.description" placeholder="请输入description" />
                </div>
            </div>
            <!-- 富文本编辑器 -->
            <div>
                <!--style给定宽度可以影响编辑器的最终宽度-->
                <script type="text/plain" id="myEditor" class="um-editor">
                </script>
            </div>
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
                    title: '',
                    keywords:'',
                    description: '',
                    // content: ''
                },
                categoryList: [],
                um: ''
            }
        },
         created(){
            this.getCategory();
            if(this.$route.query.id) {
                this.param.id = this.$route.query.id;
                this.search();
            }
        },
        destroyed(){
            UM.getEditor('myEditor').destroy();
        },
        mounted() {
            //实例化编辑器
            this.um = UM.getEditor('myEditor');
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


            search(){
                this.ajax({
                    type: 'get',
                    url: '/api/articles',
                    data: {id: this.$route.query.id},
                    success: (response) => {
                        this.param.title = response.title;
                        this.param.categoryId = response.categoryId;

                        this.um.execCommand('insertHtml', response.content)
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
                if(!param.categoryId || !param.title || !UM.getEditor('myEditor').getAllHtml()){
                    this.$Message.error('请输入完整的信息');
                    return false;
                }
                param.content = UM.getEditor('myEditor').getContent();


                this.ajax({
                    type: 'post',
                    url: '/api/articles',
                    data: param,
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