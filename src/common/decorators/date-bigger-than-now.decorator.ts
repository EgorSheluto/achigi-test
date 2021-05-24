import { 
  registerDecorator, 
	ValidationArguments, 
	ValidationOptions, 
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: 'matchesProperty', async: false })
export class MatchesPropertyConstraint implements ValidatorConstraintInterface {
  public validate(value: string, args: ValidationArguments) {
    const dateNow = new Date();
    return typeof value === 'object' && value > dateNow;
  }

  public defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return 'date value should be bigger than current date';
  }
}

export function IsDateBiggerThanNow(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateBiggerThanNow',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: MatchesPropertyConstraint
    });
  };
}
