import { useState } from 'react';

// NOWOŚĆ: Odbieramy nową funkcję z Propsów - onTyping
function MessageForm({ onWyslij, onTyping }) {
  const [tekst, setTekst] = useState('');

  const handleChange = (e) => {
    setTekst(e.target.value);
    // Kiedy pole się zmienia, uruchamiamy funkcję onTyping!
    onTyping(); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tekst.trim() === '') return;
    
    onWyslij(tekst);
    setTekst('');
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Napisz wiadomość..." 
        value={tekst} 
        onChange={handleChange} /* <-- NOWOŚĆ: Zmienione na naszą nową funkcję! */
      />
      <button type="submit">Wyślij 🚀</button>
    </form>
  );
}

export default MessageForm;