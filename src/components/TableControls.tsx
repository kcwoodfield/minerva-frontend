import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip, SelectChangeEvent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface TableControlsProps {
  limit: number;
  totalItems: number;
  filteredTotal: number;
  completed: string;
  onLimitChange: (newLimit: number) => void;
  onCompletedChange: (event: SelectChangeEvent<string>) => void;
  onClear: () => void;
}

export default function TableControls({
  limit,
  totalItems,
  filteredTotal,
  completed,
  onLimitChange,
  onCompletedChange,
  onClear
}: TableControlsProps) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 2,
      justifyContent: 'space-between'
    }}>
      {/* Left side - Items per page selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ mr: 1, fontSize: '0.875rem' }}>Show:</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[25, 'all'].map((size) => (
              <Button
                key={size}
                size="small"
                sx={{ fontSize: '0.875rem', minWidth: '32px', padding: '2px 8px' }}
                variant={limit === (size === 'all' ? 100 : Number(size)) ? 'contained' : 'outlined'}
                onClick={() => onLimitChange(size === 'all' ? 100 : Number(size))}
              >
                {size}
              </Button>
            ))}
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
          Showing {filteredTotal} of {totalItems} books {filteredTotal !== totalItems && `(${filteredTotal} match current filter)`}
        </Typography>
      </Box>

      {/* Right side - Completed filter */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="completed-label" sx={{ fontSize: '0.875rem' }}>Completed</InputLabel>
          <Select
            labelId="completed-label"
            value={completed}
            label="Completed"
            onChange={onCompletedChange}
            sx={{ fontSize: '0.875rem' }}
          >
            <MenuItem value="all" sx={{ fontSize: '0.875rem' }}>All</MenuItem>
            <MenuItem value="100" sx={{ fontSize: '0.875rem' }}>Completed</MenuItem>
            <MenuItem value="0" sx={{ fontSize: '0.875rem' }}>Not Started</MenuItem>
            <MenuItem value="in_progress" sx={{ fontSize: '0.875rem' }}>In Progress</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title="Clear filters and sorting">
          <IconButton
            onClick={onClear}
            size="small"
            sx={{
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ClearIcon sx={{ fontSize: '1.25rem' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}