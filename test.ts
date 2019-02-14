interface Person {
  name?:string,
  age?:string,
  gender?:string,
  occupation?:string,
}

function getPerson(){
  let person = <Person>{name:"John"};
  return person;
}
let person: Person = getPerson();
let name1:string = person.name;