<style scoped>
    .mar-r{
        margin-right: 10px;
    }
</style>
<template>
    <div>
        <div class="w-title">
            分类列表
        </div>
        <div class="w-body">
            <div class="w-srh clearfix">
                <Button class="pull-left" type="primary" @click="add">创建</Button>
            </div>
            <Table border :columns="tableHeader" :data="dataList"></Table>
        </div>

        <Modal v-model="modifyModal"
            :title="modifyTitle"
            :mask-closable="false"
            width="500"
            @on-ok="submit"
            :styles="{top: '60px'}">
            <div class="ct-content">
                
                <Form :model="param" :label-width="80">
                    <FormItem label="网站">
                        <Select v-model="param.siteCode" style="width:350px">
                            <Option v-for="item in siteList" value="tec" :value="item.code" :key="item.id">{{item.name}}</Option>
                            
                            <!-- <Option v-for="item in typelist" :value="item.id" :key="item.id">{{ item.name }}</Option> -->
                        </Select>
                    </FormItem>
                    <FormItem label="分类名">
                        <Input v-model="param.name" style="width:350px" placeholder="请输入分类名"></Input>
                    </FormItem>
                </Form>
                
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableHeader:[
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '网站',
                        key: 'siteCode'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        width: 160,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        'margin-right': '6px'
                                    },
                                    "on": {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '你确定要删除吗？',
                                                onOk: () => {
                                                    this.delete(params.row.id);
                                                }
                                            })
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        'margin-right': '6px'
                                    },
                                    "on": {
                                        click: () => {
                                            this.edit(params.row)
                                        }
                                    }
                                }, '编辑')
                                
                            ]);
                        }
                    }
                ],
                dataList: [],

                siteList: [],

                modifyModal: false,
                modifyTitle: '',
                param: {
                    name: '',
                    siteCode: ''
                }
            }
        },
        created(){
            this.getSiteList();
            this.search();
        },
        methods: {

            // 查询网站列表
            getSiteList(){
                this.ajax({
                    type: 'get',
                    url: '/api/site',
                    data: this.dealObj(this.trim(this.srhParam)),
                    success: (response) => {
                        this.siteList = response.list;
                        
                    }
                })
            },

            // 查询
            search(){
                this.ajax({
                    type: 'get',
                    url: '/api/category',
                    data: this.dealObj(this.trim(this.srhParam)),
                    success: (response) => {
                        this.dataList = response.list;
                    }
                })
            },

            // 新建
            add(){
                this.modifyModal = true;
                this.modifyTitle = '新建';
                this.param.id = '';
                this.param.name = '';
                this.param.siteCode = '';
            },
            // 编辑
            edit(item){
                this.modifyModal = true;
                this.modifyTitle = '编辑';
                this.param.id = item.id;
                this.param.name = item.name;
                this.param.siteCode = item.siteCode;
            },
            submit(){
                this.ajax({
                    type: 'post',
                    url: '/api/category',
                    data: this.dealObj(this.trim(this.param)),
                    success: (response) => {
                        this.search();
                    }
                })
            },
            delete(id){
                this.ajax({
                    type: 'delete',
                    url: '/api/category',
                    data: {id:id},
                    success: (response) => {
                        this.search();
                    }
                })
            },


           
        }
        
    }
</script>