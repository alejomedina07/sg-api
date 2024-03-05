export interface TypeFiltersDto {
  BOOLEAN?: { [key: string]: boolean };
  CONTAINS?: { [key: string]: boolean };
  NUMBERS?: { [key: string]: boolean };
  RELATION?: { [key: string]: string };
}
