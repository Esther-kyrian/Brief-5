<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // // CRUD des tâches (accessible uniquement si connecté)
    // Route::get('/tasks', [TaskController::class, 'index']);
    // Route::post('/tasks', [TaskController::class, 'store']);
    // Route::put('/tasks/{id}', [TaskController::class, 'update']);
    // Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
    // Route::patch('/tasks/{id}/toggle', [TaskController::class, 'toggle']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});