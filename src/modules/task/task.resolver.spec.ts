import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { TaskResolver } from "./task.resolver"
import { TaskService } from "./task.service";

describe(`TaskResolver (unit)`, () => {
	let taskRepository: Repository<Task>;
  let taskResolver: TaskResolver;
	let taskService: TaskService;

	beforeEach(() => {
		taskRepository = new Repository<Task>();
		taskService = new TaskService(taskRepository);
		taskResolver = new TaskResolver(taskService);
	});

	describe('tasks', () => {
		it('should return an array of tasks', async () => {

		})
	});

	
})