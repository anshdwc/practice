const name = "Rahul";

function greet(person) {
    return `Hello ${person}`;
}

console.log(greet(name));

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.map((n) => n * 2));
console.log(numbers.filter((n) => n > 2));