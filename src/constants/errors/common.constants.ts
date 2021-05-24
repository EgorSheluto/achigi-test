export const EXISTS = (objName: string): string => `This ${objName} already exists.`;
export const NOT_EXISTS = (objName: string): string => `This ${objName} doesn't exist.`;
export const PARAM_EXISTS = (objName: string, paramName: string): string => `This ${objName} ${paramName} already exists.`;

export const FAILED_CREATE = () => `Create has been failed.`;
export const FAILED_UPDATE = () => `Update has been failed.`;
export const FAILED_DELETE = () => `Delete has been failed.`;

export const FAILED_CREATE_EXISTS = (objName: string) => `${FAILED_CREATE()} ${EXISTS(objName)}`;
export const FAILED_CREATE_PARAM_EXISTS = (objName: string, paramName: string) => `${FAILED_CREATE()} ${PARAM_EXISTS(objName, paramName)}`;

export const FAILED_UPDATE_EXISTS = (objName: string) => `${FAILED_UPDATE()} ${EXISTS(objName)}`;
export const FAILED_UPDATE_NOT_EXISTS = (objName: string) => `${FAILED_UPDATE()} ${NOT_EXISTS(objName)}`;
export const FAILED_UPDATE_PARAM_EXISTS = (objName: string, paramName: string) => `${FAILED_UPDATE()} ${PARAM_EXISTS(objName, paramName)}`;
export const FAILED_UPDATE_NOTHING_TO_UPDATE = () => `${FAILED_UPDATE()} Nothing to update.`;

export const FAILED_DELETE_NOT_EXISTS = (objName: string) => `${FAILED_DELETE()} This ${objName} doesn't exist`;
