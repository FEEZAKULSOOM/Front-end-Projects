
        // Task Manager Application
        class TaskManager {
            constructor() {
                this.tasks = this.loadTasks();
                this.currentFilter = 'all';
                this.currentEditId = null;
                this.initializeApp();
            }

            // Initialize the application
            initializeApp() {
                this.bindEvents();
                this.renderTasks();
                this.updateStats();
            }

            // Load tasks from localStorage
            loadTasks() {
                const savedTasks = localStorage.getItem('nexusTasks');
                if (savedTasks) {
                    return JSON.parse(savedTasks);
                }
                // Return some sample tasks for first-time users
                return [
                    {
                        id: Date.now(),
                        title: 'Welcome to NexusTask!',
                        category: 'work',
                        priority: 'medium',
                        status: 'todo',
                        createdAt: new Date().toISOString(),
                        completed: false
                    },
                    {
                        id: Date.now() + 1,
                        title: 'Drag tasks between columns',
                        category: 'personal',
                        priority: 'high',
                        status: 'inprogress',
                        createdAt: new Date().toISOString(),
                        completed: false
                    },
                    {
                        id: Date.now() + 2,
                        title: 'Try dark/light mode toggle',
                        category: 'other',
                        priority: 'low',
                        status: 'done',
                        createdAt: new Date().toISOString(),
                        completed: true
                    }
                ];
            }

            // Save tasks to localStorage
            saveTasks() {
                localStorage.setItem('nexusTasks', JSON.stringify(this.tasks));
            }

            // Bind event listeners
            bindEvents() {
                // Add task button
                document.getElementById('addTask').addEventListener('click', () => this.addTask());
                document.getElementById('taskInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.addTask();
                });
                document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());

                // Theme toggle
                document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

                // Search functionality
                document.getElementById('searchInput').addEventListener('input', (e) => {
                    this.filterTasks(e.target.value);
                });

                // Filter buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        e.target.classList.add('active');
                        this.currentFilter = e.target.dataset.filter;
                        this.renderTasks();
                    });
                });

                // Modal buttons
                document.getElementById('saveTaskChanges').addEventListener('click', () => this.updateTask());
                document.getElementById('cancelEdit').addEventListener('click', () => this.closeModal());
                document.querySelector('.close-modal').addEventListener('click', () => this.closeModal());

                // Clear completed tasks
                document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());

                // Initialize drag and drop
                this.initializeDragAndDrop();

                // Close modal on outside click
                document.getElementById('taskModal').addEventListener('click', (e) => {
                    if (e.target.id === 'taskModal') this.closeModal();
                });
            }

            // Toggle between dark and light theme
            toggleTheme() {
                const body = document.body;
                const themeToggle = document.getElementById('themeToggle');
                const icon = themeToggle.querySelector('i');
                
                body.classList.toggle('dark-mode');
                if (body.classList.contains('dark-mode')) {
                    icon.className = 'fas fa-moon';
                    this.showNotification('Switched to dark mode');
                } else {
                    icon.className = 'fas fa-sun';
                    this.showNotification('Switched to light mode');
                }
            }

            // Add a new task
            addTask() {
                const taskInput = document.getElementById('taskInput');
                const categorySelect = document.getElementById('categorySelect');
                const prioritySelect = document.getElementById('prioritySelect');
                
                const title = taskInput.value.trim();
                if (!title) {
                    this.showNotification('Please enter a task title', 'error');
                    taskInput.focus();
                    return;
                }

                // Simulate API call with Promise and setTimeout
                this.simulateAPIRequest('POST', { title })
                    .then(() => {
                        const newTask = {
                            id: Date.now(),
                            title,
                            category: categorySelect.value,
                            priority: prioritySelect.value,
                            status: 'todo',
                            createdAt: new Date().toISOString(),
                            completed: false
                        };

                        this.tasks.push(newTask);
                        this.saveTasks();
                        this.renderTasks();
                        this.updateStats();
                        
                        taskInput.value = '';
                        taskInput.focus();
                        
                        this.showNotification('Task added successfully!');
                    })
                    .catch(error => {
                        this.showNotification('Error adding task. Please try again.', 'error');
                        console.error('API Error:', error);
                    });
            }

            // Render tasks based on current filter
            renderTasks() {
                const searchQuery = document.getElementById('searchInput').value.toLowerCase();
                
                // Filter tasks based on search and current filter
                let filteredTasks = this.tasks.filter(task => {
                    const matchesSearch = task.title.toLowerCase().includes(searchQuery);
                    const matchesFilter = this.currentFilter === 'all' || 
                                        (this.currentFilter === 'active' && !task.completed) ||
                                        (this.currentFilter === 'completed' && task.completed) ||
                                        (this.currentFilter === 'high' && task.priority === 'high');
                    return matchesSearch && matchesFilter;
                });

                // Clear all task lists
                ['todo', 'inprogress', 'done'].forEach(status => {
                    document.getElementById(`${status}-list`).innerHTML = '';
                });

                // Render each task
                filteredTasks.forEach(task => this.renderTask(task));

                // Update column counts
                this.updateColumnCounts();
            }

            // Render a single task
            renderTask(task) {
                const taskList = document.getElementById(`${task.status}-list`);
                
                const taskElement = document.createElement('div');
                taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskElement.dataset.id = task.id;
                taskElement.dataset.priority = task.priority;
                taskElement.draggable = true;

                const categoryLabels = {
                    work: 'Work',
                    personal: 'Personal',
                    shopping: 'Shopping',
                    health: 'Health',
                    other: 'Other'
                };

                const priorityLabels = {
                    high: 'High',
                    medium: 'Medium',
                    low: 'Low'
                };

                taskElement.innerHTML = `
                    <div class="task-content">
                        <div class="task-title">${this.escapeHTML(task.title)}</div>
                        <div class="task-meta">
                            <span class="task-category">${categoryLabels[task.category]}</span>
                            <span class="task-priority ${task.priority}">${priorityLabels[task.priority]}</span>
                            <span class="task-date">${new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn complete" title="Mark as ${task.completed ? 'incomplete' : 'complete'}">
                            <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                        </button>
                        <button class="task-btn edit" title="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-btn delete" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;

                // Add event listeners to action buttons
                const completeBtn = taskElement.querySelector('.complete');
                const editBtn = taskElement.querySelector('.edit');
                const deleteBtn = taskElement.querySelector('.delete');

                completeBtn.addEventListener('click', () => this.toggleTaskCompletion(task.id));
                editBtn.addEventListener('click', () => this.openEditModal(task.id));
                deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

                // Add drag and drop events
                taskElement.addEventListener('dragstart', this.handleDragStart.bind(this));
                taskElement.addEventListener('dragend', this.handleDragEnd.bind(this));

                taskList.appendChild(taskElement);
            }

            // Toggle task completion
            toggleTaskCompletion(taskId) {
                const taskIndex = this.tasks.findIndex(task => task.id === taskId);
                if (taskIndex === -1) return;

                this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
                this.tasks[taskIndex].status = this.tasks[taskIndex].completed ? 'done' : 'todo';
                
                this.saveTasks();
                this.renderTasks();
                this.updateStats();
                
                const task = this.tasks[taskIndex];
                this.showNotification(`Task marked as ${task.completed ? 'completed' : 'active'}`);
            }

            // Open edit modal
            openEditModal(taskId) {
                const task = this.tasks.find(t => t.id === taskId);
                if (!task) return;

                this.currentEditId = taskId;
                
                document.getElementById('editTaskTitle').value = task.title;
                document.getElementById('editTaskCategory').value = task.category;
                document.getElementById('editTaskPriority').value = task.priority;
                document.getElementById('editTaskStatus').value = task.status;
                
                document.getElementById('taskModal').style.display = 'flex';
            }

            // Update task
            updateTask() {
                if (!this.currentEditId) return;

                const taskIndex = this.tasks.findIndex(task => task.id === this.currentEditId);
                if (taskIndex === -1) return;

                const title = document.getElementById('editTaskTitle').value.trim();
                if (!title) {
                    this.showNotification('Task title cannot be empty', 'error');
                    return;
                }

                // Simulate API call
                this.simulateAPIRequest('PUT', { id: this.currentEditId })
                    .then(() => {
                        this.tasks[taskIndex] = {
                            ...this.tasks[taskIndex],
                            title,
                            category: document.getElementById('editTaskCategory').value,
                            priority: document.getElementById('editTaskPriority').value,
                            status: document.getElementById('editTaskStatus').value,
                            completed: document.getElementById('editTaskStatus').value === 'done'
                        };

                        this.saveTasks();
                        this.renderTasks();
                        this.updateStats();
                        this.closeModal();
                        
                        this.showNotification('Task updated successfully!');
                    })
                    .catch(error => {
                        this.showNotification('Error updating task. Please try again.', 'error');
                        console.error('API Error:', error);
                    });
            }

            // Delete task
            deleteTask(taskId) {
                // Simulate API call
                this.simulateAPIRequest('DELETE', { id: taskId })
                    .then(() => {
                        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
                        if (taskIndex === -1) return;

                        const taskTitle = this.tasks[taskIndex].title;
                        this.tasks.splice(taskIndex, 1);
                        
                        this.saveTasks();
                        this.renderTasks();
                        this.updateStats();
                        
                        this.showNotification(`"${taskTitle}" deleted`);
                    })
                    .catch(error => {
                        this.showNotification('Error deleting task. Please try again.', 'error');
                        console.error('API Error:', error);
                    });
            }

            // Close modal
            closeModal() {
                document.getElementById('taskModal').style.display = 'none';
                this.currentEditId = null;
            }

            // Filter tasks based on search query
            filterTasks(query) {
                this.renderTasks();
            }

            // Clear completed tasks
            clearCompleted() {
                const completedCount = this.tasks.filter(task => task.completed).length;
                if (completedCount === 0) {
                    this.showNotification('No completed tasks to clear', 'info');
                    return;
                }

                if (confirm(`Are you sure you want to clear ${completedCount} completed task(s)?`)) {
                    // Simulate API call
                    this.simulateAPIRequest('DELETE', { clearCompleted: true })
                        .then(() => {
                            this.tasks = this.tasks.filter(task => !task.completed);
                            this.saveTasks();
                            this.renderTasks();
                            this.updateStats();
                            
                            this.showNotification(`Cleared ${completedCount} completed task(s)`);
                        })
                        .catch(error => {
                            this.showNotification('Error clearing completed tasks', 'error');
                            console.error('API Error:', error);
                        });
                }
            }

            // Update statistics and progress
            updateStats() {
                const totalTasks = this.tasks.length;
                const completedTasks = this.tasks.filter(task => task.completed).length;
                const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                
                // Update progress bar
                document.getElementById('progressFill').style.width = `${progress}%`;
                document.getElementById('progressText').textContent = `${progress}% Complete`;
                
                // Update footer stats
                document.getElementById('totalTasks').textContent = totalTasks;
                document.getElementById('completedTasks').textContent = completedTasks;
                
                // Update column counts
                this.updateColumnCounts();
            }

            // Update column task counts
            updateColumnCounts() {
                const todoCount = this.tasks.filter(task => task.status === 'todo').length;
                const inprogressCount = this.tasks.filter(task => task.status === 'inprogress').length;
                const doneCount = this.tasks.filter(task => task.status === 'done').length;
                
                document.getElementById('todo-count').textContent = todoCount;
                document.getElementById('inprogress-count').textContent = inprogressCount;
                document.getElementById('done-count').textContent = doneCount;
            }

            // Initialize drag and drop functionality
            initializeDragAndDrop() {
                const taskLists = document.querySelectorAll('.task-list');
                
                taskLists.forEach(list => {
                    list.addEventListener('dragover', this.handleDragOver.bind(this));
                    list.addEventListener('dragenter', this.handleDragEnter.bind(this));
                    list.addEventListener('dragleave', this.handleDragLeave.bind(this));
                    list.addEventListener('drop', this.handleDrop.bind(this));
                });
            }

            // Drag and drop event handlers
            handleDragStart(e) {
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                e.target.classList.add('dragging');
                setTimeout(() => {
                    e.target.style.display = 'none';
                }, 0);
            }

            handleDragEnd(e) {
                e.target.classList.remove('dragging');
                e.target.style.display = 'block';
            }

            handleDragOver(e) {
                e.preventDefault();
            }

            handleDragEnter(e) {
                e.preventDefault();
                if (e.target.classList.contains('task-list')) {
                    e.target.classList.add('drag-over');
                }
            }

            handleDragLeave(e) {
                if (e.target.classList.contains('task-list')) {
                    e.target.classList.remove('drag-over');
                }
            }

            handleDrop(e) {
                e.preventDefault();
                const taskLists = document.querySelectorAll('.task-list');
                taskLists.forEach(list => list.classList.remove('drag-over'));
                
                const taskId = e.dataTransfer.getData('text/plain');
                const taskElement = document.querySelector(`[data-id="${taskId}"]`);
                const newStatus = e.target.closest('.task-list').dataset.status;
                
                if (taskElement && newStatus) {
                    const taskIdNum = parseInt(taskId);
                    const taskIndex = this.tasks.findIndex(task => task.id === taskIdNum);
                    
                    if (taskIndex !== -1) {
                        // Update task status
                        this.tasks[taskIndex].status = newStatus;
                        this.tasks[taskIndex].completed = newStatus === 'done';
                        
                        this.saveTasks();
                        this.renderTasks();
                        this.updateStats();
                        
                        this.showNotification(`Task moved to ${this.getStatusLabel(newStatus)}`);
                    }
                }
            }

            // Helper to get status label
            getStatusLabel(status) {
                const labels = {
                    todo: 'To Do',
                    inprogress: 'In Progress',
                    done: 'Done'
                };
                return labels[status] || status;
            }

            // Simulate API request
            simulateAPIRequest(method, data) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // Simulate 10% chance of failure for realism
                        if (Math.random() < 0.1) {
                            reject(new Error('Network error'));
                        } else {
                            resolve({ success: true, method, data });
                        }
                    }, 300); // Simulate network delay
                });
            }

            // Show notification
            showNotification(message, type = 'success') {
                const notification = document.getElementById('notification');
                notification.textContent = message;
                notification.className = 'notification';
                
                // Add type class for styling
                if (type === 'error') {
                    notification.style.borderLeft = '4px solid var(--danger-color)';
                } else if (type === 'info') {
                    notification.style.borderLeft = '4px solid var(--warning-color)';
                } else {
                    notification.style.borderLeft = '4px solid var(--success-color)';
                }
                
                notification.classList.add('show');
                
                // Auto-hide after 3 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }

            // Escape HTML to prevent XSS
            escapeHTML(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
        }

        // Initialize the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            window.taskManager = new TaskManager();
        });
// Footer functionality
function updateFooterStats() {
    if (window.taskManager) {
        const total = window.taskManager.tasks.length;
        const completed = window.taskManager.tasks.filter(t => t.completed).length;
      
        
        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;

    }
}

// Clear completed button
document.getElementById('clearCompleted')?.addEventListener('click', function() {
    if (window.taskManager && confirm('Clear all completed tasks?')) {
        window.taskManager.clearCompleted();
        updateFooterStats();
    }
});



// Update footer stats when tasks change
setInterval(updateFooterStats, 1000);

// Initial update
document.addEventListener('DOMContentLoaded', updateFooterStats);