import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SettingsForm } from '../SettingsForm';

describe('SettingsForm Component', () => {
  const initialValues = {
    displayName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    theme: 'system' as const,
    timezone: 'UTC',
  };

  it('renders form fields with initial values', () => {
    render(<SettingsForm initialValues={initialValues} onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/display name/i)).toHaveValue('Alex Rivera');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('alex.rivera@example.com');
    expect(screen.getByLabelText(/primary timezone/i)).toHaveValue('UTC');
    expect(screen.getByRole('radio', { name: /system/i })).toBeChecked();
  });

  it('displays inline validation errors when submitting invalid values', async () => {
    const handleSubmit = vi.fn();
    render(<SettingsForm initialValues={{ ...initialValues, displayName: 'Al', email: 'invalid-email' }} onSubmit={handleSubmit} />);

    const submitBtn = screen.getByRole('button', { name: /save settings/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/display name must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid rfc-compliant email address/i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('shows loading spinner and disables save button while saving', () => {
    render(<SettingsForm initialValues={initialValues} onSubmit={vi.fn()} isSaving={true} />);

    const submitBtn = screen.getByRole('button', { name: /saving changes/i });
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/saving changes.../i)).toBeInTheDocument();
  });

  it('calls onSubmit with validated data when form is valid', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(undefined);

    render(<SettingsForm initialValues={initialValues} onSubmit={handleSubmit} />);

    const nameInput = screen.getByLabelText(/display name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Taylor Swift');

    const submitBtn = screen.getByRole('button', { name: /save settings/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith({
        displayName: 'Taylor Swift',
        email: 'alex.rivera@example.com',
        theme: 'system',
        timezone: 'UTC',
      });
    });
  });

  it('focuses first invalid field upon validation failure', async () => {
    const user = userEvent.setup();
    render(<SettingsForm initialValues={initialValues} onSubmit={vi.fn()} />);

    const nameInput = screen.getByLabelText(/display name/i);
    await user.clear(nameInput);

    const submitBtn = screen.getByRole('button', { name: /save settings/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(nameInput).toHaveFocus();
    });
  });
});
