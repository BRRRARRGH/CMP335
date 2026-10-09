async function getQuote()
{
    let anime = document.getElementById("animeName").value;
    let prompt = `https://api.animechan.io/v1/quotes/random?anime=${anime}`;
    let myData = await fetch(prompt);
    let myJSON = await myData.json();
    if (myJSON.status == "error")
    {
        alert("Anime not found: Try a new one!");
        document.getElementById("animeName").value = "";
    }
    else
    {
        let characterHTML = " - " + myJSON.data.character.name;
        document.getElementById("quoteLocation").innerHTML = myJSON.data.content;
        document.getElementById("quoteAnime").innerHTML = myJSON.data.anime.name;
        document.getElementById("quoteCharacter").innerHTML = characterHTML;
        document.getElementById("animeName").value = "";
    }
}

async function getRandom()
{
    let prompt = 'https://api.animechan.io/v1/quotes/random';
    let myData = await fetch(prompt);
    let myJSON = await myData.json();
    let characterHTML = " - " + myJSON.data.character.name;
    document.getElementById("quoteLocation").innerHTML = myJSON.data.content;
    document.getElementById("quoteAnime").innerHTML = myJSON.data.anime.name;
    document.getElementById("quoteCharacter").innerHTML = characterHTML;
}