import { useState } from 'react';

// Jako argument funkcja przyjmuje 'props' (właściwości przekazane z góry)
function MessageForm({ onWyslij }) {
  // Tworzymy Stan: zmienną 'tekst' oraz funkcję do jej zmieniania 'setTekst'
  const [tekst, setTekst] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Blokuje przeładowanie strony!
    if (tekst.trim() === '') return; // Zabezpieczenie przed pustą wiadomością
    
    onWyslij(tekst); // Odpalamy funkcję, którą dostał ten komponent z zewnątrz!
    setTekst('');    // Po wysłaniu czyścimy okienko
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Napisz wiadomość..." 
        value={tekst} 
        onChange={(e) => setTekst(e.target.value)} 
      />
      <button type="submit">Wyślij 🚀</button>
    </form>
  );
}

export default MessageForm;