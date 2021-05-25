import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { AppModule } from "../src/app.module";
import { getConnection } from "typeorm";
import * as faker from 'faker';
import { Task } from "../src/modules/task/entities/task.entity";

const gql = '/graphql';

const tasksQuery = '{ tasks { id name description estimateDate urls price }}';
const createTasks = 'mutation($payload: [CreateTaskDto!]!) { createTasks(tasks: $payload) { id name description estimateDate urls price } }';
const updateTasks = 'mutation($payload: [UpdateTaskDto!]!) { updateTasks(tasks: $payload) }';
const deleteTasks = 'mutation($payload: [String!]!) { deleteTasks(ids: $payload) }';

const createTestTasks = (tasksInfo?: any[], count: number = 3): any[] => {
	let tasks = [];
	for (let i = 0; i < count; i++) {
		const task = {
			name: tasksInfo?.[i]?.name || faker.random.word(),
			description: tasksInfo?.[i]?.description || faker.lorem.text(),
			estimateDate: tasksInfo?.[i]?.estimateDate || faker.date.future(),
			price: tasksInfo?.[i]?.price || Number(faker.commerce.price()),
			urls: tasksInfo?.[i]?.urls || [ faker.random.word(), faker.random.word(), faker.random.word() ],
		};
		tasksInfo?.[i]?.name === 'empty' && (task.name = null);
		tasksInfo?.[i]?.description === 'empty' && (task.description = null);
		tasks.push(task);
	}

	return tasks;
}

describe(`TaskResolver (e2e)`, () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule,
			],
		})
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	afterEach(async () => {
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
      const repository = getConnection().getRepository(entity.name);
      await repository.clear();
    }
	});

	describe(gql, () => {

		describe('Action with tasks', () => {

			it(`Should create tasks`, async () => {
				const tasksForCreate = createTestTasks();

				let createdTasks: Task[] = [];

				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: createTasks, 
						variables: { payload: tasksForCreate }
					})
					.expect(200)
					.expect((res) => {
						const tasks = res?.body?.data?.createTasks;

						expect(tasks?.length).toEqual(3);
						expect(tasks?.filter(task => 
							tasksForCreate?.find(taskForCreate => 
								taskForCreate?.name === task?.name
							)
						)?.length === 3).toBeTruthy();

						createdTasks = tasks;
					})
					.then(() =>
						request(app.getHttpServer())
							.post(gql)
							.send({ query: tasksQuery })
							.expect(200)
							.expect((res) => {
								const tasks = res?.body?.data?.tasks;

								expect(tasks.filter(task => 
									tasksForCreate.find(taskForCreate => 
										taskForCreate.name === task.name
									)
								)?.length === 3).toBeTruthy();
							})
					);
			});

			it('Should be an error because of empty array to update', async () => {
				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: updateTasks,
						variables: { payload: null },
					})
					.expect(400)
					.expect((res) => {
						const data = res?.body?.data;
						const errors = res?.body?.errors;

						expect(errors).toBeDefined();
						expect(errors?.length > 0).toBeTruthy();
						expect(data === undefined || data === null).toBeTruthy();
					})
			});

			it('Should be an error because of empty array', async () => {
				const tasksForCreate = createTestTasks(null, 0);

				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: createTasks, 
						variables: { payload: tasksForCreate }
					})
					.expect(200)
					.expect((res) => {
						const errors = res?.body?.errors;

						expect(errors).toBeDefined()
						expect(errors?.length > 0).toBeTruthy();
					});
			});

			it('Should be an error because of empty array to delete', async () => {
				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: deleteTasks, 
						variables: { payload: [] }
					})
					.expect(200)
					.expect((res) => {
						const errors = res?.body?.errors;

						expect(errors).toBeDefined()
						expect(errors?.length > 0).toBeTruthy();
					});
			});

		});

		describe('Create task property validation', () => {

			it('Should be an error because of incorrect name', async () => {
				const tasksForCreate = createTestTasks([{
					name: "empty",
				}], 1);

				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: createTasks, 
						variables: { payload: tasksForCreate }
					})
					.expect(400)
					.expect((res) => {
						const errors = res?.body?.errors;
						const data = res?.body?.data;
						console.log(res?.body?.data?.createTasks);

						expect(errors).toBeDefined();
						expect(errors?.length > 0).toBeTruthy();
						expect(data === undefined || data === null).toBeTruthy();
					});
			});

			it('Should be an error because of estimate date in past', async () => {
				const tasksForCreate = createTestTasks([{
					estimateDate: faker.date.past(),
				}], 1);

				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: createTasks, 
						variables: { payload: tasksForCreate }
					})
					.expect(200)
					.expect((res) => {
						console.log(res?.body);
						const errors = res?.body?.errors;
						const data = res?.body?.data;

						expect(errors).toBeDefined();
						expect(errors?.length > 0).toBeTruthy();
						expect(data === undefined || data === null).toBeTruthy();
					});
			});

			it('Should be an error because of empty description', async () => {
				const tasksForCreate = createTestTasks([{
					description: 'empty',
				}], 1);

				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: createTasks, 
						variables: { payload: tasksForCreate }
					})
					.expect(400)
					.expect((res) => {
						const errors = res?.body?.errors;
						const data = res?.body?.data;

						expect(errors).toBeDefined();
						expect(errors?.length > 0).toBeTruthy();
						expect(data === undefined || data === null).toBeTruthy();
					});
			});

			it('Should be an error because of empty urls', async () => {
				const tasksForCreate = createTestTasks([{
					urls: [],
				}], 1);

				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: createTasks, 
						variables: { payload: tasksForCreate }
					})
					.expect(200)
					.expect((res) => {
						const errors = res?.body?.errors;
						const data = res?.body?.data;

						expect(errors).toBeDefined();
						expect(errors?.length > 0).toBeTruthy();
						expect(data === undefined || data === null).toBeTruthy();
					});
			});

			it(`Shouldn't be an error because of 0 price`, async () => {
				const tasksForCreate = createTestTasks([{
					price: 0,
				}], 1);

				return await request(app.getHttpServer())
					.post(gql)
					.send({ 
						query: createTasks, 
						variables: { payload: tasksForCreate }
					})
					.expect(200)
					.expect((res) => {
						const errors = res?.body?.errors;
						const data = res?.body?.data;

						expect(errors).toBeUndefined();
						expect(data).toBeDefined();
					});
			});
		});
		
	});
})