<style scoped>
    .lgin{

    }
    .login-wrap{
        width: 400px;
        height: 250px;
        top:50%;
        left:50%;
        margin-left:-200px;
        margin-top:-125px;
        /*margin:200px auto;*/
        background:#fff;
        position:absolute;
        border-radius: 4px;

    }
    .login-title{
        line-height: 70px;
        text-align: center;
        font-size: 18px;
    }
    .login-input{
        width:240px;
    }
</style>
<template>
    <div class="lgin">
        <div class="login-wrap">
            <h3 class="login-title">登录</h3>
            <Form :model="user" :label-width="100">
                <FormItem label="用户名">
                    <Input @keyup.enter="login" class="login-input" v-model="user.username" placeholder="用户名/手机号/邮箱"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input @keyup.enter="login" type="password" class="login-input" v-model="user.password" placeholder="密码"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="login" :disabled="!user.username||!user.password">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            test(){
                console.log('search')
            },
            go(name){
                this.$router.push({
                    name: name
                })
            },
            // w登录
            login(){
                this.ajax({
                    type: 'post',
                    url: '/api/login',
                    data: this.trim(this.user),
                    success: (response) => {
                        console.log(response)
                        this.$router.push({
                            name: 'pages_list'
                        })
                    },
                    error: ()=>{}
                })
            }
           
        },
        created(){
            
        }
    }
</script>