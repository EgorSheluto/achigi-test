import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from "src/app.module";
import { Task } from "src/modules/task/entities/task.entity";
import { TaskStatus } from "src/modules/task/enums";
import { TaskResolver } from "src/modules/task/task.resolver";
import { TaskService } from "src/modules/task/task.service";
import { Repository } from "typeorm";

const date = new Date();

const tasksForCreate: any[] = [
	{
		name: 'test1',
		description: 'test1',
		estimateDate: new Date(),
		price: 145,
		urls: [
			"dfgh",
			"gfhfgh",
		],
		progress: 0,
		status: TaskStatus.processing,
	},
	{
		name: 'test2',
		description: 'test2',
		estimateDate: new Date(),
		price: 199,
		urls: [
			"gfhfgh",
		],
		progress: 0,
		status: TaskStatus.initialized,
	},
	{
		name: 'test3',
		description: 'test3',
		estimateDate: new Date(),
		price: 12,
		urls: [
			"dfgh",
			"gfhfgh",
			"dfgdfh",
		],
		progress: 0,
		status: TaskStatus.failed,
	},
];

const tasksCreateIds: string[] = [];

const tasksForUpdate: any[] = [
	{
		name: 'test1',
		description: 'test1',
		estimateDate: new Date(),
		price: 145,
		urls: [
			"dfgh",
			"gfhfgh",
		],
		progress: 0,
		status: TaskStatus.processing,
	},
	{
		name: 'test2',
		description: 'test2',
		estimateDate: new Date(),
		price: 199,
		urls: [
			"gfhfgh",
		],
		progress: 0,
		status: TaskStatus.initialized,
	},
	{
		name: 'test3',
		description: 'test3',
		estimateDate: new Date(),
		price: 12,
		urls: [
			"dfgh",
			"gfhfgh",
			"dfgdfh",
		],
		progress: 0,
		status: TaskStatus.failed,
	},
];

const gql = '/graphql';

const tasksQuery = '{ tasks { id name description estimateDate urls price }}';
const createTasks = 'mutation($payload: [CreateTasksDto!]!) { createTaks(tasks: $payload) { id name description estimateDate urls price } }';
const updateTasks = 'mutation($payload: [UpdateTasksDto!]!) { updateTaks(tasks: $payload) }';
const deleteTasks = 'mutation($payload: [String!]!) { deleteTasks(ids: $payload) }';

describe(`TaskResolver (e2e)`, () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	describe(gql, () => {
		let createdTasks: Task[] = [];

		describe('createTasks', () => {
			it('should create tasks', () => {
				return request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: createTasks, 
						variables: tasksForCreate 
					})
					.expect(200)
					.expect((res) => {
						const tasks = res.body.data.createTasks;
						expect(tasks.length).toEqual(3);
						createdTasks = tasks;
					})
					.then(() =>
						request(app.getHttpServer())
							.post(gql)
							.send({ query: tasksQuery })
							.expect(200)
							.expect((res) => {
								const tasks = res.body.data.tasks;
								expect(tasks).toEqual(
									createTasks
								);
							})
					)
			});
			it('should get the same tasks', () => {
				return request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: tasksQuery, 
						variables: tasksForCreate 
					})
					.expect(200)
					.expect((res) => {
						const tasks = res.body.data.tasks;
						expect(tasks).toEqual(
							createTasks
						);
					});
			});
		});
		// describe('updateTasks', () => {
		// 	it('should update tasks', () => {
		// 		return request(app.getHttpServer())
		// 			.post(gql)
		// 			.send({ 
		// 				query: tasksQuery, 
		// 				variables: updateTasks 
		// 			})
		// 			.expect(200)
		// 			.expect((res) => {
		// 				expect(res.body.data.tasks[0]).toEqual(tasks[0]);
		// 				expect(res.body.data.tasks[1]).toEqual(tasks[1]);
		// 				expect(res.body.data.tasks[2]).toEqual(tasks[2]);
		// 			});
		// 	});
		// });
	});
})