// Base class
class Animal {
  static remainingAnimals = 0;
  #name;
  #species;
  #energy;

  constructor(name, species) {
    this.#name = name;
    this.#species = species;
    Animal.remainingAnimals++;
    this.energy = 0; // necessary or not?
  }

  get name() {
    return this.#name;
  }
  set name(name) {
    this.#name = name;
  }

  get species() {
    return this.#species;
  }
  set species(species) {
    this.#species = species;
  }

  get energy() {
    return this.#energy;
  }
  set energy(energy) {
    this.#energy = energy;
  }

  // check energy left or not
  checkAvaiable(target) {
    if(target.energy <= 0 || this.energy <= 0) {
      const checkMessgae = `${target.energy <= 0 ? target.name : this.name} has already lost. No longer to fight.`;
      console.log(`${checkMessgae}`);
      return false;
    } else {
      return true;
    }
  }

  attack(target) {
    if(target.energy <= 0 || this.energy <= 0) {
      const el = target.energy <= 0 ? this : target;
      const targetEl = !target.energy <= 0 ? this : target;

      console.log(`${el.name} has won!`);
      console.log(`${targetEl.name}'s energy: ${targetEl.energy}`);
      console.log(`${el.name}'s energy: ${el.energy}`);

      Animal.remainingAnimals--;
    } else {
      console.log(`${this.name}'s energy: ${this.energy}`);
      console.log(`${target.name}'s energy: ${target.energy}`);
    }
  }

  eat() {
    const gainEnergyMessage = `${this.name} eats and gains energy!`;
    const numberOfEnergy = `${this.name}'s energy: ${this.energy}`;
    console.log(`${gainEnergyMessage} \n${numberOfEnergy}`);
  }
}

class Bird extends Animal {
  #canFly;

  constructor(name, species, canFly) {
    super(name, species);
    this.#canFly = canFly;
    this.energy = 100;
  }

  get canFly() {
    return this.#canFly;
  }
  set canFly(fly) {
    this.#canFly = fly;
  }

  attack(target) {
    const check = super.checkAvaiable(target);

    if(check) {
      const message = `${this.name} swoops in to attack ${target.name}!`;
      console.log(message);
      this.energy -= 20;
      target.energy -= 20;
      super.attack(target);
    }
    super.checkAvaiable(target);
  }

  eat() {
    this.energy += 10;
    super.eat();
  }
}

class Mammal extends Animal {
  #furColor;
  constructor(name, species, furColor) {
    super(name, species);
    this.#furColor = furColor;
    this.energy = 200;
  }

  get furColor() {
    return this.#furColor;
  }

  attack(target) {
    const check = super.checkAvaiable(target);

    if(check) {
      const message = `${this.name} lunges to attack ${target.name}!`;
      console.log(message);
      this.energy -= 50;
      target.energy -= 50;
      super.attack(target);
    }
    super.checkAvaiable(target);
  }

  eat() {
    this.energy += 20;
    super.eat();
  }
}

class Reptile extends Animal {
  #coldBlooded;
  constructor(name, species, coldBlooded) {
    super(name, species);
    this.#coldBlooded = coldBlooded;
    this.energy = 100;
  }

  get coldBlooded() {
    return this.#coldBlooded;
  }

  attack(target) {
    const check = super.checkAvaiable(target);

    if(check) {
      const message = `${this.name} bites to attack ${target.name}!`;
      console.log(message);
      this.energy -= 30;
      target.energy -= 30;
      super.attack(target);
    }
  }

  eat() {
    this.energy += 15;
    super.eat();
  }
}


// DRIVER CODE: Create instances of the subclasses and use their properties and methods. You can modify this to add more attacks and eating actions.

const eagle = new Bird("Eagle", "Bird of Prey", true);
console.log(`Name: ${eagle.name}, Species: ${eagle.species}, Energy: ${eagle.energy}, Can Fly: ${eagle.canFly}`);

const lion = new Mammal("Lion", "Big Cat", "Golden");
console.log(`Name: ${lion.name}, Species: ${lion.species}, Energy: ${eagle.energy}, Fur Color: ${lion.furColor}`);

const snake = new Reptile("Snake", "Serpent", true);
console.log(`Name: ${snake.name}, Species: ${snake.species}, Energy: ${eagle.energy}, Cold-Blooded: ${snake.coldBlooded}`);

// Example attack
console.log("\n--- Attacks ---");
eagle.attack(lion);
lion.attack(snake);
lion.attack(snake);
snake.attack(eagle);

// Display the remaining number of animals with energy
console.log(`\nRemaining animals with energy: ${Animal.remainingAnimals}`);

// Example eating
console.log("\n--- Eating ---");
eagle.eat();
lion.eat();
lion.eat();
snake.eat();
snake.eat();
snake.eat();
