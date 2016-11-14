export interface IGreetingsDTO {
  name: string;
  surname: string;
}

export class GreetingsDTO implements IGreetingsDTO{
  public name: string;
  public surname: string;

  getFullName() {
    return `${this.name} ${this.surname}`;
  }

  static create(name: string, surname: string) {
    const result = new GreetingsDTO();
    result.name = name;
    result.surname = surname;
    return result;
  }
}