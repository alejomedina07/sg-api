import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidMonthYear', async: false })
export class ValidMonthYearConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const [year, month] = value.split('-').map(Number);
    const currentYear = new Date().getFullYear();
    const minYear = 2020;
    const maxYear = currentYear; // Puedes ajustar el rango máximo según tus necesidades

    if (year < minYear || year > maxYear) {
      return false; // El año está fuera del rango válido
    }

    if (month < 1 || month > 12) {
      return false; // El mes está fuera del rango válido
    }

    return true; // El año y el mes son válidos
  }

  defaultMessage(args: ValidationArguments) {
    return 'month: Formato invalido, el formato debe ser YYYY-mm.';
  }
}
