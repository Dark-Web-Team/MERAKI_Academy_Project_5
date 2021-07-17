const theme = {
    container: {
      position: 'relative'
    },
    input: {
      width: 240,
      height: 30,
      padding: '10px 20px',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 300,
      fontSize: 16,
      border: '1px solid #aaa',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    inputFocused: {
      outline: 'none'
    },
    inputOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    suggestionsContainer: {
      display: 'none'
    },
    suggestionsContainerOpen: {
      display: 'block',
      position: 'absolute',
      top: 35,
      width: 240,
      border: '1px solid #aaa',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: 300,
      fontSize: 16,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      zIndex: 105
    },
    suggestionsList: {
      display:'grid',
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    suggestion: {
      cursor: 'pointer',
      padding: '10px 20px'
    },
    suggestionHighlighted: {
      backgroundColor: '#ddd'
    }
  };
  

  export default theme