<?php

namespace App\Http\Controllers;

use App\Mail\OtpMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['required', 'string', 'max:20', 'unique:users,phone'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $otp = $this->generateOtp();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => $validated['password'],
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(10),
        ]);

        $this->sendOtpEmail($user, $otp);

        $response = [
            'message' => 'Account created. OTP sent to your email.',
            'email' => $user->email,
        ];

        if (config('app.debug')) {
            $response['otp'] = $otp;
        }

        return response()->json($response, 201);
    }

    public function login(Request $request)
    {
        if ($request->filled('otp')) {
            $request->validate([
                'otp' => ['required', 'string', 'size:6'],
                'email' => ['required_without:phone', 'nullable', 'email'],
                'phone' => ['required_without:email', 'nullable', 'string'],
            ]);

            $query = User::query()->where('otp', $request->otp)
                ->where('otp_expires_at', '>', now());

            if ($request->filled('email')) {
                $query->where('email', $request->email);
            } else {
                $query->where('phone', $request->phone);
            }

            $user = $query->first();

            if (! $user) {
                throw ValidationException::withMessages([
                    'otp' => ['The OTP is invalid or has expired.'],
                ]);
            }

            $user->forceFill([
                'otp' => null,
                'otp_expires_at' => null,
                'email_verified_at' => $user->email_verified_at ?? now(),
            ])->save();
        } elseif ($request->filled('email')) {
            $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required', 'string'],
            ]);

            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }
        } else {
            throw ValidationException::withMessages([
                'email' => ['Email or phone with OTP is required.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function sendOtp(Request $request)
    {
        $request->validate([
            'email' => ['required_without:phone', 'nullable', 'email'],
            'phone' => ['required_without:email', 'nullable', 'string', 'max:20'],
        ]);

        $user = $request->filled('email')
            ? User::where('email', $request->email)->first()
            : User::where('phone', $request->phone)->first();

        if (! $user) {
            return response()->json([
                'message' => 'No account found with this email or phone number.',
            ], 404);
        }

        $otp = $this->generateOtp();

        $user->forceFill([
            'otp' => $otp,
            'otp_expires_at' => now()->addMinutes(10),
        ])->save();

        if ($request->filled('email')) {
            $this->sendOtpEmail($user, $otp);
        }

        $response = [
            'message' => $request->filled('email')
                ? 'OTP sent to your email.'
                : 'OTP sent successfully.',
        ];

        if (config('app.debug')) {
            $response['otp'] = $otp;
        }

        return response()->json($response);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    private function generateOtp(): string
    {
        return str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    private function sendOtpEmail(User $user, string $otp): void
    {
        try {
            Mail::to($user->email)->send(new OtpMail($user->name, $otp));
        } catch (\Throwable $e) {
            report($e);

            if (! config('app.debug')) {
                throw ValidationException::withMessages([
                    'email' => ['Could not send OTP email. Please try again later.'],
                ]);
            }
        }
    }
}
