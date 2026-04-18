import { useState, useEffect } from 'react';
import Header from './components/Header';
import MessageForm from './components/MessageForm';
import Login from './components/Login';
import Message from './components/Message';

const API_URL = 'https://apichat.m89.pl/api/messages';

function App() {
  const [wiadomosci, setWiadomosci] = useState([]);
  
  // NOWOŚĆ: Inicjujemy stan nickiem z LocalStorage (jeśli istnieje)
  const [mojNick, setMojNick] = useState(localStorage.getItem('shoutboxNick') || '');

  useEffect(() => {
    const pobierzDane = async () => {
      try {
        const odpowiedz = await fetch(API_URL);
        const dane = await odpowiedz.json();
        setWiadomosci(dane);
      } catch (error) { console.error(error); }
    };
    pobierzDane();
    const interval = setInterval(pobierzDane, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDodajWiadomosc = async (nowyTekst) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Wysyłamy do bazy prawdziwy nick z naszego stanu!
        body: JSON.stringify({ author: mojNick, text: nowyTekst })
      });
    } catch (error) { console.error(error); }
  };

  // NOWOŚĆ: RENDEROWANIE WARUNKOWE
  // Jeśli nick jest pusty (''), zwracamy całkowicie inny ekran (Logowanie)
  if (!mojNick) {
    return (
      <div className="app-container">
        <Header />
        <Login onZaloguj={setMojNick} />
      </div>
    );
  }

  // Jeśli nick jest uzupełniony, użytkownik widzi normalny Czat
  return (
    <div className="app-container">
      <Header />

      <div className="chat-window">
        {wiadomosci.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>Ładowanie wiadomości...</p>
        ) : (
          // Używamy naszego nowego, czystego komponentu <Message /> !
          wiadomosci.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))
        )}
      </div>

      <MessageForm onWyslij={handleDodajWiadomosc} />
    </div>
  );
}

export default App;