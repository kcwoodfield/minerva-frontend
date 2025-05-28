'use client';

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const subtitles = [
  'A Library Worth the Gods',
  'Read Like a God',
  'Minerva Keeps the Watch',
  'Minerva Knows What You\'ve Read',
  'The Wolf Guards the Lore',
  'The Moonlit Library of Thought',
  'The Wolf Remembers Every Page',
  'A Labyrinth of Pages'
];

export default function Subtitle() {
  const [subtitle, setSubtitle] = useState('');

  const getRandomSubtitle = () => {
    const randomIndex = Math.floor(Math.random() * subtitles.length);
    return subtitles[randomIndex];
  };

  useEffect(() => {
    setSubtitle(getRandomSubtitle());
  }, []);

  const handleClick = () => {
    let newSubtitle;
    do {
      newSubtitle = getRandomSubtitle();
    } while (newSubtitle === subtitle && subtitles.length > 1);
    setSubtitle(newSubtitle);
  };

  return (
    <Typography
      variant="subtitle2"
      component="div"
      onClick={handleClick}
      sx={{
        color: 'var(--muted-foreground)',
        fontSize: '1rem',
        letterSpacing: '0.025em',
        mt: -0.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          opacity: 0.8,
          transform: 'scale(1.02)',
          color: 'var(--foreground)'
        }
      }}
    >
      {subtitle}
    </Typography>
  );
}