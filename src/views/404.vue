<template>
    <div class="404">
        <el-button type="text" @click="add(`添加`)">点击添加</el-button>
        <el-button type="text" @click="add(`编辑`)">点击编辑</el-button>

        <el-dialog
        :title="MSGtitle"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: '404',
    data() { 
        return {
            dialogVisible:false,
            MSGtitle:'添加'
        }
    },
    methods:{
        add(title){
            this.MSGtitle = title
            this.dialogVisible = true
        }
    }
}
</script>