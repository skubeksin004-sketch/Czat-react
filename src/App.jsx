import { useState, useEffect } from 'react';
import Header from './components/Header';
import MessageForm from './components/MessageForm';

// Adres serwera Twojego nauczyciela!
const API_URL = 'https://apichat.m89.pl/api/messages';

function App() {
  const [wiadomosci, setWiadomosci] = useState([]);

  // 1. POBIERANIE WIADOMOŚCI (Odpala się tylko raz dzięki pustej tablicy [])
  useEffect(() => {
    const pobierzDane = async () => {
      try {
        const odpowiedz = await fetch(API_URL);
        const dane = await odpowiedz.json();
        setWiadomosci(dane);
      } catch (error) {
        console.error("Błąd pobierania:", error);
      }
    };

    // Pobierz natychmiast przy wejściu na stronę
    pobierzDane();

    // Ustaw automatyczne odświeżanie co 2 sekundy (Polling)
    const interval = setInterval(pobierzDane, 2000);

    // BARDZO WAŻNE: Cleanup function (Funkcja sprzątająca). 
    // Kiedy zamkniemy komponent, React automatycznie skasuje interwał.
    return () => clearInterval(interval);
  }, []); // <-- Pusta tablica zależności!

  // 2. WYSYŁANIE WIADOMOŚCI DO SERWERA
  const handleDodajWiadomosc = async (nowyTekst) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Na razie wpisujemy 'ReactUser', w następnym module zrobimy logowanie!
        body: JSON.stringify({ author: 'ReactUser', text: nowyTekst })
      });
      // (Opcjonalnie) Nie musimy tu robić setWiadomosci, bo nasz 
      // setInterval i tak pobierze nowe wiadomości za max 2 sekundy!
    } catch (error) {
      console.error("Błąd wysyłania:", error);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <div className="chat-window">
        {wiadomosci.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>Ładowanie wiadomości...</p>
        ) : (
          wiadomosci.map((msg) => (
            <div key={msg.id} style={{ background: 'white', padding: '15px', margin: '10px 0', borderRadius: '8px', border: '1px solid #eee' }}>
              <strong style={{ color: '#8e44ad' }}>{msg.author}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>

      <MessageForm onWyslij={handleDodajWiadomosc} />
    </div>
  );
}

export default App;