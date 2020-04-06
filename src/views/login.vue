<template>
    <div class="login" id="loginH">
        <el-form v-model="ruleForm" ref="ruleForm" class="container" label-width="60px">
            <el-form-item label="账号" prop="acount" class="container-item">
                <el-input v-model="ruleForm.acount" autocomplete="off">

                </el-input>
            </el-form-item >
            <el-form-item label="密码" prop="userPassword" class="container-item">
                <el-input v-model="ruleForm.userPassword" autocomplete="off" type="password">
                    
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
import {loginReuqest } from '../api/login.js'
import { mapMutations} from 'vuex'
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
        // this.ifPassDate()
    },
    methods:{
        ...mapMutations([
            'SET_USERID'
        ]),
        // ifPassDate(){
        //     authorizationRequest().then(res =>{
        //         console.log(res.status !== 500)
        //         if(res.status !== 500){
        //             this.$router.push('/Chat')
        //         }
        //     })
        // },
        screenHeight(){
            var h =  document.documentElement.clientHeight;
            var loginH = document.getElementById('loginH')
            loginH.style.height= `${h}px`
        },
        submitForm(){
            if(this.ruleForm.acount||this.ruleForm.userPassword){
                loginReuqest(
                    this.ruleForm.acount,
                    this.ruleForm.userPassword
                ).then((res)=>{
                    // console.log(res)
                    if(res.status == 500){
                        this.$message.error(res.msg)
                    }else{
                        this.$router.push('/Chat')
                    }
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