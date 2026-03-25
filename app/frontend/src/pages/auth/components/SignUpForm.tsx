import {
  useState,
} from 'react';
import type {
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRegister } from '@/hooks/useRegister';

export type SignUpValues = {
  email: string;
  username: string;
  password: string;
};

type SignUpErrors = Partial<
  Record<keyof SignUpValues, string>
>;

type StatusState = {
  type: 'success' | 'error';
  message: string;
} | null;

type SignUpFormProps = {
  title?: string;
  subtitle?: string;
  signInHref?: string;
};

const initialValues: SignUpValues = {
  email: '',
  username: '',
  password: '',
};

export function SignUpForm({
  title = 'Create your household profile',
  subtitle = 'Sign up to collaborate on grocery lists, pantry stock, and shared reminders.',
  signInHref = '/login',
}: SignUpFormProps) {
  const { registerMutation } = useRegister();
  const [values, setValues] =
    useState<SignUpValues>(initialValues);
  const [errors, setErrors] =
    useState<SignUpErrors>({});
  const [status, setStatus] =
    useState<StatusState>(null);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const nextErrors: SignUpErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        values.email.trim(),
      )
    ) {
      nextErrors.email =
        'Enter a valid email address.';
    }

    if (!values.username.trim()) {
      nextErrors.username =
        'Username is required.';
    } else if (
      values.username.trim().length < 3
    ) {
      nextErrors.username =
        'Username must be at least 3 characters.';
    }

    if (!values.password) {
      nextErrors.password =
        'Password is required.';
    } else if (values.password.length < 8) {
      nextErrors.password =
        'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const getMutationErrorMessage = (
    error: unknown,
  ) => {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error
    ) {
      return (
        (error as {
          response?: {
            data?: { message?: string };
          };
        }).response?.data?.message ||
        (error as { message?: string }).message
      );
    }

    return (error as { message?: string })
      ?.message;
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length > 0
    ) {
      return;
    }

    setIsSubmitting(true);

    registerMutation.mutate(
      {
        name: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      },
      {
        onSuccess: () => {
          setStatus({
            type: 'success',
            message:
              'Account created successfully. Redirecting to sign in...',
          });
        },
        onError: (error) => {
          const message =
            getMutationErrorMessage(error);

          setStatus({
            type: 'error',
            message:
              message ||
              'Unable to create account. Please try again.',
          });
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <Card className="relative overflow-hidden border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_55%)]"
      />

      <div className="relative z-10">
        <CardHeader className="gap-3 pb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500">
            Household Tracker
          </span>
          <CardTitle className="text-2xl sm:text-3xl">
            {title}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground/90">
            {subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="space-y-1.5">
              <Label htmlFor="signup-email">
                Email address
              </Label>
              <Input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(
                  errors.email,
                )}
                aria-describedby={
                  errors.email
                    ? 'signup-email-error'
                    : undefined
                }
                autoComplete="email"
              />
              {errors.email && (
                <p
                  id="signup-email-error"
                  className="text-xs text-destructive"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-username">
                Username
              </Label>
              <Input
                id="signup-username"
                name="username"
                type="text"
                placeholder="household-hero"
                value={values.username}
                onChange={handleChange}
                aria-invalid={Boolean(
                  errors.username,
                )}
                aria-describedby={
                  errors.username
                    ? 'signup-username-error'
                    : undefined
                }
                autoComplete="username"
              />
              {errors.username && (
                <p
                  id="signup-username-error"
                  className="text-xs text-destructive"
                >
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-password">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Create a secure password"
                  value={values.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(
                    errors.password,
                  )}
                  aria-describedby={
                    errors.password
                      ? 'signup-password-error'
                      : undefined
                  }
                  autoComplete="new-password"
                  className="pr-28"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs font-semibold"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev,
                    )
                  }
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </div>
              {errors.password && (
                <p
                  id="signup-password-error"
                  className="text-xs text-destructive"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {status && (
              <p
                className={`text-sm ${
                  status.type === 'success'
                    ? 'text-emerald-600'
                    : 'text-destructive'
                }`}
              >
                {status.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                isSubmitting ||
                registerMutation.isPending
              }
            >
              {isSubmitting ||
              registerMutation.isPending
                ? 'Creating account…'
                : 'Create account'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t border-dashed border-slate-200/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            Already registered?
            <Link
             to={signInHref}
              className="ml-2 font-semibold text-primary hover:underline"
            >
              Go to sign in
            </Link>
          </span>
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-primary"
          >
            Need support?
          </button>
        </CardFooter>
      </div>
    </Card>
  );
}
