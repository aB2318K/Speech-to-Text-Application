import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './page.tsx';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUp Component', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    // Clear the mock before each test
    pushMock.mockClear();
    useRouter.mockReturnValue({
      push: pushMock,
    });
  });

  it('renders the SignUp form correctly', () => {
    render(<SignUp />);

    //checking for the title "Sign Up"
    expect(screen.getByText('Sign Up', { selector: 'h2' })).toBeInTheDocument();
    expect(screen.getByLabelText('First Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();

    // Checking for the button "Sign Up"
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', () => {
    render(<SignUp />);
    
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    
    fireEvent.click(submitButton);

    // expect two instances of the required field error
    const requiredErrors = screen.getAllByText('*This field is required');
    expect(requiredErrors.length).toBe(2);

    // Checking for specific validation messages
    expect(screen.getByText('*Please provide a valid email address in the format: example@domain.com')).toBeInTheDocument();
    expect(screen.getByText('*Your password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character')).toBeInTheDocument();
  });

  it('validates correct email format', () => {
    render(<SignUp />);
    
    const emailInput = screen.getByLabelText('Email:');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('*Please provide a valid email address in the format: example@domain.com')).toBeInTheDocument();
  });
});
