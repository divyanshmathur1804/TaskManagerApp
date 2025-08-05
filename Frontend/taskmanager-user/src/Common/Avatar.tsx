import React, { useMemo } from 'react';

const COLORS = [
  '#0097A7', '#FF7043', '#66BB6A', '#AB47BC',
  '#FFCA28', '#29B6F6', '#EF5350', '#5C6BC0',
  '#26A69A', '#FFA726'
];

function getRandomColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}

const UserAvatar: React.FC<{ name: string, style: any }> = ({ name, style }) => {
  const bgColor = useMemo(() => getRandomColor(name), [name]);
  const initial = name.charAt(0).toUpperCase();

  return (
    <div style={{ ...avatarStyle,...style, backgroundColor: bgColor }}>
      {initial}
    </div>
  );
};

const avatarStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  fontFamily: 'sans-serif',
  marginLeft: '-12.5px'
};

export default UserAvatar;
