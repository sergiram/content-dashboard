import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from '../StatCard';

describe('StatCard', () => {
  it('renders title, value and icon', () => {
    render(<StatCard title="Views" value="1.5M" icon="👁️" />);

    expect(screen.getByText('Views')).toBeInTheDocument();
    expect(screen.getByText('1.5M')).toBeInTheDocument();
    expect(screen.getByText('👁️')).toBeInTheDocument();
  });

  it('formats numeric values', () => {
    render(<StatCard title="Subs" value={1500} icon="👥" />);

    expect(screen.getByText('1.5K')).toBeInTheDocument();
  });
});
