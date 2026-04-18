import { useState } from 'react';
import Header from './components/Header';
import MessageForm from './components/MessageForm';

function App() {
  // 1. Inicjalizujemy stan jako tablicę obiektów (na start dajemy 1 wiadomość powitalną)
  const [wiadomosci, setWiadomosci] = useState([
    { id: 1, author: 'System', text: 'Witaj na nowym czacie w React!' }
  ]);

  // 2. Funkcja dodająca nową wiadomość
  const handleDodajWiadomosc = (nowyTekst) => {
    const nowaWiadomosc = {
      id: Date.now(), // generuje unikalne ID (obecny czas)
      author: 'Ja',   // Na razie na sztywno, później podepniemy logowanie
      text: nowyTekst
    };

    // W React nie robimy .push()! Tworzymy nową tablicę:
    // ...wiadomosci (skopiuj stare) i dodaj nowaWiadomosc na koniec.
    setWiadomosci([...wiadomosci, nowaWiadomosc]);
  };

  return (
    <div className="app-container">
      <Header />

      <div className="chat-window">
        {/* 3. Renderowanie tablicy na HTML za pomocą .map() */}
        {wiadomosci.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>Brak wiadomości.</p>
        ) : (
          wiadomosci.map((msg) => (
            <div key={msg.id} style={{ background: 'white', padding: '15px', margin: '10px 0', borderRadius: '8px', border: '1px solid #eee' }}>
              <strong style={{ color: '#8e44ad' }}>{msg.author}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>

      {/* 4. Przekazujemy funkcję do komponentu formularza przez PROPS */}
      <MessageForm onWyslij={handleDodajWiadomosc} />
    </div>
  );
}

export default App;