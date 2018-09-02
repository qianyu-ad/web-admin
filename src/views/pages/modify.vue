<style scoped>
    .modify-cont{
        padding:10px 15px;
    }
    .cl-name{
        font-size: 14px;
        line-height: 30px;
    }
    .cl-cont{
        margin-bottom: 10px;
    }
    .cl-ctrl{
        margin:20px 0;
    }
</style>
<<style>
    .ql-container{
        height: 400px !important;
    }
</style>
<template>
    <div class="bgf">
        <div class="w-title">
                编辑页面
                <Button v-if="$route.name=='pages_edit'" @click="back" class="back" size="small">返回</Button>
        </div>
        <div class="modify-cont">
            <div class="cl-name">分类</div>
            <div class="cl-cont">
                <Select v-model="param.category" style="width:280px">
                    <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>

            <div class="cl-name">标题</div>
            <div class="cl-cont">
                <Input v-model="param.title" placeholder="请输入标题" />
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
                    category: 'a',
                    title: '',
                    content: ''
                },
                editorOption: {
                  // some quill options
                },
                categoryList: []
            }
        },
        methods: {

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
                        this.param.content = response.content;
                        this.param.category = response.category;
                    }
                })
            },
            
            onEditorBlur(quill) {
                console.log('editor blur!')
            },
            onEditorFocus(quill) {
            },
            onEditorReady(quill) {
                console.log('editor ready!')
            },
            onEditorChange({ quill, html, text }) {
                console.log('editor change!')
            this.content = html
            },

            // 发布
            submit(){
                this.ajax({
                    type: 'post',
                    url: '/api/articles',
                    data: this.param,
                    success: (response) => {
                        this.$Message.success('操作成功');
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
        created(){
            this.getCategory();

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

        }
    }
</script>