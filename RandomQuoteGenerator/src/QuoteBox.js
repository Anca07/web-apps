import React from 'react';
import './QuoteBox.css';

class QuoteBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            author: "",
            loading: true,
            currentColor: "#008080"
        }
    }

    componentDidMount() {
        this.getQuote();
    }

    getNextQuote = () => {
        this.getQuote();
    }

    getQuote() {
        fetch('https://raw.githubusercontent.com/Anca07/RandomQuoteGenerator/master/src/data/quotes.json')
            .then(response => response.json())
            .then(data => {

                fetch("https://raw.githubusercontent.com/Anca07/RandomQuoteGenerator/master/src/data/colors.json")
                    .then(response => response.json())
                    .then(colors => {
                        const randomColorIndex = Math.floor(0 + Math.random() * (19 - 0));
                        const randomIndex = Math.floor(0 + Math.random() * (101 - 0));
                        this.setState({
                            quote: data[randomIndex].quote,
                            author: data[randomIndex].author,
                            loading: false,
                            currentColor: colors[randomColorIndex]
                        })
                    })
            })
    }

    render() {
        const style = {
            boxStyle: {
                backgroundColor: this.state.currentColor
            },
            buttonStyle: {
                color: this.state.currentColor
            }
        }
        const url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.quote + '" ' + this.state.author);
        return (
            <div id="quote-box" className="quote-box" style={style.boxStyle}>
                {this.state.loading ? (<h1>Loading quote...</h1>) : (<div>
                    <h1 id="text">"{this.state.quote}"</h1>
                    <p id="author">~ {this.state.author}</p>
                    <div className="links-section">
                        <div id="new-quote" className="button" onClick={this.getNextQuote} style={style.buttonStyle}>Next</div>
                        <a id="tweet-quote" href={url} target="_blank"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>)}


            </div>
        );
    }
}

export default QuoteBox;