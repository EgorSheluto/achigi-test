import { registerEnumType } from "@nestjs/graphql";

export enum TaskStatus {
  initialized = 0,
  processing = 1,
  failed = 2,
  finished = 3,
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});
