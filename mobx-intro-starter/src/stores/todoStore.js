import { observable, action, reaction,computed ,mobx} from 'mobx';

class TodoStore {
	@observable todos = [];
    @observable pendingRequests = 0;

    constructor() {
      
    }

	@computed get completedTodosCount() {
    	return this.todos.filter(
			todo => todo.completed === true
		).length;
    }

	@computed get report() {
		if (this.todos.length === 0)
			return "<none>";
		const nextTodo = this.todos.find(todo => todo.completed === false);
		return `Next todo: "${nextTodo ? nextTodo.task : "<none>"}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

	addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
			assignee: null
		});
	}
}


//  const TodoStore = new TodoStore();
 export default TodoStore = new TodoStore();;
// export default new TodoStore();