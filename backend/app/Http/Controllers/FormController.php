<?php

namespace App\Http\Controllers;

use App\Mail\FormSubmissionMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class FormController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'form_id' => ['required', 'string', 'max:50'],
            'form_title' => ['required', 'string', 'max:255'],
            'submitter_name' => ['nullable', 'string', 'max:255'],
            'submitter_email' => ['nullable', 'email', 'max:255'],
            'submitter_phone' => ['nullable', 'string', 'max:20'],
            'fields' => ['required', 'array', 'min:1'],
            'fields.*.label' => ['required', 'string', 'max:255'],
            'fields.*.value' => ['nullable', 'string', 'max:5000'],
        ]);

        $fieldMap = [];
        foreach ($validated['fields'] as $field) {
            $fieldMap[$field['label']] = $field['value'] ?? '';
        }

        try {
            Mail::to(config('forms.recipient_email'))->send(new FormSubmissionMail(
                formTitle: $validated['form_title'],
                formId: $validated['form_id'],
                fields: $fieldMap,
                submitterName: $validated['submitter_name'] ?? null,
                submitterEmail: $validated['submitter_email'] ?? null,
                submitterPhone: $validated['submitter_phone'] ?? null,
            ));
        } catch (\Throwable $e) {
            report($e);

            throw ValidationException::withMessages([
                'form' => ['Could not submit your form. Please try again later.'],
            ]);
        }

        return response()->json([
            'message' => 'Your form has been submitted successfully.',
        ], 201);
    }
}
