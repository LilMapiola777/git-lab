/*
Example functions to practice JavaScript
Mateo Arminio - A01785572
19/02/2025
*/

//Ejercicio Clase

function area (base, height){
    let area = base * height / 2;
    return area;
}

//Ejercicio 1 

export function firstNonRepeating(string){
    for (let i=0; i<string.length; i++){
        let repeated = false;
        for (let j=0; j<string.length; j++){
            if (string[i] == string[j] && i!=j){
                repeated = true;
                break;
            }
        }
        if (!repeated){
            return string[i];
        }
    }
    return console.log("Empty string");
}

//Ejercicio 2 

export function bubbleSort(array){
    let temp = 0;
    for (let i=0; i<array.length-1; i++){
        for (let j=0; j<array.length-i-1; j++){
            if (array[j]>array[j+1]){
                temp = array[j];
                array[j] = array[j+1];
                array[j+1]=temp;
            }
        }
    }
    return array;
}

//Ejercicio 3

export function invertArray(array){
    let numbers = [];
    for (let i= array.length - 1; i >= 0; i--)
        numbers.push(array[i]);
    return numbers;
}
export function invertArrayInplace(array){
    let temp = 0;
    let i=0;
    let j=array.length-1;
    while (i < j){
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        i++;
        j--
    }
    return array;
}

//Ejercicio 4 

export function capitalize(string){
    let words = string.split(" ");
    for (let i=0; i < words.length; i++){
        if (words[i].length > 0){
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
        }
    }
    return words.join(" ");
}

//Ejercicio 5

export function mcd(a, b){
    while (b != 0){
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

//Ejercicio 6 

export function hackerSpeak(string){
    let hackerChain = "";
    for (let i = 0; i < string.length; i++){
        let hackerChar = string[i];
        if (hackerChar == 'a' || hackerChar == 'A')
            hackerChain += '4';
        else if (hackerChar == 'e' || hackerChar == 'E')
            hackerChain += '3';
        else if (hackerChar == 'i' || hackerChar == 'I')
            hackerChain += '1';
        else if (hackerChar == 'o' || hackerChar == 'O')
            hackerChain += '0';
        else if (hackerChar == 's' || hackerChar == 'S')
            hackerChain += '5';
        else
        hackerChain += hackerChar;
    }
    return hackerChain;
}

//Ejercicio 7 

export function factorize(a){
    let array = [];
    for (let i=1; i <= a; i++){
        if (a % i == 0){
            array.push(i);
        }
    }
    return array;
}

//Ejercicio 8 

export function deduplicate(array){
    let numbers = [];
    for (let i=0; i < array.length; i++){
        if (!numbers.includes(array[i])){
            numbers.push(array[i])
        }
    }
    return numbers;
}

//Ejercicio 9 

export function findShortestString(array){
    if (array.length == 0){
        return 0;
    }
    let min = 100;
    for (let i=0; i < array.length; i++){
        if (array[i].length < min){
            min = array[i].length;
        }
    }
    return min;
}

//Ejercicio 10 

export function isPalindrome(string){
    let palabra = string.toLowerCase();
    let palabrainv = palabra.split("").reverse().join("");
    if (palabra == palabrainv){
        return true;
    }
    return false;
}

//Ejercicio 11 - Falta

export function sortStrings(array){
    return array.sort();
}

//Ejercicio 12 

export function stats(array){
    if (array.length == 0)
        return [];
    let resultado = [];
    let arreglo = bubbleSort(array);
    let mediana;
    if (array.length % 2==0){
        let par = (array.length) / 2;
        mediana = (arreglo[par]+arreglo[par - 1])/2;
    }
    else if (array.length % 2 !==0){
        let impar = (array.length - 1)/2;
        mediana = array[impar];
    }
    resultado[0] = mediana;
    let moda = popularString(array);
    resultado[1] = moda;
    return resultado;
}

//Ejercicio 13 

export function popularString(array){
    if (array.length == 0) return "";
    let popular = "";
    let conteo = {};
    let repeticiones = 0;
    for (let i=0; i < array.length; i++){
        let palabra = array[i];
        if(!conteo[palabra]){
            conteo[palabra]=0;
        }
        conteo[palabra] ++;
        if (conteo[palabra] > repeticiones){
            repeticiones = conteo[palabra];
            popular = palabra;
        }
    }
    return popular;
}

//Ejercicio 14 

export function isPowerOf2(int){
    if (int < 2){
        return true;
    }
    while (int > 1){
        if (int % 2 !== 0){
            return false;
        }
        int = int / 2;
    }
    return true;
}

//Ejercicio 15

export function sortDescending(array){
    let temp = 0;
    for (let i=0; i<array.length-1; i++){
        for (let j=0; j<array.length-i-1; j++){
            if (array[j]<array[j+1]){
                temp = array[j];
                array[j] = array[j+1];
                array[j+1]=temp;
            }
        }
    }
    return array;
}
