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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * subtitles.length);
    setSubtitle(subtitles[randomIndex]);
  }, []);

  return (
    <Typography
      variant="subtitle2"
      component="div"
      sx={{
        color: 'var(--muted-foreground)',
        fontSize: '1rem',
        letterSpacing: '0.025em',
        mt: -0.5
      }}
    >
      {subtitle}
    </Typography>
  );
}