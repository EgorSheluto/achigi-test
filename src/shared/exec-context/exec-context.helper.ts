import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export class ExecutionContextHelper {
  private static async getArgsFromExecutionContextCore<T>(
    context: ExecutionContext,
    argName: string = "payload"
  ): Promise<T> {
    if (!context || !argName) {
      return null;
    }

    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    let arg: T;

    if (args.hasOwnProperty(argName)) {
        arg = args[argName];
    }

    return Promise.resolve(arg);
  }

  static async getObjectFromExecutionContext<T>(
    context: ExecutionContext,
    argName: string = "payload"
  ): Promise<T> {
    const obj = await this.getArgsFromExecutionContextCore<T>(context, argName);

    if (!obj || 
        Object.keys(obj)?.length < 0 || 
        obj?.constructor !== Object
    ) {
      return null;
    }

    return await Promise.resolve(obj);
  }

	static async getArrayFromExecutionContext<T>(
    context: ExecutionContext,
    argName: string = "payload"
  ): Promise<T> {
    const arr = await this.getArgsFromExecutionContextCore<T>(context, argName);

    if (!Array.isArray(arr)) {
      return null;
    }

    return await Promise.resolve(arr);
  }

  static async getScalarFromExecutionContext<T>(
    context: ExecutionContext,
    argName: string = "payload"
  ): Promise<T> {
    const scalar = await this.getArgsFromExecutionContextCore<T>(context, argName);
    
    if (!scalar || scalar instanceof Object) {
      return null;
    }

    return await Promise.resolve(scalar);
  }
}