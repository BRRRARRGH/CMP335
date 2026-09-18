// ChatGPT prompt: give me 3 different algorithms for solving for a palindrome
function validateAndAdd() {
    let List1 = document.getElementById("List-1-Text").innerHTML;
    let List2 = document.getElementById("List-2-Text").innerHTML;
    let List3 = document.getElementById("List-3-Text").innerHTML;
    let ListNum = document.getElementById("whichList").value;
    if (document.getElementById("input").value == "") { //Validation of input
        alert("Please enter a word to add");
    }
    else if (ListNum != "1" && ListNum != "2" && ListNum != "3") { //Validation of list selection
        alert("Please enter a 1 or a 2 for the list"); 
        document.getElementById("whichList").value = "";
    }
    else { //Gets which List it's going to 
        if (ListNum == "1") {
            /*isPalindrome = checkPalindrome1();*/
            List1 += document.getElementById("input").value + ": " + isPalindrome1() + '<br>';
            document.getElementById("List-1-Text").innerHTML = List1;
        }
        if (ListNum == "2") {
            /*isPalindrome = checkPalindrome2();*/
            List2 += document.getElementById("input").value + ": " + isPalindrome2() + '<br>';
            document.getElementById("List-2-Text").innerHTML = List2;
        }
        if (ListNum == "3") {
            /*isPalindrome = checkPalindrome3();*/
            List3 += document.getElementById("input").value + ": " + isPalindrome3() + '<br>';
            document.getElementById("List-3-Text").innerHTML = List3;
        }
        document.getElementById("whichList").value = ""; //resets value
        document.getElementById("input").value = ""; //resets value
    }
}
function isPalindrome1() { //Algorithm 1
    let word = document.getElementById("input").value; //Gets word to use
    let myWord = ""; //End word
    if (document.getElementById("List-1-Case").innerHTML == "Case Sensitive: False") { //if case sensitivity is off, 
        myWord = word.toLowerCase();
    }
    else {
        myWord = word;
    }
    let originalArray = myWord.split(""); //creates array and reversed array to compare
    let reversedArray = originalArray.toReversed();
    for (let i = 0; i < originalArray.length; i++) { //checks if the arrays are the same
        if (originalArray[i] != reversedArray[i]) {
            return "False"; //if not same, not palindrome
        }
    }
    return "True"; //if same, is palindrome
}
function isPalindrome2() { //Algorithm 2
    let word = document.getElementById("input").value; //gets word
    let myWord = "";
    if (document.getElementById("List-2-Case").innerHTML == "Case Sensitive: False") { //Makes case sensitive or not
        myWord = word.toLowerCase();
    }
    else {
        myWord = word;
    }
    if (myWord.length % 2 == 1) { //If length of word is odd
        for (let i = 0, j = myWord.length - 1; i <= ((myWord.length - 1) / 2); i++) { //loops through front or back at the same time
            if (myWord[i] != myWord[j]) {
                return "False"; //if its not the same, not palindrome
            }
            j--;
            // paaap
            // i = 0, j = 4
            //i = 1, j = 3
            // i = 2, j = 2
        }
        return "True"; //if passes, it palindrome
    }
    else { //if length is even
        for (let i = 0, j = myWord.length - 1; i < myWord.length / 2; i++) { //Same algo as above
            if (myWord[i] != myWord[j]) {
                return "False";
            }
            j--;
            // paaaap
            // i = 0, j = 5
            //i = 1, j = 4
            // i = 2, j = 3
        }
        return "True";
    }
}
function isPalindrome3() { //Algorithm 3
    let word = document.getElementById("input").value;
    let myWord = "";
    if (document.getElementById("List-3-Case").innerHTML == "Case Sensitive: False") { //Makes case sensitive or not
        myWord = word.toLowerCase();
    }
    else {
        myWord = word;
    }
    return recursioning(myWord);
}
function recursioning(myString) {//Recursion function for algorithm 3
    if (myString.length <= 1) { //if string is one character or less, it is a palindrome
        return "True";
    }
    if (myString[0] != myString[myString.length - 1]) { //if first and last character are not the same, it is not a palindrome
        return "False";
    }
    let newWord = myString.slice(1, myString.length - 1); //removes first and last character and calls function again
    return recursioning(newWord);
}
function clearList1() { //clears list 1
    document.getElementById("List-1-Text").innerHTML = "";
}
function clearList2() { // clears list 2
    document.getElementById("List-2-Text").innerHTML = "";
}
function clearList3() { // clears list 3
    document.getElementById("List-3-Text").innerHTML = "";
}
function swapCase1() { //swaps case for list 1
    clearList1();
    if (document.getElementById("List-1-Case").innerHTML == "Case Sensitive: True") {
        document.getElementById("List-1-Case").innerHTML = "Case Sensitive: False";
    }
    else {
        document.getElementById("List-1-Case").innerHTML = "Case Sensitive: True";
    }
}
function swapCase2() { //swaps case for list 2
    clearList2();
    if (document.getElementById("List-2-Case").innerHTML == "Case Sensitive: True") {
        document.getElementById("List-2-Case").innerHTML = "Case Sensitive: False";
    }
    else {
        document.getElementById("List-2-Case").innerHTML = "Case Sensitive: True";
    }
}
function swapCase3() { // swaps case for list 3
    clearList3();
    if (document.getElementById("List-3-Case").innerHTML == "Case Sensitive: True") {
        document.getElementById("List-3-Case").innerHTML = "Case Sensitive: False";
    }
    else {
        document.getElementById("List-3-Case").innerHTML = "Case Sensitive: True";
    }
}
