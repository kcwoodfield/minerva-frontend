import { Box, Button, Typography } from '@mui/material';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationControls({ page, totalPages, onPageChange }: PaginationControlsProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        variant="contained"
        size="small"
        sx={{
          fontFamily: 'var(--font-eb-garamond)',
          fontSize: '0.875rem',
          px: 1.5,
          py: 0.5,
          minWidth: '80px',
          textTransform: 'none'
        }}
      >
        Previous
      </Button>
      <Typography sx={{
        mx: 2,
        fontFamily: 'var(--font-eb-garamond)',
        pt: 1,
        fontSize: '1rem'
      }}>
        Page {page} of {totalPages}
      </Typography>
      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        variant="contained"
        size="small"
        sx={{
          fontFamily: 'var(--font-eb-garamond)',
          fontSize: '0.875rem',
          px: 1.5,
          py: 0.5,
          minWidth: '80px',
          textTransform: 'none'
        }}
      >
        Next
      </Button>
    </Box>
  );
}