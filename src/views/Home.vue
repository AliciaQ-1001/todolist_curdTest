<template>
  <div class="container">
    <h1 class="title">待办事件</h1>

    <div class="add-task">
      <el-input
        v-model="newTask"
        class="task-input"
        placeholder="请输入任务"
        @keyup.enter="addTask"
      />
      <el-button
        type="success"
        @click="addTask"
        :disabled="!newTask.trim()"
        plain
        >添加任务</el-button
      >
    </div>

    <div class="task-list">
      <el-card
        v-for="task in todoStore.tasks"
        :key="task.id"
        class="task-item"
        shadow="always"
        :class="{ completed: task.status === '已完成' }"
        @click="goToDetail(task.id)"
      >
        <div class="task-content">
          <span class="task-title">{{ task.title }}</span>
          <div class="task-info">
            <el-tag :type="getStatusType(task.status)" size="small">
              {{ task.status }}
            </el-tag>
            <span class="task-time">{{ task.createTime }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTodoStore } from "../stores/todoStore";

const router = useRouter();
const todoStore = useTodoStore();
let newTask = ref("");

const addTask = () => {
  if (newTask.value.trim()) {
    todoStore.addTask(newTask.value);
    newTask.value = "";
  }
};

const goToDetail = (taskId) => {
  router.push(`/task/${taskId}`);
};

const getStatusType = (status) => {
  switch (status) {
    case "已完成":
      return "success";
    case "进行中":
      return "warining";
    default:
      return "info";
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: #67c23a;
  margin-bottom: 30px;
}

.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.task-input {
  width: 300px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-item {
  cursor: pointer;
  transition: all 0.3s;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(103, 194, 58, 0.2);
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-title {
  font-size: 16px;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-time {
  color: #999;
  font-size: 12px;
}

.completed {
  opacity: 0.7;
}

.completed .task-title {
  text-decoration: line-through;
  color: #999;
}
</style>