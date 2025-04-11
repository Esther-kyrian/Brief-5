<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function () {
        return [
            //  Middleware essentiel pour Sanctum (gère les requêtes frontend avec cookies)
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,

            //  Middleware pour la limitation de requêtes (throttling API)
            \Illuminate\Routing\Middleware\ThrottleRequests::class,

            // Laisse Laravel résoudre les liaisons automatiques de routes (Route Model Binding)
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ];
    })
    ->withExceptions(function () {
        // Tu peux y personnaliser le gestionnaire d'exceptions si besoin
    })
    ->create();

   
