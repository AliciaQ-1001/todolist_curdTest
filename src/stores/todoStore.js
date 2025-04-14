import { defineStore } from 'pinia'
export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('todo-tasks')) || []
  }),
  actions: {
    addTask(task) {
      this.tasks.push({
        id: Date.now(),//返回当前时间的 时间戳
        title: task,
        discription: '',
        status: '未开始',
        createTime: new Date().toLocaleString(),//创建一个新的 Date 对象，表示当前时间.转换为一个简洁的日期字符串，忽略时间部分（小时、分钟、秒）

      })
      this.saveTasks()
    },
    updateTask(taskId, updates) {
      const index = this.tasks.findIndex(task => task.id === taskId)
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...updates }
        this.saveTasks()
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
      this.saveTasks()
    },
    saveTasks() {
      localStorage.setItem('todo-tasks', JSON.stringify(this.tasks))
    }
  },
  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find(task => task.id === id)
    }
  }
})