<template>
    <div class="login" id="loginH">
        <el-form v-model="ruleForm" ref="ruleForm" class="container" label-width="60px">
            <el-form-item label="账号" prop="acount" class="container-item">
                <el-input v-model="ruleForm.acount" autocomplete="off">

                </el-input>
            </el-form-item >
            <el-form-item label="密码" prop="userPassword" class="container-item">
                <el-input v-model="ruleForm.userPassword" autocomplete="off">
                    
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">
                    登录
                </el-button>
                <el-button type="primary" @click="toRegiste()">
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {loginReuqest} from '../api/login.js'
export default {
    name: 'login',
    data() { 
        return {
            ruleForm:{
                acount:'',
                userPassword:'',
            },
        }
    },
    mounted(){
        this.screenHeight()
    },
    methods:{
        screenHeight(){
            var h =  document.documentElement.clientHeight;
            var loginH = document.getElementById('loginH')
            loginH.style.height= `${h}px`
        },
        submitForm(){
            if(this.ruleForm.acount||this.ruleForm.userPassword){
                loginReuqest({
                    username:this.acount,
                    userPassword:this.userPassword
                }).then(res=>{
                    // console.log(res)
                    this.$cookies.set('token',res.data.token,'30s')
                    this.$router.push('/articleShow')
                }).catch(err=>{
                    this.$message(err)
                })
            }else{
                this.$message({
                    message:'请输入账号或密码',
                    type:'warning'
                })
            }
            
        },
        toRegiste(){
            this.$router.push('/register')
        }
    }
}
</script>
<style lang="scss">
.login{
    .container{
        width: 20%;
        position: relative;
        top: 50%;
        left: 0;
        margin: 0 auto;
        transform: translateY(-50%);
        .el-form-item{
            width: 100%;
        }
    }
}
</style>