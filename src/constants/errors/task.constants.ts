import { EXISTS, FAILED_CREATE_EXISTS, FAILED_CREATE_PARAM_EXISTS, FAILED_DELETE_NOT_EXISTS, FAILED_UPDATE_NOTHING_TO_UPDATE, FAILED_UPDATE_NOT_EXISTS, FAILED_UPDATE_PARAM_EXISTS, PARAM_EXISTS } from "./common.constants";

const taskObjName = 'task';
const taskName = 'name';

export const TASK_EXISTS: string = EXISTS(taskObjName);
export const TASK_NAME_EXISTS: string = PARAM_EXISTS(taskObjName, taskName);

export const FAILED_CREATE_TASK_EXISTS: string = FAILED_CREATE_EXISTS(taskObjName);
export const FAILED_CREATE_TASK_NAME_EXISTS: string = FAILED_CREATE_PARAM_EXISTS(taskObjName, taskName);

export const FAILED_UPDATE_TASK_NOT_EXISTS: string = FAILED_UPDATE_NOT_EXISTS(taskObjName);
export const FAILED_UPDATE_TASK_PARAM_EXISTS: string = FAILED_UPDATE_PARAM_EXISTS(taskObjName, taskName);
export const FAILED_UPDATE_TASK_NOTHING_TO_UPDATE: string = FAILED_UPDATE_NOTHING_TO_UPDATE();

export const FAILED_CREATE_OR_UPDATE_TASK_NAME_DUPLICATES: string = `Create or update has been failed. There haven't be tasks names duplicates.`;

export const FAILED_DELETE_TASK_NOT_EXISTS: string = FAILED_DELETE_NOT_EXISTS(taskObjName);
