<template>
    <div class="register" id="loginH">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="container" label-width="80px">
            <el-form-item label="账号" prop="account">
                <el-input v-model="ruleForm.account">

                </el-input>
            </el-form-item >
            <el-form-item label="密码" prop="userPassword">
                <el-input type="password" v-model="ruleForm.userPassword">
                    
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPSW">
                <el-input type="password"  v-model="ruleForm.confirmPSW">
                    
                </el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone">
                    
                </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verificationCode" class="verificationCode">
                <el-input v-model="ruleForm.verificationCode" class="verificationCode-count">
                    
                </el-input>
                <el-button class="code" type="primary" plain :disabled=codeFlag @click="sendCode">{{time}}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {sendCodeRequest , registerRequest } from '../api/register'
export default {
    name: 'register',
    data() { 
        var checkAcount = (rule,value,callback)=>{
            let acountReg = /[`~!@#$%^&*()_\-+=<>?:"{}|/, .;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/
            let chineseReg = /[\u4E00-\u9FA5]/g
            if(acountReg.test(value)||chineseReg.test(value)){
                callback(new Error('不能包含特殊字符或汉字'))
            }else{
                callback()
            }
        }
        var checkPass = (rule,value,callback)=>{
            let userPassword = this.ruleForm.userPassword
            if(userPassword!==value){
                callback(new Error("两次密码不一致"))
            }else{
                callback()
            }
        }
        var checkPhone = (rule,value,callback)=>{
            return this.judgeCode(value,callback)
        }
        return {
            time:'获取验证码',
            codeFlag:false,
            ruleForm:{
                account:'',
                userPassword:'',
                confirmPSW:'',
                phone:'',
                verificationCode:''
            },
            rules:{
                account:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min:5 ,max:15 , message: '账号必须在5至10之间' ,trigger:'blur'},
                    { validator:checkAcount ,trigger:'blur'}
                ],
                userPassword:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min:5 ,max:10 , message: '密码必须在5至10之间' ,trigger:'blur'}
                ],
                confirmPSW:[
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { validator:checkPass , trigger:'blur'}
                ],
                phone:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkPhone , trigger:'blur'}
                ],
                verificationCode:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 0 , max: 6 , trigger:'blur'}
                ],
            }
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
        sendCode(){
            let flag = this.judgeCode(this.ruleForm.phone)
            // console.log(flag)
            if(flag){
                sendCodeRequest(
                        parseInt(this.ruleForm.phone)
                ).then((res)=>{
                    console.log(res)
                    this.$message({
                        message:res.msg,
                        type:'success'
                    })
                    this.time = 60
                    this.codeFlag = true
                    let timeCount = setInterval(()=>{
                        if(this.time<=0){
                            this.time = "获取验证码"
                            this.codeFlag = false
                            clearInterval(timeCount)
                            return
                        }
                        this.time -= 1
                    },1000)
                }).catch((error)=>{
                    console.log(error)
                })
            }else{
                this.$message.error("请输入正确的手机格式")
            }
            
        },
        judgeCode(value,callback){
            let phoneReg = /^1[3456789]\d{9}$/
            if(!phoneReg.test(value)){
                
                if(callback){
                    callback(new Error("请输入正确的手机格式"))
                }else{
                    return false
                }
            }else{
                if(callback){
                    callback()
                }else{
                    return true
                }
            }
        },
        submitForm(formName){
            let that = this.ruleForm
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    registerRequest(
                        that.account,
                        that.userPassword,
                        that.phone,
                        that.verificationCode
                    ).then((res)=>{
                        if(res.status == 200){
                            this.$message({
                                message:res.msg,
                                type:'success'
                            })
                        }else{
                            this.$message({
                                message:res.msg,
                                type:'error'
                            })
                        }
                        this.$router.push('/login')
                    }).catch((err)=>{
                        console.log(err)
                        this.$message.error(err)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
.register{
    .container{
        width: 23%;
        position: relative;
        top: 50%;
        left: 0;
        margin: 0 auto;
        transform: translateY(-50%);
        .el-form-item{
            width: 100%;
        }
        .verificationCode{
            .verificationCode-count{
                width: 45%;
            }
            .code{
                margin-left: 7%;
            }
        }
    }
}
</style>