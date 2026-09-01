<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Verification Code</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #006233;">Election Commission of Pakistan</h2>
    <p>Hello {{ $userName }},</p>
    <p>Your verification code is:</p>
    <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #006233;">{{ $otp }}</p>
    <p>This code expires in 10 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
</body>
</html>
