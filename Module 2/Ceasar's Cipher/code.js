async function FetchData() //Call function from button from "Obtain Info" portion of the HTML page
{
    let numParas = document.getElementById("paras").value; //gets values from dropdown
    let meatType = document.getElementById("meat").value; //gets values from dropdown
    let startWith = document.getElementById("start").value; //gets values from dropdown
    let format = ""; //resets format to blank
    let cipherText = ""; //reset cipher text to blank
    let prompt = `https://baconipsum.com/api/?type=${meatType}&paras=${numParas}&start-with-lorem=${startWith}`; 
    //creates the prompt for fetch function

    let myData = await fetch(prompt);//fetches the data from the bacon ipsum API
    let myJSON = await myData.json();//formats into JSON

    let stringyJSON = JSON.stringify(myJSON);//Turns JSON into a string to display in the "Raw Data" column

    document.getElementById("rawData").innerHTML = stringyJSON; //Puts the strings into the "Raw Data" column
    document.getElementById("formattedData").innerHTML = "";  //resets the innerHTML of formmatted data

    for (para in myJSON) //creates the paragraphs 
    {
        format += '<br/>' + myJSON[para] + '<br/>';
    }
    document.getElementById("formattedData").innerHTML = format; //Puts the formatted data into the "Formatted Data" column

    for (para in myJSON)//Cipher 1
    {
        let myParaText = "";
        let paragraphString = myJSON[para];
        for(let i = 0; i < myJSON[para].length; i++) // Adjusts the characters based upon ASCII values 
        { //If the characters go above a certain limit, it readjusts back to the bottom of the ASCII values
            if(paragraphString.charCodeAt(i) >= 87 && paragraphString.charCodeAt(i) <= 90)
            {
                myParaText += String.fromCharCode(paragraphString.charCodeAt(i) + 4 - 26)
            }
            else if (paragraphString.charCodeAt(i) >= 65 && paragraphString.charCodeAt(i) <= 86)
            {
                myParaText += String.fromCharCode(paragraphString.charCodeAt(i) + 4)
            }
            else if (paragraphString.charCodeAt(i) >= 119 && paragraphString.charCodeAt(i) <= 122)
            {
                myParaText += String.fromCharCode(paragraphString.charCodeAt(i) + 4 - 26)
            }
            else if (paragraphString.charCodeAt(i) >= 97 && paragraphString.charCodeAt(i) <= 118)
            {
                myParaText += String.fromCharCode(paragraphString.charCodeAt(i) + 4)
            }
            else //If not a letter, it just adds the character to the string without changing it
            {
                myParaText += paragraphString[i];
            }
        }
        cipherText += '<br/>' + myParaText + '<br/>'; //Adds to variable cipherText
    }
    
    document.getElementById("cipherText1").innerHTML = cipherText; //Updates innerHTML of cihper text1
    cipherText = ""; //Resets cipherText to blank for the next cipher
    const myMap = new Map([["A", "M"],["B","N"],["C","O"],["D","P"],["E","Q"],["F","R"],["G","S"],["H","T"],["I","U"],["J","V"]
,['K','W'],['L','X'],['M','Y'],['N','Z'],['O','A'],["P",'B'],['Q','C'],['R','D'],['S','E'],['T','F'],['U','G'],['V','H'],['W','I']
,['X','J'],['Y','K'],['Z','L']
,['a','m'],['b','n'],['c','o'],['d','p'],['e','q'],['f','r'],['g','s'],['h','t'],['i','u'],['j','v'],['k','w'],['l','x']
,['m','y'],['n','z'],['o','a'],['p','b'],['q','c'],['r','d'],['s','e'],['t','f'],['u','g'],['v','h'],['w','i'],['x','j'],['y','k'],['z','l']]);
    //Creates a map of letters for second cipher
    for (para in myJSON)
    {
        let myParaText = "";
        let paragraphString = myJSON[para];
        for(let i = 0; i < myJSON[para].length; i++) //Maps the letters to new letters based on MAP
        {
            if(myMap.has(paragraphString[i]))
            {
                myParaText += myMap.get(paragraphString[i]);
            }
            else //If not a letter, it just adds the character to the string without changing it
            {
                myParaText += paragraphString[i];
            }
            
        }
        cipherText += '<br/>' + myParaText + '<br/>'; //formats
    }

    document.getElementById("cipherText2").innerHTML = cipherText; //puts into HTML


}