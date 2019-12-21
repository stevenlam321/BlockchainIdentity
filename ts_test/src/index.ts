class Animal{
    age: number;
    breed: string;
    constructor(age:number,breed:string){
        this.age = age;
        this.breed = breed;
    }
    makeSound_(sound:string):void{
        console.log(sound);
        console.log(sound);
        console.log(sound);
    }
}

class Dog extends Animal{ 
    playsFetch: boolean;
    constructor(age:number,breed:string,playsFetch: boolean){
       super(age,breed);
       this.playsFetch = playsFetch;
    }
    makeSound_():void{
        super.makeSound_('woof woof')
    }
    getAgeInHumanYears(): number
    {
        return this.age * 7    // super.age will throw error
    }
}
class Cat extends Animal
{
    constructor(age: number, breed: string)
    {
        super(age, breed)
    }
    makeSound(): void
    {
        super.makeSound_('meow meow')
    }
}
class PetStore{
    dogs: Dog [];
    
    printAllDogNames():void{
        this.dogs.forEach(dog => {
            console.log(dog.age);
        });
    }
}
