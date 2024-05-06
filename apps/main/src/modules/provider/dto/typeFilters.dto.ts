export interface TypeFiltersDto {
  DATE?: { [key: string]: boolean };
  EQUAL?: { [key: string]: boolean };
  BOOLEAN?: { [key: string]: boolean };
  CONTAINS?: { [key: string]: boolean };
  NUMBERS?: { [key: string]: boolean };
  RELATION?: { [key: string]: string };
}
