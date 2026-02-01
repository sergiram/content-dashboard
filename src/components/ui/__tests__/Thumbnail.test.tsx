import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Thumbnail } from '../Thumbnail';

describe('Thumbnail', () => {
  it('shows skeleton initially and then the image', () => {
    const { container } = render(<Thumbnail src="test.jpg" alt="test thumb" />);

    // Check for skeleton pulse (the one with bg-gray-300 / bg-gray-200)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();

    const img = screen.getByAltText('test thumb');
    expect(img).toHaveClass('opacity-0');

    fireEvent.load(img);
    expect(img).toHaveClass('opacity-100');
    expect(container.querySelector('.animate-pulse')).not.toBeInTheDocument();
  });

  it('shows svg fallback on error', () => {
    const { container } = render(
      <Thumbnail src="invalid.jpg" alt="test thumb" />,
    );

    const img = screen.getByAltText('test thumb');
    fireEvent.error(img);

    expect(screen.queryByAltText('test thumb')).not.toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
