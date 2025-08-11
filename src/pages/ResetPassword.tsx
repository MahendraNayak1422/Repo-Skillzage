import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, GraduationCap, CheckCircle, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [mode, setMode] = useState<'checking' | 'reset_password' | 'request_reset' | 'complete' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  useEffect(() => {
    const checkResetToken = async () => {
      // First check if we have hash-based parameters (typical for Supabase)
      const hash = window.location.hash;
      const hashParams = new URLSearchParams(hash.substring(1));
      
      // Get parameters from hash first (Supabase's preferred method), fallback to search params
      const accessToken = hashParams.get('access_token') || searchParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token') || searchParams.get('refresh_token');
      const type = hashParams.get('type') || searchParams.get('type');
      const error = hashParams.get('error') || searchParams.get('error');
      const errorDescription = hashParams.get('error_description') || searchParams.get('error_description');
      
      // Check if we have any parameters at all
      const hasHashParams = hash && hash.length > 1;
      const hasSearchParams = searchParams.toString().length > 0;
      const hasAnyParams = hasHashParams || hasSearchParams;

      console.log('Reset Password Debug:', {
        url: window.location.href,
        search: window.location.search,
        hash: window.location.hash,
        accessToken: accessToken ? 'present' : 'missing',
        refreshToken: refreshToken ? 'present' : 'missing',
        type,
        error,
        errorDescription
      });

      // Check for errors in URL
      if (error) {
        console.log('Error in URL parameters:', error, errorDescription);
        setMode('request_reset');
        setErrorMessage(errorDescription || 'Reset link has expired or is invalid');
        toast({
          title: "Reset Link Expired",
          description: "Please request a new password reset link below.",
          variant: "destructive"
        });
        return;
      }

      // Check if this is a recovery session
      if (type === 'recovery' && accessToken && refreshToken) {
        console.log('Valid recovery tokens found, setting session...');
        try {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            console.error('Session error:', sessionError);
            setMode('request_reset');
            setErrorMessage('Reset link has expired. Please request a new one.');
            toast({
              title: "Session Error",
              description: sessionError.message || 'Reset link has expired. Please request a new one.',
              variant: "destructive"
            });
          } else {
            // Verify we have a valid session
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
              console.error('User error:', userError);
              setMode('request_reset');
              setErrorMessage('Session verification failed. Please request a new reset link.');
              toast({
                title: "Verification Failed",
                description: 'Unable to verify your reset link. Please request a new one.',
                variant: "destructive"
              });
            } else {
              console.log('Valid session established for user:', user.email);
              setMode('reset_password');
            }
          }
        } catch (error) {
          console.error('Token verification error:', error);
          setMode('request_reset');
          setErrorMessage('An error occurred while verifying your reset link.');
          toast({
            title: "Verification Error",
            description: 'An error occurred while verifying your reset link.',
            variant: "destructive"
          });
        }
      } else if (accessToken || refreshToken || type) {
        // Some reset parameters present but not valid recovery
        console.log('Incomplete reset parameters:', { accessToken: !!accessToken, refreshToken: !!refreshToken, type });
        setMode('request_reset');
        setErrorMessage('Invalid reset link format. Please request a new one.');
        toast({
          title: "Invalid Reset Link",
          description: "The reset link format is invalid. Please request a new one.",
          variant: "destructive"
        });
      } else {
        // No reset parameters at all - user navigated directly or fallback
        console.log('No reset parameters found, showing request form');
        setMode('request_reset');
      }
    };

    // Add a small delay to allow URL parameters to be processed
    const timer = setTimeout(checkResetToken, 100);
    return () => clearTimeout(timer);
  }, [searchParams, navigate, toast]);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resetEmail.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        toast({
          title: "Request Failed",
          description: error.message || "Failed to send reset email",
          variant: "destructive"
        });
      } else {
        setMode('complete');
        toast({
          title: "Reset Email Sent!",
          description: "Check your email for password reset instructions.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast({
          title: "Reset Failed",
          description: error.message || "Failed to reset password",
          variant: "destructive"
        });
      } else {
        setMode('complete');
        toast({
          title: "Password Reset Successfully!",
          description: "Your password has been updated. You can now sign in with your new password.",
        });
        
        // Sign out the user to clear the recovery session
        await supabase.auth.signOut();
        
        // Redirect to auth page after a short delay
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Checking mode - verifying reset token
  if (mode === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-rose-50 to-amber-50">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 mx-auto text-orange-500 animate-pulse mb-4" />
          <p className="text-slate-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  // Complete mode - reset email sent or password reset successfully
  if (mode === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-rose-50 to-amber-50">
        <Card className="w-full max-w-md border-green-200 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-slate-700">
              {searchParams.get('access_token') ? 'Password Reset Complete' : 'Reset Email Sent'}
            </CardTitle>
            <CardDescription className="text-slate-500">
              {searchParams.get('access_token') 
                ? 'Your password has been successfully updated. You will be redirected to the sign-in page.' 
                : 'Check your email for password reset instructions.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/auth')} 
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Request reset mode - show forgot password form
  if (mode === 'request_reset') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-rose-50 to-amber-50">
        <Card className="w-full max-w-md border-orange-200 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-orange-500" />
            </div>
            <CardTitle className="text-2xl text-slate-700">Forgot Password</CardTitle>
            <CardDescription className="text-slate-500">
              {errorMessage || 'Enter your email address to receive a password reset link'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-slate-700">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-300"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Email
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => navigate('/auth')} 
                className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-rose-50 to-amber-50">
      <Card className="w-full max-w-md border-orange-200 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-orange-500" />
          </div>
          <CardTitle className="text-2xl text-slate-700">Reset Your Password</CardTitle>
          <CardDescription className="text-slate-500">
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">New Password</Label>
              <PasswordInput
                id="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-orange-200 focus:border-orange-400 focus:ring-orange-300"
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-slate-700">Confirm New Password</Label>
              <PasswordInput
                id="confirm-password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-orange-200 focus:border-orange-400 focus:ring-orange-300"
                minLength={6}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg" 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
