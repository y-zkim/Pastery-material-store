@component('mail::message')
# Introduction

Bienvenue au Prestige Cake

@component('mail::button', ['url' => ''])
Bienvenue
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent
