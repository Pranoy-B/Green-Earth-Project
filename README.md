1) What is the difference between var, let, and const?
 Ans: Var is function scoped variable while let and const are block scoped. Var can be accessible from anywhere while let and const are only accessible within the block they're declared. Var and let can be reassigned but we can't reassign const. Var is hoisted on top of the script, let and const are hoisted on top the block they're declared.

2) What is the difference between map(), forEach(), and filter()? 
 Ans: These three methods are js methods we use to iterate over the elements of an array. The difference among them are based on the purpose of their usage and behavior. We use map() method iterates over an array and change every elements and returns a new array containing the new elements, but it doesn't change the original array. The forEach() method is used to access the elements of an array and use them for some other fuction or other usage. It doesn't return a new array and doesn't change the original array. And the filter() method is used to iterate over the elements of an array and returns the elements that matched the criteria and returns a new array with those elements and it doesn't change or mutate the original array.

3) What are arrow functions in ES6?
 Ans:   Arrow functions in ES6 are shorter syntax version of regular function expressions used in javascript. 
 
4) How does destructuring assignment work in ES6?
 Ans: Destructuring assignment in ES6 is a feature in javascript that let us assign the values/keys and value of an array/object to variables based on their position. Here are few example how it is work...
        const array = [10, 20, 30, 40];
        const [a, b, c, d] = array;
        console.log(a, b, c, d); ...Output will be ==> 10 20 30 40
We can also swap values of variables using destructuring...
        let a = 1, b = 2;
        [a, b] = [b, a];
Now the value of b is 1 and the value of a is 2.

5) Explain template literals in ES6. How are they different from string concatenation?
 Ans: Template literals in ES6 are string literals where we use backticks (` `) instead of single or double quotes. Here we can use expression and multi-line strings easily. In string concatenation we have use "+" between strings, break string parts and manage quote, which makes the code messy.
