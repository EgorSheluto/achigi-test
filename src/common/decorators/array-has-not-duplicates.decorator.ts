import { 
  registerDecorator, 
	ValidationArguments, 
	ValidationOptions, 
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: 'matchesProperty', async: false })
export class MatchesPropertyConstraint implements ValidatorConstraintInterface {
  public validate(arr: string[], args: ValidationArguments) {
		const uniqueArr = new Set(arr);
    return typeof arr === 'object' && typeof uniqueArr === 'object' && arr?.length === uniqueArr?.size;
  }

  public defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `array hasn't to have duplicates values`;
  }
}

export function ArrayHasNotDuplicates(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'arrayHasNotDuplicates',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: MatchesPropertyConstraint
    });
  };
}
