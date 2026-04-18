function Message({ msg }) {
  // Generujemy awatar na podstawie nicku (z poprzedniego modułu!)
  const awatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${msg.author}`;
  
  // Formatujemy brzydką datę z serwera na np. "14:30"
  const czas = new Date(msg.timestamp).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ display: 'flex', gap: '15px', background: 'white', padding: '15px', margin: '10px 0', borderRadius: '10px', border: '1px solid #eee', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
      
      {/* Lewa strona: Awatar */}
      <div>
        <img src={awatarUrl} alt="Avatar" style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#e9ecef' }} />
      </div>

      {/* Prawa strona: Treść */}
      <div style={{ flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <strong style={{ color: '#2c3e50' }}>{msg.author}</strong>
          <span style={{ fontSize: '0.85em', color: '#7f8c8d' }}>{czas}</span>
        </div>
        
        <div style={{ wordBreak: 'break-word', color: '#333', lineHeight: '1.5' }}>
          {msg.text}
        </div>
        
        {/* Placeholder na lajki (Ożywimy go na kolejnych zajęciach!) */}
        <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#e84393', fontWeight: 'bold' }}>
          ❤️ {msg.likes || 0}
        </div>
      </div>

    </div>
  );
}

export default Message;