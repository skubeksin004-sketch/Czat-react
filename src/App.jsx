import { useState, useEffect } from 'react';
// 1. IMPORTUJEMY GNIAZDO
import { io } from 'socket.io-client'; 

import Header from './components/Header';
import MessageForm from './components/MessageForm';
import Login from './components/Login';
import Message from './components/Message';

// 2. PODŁĄCZAMY SIĘ DO SERWERA GŁÓWNEGO NAUCZYCIELA
// (Jeśli zrobiłeś własny serwer, wpisz tu 'http://localhost:3000')
const SOCKET_URL = 'https://apichat.m89.pl'; 
const API_URL = 'https://apichat.m89.pl/api/messages';

// Tworzymy połączenie przed komponentem (aby nie łączyło się od nowa przy każdej zmianie na ekranie)
const socket = io(SOCKET_URL);

function App() {
  const [wiadomosci, setWiadomosci] = useState([]);
  const [ktoPisze, setKtoPisze] = useState(null);

  useEffect(() => {
    socket.on('chat_update', (noweWiadomosci) => {
      setWiadomosci(noweWiadomosci);
    });

    let typingTimer;
    socket.on('is_typing', (nick) => {
      setKtoPisze(nick); // Zapisujemy nick
      
      // Magia UX: Czekamy 2 sekundy. Jeśli w tym czasie nie przyleci 
      // nowy sygnał 'is_typing', uznajemy, że osoba przestała pisać.
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        setKtoPisze(null);
      }, 2000);
    });

    return () => {
      socket.off('chat_update');
      socket.off('is_typing'); // <-- Sprzątamy po sobie!
    };
  }, []);

  const handleTyping = () => {
    socket.emit('typing', mojNick);
  };

  // --- WYSYŁANIE (HTTP POST) ---
  const handleDodajWiadomosc = async (nowyTekst) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: mojNick, text: nowyTekst })
      });
      // Nie musimy już ręcznie odświeżać! Serwer sam wypchnie nową tablicę!
    } catch (error) { console.error(error); }
  };

  // --- LAJKOWANIE (HTTP PATCH) ---
  const handleLajkuj = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/like`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: mojNick })
      });
    } catch (error) { console.error(error); }
  };

  // --- USUWANIE (HTTP DELETE) ---
  const handleUsun = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę wiadomość?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (error) { console.error(error); }
  };

  if (!mojNick) {
    return (
      <div className="app-container">
        <Header />
        <Login onZaloguj={setMojNick} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <div className="chat-window">
        {wiadomosci.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>Ładowanie wiadomości...</p>
        ) : (
          wiadomosci.map((msg) => (
            <Message 
              key={msg.id} 
              msg={msg} 
              mojNick={mojNick} 
              onLike={handleLajkuj} 
              onDelete={handleUsun} 
            />
          ))
        )}
      </div>
      {ktoPisze && (
        <div style={{ padding: '0 20px', fontSize: '0.85em', color: '#7f8c8d', fontStyle: 'italic', marginBottom: '5px' }}>
          ✏️ {ktoPisze} pisze wiadomość...
        </div>
      )}
      <MessageForm onWyslij={handleDodajWiadomosc} onTyping={handleTyping} />
    </div>
  );
}

export default App;