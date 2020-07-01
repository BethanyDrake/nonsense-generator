import React, {useState} from 'react';
import './App.css';


let InputTextForm = ({generateText}) => {

  let [inputText, setInputText] = useState("")
  let handleChange = (event) => {
    setInputText(event.target.value)

  }

  let handleSubmit = (event) => {
    console.log('Text submitted: ' + inputText);
    generateText(inputText)
    event.preventDefault();
  }


    return (
      <form className="Column">
        <label>
          <h2>Input text:</h2>
          <textarea value={inputText} onChange={handleChange}/>
        </label>
        <button className="submitButton" onClick={handleSubmit}>Generate</button>
      </form>
    );
}




function App() {

  let [generatedText, setGeneratedText] = useState("")

  let calculateFrequencies = (inputText) => {
    let map = {}
    for (let i=3; i<inputText.length;i++){
      let prefix = inputText[i-3] + inputText[i-2] + inputText[i-1]
      let letter = inputText[i]
      if (!map[prefix]) map[prefix] = {}
      if (!map[prefix][letter]) map[prefix][letter] = 0
      map[prefix][letter] +=1
    }

    console.log(map)
    return map

  }

  let randomElementOf = (array) => {
    let i = Math.floor(Math.random() * array.length)
    return array[i]
  }

  let expandCounts = (letterCounts) => {
    let expandedCount = ""
    Object.keys(letterCounts).forEach(letter => {
      let count = letterCounts[letter]
      for(let i = 0;  i<count ; i++) {
        expandedCount  += letter
      }
    })
    console.log({tag: "expandedCount: ", letterCounts, expandedCount} )
    return expandedCount
  }


  let getLetter = (prefix, map) => {
    let letterCounts = map[prefix]
    return randomElementOf(expandCounts(letterCounts))
  }

  let generateText = (inputText) => {
    //based on the three previous characters, what should the next character be?
    let map = calculateFrequencies(inputText)

    var prefix = inputText[0] + inputText[1] + inputText[2]
    var output = ""
    for (let i=0; i<500;i++){
      try {
        var letter = getLetter(prefix, map)
        output += letter
        prefix = prefix[1] + prefix[2] + letter;
      } catch (error) {
        console.log(error)
        prefix = inputText[0] + inputText[1] + inputText[2]
        output+="?"
      }


    }



    setGeneratedText(output)
  }
  return (

    <div className="MainContainer">
    <h1>Nonsense Generator</h1>
    <div className="Columns">
    <InputTextForm generateText={generateText}/>
    <div className="Divider"></div>
    <section className="Column">
    <h2>Output Text:</h2>
    <p>{generatedText}</p>
    </section>
    </div>
    </div>
  );
}

export default App;
