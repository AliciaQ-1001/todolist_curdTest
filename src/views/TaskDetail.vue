<template>
  <div class="container" v-if="task">
    <div class="header">
      <el-button @click="router.back()" type="text">
        <el-icon><ArrowLeft /></el-icon>返回</el-button
      >
      <h2>任务详情</h2>
    </div>

    <el-form :model="taskForm" label-width="80px" class="task-form">
      <el-form-item label="标题">
        <el-input v-model="taskForm.title" :disabled="!isEditing" />
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="taskForm.description" :disabled="!isEditing" />
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="taskForm.status" :disabled="!isEditing">
          <el-option label="未开始" value="未开始" />
          <el-option label="进行中" value="进行中" />
          <el-option label="已完成" value="已完成" />
        </el-select>
      </el-form-item>

      <el-form-item label="创建时间">
        <span>{{ taskForm.createTime }}</span>
      </el-form-item>
    </el-form>

    <div class="actions">
      <template v-if="!isEditing">
        <el-button type="success" @click="startEdit">编辑</el-button>
        <el-button type="danger" @click="confirmDelete">删除</el-button>
      </template>
      <template v-else>
        <el-button type="success" @click="saveChanges">保存</el-button>
        <el-button type="danger" @click="cancelEdit">取消</el-button>
      </template>
    </div>
  </div>

  <div v-else class="container">
    <el-empty description="任务不存在">
      <el-button @click="router.push('/')">返回首页</el-button>
    </el-empty>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodoStore } from "../stores/todoStore";
import { ElMessage, ElMessageBox } from "element-plus";
const route = useRoute();
const router = useRouter();
const todoStore = useTodoStore();
const isEditing = ref(false);

const task = computed(() => todoStore.getTaskById(Number(route.params.id)));
const taskForm = ref({});

// 初始化表单数据
if (task.value) {
  taskForm.value = { ...task.value };
}
const startEdit = () => {
  isEditing.value = true;
};
const confirmDelete = () => {
  ElMessageBox.confirm("确定删除该任务吗？", "注意", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    confirmButtonClass: "custom-confirm-button",
    cancelButtonClass: "custom-cancel-button",
  }).then(() => {
    todoStore.deleteTask(task.value.id);
    router.push("/");
    ElMessage.success("删除成功");
  });
};
const saveChanges = () => {
  todoStore.updateTask(task.value.id, taskForm.value);
  isEditing.value = false;
  ElMessage.success("保存成功");
  router.push("/"); //使用 Vue Router 将用户导航到应用的根路径（即 /）
};
const cancelEdit = () => {
  taskForm.value = { ...task.value }; //为了在取消编辑时，将表单数据恢复到原始状态，确保用户的操作不会意外修改数据
  isEditing.value = false;
};
</script>



<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.header h2 {
  margin: 0 auto;
  color: #67c23a;
}

.task-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.el-button--text {
  color: #67c23a !important;
}
</style>

<style>
.custom-cancel-button:hover {
  background: #d8f0cc;
  border-color: #d8f0cc;
  color: #67c23a;
}
.custom-confirm-button {
  background: #67c23a;
  border-color: #67c23a;
}
.custom-confirm-button:hover {
  background: #9fd882;
  border-color: #9fd882;
  color: #fff;
}
</style>