import {
  ChangeEvent,
  FormEvent,
  useState,
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
import { LoadingState } from '@/shared/components/LoadingState';

import { Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import { useUserInfo } from '@/hooks/useUserInfo';

export type SignInValues = {
  email: string;
  password: string;
};

type SignInErrors = Partial<
  Record<keyof SignInValues, string>
>;

type SignInFormProps = {
  onSubmit?: (
    values: SignInValues,
  ) => Promise<void> | void;
  title?: string;
  subtitle?: string;
  signUpHref?: string;
};

const initialValues: SignInValues = {
  email: '',
  password: '',
};

export function SignInForm({
  onSubmit,
  title = 'Welcome back',
  subtitle = 'Sign in to keep your items synced and accessible everywhere.',
  signUpHref = '#signup-form',
}: SignInFormProps) {
  const { loginMutation } = useLogin();
  const { data, isLoading, isFetching } =
    useUserInfo();
  const [values, setValues] =
    useState<SignInValues>(initialValues);
  const [errors, setErrors] =
    useState<SignInErrors>({});

  const isSubmitting = loginMutation.isPending;
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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await loginMutation.mutateAsync(values);
  };

  return (
    <Card className="relative overflow-hidden border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/5">
      {isSubmitting && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-[1px]">
          <div className="w-full max-w-md px-4">
            <LoadingState
              variant="panel"
              title="Signing in"
              description="Verifying your account details..."
            />
          </div>
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.08),_transparent_55%)]"
      />

      <div className="relative z-10">
        <CardHeader className="gap-3 pb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500">
            Grocery Pilot
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
              <Label htmlFor="email">
                Email address
              </Label>
              <Input
                id="email"
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
                    ? 'email-error'
                    : undefined
                }
                autoComplete="email"
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-xs text-destructive"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(
                    errors.password,
                  )}
                  aria-describedby={
                    errors.password
                      ? 'password-error'
                      : undefined
                  }
                  autoComplete="current-password"
                  className="pr-24"
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
                  id="password-error"
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
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Signing in…'
                : 'Sign in'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t border-dashed border-slate-200/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            Need an account?
            <Link
              to={'/signup'}
              className="ml-2 font-semibold text-primary hover:underline"
            >
              Create one
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
