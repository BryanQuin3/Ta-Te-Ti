export const Header = ({ resetGame })=> {
    return (
      <header className='header'>
        <img className='logo' src="/logo.png" alt="" />
        <button onClick={resetGame} className='play'>
          <img src="/play.png" alt="reset game" />
          Reset
        </button>
      </header>
    );
  }
  