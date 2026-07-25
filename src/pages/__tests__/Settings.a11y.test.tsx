import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import { Settings } from '../Settings';

describe('Settings Page Accessibility (a11y)', () => {
  it('has no accessibility violations on render', async () => {
    const { container } = render(<Settings />);

    // Wait for initial data loading to complete
    await waitFor(() => {
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
