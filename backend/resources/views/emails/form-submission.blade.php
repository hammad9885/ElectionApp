<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $formTitle }}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #006233; color: #fff; padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 20px;">Election Commission of Pakistan</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">{{ $formTitle }}</p>
    </div>

    <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
        @if($submitterName || $submitterEmail || $submitterPhone)
            <h2 style="font-size: 16px; color: #006233; margin-top: 0;">Submitter Details</h2>
            <table style="width: 100%; margin-bottom: 20px;">
                @if($submitterName)
                    <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Name:</td><td>{{ $submitterName }}</td></tr>
                @endif
                @if($submitterEmail)
                    <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>{{ $submitterEmail }}</td></tr>
                @endif
                @if($submitterPhone)
                    <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>{{ $submitterPhone }}</td></tr>
                @endif
            </table>
        @endif

        <h2 style="font-size: 16px; color: #006233;">Form Data</h2>
        <table style="width: 100%; border-collapse: collapse;">
            @foreach($fields as $label => $value)
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px 8px; font-weight: bold; vertical-align: top; width: 180px;">{{ $label }}</td>
                    <td style="padding: 10px 8px;">{{ $value ?: '—' }}</td>
                </tr>
            @endforeach
        </table>

        <p style="margin-top: 24px; font-size: 12px; color: #888;">
            Form ID: {{ $formId }} · Submitted via ECP Pakistan Mobile App
        </p>
    </div>
</body>
</html>
