// Zwróć uwagę na rozbudowaną listę argumentów w nawiasach klamrowych!
function Message({ msg, mojNick, onLike, onDelete }) {
  const awatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${msg.author}`;
  const czas = new Date(msg.timestamp).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

  // Sprawdzamy, czy tablica lajków istnieje i czy jest w niej nasz nick
  const czyPolubilem = msg.likedBy && msg.likedBy.includes(mojNick);
  
  // Zmiana koloru w zależności od tego, czy daliśmy lajka
  const stylPrzyciskuLajka = {
    background: 'none',
    border: '1px solid #ddd',
    padding: '5px 10px',
    borderRadius: '20px',
    cursor: 'pointer',
    color: czyPolubilem ? '#e84393' : '#7f8c8d',
    fontWeight: czyPolubilem ? 'bold' : 'normal',
    backgroundColor: czyPolubilem ? 'rgba(232, 67, 147, 0.1)' : 'transparent',
    marginRight: '10px'
  };

  return (
    <div style={{ display: 'flex', gap: '15px', background: 'white', padding: '15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #eee' }}>
      
      <div>
        <img src={awatarUrl} alt="Avatar" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
      </div>

      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <strong style={{ color: '#2c3e50' }}>{msg.author}</strong>
          <span style={{ fontSize: '0.85em', color: '#7f8c8d' }}>{czas}</span>
        </div>
        
        <div style={{ wordBreak: 'break-word', color: '#333', lineHeight: '1.5', marginBottom: '10px' }}>
          {msg.text}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Przycisk Lajka wywołuje funkcję onLike przekazując ID tej konkretnej wiadomości */}
          <button onClick={() => onLike(msg.id)} style={stylPrzyciskuLajka}>
            ❤️ {msg.likes || 0}
          </button>

          {/* RENDEROWANIE WARUNKOWE: Pokaż kosz TYLKO jeśli autor to ja! */}
          {msg.author === mojNick && (
            <button 
              onClick={() => onDelete(msg.id)} 
              style={{ background: 'none', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '20px', cursor: 'pointer', color: '#e74c3c' }}
            >
              🗑️ Usuń
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default Message;