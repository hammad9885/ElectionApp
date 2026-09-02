<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FormSubmissionMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $formTitle,
        public string $formId,
        public array $fields,
        public ?string $submitterName = null,
        public ?string $submitterEmail = null,
        public ?string $submitterPhone = null,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "ECP App – {$this->formTitle} Submission",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.form-submission',
        );
    }
}
